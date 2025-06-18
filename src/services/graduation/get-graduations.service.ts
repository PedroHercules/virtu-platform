import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { makeApiRequest } from "@/lib/api-client";
import { GraduationEntity } from "@/services/graduation/graduation";

export async function getGraduationsService(): Promise<GraduationEntity[]> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Não autorizado");
  }

  const data = await makeApiRequest(
    "/graduations/levels",
    session.user?.token as string
  );

  return data;
}
