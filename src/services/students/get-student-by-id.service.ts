import { StudentEntity } from "./students";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { makeApiRequest } from "@/lib/api-client";

export async function getStudentByIdService(
  id: string
): Promise<StudentEntity> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Não autorizado");
  }

  const data = await makeApiRequest(
    `/students/${id}`,
    session.user?.token as string
  );
  return data;
}
