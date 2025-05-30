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
        <p className="text-muted-foreground">Acompanhamento da academia</p>
      </div>

      {/* Cards Principais */}
      <div className="grid grid-cols-4 gap-6">
        {/* Status dos Alunos */}
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-primary/50 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-3">
            <span className="text-sm text-muted-foreground">
              Total de Alunos
            </span>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ativos</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-2xl font-bold text-accent">
                    {dashboardMockData.activeStudents}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Inativos</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-2xl font-bold">
                    {dashboardMockData.inactiveStudents}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Receita Mensal */}
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-primary/50 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-3">
            <span className="text-sm text-muted-foreground">
              Receita do Mês
            </span>
            <h3 className="text-3xl font-bold text-accent">
              {totalRevenue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h3>
            <p className="text-sm text-muted-foreground">
              Média por aluno:{" "}
              <span className="text-accent font-medium">
                {averageRevenue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </p>
          </div>
        </div>

        {/* Novos Alunos */}
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-primary/50 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-3">
            <span className="text-sm text-muted-foreground">Alunos Novos</span>
            <h3 className="text-3xl font-bold text-accent">
              {recentStudents.length}
            </h3>
            <p className="text-sm text-muted-foreground">matrículas este mês</p>
          </div>
        </div>

        {/* Taxa de Atividade */}
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-primary/50 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-3">
            <span className="text-sm text-muted-foreground">
              Taxa de Atividade
            </span>
            <h3 className="text-3xl font-bold text-accent">
              {activeStudentsPercentage.toFixed(1)}%
            </h3>
            <div className="w-full h-2 bg-primary/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent/80 to-accent transition-all"
                style={{ width: `${activeStudentsPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-4 gap-6 flex-1">
        {/* Planos Mais Assinados */}
        <div className="bg-gradient-to-br from-background/80 via-background to-primary/50 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="p-6 border-b border-border/30">
            <h2 className="font-medium bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent flex items-center justify-between">
              <span>Planos Mais Assinados</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                Top {topPlans.length}
              </span>
            </h2>
          </div>
          <div className="py-3 px-4 grid gap-2">
            {topPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-3 rounded-lg bg-gradient-to-r from-background/50 to-primary/10 border border-border/20"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{plan.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {plan.monthlyFee.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-accent">
                      {plan.studentsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">alunos</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Alunos Recentes */}
        <div className="col-span-3 bg-gradient-to-br from-background/80 via-background to-primary/50 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="p-6 border-b border-border/30 flex justify-between items-center">
            <h2 className="font-medium bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent">
              Últimas Matrículas
            </h2>
            <span className="text-sm text-muted-foreground">
              {recentStudents.length} matrículas este mês
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
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-accent">
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
                    <div className="text-sm text-muted-foreground">
                      Início:{" "}
                      {new Date(student.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="text-sm text-accent font-medium">
                      {student.monthlyFee.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        student.status === "active"
                          ? "bg-accent/10 text-accent"
                          : "bg-primary/20 text-foreground"
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
