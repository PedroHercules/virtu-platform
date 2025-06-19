import { Students } from "@/modules/students/students";
import { getPlansService } from "@/services/plans/get-plans.service";
import { getStudentsService } from "@/services/students/get-students.service";

import * as React from "react";

interface StudentsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    status?: "all" | "active" | "inactive";
    planId?: string;
  };
}

export default async function StudentsPage({
  searchParams,
}: StudentsPageProps) {
  // Converte searchParams para filtros
  const filters = {
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: searchParams.limit ? parseInt(searchParams.limit) : 10,
    search: searchParams.search || "",
    status: searchParams.status || "all",
    planId: searchParams.planId || "all",
  };

  // Busca os dados no servidor com filtros
  const [students, plans] = await Promise.all([
    getStudentsService(filters),
    getPlansService(),
  ]);

  return (
    <React.Suspense>
      <Students students={students} plans={plans} currentFilters={filters} />
    </React.Suspense>
  );
}
