import { StudentEntity } from "./students";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { makeApiRequest } from "@/lib/api-client";
import { Result } from "@/types/result";

export async function getStudentByIdService(
  id: string,
): Promise<Result<StudentEntity>> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Não autorizado");
  }

  const data = await makeApiRequest<StudentEntity>(`/students/${id}`);

  return data;
}
