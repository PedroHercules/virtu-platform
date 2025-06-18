import { PlanEntity } from "@/services/plans/plan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { makeApiRequest } from "@/lib/api-client";

export async function getPlansService(): Promise<PlanEntity[]> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Não autorizado");
  }

  const data = await makeApiRequest("/plans", session.user?.token as string);
  return data;
}
