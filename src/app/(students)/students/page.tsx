import { Students } from "@/modules/students/students";
import { getPlansService } from "@/services/plans/get-plans.service";
import { getStudentsService } from "@/services/students/get-students.service";

import * as React from "react";

export default async function StudentsPage() {
  // Busca os dados no servidor
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
