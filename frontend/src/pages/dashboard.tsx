import { NewTaskDialog } from "@/components/new-task-dialog";
import { TaskFilters } from "@/components/task-filters";
import { TaskTable } from "@/components/task-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useTaskFilters } from "@/hooks/use-task-filters";
import { useTasksQuery } from "@/hooks/use-tasks-query";
import { Loader2Icon } from "lucide-react";

export default function Dashboard() {
  const { logout } = useAuth();

  const { filters, updateFilter, resetFilters } = useTaskFilters();
  const { data: tasks, isLoading } = useTasksQuery({ filters });

  return (
    <main className="h-screen flex flex-wrap sm:items-start p-2 items-center pb-10 sm:pt-5 justify-center">
      <Card className="grid text-center grid-cols-1 p-4 w-full sm:w-3/4">
        <h1 className="text-3xl font-semibold mb-4">Tarefas</h1>

        <div className="space-y-4">
          <TaskFilters
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
          {isLoading ? (
            <div className="flex justify-center gap-2 flex-row">
              <Loader2Icon className="animate-spin"></Loader2Icon>
              <p className="text-center text-gray-500">Buscando tarefas...</p>
            </div>
          ) : (
            <TaskTable tasks={tasks || []} />
          )}
        </div>

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
