import * as React from "react";
import { dashboardMockData } from "./mock/dashboard-data";
import { Student, Plan } from "./types";
import { InfoIcon } from "@/components/ui/tooltip";
import {
  Users,
  DollarSign,
  UserPlus,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

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
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Alunos Matriculados
                  </span>
                </div>
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
                  <InfoIcon tooltip="Alunos com mensalidade em dia e frequentando as aulas" />
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
                  <InfoIcon tooltip="Alunos com matrícula suspensa ou inadimplentes" />
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
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Faturamento Mensal
                  </span>
                  <InfoIcon tooltip="Receita total gerada pelas mensalidades dos alunos ativos" />
                </div>
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
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Ticket médio
                  </span>
                  <InfoIcon tooltip="Valor médio pago por aluno (faturamento total ÷ número de alunos)" />
                </div>
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
                <UserPlus className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Novas Matrículas
                  </span>
                  <InfoIcon tooltip="Número de novos alunos que se matricularam no período atual" />
                </div>
                <h3 className="text-2xl font-bold text-purple-600">
                  {recentStudents.length}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/20">
              <span className="text-xs text-muted-foreground">Este mês</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-accent" />
                <span className="text-xs font-medium text-accent">+15%</span>
                <InfoIcon tooltip="Crescimento de 15% em relação ao mês anterior" />
              </div>
            </div>
          </div>
        </div>

        {/* Taxa de Retenção */}
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-amber-500/10 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Taxa de Retenção
                  </span>
                  <InfoIcon tooltip="Percentual de alunos ativos em relação ao total de matriculados" />
                </div>
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
                <div className="flex items-center gap-1">
                  <span>Meta: 85%</span>
                  <InfoIcon tooltip="Meta ideal de retenção para uma academia saudável" />
                </div>
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
        <div className="p-6 bg-gradient-to-br from-background/80 via-background to-indigo-500/10 rounded-2xl border border-border/30 backdrop-blur-sm shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Planos Mais Procurados
                  </span>
                  <InfoIcon tooltip="Ranking dos planos de mensalidade com maior número de alunos" />
                </div>
                <h3 className="text-2xl font-bold text-indigo-600">
                  Top {topPlans.length}
                </h3>
              </div>
            </div>
            <div className="space-y-3">
              {topPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-background/80 to-indigo-500/5 border border-border/20 hover:bg-indigo-500/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                      <span className="text-sm font-bold text-indigo-600">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{plan.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {plan.monthlyFee.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-indigo-600">
                      {plan.studentsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">alunos</div>
                  </div>
                </div>
              ))}
            </div>
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
