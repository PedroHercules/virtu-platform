import { Students } from "@/modules/students/students";
import { getPlansService } from "@/services/plans/get-plans.service";
import { getStudentsService } from "@/services/students/get-students.service";
import { ResultHandler } from "@/components/ui/result-handler";

import * as React from "react";

export const dynamic = "force-dynamic"; // Força a renderização dinâmica
export const revalidate = 0; // Desativa a revalidação automática

export default async function StudentsPage() {
  // Busca os dados no servidor com filtros
  const [studentsResult, plansResult] = await Promise.all([
    getStudentsService(),
    getPlansService(),
  ]);

  return (
    <React.Suspense>
      <ResultHandler
        result={studentsResult}
        fallback={<div>Carregando...</div>}
      >
        {{
          success: (students) => (
            <ResultHandler
              result={plansResult}
              fallback={<div>Carregando planos...</div>}
            >
              {{
                success: (plans) => (
                  <Students students={students} plans={plans} />
                ),
                error: (error) => (
                  <div>Erro ao carregar planos: {error.message}</div>
                ),
              }}
            </ResultHandler>
          ),
          error: (error) => <div>Erro ao carregar alunos: {error.message}</div>,
        }}
      </ResultHandler>
    </React.Suspense>
  );
}
