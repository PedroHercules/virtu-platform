"use server";

import { studentsRoutes } from "@/routes";
import { revalidatePath, revalidateTag } from "next/cache";
import { createStudentService } from "@/services/students/create-student.service";
import { getStudentsService } from "@/services/students/get-students.service";
import {
  StudentDTO,
  StudentsFiltersDTO,
  UpdateStudentStatusDTO,
} from "@/services/students/students";
import { updateStudentService } from "@/services/students/update-student.service";
import { updateStudentStatusBatchService } from "@/services/students/update-student-status.service";
import { deleteStudentsInBatchService } from "@/services/students/delete-students.service";

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

export async function updateStudentStatusBatchAction(
  data: UpdateStudentStatusDTO
) {
  try {
    const response = await updateStudentStatusBatchService(data);

    revalidatePath(studentsRoutes.students);
    revalidateTag(studentsRoutes.students);

    if (response.status === "error") {
      throw new Error(
        `Erro ao atualizar status dos alunos. Tente novamente mais tarde.`
      );
    }

    return {
      success: true,
      message: `Status de ${response.count} alunos atualizado com sucesso.`,
      data: response,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao atualizar status dos alunos. Tente novamente mais tarde.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function deleteStudentsInBatchAction(studentsIds: string[]) {
  try {
    const response = await deleteStudentsInBatchService(studentsIds);
    if (response.status === "error") {
      throw new Error(
        `Erro ao deletar alunos. Tente novamente mais tarde.`
      );
    }

    revalidatePath(studentsRoutes.students);
    revalidateTag(studentsRoutes.students);

    return {
      success: true,
      message: `Alunos deletados com sucesso.`,
      data: response,
    };
  } catch (error) {
    console.error("Erro ao deletar alunos:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao deletar alunos. Tente novamente mais tarde.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
