import { DeleteTaskDialog } from "@/components/delete-task-dialog";
import { TaskFilters } from "@/components/task-filters";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateTaskDialog } from "@/components/update-task-dialog";
import type { Task, TaskFilterDto } from "@/types/tasks.types";
import { TaskStatusToReadable } from "@/types/tasks.types";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";

interface TaskTableProps {
  tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  if (!tasks.length) {
    return (
      <p className="text-center text-gray-500">Nenhuma tarefa encontrada.</p>
    );
  }

  return (
    <>
      {/* Table for larger screens */}
      <Table
        className="hidden sm:table"
        containerClassName="h-fit max-h-[70vh] overflow-y-auto relative"
      >
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Tarefa</TableHead>
            <TableHead className="w-[200px] text-center">Descrição</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Data de Criação</TableHead>
            <TableHead className="text-center">Data de Atualização</TableHead>
            <TableHead className="text-center">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: Task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{TaskStatusToReadable[task.status]}</TableCell>
              <TableCell>
                {new Date(task.createdAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                {new Date(task.updatedAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
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
                    <UpdateTaskDialog task={task}>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Pencil /> Atualizar
                      </DropdownMenuItem>
                    </UpdateTaskDialog>
                    <DeleteTaskDialog task={task}>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Trash />
                        Deletar
                      </DropdownMenuItem>
                    </DeleteTaskDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* List for smaller screens */}
      <div className="block sm:hidden space-y-4">
        {tasks.map((task: Task) => (
          <Card key={task.id} className="p-3">
            <h3 className="font-semibold text-lg">{task.title}</h3>
            <p className="text-sm text-gray-500 text-center">
              {task.description}
            </p>
            <p className="text-sm font-medium">
              Status: {TaskStatusToReadable[task.status]}
            </p>
            <div className="flex w-full gap-2 mt-2">
              <DeleteTaskDialog task={task}>
                <Button className="flex-1" size="sm" variant="destructive">
                  Deletar
                </Button>
              </DeleteTaskDialog>
              <UpdateTaskDialog task={task}>
                <Button className="flex-1" size="sm" variant="outline">
                  Atualizar
                </Button>
              </UpdateTaskDialog>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
