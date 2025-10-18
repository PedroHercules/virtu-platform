import { PlanEntity } from "@/services/plans/plan";
import { makeApiRequest } from "@/lib/api-client";
import { Result } from "@/types/result";

export async function getPlansService(): Promise<Result<PlanEntity[]>> {
  const data = await makeApiRequest<PlanEntity[]>("/plans");
  return data;
}
