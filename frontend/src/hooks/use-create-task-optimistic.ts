import { tasksService } from "@/services/tasks.service";
import type { CreateTaskDto, Task, TaskFilterDto } from "@/types/tasks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTaskOptimistic({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
} = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksService.create,
    onMutate: async (newTask: CreateTaskDto) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const queryCache = queryClient.getQueryCache();
      const taskQueries = queryCache.findAll({ queryKey: ["tasks"] });

      const previousQueries = taskQueries.map((query) => ({
        queryKey: query.queryKey,
        data: query.state.data,
      }));

      const optimisticTask: Task = {
        id: Date.now(), // temp Id
        title: newTask.title,
        description: newTask.description,
        status: newTask.status || "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      taskQueries.forEach(({ queryKey }) => {
        const filters = queryKey[1] as TaskFilterDto | undefined;

        const shouldIncludeTask =
          !filters ||
          !filters.status ||
          filters.status === optimisticTask.status;

        if (shouldIncludeTask) {
          queryClient.setQueryData<Task[]>(queryKey, (oldTasks = []) => [
            optimisticTask,
            ...oldTasks,
          ]);
        }
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
