import { tasksService } from "@/services/tasks.service";
import type { Task, UpdateTaskDto } from "@/types/tasks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTaskOptimistic({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & UpdateTaskDto) =>
      tasksService.update(id, data),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) =>
          task.id === variables.id ? { ...task, ...variables } : task
        )
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
