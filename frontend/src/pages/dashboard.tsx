import { NewTaskDialog } from "@/components/new-task-dialog";
import { TaskTable } from "@/components/task-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { tasksService } from "@/services/tasks.service";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

export default function Dashboard() {
  const { logout } = useAuth();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => tasksService.findAll(),
    refetchInterval: (data) => (data ? 30 * 1000 : false), // Polling each 30 seconds
    refetchOnWindowFocus: true, // Refetch once user refocuses the window
  });

  return (
    <main className="h-screen flex flex-wrap items-start pt-5 justify-center">
      <Card className="grid text-center grid-cols-1 p-4">
        <h1 className="text-3xl font-semibold mb-4">Tarefas</h1>
        {isLoading ? (
          <div className="flex justify-center gap-2 flex-row">
            <Loader2Icon className="animate-spin"></Loader2Icon>
            <p className="text-center text-gray-500">Buscando tarefas...</p>
          </div>
        ) : (
          <TaskTable tasks={tasks} />
        )}
        <div className="flex flex-wrap gap-5 mt-4">
          <NewTaskDialog />
          <Button
            variant={"secondary"}
            className="flex-1 min-w-[120px]"
            onClick={logout}
          >
            Sair
          </Button>
        </div>
      </Card>
    </main>
  );
}
