import { tasksService } from "@/services/tasks.service";
import type { Task, UpdateTaskDto, TaskFilterDto } from "@/types/tasks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTaskOptimistic({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
} = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & UpdateTaskDto) =>
      tasksService.update(id, data),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const queryCache = queryClient.getQueryCache();
      const taskQueries = queryCache.findAll({ queryKey: ["tasks"] });

      const previousQueries = taskQueries.map((query) => ({
        queryKey: query.queryKey,
        data: query.state.data,
      }));

      taskQueries.forEach(({ queryKey }) => {
        queryClient.setQueryData<Task[]>(queryKey, (oldTasks = []) => {
          const updatedTasks = oldTasks.map((task) =>
            task.id === variables.id ? { ...task, ...variables } : task
          );

          const filters = queryKey[1] as TaskFilterDto | undefined;
          if (filters) {
            return updatedTasks.filter((task) => {
              const matchesStatus =
                !filters.status || task.status === filters.status;
              return matchesStatus;
            });
          }

          return updatedTasks;
        });
      });

      return { previousQueries };
    },
    onError: (_, __, context) => {
      context?.previousQueries?.forEach(({ queryKey, data }) => {
        queryClient.setQueryData(queryKey, data);
      });
      onError?.();
    },
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
