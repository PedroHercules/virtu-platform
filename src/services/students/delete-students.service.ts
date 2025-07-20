import { makeApiRequest } from "@/lib/api-client";

export async function deleteStudentsInBatchService(studentsIds: string[]) {
  const response = await makeApiRequest("/students", {
    method: "DELETE",
    body: JSON.stringify({ ids: studentsIds }),
  });

  return response;
}