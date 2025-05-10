// components/update-task-dialog.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useUpdateTaskOptimistic } from "@/hooks/use-update-task-optimistic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  updateTaskSchema,
  type Task,
  type UpdateTaskDto,
} from "@/types/tasks.types";

interface UpdateTaskDialogProps {
  task: Task;
  children: React.ReactNode;
}

export function UpdateTaskDialog({ task, children }: UpdateTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<UpdateTaskDto>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      ...task,
    },
  });

  const { mutate: optimisticMutate, isPending } = useUpdateTaskOptimistic({
    onSuccess: () => {
      toast.success("Tarefa atualizada com sucesso");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Ocorreu um erro ao atualizar a tarefa");
    },
  });

  function onSubmit(data: UpdateTaskDto) {
    optimisticMutate({
      ...data,
      id: task.id,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar tarefa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrição da tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="inProgress">Em progresso</SelectItem>
                      <SelectItem value="done">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row justify-end gap-2">
              <DialogClose asChild>
                <Button variant="secondary" disabled={isPending} type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button isLoading={isPending} type="submit">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
