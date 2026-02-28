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
import { logResult } from "@/lib/result-utils";

export async function getStudentsAction(filters: StudentsFiltersDTO) {
  const result = await getStudentsService(filters);
  await logResult(result, "getStudentsAction");
  return result;
}

export async function createStudentAction(data: StudentDTO) {
  const result = await createStudentService(data);
  await logResult(result, "createStudentAction");
  return result;
}

export async function updateStudentAction(
  id: string,
  data: Partial<StudentDTO>,
) {
  console.log(data);
  const result = await updateStudentService(id, data);

  if (result.success) {
    revalidatePath(studentsRoutes.editStudent(id));
    revalidateTag(studentsRoutes.editStudent(id));
  }

  await logResult(result, "updateStudentAction");
  return result;
}

export async function updateStudentStatusBatchAction(
  data: UpdateStudentStatusDTO,
) {
  const result = await updateStudentStatusBatchService(data);

  if (result.success) {
    revalidatePath(studentsRoutes.students);
    revalidateTag(studentsRoutes.students);
  }

  await logResult(result, "updateStudentStatusBatchAction");
  return result;
}

export async function deleteStudentsInBatchAction(studentsIds: string[]) {
  const result = await deleteStudentsInBatchService(studentsIds);

  if (result.success) {
    revalidatePath(studentsRoutes.students);
    revalidateTag(studentsRoutes.students);
  }

  await logResult(result, "deleteStudentsInBatchAction");
  return result;
}
