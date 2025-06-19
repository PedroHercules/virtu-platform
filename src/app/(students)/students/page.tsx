import { Students } from "@/modules/students/students";
import { getPlansService } from "@/services/plans/get-plans.service";
import { getStudentsService } from "@/services/students/get-students.service";

import * as React from "react";

interface StudentsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: "all" | "active" | "inactive";
    planId?: string;
  }>;
}

export default async function StudentsPage({
  searchParams,
}: StudentsPageProps) {
  // Aguarda searchParams e converte para filtros
  const params = await searchParams;
  const filters = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    status: params.status || "all",
    planId: params.planId || "all",
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
