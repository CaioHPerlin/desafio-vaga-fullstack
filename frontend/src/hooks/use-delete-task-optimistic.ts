import { tasksService } from "@/services/tasks.service";
import type { Task } from "@/types/tasks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTaskOptimistic({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
} = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksService.remove,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const queryCache = queryClient.getQueryCache();
      const taskQueries = queryCache.findAll({ queryKey: ["tasks"] });

      const previousQueries = taskQueries.map((query) => ({
        queryKey: query.queryKey,
        data: query.state.data,
      }));

      taskQueries.forEach(({ queryKey }) => {
        queryClient.setQueryData<Task[]>(queryKey, (oldTasks = []) =>
          oldTasks.filter((task) => task.id !== id)
        );
      });

      return { previousQueries };
    },
    onError: (_, __, context) => {
      context?.previousQueries?.forEach(({ queryKey, data }) => {
        queryClient.setQueryData(queryKey, data);
      });
      onError?.();
    },
    onSuccess: onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
