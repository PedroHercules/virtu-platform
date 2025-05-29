import * as React from "react";
import { dashboardMockData } from "./mock/dashboard-data";

export const Dashboard: React.FC = () => {
  // Calculando métricas financeiras
  const totalRevenue = dashboardMockData.recentStudents.reduce(
    (acc, student) => acc + student.monthlyFee,
    0
  );
  const averageRevenue = totalRevenue / dashboardMockData.totalStudents;

  // Calculando percentual de alunos ativos
  const activePercentage =
    (dashboardMockData.activeStudents / dashboardMockData.totalStudents) * 100;

  return (
    <div className="p-6 space-y-6 text-foreground">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card - Visão Geral de Alunos */}
        <div className="p-6 bg-muted rounded-lg border border-border">
          <h2 className="text-sm font-medium opacity-80">Total de Alunos</h2>
          <p className="mt-2 text-3xl font-bold">
            {dashboardMockData.totalStudents}
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span>Ativos</span>
              <span className="text-accent">
                {activePercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full"
                style={{ width: `${activePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card - Métricas de Status */}
        <div className="p-6 bg-muted rounded-lg border border-border">
          <h2 className="text-sm font-medium opacity-80">Status dos Alunos</h2>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Ativos</span>
              <span className="text-accent font-bold">
                {dashboardMockData.activeStudents}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Inativos</span>
              <span className="text-primary font-bold">
                {dashboardMockData.inactiveStudents}
              </span>
            </div>
          </div>
        </div>

        {/* Card - Métricas Financeiras */}
        <div className="p-6 bg-muted rounded-lg border border-border">
          <h2 className="text-sm font-medium opacity-80">Receita Mensal</h2>
          <p className="mt-2 text-2xl font-bold">
            {totalRevenue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p className="mt-2 text-xs opacity-80">
            Média por aluno:{" "}
            {averageRevenue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        {/* Card - Distribuição por Plano */}
        <div className="p-6 bg-muted rounded-lg border border-border">
          <h2 className="text-sm font-medium opacity-80">
            Distribuição por Plano
          </h2>
          <div className="mt-2 space-y-2">
            {dashboardMockData.plans.map((plan) => (
              <div key={plan.id} className="flex justify-between text-sm">
                <span>{plan.name}</span>
                <span className="font-medium">{plan.studentsCount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seção de Detalhes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cards dos Planos */}
        <div className="bg-muted rounded-lg border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-medium">Detalhes dos Planos</h2>
          </div>
          <div className="divide-y divide-border">
            {dashboardMockData.plans.map((plan) => (
              <div key={plan.id} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{plan.name}</h3>
                  <span className="text-xs px-2 py-1 bg-accent bg-opacity-10 text-accent rounded-full">
                    {(
                      (plan.studentsCount / dashboardMockData.totalStudents) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Assinantes</span>
                    <span className="font-medium">{plan.studentsCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Mensalidade</span>
                    <span className="font-medium">
                      {plan.monthlyFee.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Receita Total</span>
                    <span className="font-medium">
                      {(plan.studentsCount * plan.monthlyFee).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Alunos Recentes */}
        <div className="md:col-span-2 bg-muted rounded-lg border border-border">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-medium">Últimos Alunos Cadastrados</h2>
            <span className="text-xs opacity-80">
              Total: {dashboardMockData.recentStudents.length}
            </span>
          </div>
          <div className="divide-y divide-border">
            {dashboardMockData.recentStudents.map((student) => (
              <div
                key={student.id}
                className="px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent bg-opacity-20 flex items-center justify-center">
                        <span className="text-sm font-medium text-accent">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs opacity-80">{student.email}</p>
                      </div>
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
