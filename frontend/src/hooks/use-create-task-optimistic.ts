import { tasksService } from "@/services/tasks.service";
import type { CreateTaskDto, Task } from "@/types/tasks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTaskOptimistic({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksService.create,
    onMutate: async (newTask: CreateTaskDto) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      const isoDate = new Date().toISOString();
      const optimisticTask: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: newTask.status || "pending",
        createdAt: isoDate,
        updatedAt: isoDate,
      };
      queryClient.setQueryData(["tasks"], (old: Task[] = []) => [
        optimisticTask,
        ...old,
      ]);

      return { previousTasks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      onError && onError();
    },
    onSuccess: onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
