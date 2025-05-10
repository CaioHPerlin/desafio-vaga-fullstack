import { tasksService } from "@/services/tasks.service";
import type { Task } from "@/types/tasks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTaskOptimistic({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksService.remove,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.filter((task) => task.id !== id)
      );

      return { previousTasks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      onError && onError();
    },
    onSuccess: onSuccess,
  });
}
