import { Students } from "@/modules/students/students";
import { getPlansService } from "@/services/plans/get-plans.service";
import { getStudentsService } from "@/services/students/get-students.service";

import * as React from "react";

export const dynamic = "force-dynamic"; // Força a renderização dinâmica
export const revalidate = 0; // Desativa a revalidação automática

export default async function StudentsPage() {
  // Busca os dados no servidor com filtros
  const [students, plans] = await Promise.all([
    getStudentsService(),
    getPlansService(),
  ]);

  return (
    <React.Suspense>
      <Students students={students} plans={plans} />
    </React.Suspense>
  );
}
