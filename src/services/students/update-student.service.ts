import { makeApiRequest } from "@/lib/api-client";
import { StudentDTO, StudentEntity } from "@/services/students/students";

export async function updateStudentService(
  studentId: string,
  data: Partial<StudentDTO>
): Promise<StudentEntity> {
  const response = await makeApiRequest(`/students/${studentId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return response;
}
