import { StudentPaginatedResponse, StudentsFiltersDTO } from "./students";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { makeApiRequest } from "@/lib/api-client";

export async function getStudentsService(
  filters: StudentsFiltersDTO = {}
): Promise<StudentPaginatedResponse> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Não autorizado");
  }

  const searchParams = new URLSearchParams();

  if (filters.pageNumber) {
    searchParams.append("pageNumber", filters.pageNumber.toString());
  }

  if (filters.pageSize) {
    searchParams.append("pageSize", filters.pageSize.toString());
  }

  if (filters.searchTerm && filters.searchTerm.trim() !== "") {
    searchParams.append("searchTerm", filters.searchTerm);
  }

  if (filters.status && filters.status !== "all") {
    searchParams.append("status", filters.status);
  }

  if (filters.planId && filters.planId !== "all") {
    searchParams.append("planId", filters.planId);
  }

  const url = `/students${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const data = await makeApiRequest(url, session.user?.token as string, {
    method: "GET",
  });

  return data;
}
