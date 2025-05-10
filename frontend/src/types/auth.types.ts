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

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Endereço de e-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve possuir ao menos 6 caracteres" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "A senha deve possuir ao menos 6 caracteres" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas devem coincidir",
    path: ["passwordConfirm"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export type AuthUser = {
  id: number;
  email: string;
};
