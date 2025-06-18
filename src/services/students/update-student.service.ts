import { StudentDTO, StudentEntity } from "@/services/students/students";

export async function updateStudentService(
  studentId: string,
  data: Partial<StudentDTO>
): Promise<StudentEntity> {
  const response = await fetch(`/api/students/${studentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (response.status !== 200) {
    const errorMessage =
      responseData?.message || "Um erro ocorreu ao atualizar o aluno";
    throw new Error(errorMessage);
  }

  return responseData;
}
