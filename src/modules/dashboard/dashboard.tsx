import * as React from "react";
import { dashboardMockData } from "./mock/dashboard-data";
import { Student, Plan } from "./types";

export const Dashboard: React.FC = () => {
  const totalRevenue = dashboardMockData.recentStudents.reduce(
    (acc, student) => acc + student.monthlyFee,
    0
  );
  const averageRevenue = totalRevenue / dashboardMockData.totalStudents;
  const activeStudentsPercentage =
    (dashboardMockData.activeStudents / dashboardMockData.totalStudents) * 100;

  const recentStudents: Student[] = dashboardMockData.recentStudents.slice(
    0,
    4
  );
  const topPlans: Plan[] = [...dashboardMockData.plans]
    .sort((a, b) => b.studentsCount - a.studentsCount)
    .slice(0, 5);

  return (
    <div className="h-[calc(100vh-4rem)] p-6 flex flex-col gap-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent">
          Painel de Controle
        </h1>
        <p className="text-muted-foreground">Visão geral da academia</p>
      </div>

      {/* Cards Principais */}
      <div className="grid grid-cols-4 gap-6">
        {/* Alunos Matriculados */}
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-emerald-500/10 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Alunos Matriculados
                </span>
                <h3 className="text-2xl font-bold text-emerald-600">
                  {dashboardMockData.totalStudents}
                </h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-muted-foreground">Ativos</span>
                </div>
                <span className="text-sm font-semibold text-emerald-600">
                  {dashboardMockData.activeStudents}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-xs text-muted-foreground">
                    Inativos
                  </span>
                </div>
                <span className="text-sm font-semibold text-orange-600">
                  {dashboardMockData.inactiveStudents}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Faturamento Mensal */}
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-blue-500/10 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Faturamento Mensal
                </span>
                <h3 className="text-2xl font-bold text-blue-600">
                  {totalRevenue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h3>
              </div>
            </div>
            <div className="pt-2 border-t border-border/20">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Ticket médio
                </span>
                <span className="text-sm font-semibold text-accent">
                  {averageRevenue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Novas Matrículas */}
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-purple-500/10 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Novas Matrículas
                </span>
                <h3 className="text-2xl font-bold text-purple-600">
                  {recentStudents.length}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/20">
              <span className="text-xs text-muted-foreground">Este mês</span>
              <div className="flex items-center gap-1">
                <svg
                  className="w-3 h-3 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium text-accent">+15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Taxa de Retenção */}
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-amber-500/10 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Taxa de Retenção
                </span>
                <h3 className="text-2xl font-bold text-amber-600">
                  {activeStudentsPercentage.toFixed(1)}%
                </h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500 ease-out"
                  style={{ width: `${activeStudentsPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Meta: 85%</span>
                <span className="text-amber-600 font-medium">
                  {activeStudentsPercentage > 85
                    ? "Meta atingida!"
                    : "Abaixo da meta"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-4 gap-6 flex-1">
        {/* Planos Mais Procurados */}
        <div className="bg-gradient-to-br from-background/80 via-background to-primary/50 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="p-6 border-b border-border/30">
            <h2 className="font-medium bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent flex items-center justify-between">
              <span>Planos Mais Procurados</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                Top {topPlans.length}
              </span>
            </h2>
          </div>
          <div className="py-3 px-4 grid gap-2">
            {topPlans.map((plan, index) => (
              <div
                key={plan.id}
                className="p-3 rounded-lg bg-gradient-to-r from-background/50 to-primary/10 border border-border/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-accent">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{plan.name}</h3>
                      <div className="text-xs text-muted-foreground">
                        {plan.monthlyFee.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent">
                      {plan.studentsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">alunos</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Matrículas Recentes */}
        <div className="col-span-3 bg-gradient-to-br from-background/80 via-background to-primary/50 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="p-6 border-b border-border/30 flex justify-between items-center">
            <h2 className="font-medium bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent">
              Matrículas Recentes
            </h2>
            <span className="text-sm text-muted-foreground">
              {recentStudents.length} novas matrículas este mês
            </span>
          </div>
          <div className="divide-y divide-border/30">
            {recentStudents.map((student) => (
              <div
                key={student.id}
                className="p-6 hover:bg-primary/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/20">
                      <span className="text-lg font-bold text-accent">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">
                        Matrícula
                      </div>
                      <div className="text-sm font-medium">
                        {new Date(student.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">
                        Mensalidade
                      </div>
                      <div className="text-sm font-bold text-blue-600">
                        {student.monthlyFee.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                        student.status === "active"
                          ? "bg-accent/10 text-accent border-accent/30"
                          : "bg-muted/50 text-muted-foreground border-border"
                      }`}
                    >
                      {student.status === "active" ? "Ativo" : "Inativo"}
                    </span>
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
