import { NewTaskDialog } from "@/components/new-task-dialog";
import { TaskTable } from "@/components/task-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useTasksQuery } from "@/hooks/use-tasks-query";
import { Loader2Icon } from "lucide-react";

export default function Dashboard() {
  const { logout } = useAuth();

  const { data: tasks, isLoading } = useTasksQuery();

  return (
    <main className="h-screen flex flex-wrap sm:items-start items-center pb-10 sm:pt-5 justify-center">
      <Card className="grid text-center grid-cols-1 p-4 w-3/4">
        <h1 className="text-3xl font-semibold mb-4">Tarefas</h1>

        {isLoading ? (
          <div className="flex justify-center gap-2 flex-row">
            <Loader2Icon className="animate-spin"></Loader2Icon>
            <p className="text-center text-gray-500">Buscando tarefas...</p>
          </div>
        ) : (
          <TaskTable tasks={tasks!} />
        )}

        <div className="flex w-full max-w-[400px] ml-auto gap-5 mt-4 flex-wrap-reverse sm:flex-wrap">
          <Button
            variant={"secondary"}
            className="flex-1 min-w-[120px]"
            onClick={logout}
          >
            Sair
          </Button>
          <NewTaskDialog />
        </div>
      </Card>
    </main>
  );
}
