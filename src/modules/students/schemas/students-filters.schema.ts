import { z } from "zod";

export const studentsFiltersSchema = z.object({
  searchTerm: z.string().optional(),
  status: z.enum(["all", "active", "inactive"]).optional(),
  planId: z.string().optional(),
});

export type FiltersFormData = z.infer<typeof studentsFiltersSchema>;
