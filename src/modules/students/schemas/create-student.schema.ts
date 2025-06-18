import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Digite um email válido"),
  phone: z
    .string({
      required_error: "Telefone é obrigatório",
    })
    .min(1, "Telefone é obrigatório"),
  planId: z.string().optional(),
  graduationId: z.string().optional(),
});

export type CreateStudentFormData = z.infer<typeof createStudentSchema>;
