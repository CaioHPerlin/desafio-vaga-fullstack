import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Endereço de e-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve possuir ao menos 6 caracteres" }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type LoginResponse = {
  accessToken: string;
  id: number;
  email: string;
};

export type RegisterInput = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  email: string;
};
