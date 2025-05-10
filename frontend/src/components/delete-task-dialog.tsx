import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteTaskOptimistic } from "@/hooks/use-delete-task-optimistic";
import type { Task } from "@/types/tasks.types";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteTaskDialog({
  task,
  children,
}: {
  task: Task;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: optimisticDelete, isPending } = useDeleteTaskOptimistic({
    onSuccess: () => {
      toast.success("Tarefa deletada com sucesso.");
    },
    onError: () => {
      toast.error(
        "Ocorreu um erro ao deletar a tarefa. Por favor, tente novamente."
      );
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar a tarefa "{task.title}"? Esta ação
            não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => optimisticDelete(task.id)}
            isLoading={isPending}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
