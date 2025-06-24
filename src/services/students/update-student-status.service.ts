import { makeApiRequest } from "@/lib/api-client";
import {
  UpdateStudentStatusDTO,
  UpdateStudentStatusEntity,
} from "@/services/students/students";

export async function updateStudentStatusBatchService(
  data: UpdateStudentStatusDTO
): Promise<UpdateStudentStatusEntity> {
  const response = await makeApiRequest(`/students/status/batch`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return response;
}
