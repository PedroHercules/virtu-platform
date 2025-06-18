import { StudentDTO, StudentEntity } from "@/services/students/students";

export async function createStudentService(
  data: StudentDTO
): Promise<StudentEntity> {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (response.status !== 201) {
    const errorMessage =
      responseData?.message || "Um erro ocorreu ao criar o aluno";
    throw new Error(errorMessage);
  }

  return responseData;
}
