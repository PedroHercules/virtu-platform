import { Students } from "@/modules/students/students";
import { getStudents, getPlans } from "@/lib/services/students";
import * as React from "react";

export default async function StudentsPage() {
  // Busca os dados no servidor
  const [students, plans] = await Promise.all([getStudents(), getPlans()]);

  return (
    <React.Suspense>
      <Students students={students} plans={plans} />
    </React.Suspense>
  );
}
