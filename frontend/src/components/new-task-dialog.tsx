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
import { createTaskSchema, type CreateTaskDto } from "@/types/tasks.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useCreateTaskOptimistic } from "@/hooks/use-create-task-optimistic";

export function NewTaskDialog() {
  const form = useForm<CreateTaskDto>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: optimisticMutate, isPending } = useCreateTaskOptimistic({
    onSuccess: () => {
      toast.success("Tarefa salva com sucesso.");
      form.reset();
    },
    onError: () => {
      toast.error(
        "Ocorreu um erro ao salvar a tarefa. Por favor, tente novamente."
      );
    },
  });

  function onSubmit(data: CreateTaskDto) {
    optimisticMutate(data);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex-3 min-w-[120px]">Nova Tarefa</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
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
                    <Input placeholder="Nova Tarefa" {...field} />
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
                    <Textarea placeholder="Minha nova tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2">
              <Button isLoading={isPending} type="submit">
                Salvar
              </Button>
              <DialogClose asChild>
                <Button
                  variant={"secondary"}
                  disabled={isPending}
                  type="button"
                >
                  Cancelar
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
