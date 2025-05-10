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
import {
  createTaskSchema,
  type CreateTaskDto,
  type Task,
} from "@/types/tasks.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "@/services/tasks.service";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

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

  const queryClient = useQueryClient();

  const { mutate: optimisticMutate, isPending } = useMutation({
    mutationFn: tasksService.create,
    onMutate: async (newTask: CreateTaskDto) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      const isoDate = new Date().toISOString();
      const optimisticTask: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: newTask.status || "pending",
        createdAt: isoDate,
        updatedAt: isoDate,
      };
      queryClient.setQueryData(["tasks"], (old: Task[] = []) => [
        optimisticTask,
        ...old,
      ]);

      return { previousTasks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      toast.error(
        "Ocorreu um erro ao salvar a tarefa. Por favor, tente novamente."
      );
    },
    onSuccess: () => {
      toast.success("Tarefa criada com sucesso.");
      form.reset();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
