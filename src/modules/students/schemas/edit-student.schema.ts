import { z } from "zod";

export const editStudentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Digite um email válido"),
  phone: z.string().optional(),
  document: z.string().min(1, "Documento é obrigatório"),
  planId: z.string().optional(),
  graduationId: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export type EditStudentFormData = z.infer<typeof editStudentSchema>;
