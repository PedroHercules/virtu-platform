import * as React from "react";
import { dashboardMockData } from "./mock/dashboard-data";

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 text-foreground">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card - Total de Alunos */}
        <div className="p-6 bg-muted rounded-lg border border-border">
          <h2 className="text-sm font-medium opacity-80">Total de Alunos</h2>
          <p className="mt-2 text-3xl font-bold">
            {dashboardMockData.totalStudents}
          </p>
        </div>

        {/* Card - Alunos Ativos */}
        <div className="p-6 bg-muted rounded-lg border border-border">
          <h2 className="text-sm font-medium opacity-80">Alunos Ativos</h2>
          <p className="mt-2 text-3xl font-bold text-accent">
            {dashboardMockData.activeStudents}
          </p>
        </div>

        {/* Card - Alunos Inativos */}
        <div className="p-6 bg-muted rounded-lg border border-border">
          <h2 className="text-sm font-medium opacity-80">Alunos Inativos</h2>
          <p className="mt-2 text-3xl font-bold text-primary">
            {dashboardMockData.inactiveStudents}
          </p>
        </div>
      </div>

      {/* Seção Planos e Alunos Recentes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cards dos Planos */}
        <div className="space-y-6">
          {dashboardMockData.plans.map((plan) => (
            <div
              key={plan.id}
              className="p-6 bg-muted rounded-lg border border-border"
            >
              <div className="space-y-2">
                <h2 className="text-sm font-medium opacity-80">{plan.name}</h2>
                <p className="text-2xl font-bold">
                  {plan.studentsCount} Assinantes
                </p>
                <p className="text-xs opacity-80">
                  Mensalidade:{" "}
                  {plan.monthlyFee.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lista de Alunos Recentes */}
        <div className="md:col-span-2 bg-muted rounded-lg border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-medium">Últimos Alunos Cadastrados</h2>
          </div>
          <div className="divide-y divide-border">
            {dashboardMockData.recentStudents.map((student) => (
              <div key={student.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium">{student.name}</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.status === "active"
                            ? "bg-accent bg-opacity-20 text-accent"
                            : "bg-primary bg-opacity-20 text-primary"
                        }`}
                      >
                        {student.status === "active" ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                    <p className="text-sm opacity-80">{student.email}</p>
                    <div className="flex gap-4 text-xs opacity-80">
                      <p>
                        Cadastrado em:{" "}
                        {new Date(student.createdAt).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      <p>
                        Mensalidade:{" "}
                        {student.monthlyFee.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
