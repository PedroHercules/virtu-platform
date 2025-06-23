"use server";

import { studentsRoutes } from "@/routes";
import { createStudentService } from "@/services/students/create-student.service";
import { getStudentsService } from "@/services/students/get-students.service";
import { StudentDTO, StudentsFiltersDTO } from "@/services/students/students";
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

export async function createStudentAction(data: StudentDTO) {
  try {
    const student = await createStudentService(data);

    return {
      success: true,
      data: student,
      message: "Aluno criado com sucesso.",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao criar aluno. Tente novamente mais tarde.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
