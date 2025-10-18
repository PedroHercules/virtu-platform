import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { makeApiRequest } from "@/lib/api-client";
import { GraduationEntity } from "@/services/graduation/graduation";
import { Result } from "@/types/result";

export async function getGraduationsService(): Promise<
  Result<GraduationEntity[]>
> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Não autorizado");
  }

  const data = await makeApiRequest<GraduationEntity[]>("/graduations/levels");

  return data;
}
