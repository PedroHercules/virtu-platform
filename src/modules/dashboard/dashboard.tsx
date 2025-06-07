import * as React from "react";
import { Student, Plan } from "./types";
import { DashboardMetrics } from "./services/dashboard-service";
import { InfoIcon } from "@/components/ui/tooltip";
import {
  Users,
  DollarSign,
  UserPlus,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

interface DashboardProps {
  data: {
    metrics: DashboardMetrics;
    recentStudents: Student[];
    topPlans: Plan[];
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const { metrics, recentStudents, topPlans } = data;

  return (
    <div className="h-[calc(100vh-4rem)] p-6 flex flex-col gap-6 bg-background">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">
          Painel de Controle
        </h1>
        <p className="text-foreground/60">Visão geral da academia</p>
      </div>

      {/* Cards Principais */}
      <div className="grid grid-cols-4 gap-6">
        {/* Alunos Matriculados */}
        <div className="p-6 bg-secondary rounded-2xl border border-border shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">
                    Alunos Matriculados
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-success">
                  {metrics.totalStudents}
                </h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs text-foreground/60">Ativos</span>
                  <InfoIcon tooltip="Alunos com mensalidade em dia e frequentando as aulas" />
                </div>
                <span className="text-sm font-semibold text-success">
                  {metrics.activeStudents}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs text-foreground/60">Inativos</span>
                  <InfoIcon tooltip="Alunos com matrícula suspensa ou inadimplentes" />
                </div>
                <span className="text-sm font-semibold text-warning">
                  {metrics.inactiveStudents}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Faturamento Mensal */}
        <div className="p-6 bg-secondary rounded-2xl border border-border shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">
                    Faturamento Mensal
                  </span>
                  <InfoIcon tooltip="Receita total gerada pelas mensalidades dos alunos ativos" />
                </div>
                <h3 className="text-2xl font-bold text-accent">
                  {metrics.totalRevenue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h3>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground/60">
                    Ticket médio
                  </span>
                  <InfoIcon tooltip="Valor médio pago por aluno (faturamento total ÷ número de alunos)" />
                </div>
                <span className="text-sm font-semibold text-primary">
                  {metrics.averageRevenue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Novas Matrículas */}
        <div className="p-6 bg-secondary rounded-2xl border border-border shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">
                    Novas Matrículas
                  </span>
                  <InfoIcon tooltip="Número de novos alunos que se matricularam no período atual" />
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  {metrics.recentStudentsCount}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-foreground/60">Este mês</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-accent" />
                <span className="text-xs font-medium text-accent">+15%</span>
                <InfoIcon tooltip="Crescimento de 15% em relação ao mês anterior" />
              </div>
            </div>
          </div>
        </div>

        {/* Taxa de Retenção */}
        <div className="p-6 bg-secondary rounded-2xl border border-border shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">
                    Taxa de Retenção
                  </span>
                  <InfoIcon tooltip="Percentual de alunos ativos em relação ao total de matriculados" />
                </div>
                <h3 className="text-2xl font-bold text-warning">
                  {metrics.activeStudentsPercentage.toFixed(1)}%
                </h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning transition-all duration-500 ease-out"
                  style={{ width: `${metrics.activeStudentsPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-foreground/60">
                <div className="flex items-center gap-1">
                  <span>Meta: 85%</span>
                  <InfoIcon tooltip="Meta ideal de retenção para uma academia saudável" />
                </div>
                <span className="text-warning font-medium">
                  {metrics.activeStudentsPercentage > 85
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
        <div className="p-6 bg-secondary rounded-2xl border border-border shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">
                    Planos Mais Procurados
                  </span>
                  <InfoIcon tooltip="Ranking dos planos de mensalidade com maior número de alunos" />
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  Top {topPlans.length}
                </h3>
              </div>
            </div>
            <div className="space-y-3">
              {topPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted border border-border hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                      <span className="text-sm font-bold text-accent">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">
                        {plan.name}
                      </h4>
                      <p className="text-xs text-foreground/60">
                        {plan.monthlyFee.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {plan.studentsCount}
                    </div>
                    <div className="text-xs text-foreground/60">alunos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Matrículas Recentes */}
        <div className="col-span-3 bg-secondary rounded-2xl border border-border shadow-lg">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="font-medium text-foreground">Matrículas Recentes</h2>
            <span className="text-sm text-foreground/60">
              {recentStudents.length} novas matrículas este mês
            </span>
          </div>
          <div className="divide-y divide-border">
            {recentStudents.map((student) => (
              <div
                key={student.id}
                className="p-6 hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30">
                      <span className="text-lg font-bold text-accent">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {student.name}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {student.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-foreground/60">
                        Matrícula
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {new Date(student.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-foreground/60">
                        Mensalidade
                      </div>
                      <div className="text-sm font-bold text-accent">
                        {student.monthlyFee.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                        student.status === "active"
                          ? "bg-success/10 text-success border-success/30"
                          : "bg-warning/10 text-warning border-warning/30"
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
