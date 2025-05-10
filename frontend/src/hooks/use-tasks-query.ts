import { tasksService } from "@/services/tasks.service";
import type { TaskFilterDto } from "@/types/tasks.types";
import { useQuery } from "@tanstack/react-query";

export function useTasksQuery({ filters }: { filters?: TaskFilterDto }) {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => tasksService.findAll(filters),
    refetchInterval: (data) => (data ? 30 * 1000 : false), // Polling each 30 seconds
    refetchOnWindowFocus: true, // Refetch once user refocuses the window
  });
}
