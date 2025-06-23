"use server";

import { studentsRoutes } from "@/routes";
import { revalidatePath, revalidateTag } from "next/cache";
import { createStudentService } from "@/services/students/create-student.service";
import { getStudentsService } from "@/services/students/get-students.service";
import { StudentDTO, StudentsFiltersDTO } from "@/services/students/students";
import { updateStudentService } from "@/services/students/update-student.service";

export async function getStudentsAction(filters: StudentsFiltersDTO) {
  try {
    const students = await getStudentsService(filters);

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

export async function updateStudentAction(
  id: string,
  data: Partial<StudentDTO>
) {
  try {
    const student = await updateStudentService(id, data);

    revalidatePath(studentsRoutes.editStudent(id));
    revalidateTag(studentsRoutes.editStudent(id));

    return {
      success: true,
      data: student,
      message: "Aluno atualizado com sucesso.",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao atualizar aluno. Tente novamente mais tarde.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
