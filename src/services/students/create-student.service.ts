import { makeApiRequest } from "@/lib/api-client";
import { StudentDTO, StudentEntity } from "@/services/students/students";

export async function createStudentService(
  data: StudentDTO
): Promise<StudentEntity> {
  const response = await makeApiRequest("/students", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.id) {
    const errorMessage =
      response?.message || "Um erro ocorreu ao criar o aluno";
    throw new Error(errorMessage);
  }

  return response;
}
