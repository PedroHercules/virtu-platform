import { z } from "zod";

export const editStudentSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Digite um email válido").optional(),
  phone: z.string().optional(),
  document: z.string().optional(),
  planId: z.string().optional(),
  graduationId: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type EditStudentFormData = z.infer<typeof editStudentSchema>;
