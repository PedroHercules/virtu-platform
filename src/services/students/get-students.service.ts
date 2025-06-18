import { StudentPaginatedResponse } from "./students";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { makeApiRequest } from "@/lib/api-client";

export async function getStudentsService(): Promise<StudentPaginatedResponse> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Não autorizado");
  }

  const data = await makeApiRequest("/students", session.user?.token as string);
  return data;
}
