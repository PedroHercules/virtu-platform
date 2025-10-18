import { makeApiRequest } from "@/lib/api-client";
import { StudentDTO, StudentEntity } from "@/services/students/students";
import { Result } from "@/types/result";

export async function updateStudentService(
  studentId: string,
  data: Partial<StudentDTO>
): Promise<Result<StudentEntity>> {
  const response = await makeApiRequest<StudentEntity>(
    `/students/${studentId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );

  return response;
}
