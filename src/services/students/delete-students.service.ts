import { makeApiRequest } from "@/lib/api-client";
import { Result } from "@/types/result";

interface DeleteResponse {
  count: number;
  status: string;
}

export async function deleteStudentsInBatchService(
  studentsIds: string[]
): Promise<Result<DeleteResponse>> {
  const response = await makeApiRequest<DeleteResponse>("/students", {
    method: "DELETE",
    body: JSON.stringify({ ids: studentsIds }),
  });

  return response;
}
