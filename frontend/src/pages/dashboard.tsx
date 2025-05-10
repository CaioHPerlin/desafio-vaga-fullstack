import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { tasksService } from "@/services/tasks.service";
import { TaskStatusToReadable, type Task } from "@/types/tasks.types";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

function TaskTable({ tasks }: { tasks: Task[] }) {
  if (!tasks.length) {
    return (
      <p className="text-center text-gray-500">Nenhuma tarefa encontrada.</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Tarefa</TableHead>
          <TableHead className="w-[200px] text-center">Descrição</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task: Task) => (
          <TableRow key={task.id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{TaskStatusToReadable[task.status]}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Ações da tarefa"
                  >
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Atualizar</DropdownMenuItem>
                  <DropdownMenuItem>Deletar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Dashboard() {
  const { logout } = useAuth();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => tasksService.findAll(),
  });

  return (
    <main className="h-screen flex flex-wrap items-start pt-20 justify-center">
      <Card className="grid text-center grid-cols-1 p-4">
        <h1 className="text-3xl font-semibold mb-4">Tarefas</h1>
        {isLoading ? (
          <p className="text-center text-gray-500">Carregando tarefas...</p>
        ) : (
          <TaskTable tasks={tasks} />
        )}
        <div className="flex flex-wrap gap-5 mt-4">
          <Button className="flex-3 min-w-[120px]">Nova Tarefa</Button>
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
