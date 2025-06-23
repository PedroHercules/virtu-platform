"use server";

import { studentsRoutes } from "@/routes";
import { getStudentsService } from "@/services/students/get-students.service";
import { StudentsFiltersDTO } from "@/services/students/students";
import { invalidate } from "@/utils/revalidate";

export async function getStudentsAction(filters: StudentsFiltersDTO) {
  try {
    const students = await getStudentsService(filters);

    invalidate(studentsRoutes.students);

    return {
      data: students,
      success: true,
    };
  } catch (error) {
    console.error("Erro ao obter alunos:", error);
    return {
      success: false,
      error: "Erro ao obter alunos. Tente novamente mais tarde.",
    };
  }
}
