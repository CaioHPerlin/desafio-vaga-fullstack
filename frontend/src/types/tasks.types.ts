import { z } from "zod";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type TaskFilterDto = {
  status?: TaskStatus;
  sortBy?: "createdAt" | "updatedAt";
  order?: "ASC" | "DESC";
};

const TaskStatus = {
  PENDING: "pending",
  IN_PROGRESS: "inProgress",
  DONE: "done",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskStatusToReadable: Record<TaskStatus, string> = {
  pending: "Pendente",
  inProgress: "Em Progresso",
  done: "Concluído",
};

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "O título deve ter entre 1 e 100 caracteres" })
    .max(100, { message: "O título deve ter entre 1 e 100 caracteres" }),
  description: z
    .string()
    .min(1, { message: "A descrição deve ter entre 1 e 500 caracteres" })
    .max(500, { message: "A descrição deve ter entre 1 e 500 caracteres" }),
  status: z
    .nativeEnum(TaskStatus, {
      errorMap: () => ({
        message: `O status deve ser um dos seguintes: ${Object.values(
          TaskStatus
        ).join(", ")}`,
      }),
    })
    .optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "O título deve ter entre 1 e 100 caracteres" })
    .max(100, { message: "O título deve ter entre 1 e 100 caracteres" }),
  description: z
    .string()
    .min(1, { message: "A descrição deve ter entre 1 e 500 caracteres" })
    .max(500, { message: "A descrição deve ter entre 1 e 500 caracteres" }),
  status: z.nativeEnum(TaskStatus, {
    errorMap: () => ({
      message: `O status deve ser um dos seguintes: ${Object.values(
        TaskStatus
      ).join(", ")}`,
    }),
  }),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
