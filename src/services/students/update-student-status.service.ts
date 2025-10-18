import { makeApiRequest } from "@/lib/api-client";
import {
  UpdateStudentStatusDTO,
  UpdateStudentStatusEntity,
} from "@/services/students/students";
import { Result } from "@/types/result";

export async function updateStudentStatusBatchService(
  data: UpdateStudentStatusDTO
): Promise<Result<UpdateStudentStatusEntity>> {
  const response = await makeApiRequest<UpdateStudentStatusEntity>(
    `/students/status/batch`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );

  return response;
}
