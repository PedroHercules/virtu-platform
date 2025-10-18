import { makeApiRequest } from "@/lib/api-client";
import { StudentDTO, StudentEntity } from "@/services/students/students";
import { Result } from "@/types/result";

export async function createStudentService(
  data: StudentDTO
): Promise<Result<StudentEntity>> {
  const response = await makeApiRequest<StudentEntity>("/students", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
}
