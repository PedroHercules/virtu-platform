import { StudentPaginatedResponse } from "./students";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { makeApiRequest } from "@/lib/api-client";

interface StudentsFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: "all" | "active" | "inactive";
  planId?: string;
}

export async function getStudentsService(
  filters: StudentsFilters = {}
): Promise<StudentPaginatedResponse> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Não autorizado");
  }

  const searchParams = new URLSearchParams();

  if (filters.page) {
    searchParams.append("pageNumber", filters.page.toString());
  }

  if (filters.limit) {
    searchParams.append("pageSize", filters.limit.toString());
  }

  if (filters.search) {
    searchParams.append("searchTerm", filters.search);
  }

  if (filters.status && filters.status !== "all") {
    searchParams.append("status", filters.status);
  }

  if (filters.planId && filters.planId !== "all") {
    searchParams.append("planId", filters.planId);
  }

  const url = `/students${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const data = await makeApiRequest(url, session.user?.token as string);
  return data;
}
