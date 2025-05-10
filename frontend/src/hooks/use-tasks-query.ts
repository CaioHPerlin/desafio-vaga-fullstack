import { tasksService } from "@/services/tasks.service";
import { useQuery } from "@tanstack/react-query";

export function useTasksQuery() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => tasksService.findAll(),
    refetchInterval: (data) => (data ? 30 * 1000 : false), // Polling each 30 seconds
    refetchOnWindowFocus: true, // Refetch once user refocuses the window
  });
}
