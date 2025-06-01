import { dashboardMockData } from "../mock/dashboard-data";

// Interface para métricas do dashboard
export interface DashboardMetrics {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  totalRevenue: number;
  averageRevenue: number;
  activeStudentsPercentage: number;
  recentStudentsCount: number;
}

// Buscar métricas gerais do dashboard
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100));

  const totalRevenue = dashboardMockData.recentStudents.reduce(
    (acc, student) => acc + student.monthlyFee,
    0
  );

  const averageRevenue = totalRevenue / dashboardMockData.totalStudents;

  const activeStudentsPercentage =
    (dashboardMockData.activeStudents / dashboardMockData.totalStudents) * 100;

  return {
    totalStudents: dashboardMockData.totalStudents,
    activeStudents: dashboardMockData.activeStudents,
    inactiveStudents: dashboardMockData.inactiveStudents,
    totalRevenue,
    averageRevenue,
    activeStudentsPercentage,
    recentStudentsCount: dashboardMockData.recentStudents.length,
  };
}

// Buscar estudantes recentes
export async function getRecentStudents(limit: number = 4) {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100));

  return dashboardMockData.recentStudents.slice(0, limit);
}

// Buscar planos mais populares
export async function getTopPlans(limit: number = 5) {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [...dashboardMockData.plans]
    .sort((a, b) => b.studentsCount - a.studentsCount)
    .slice(0, limit);
}

// Buscar todos os dados do dashboard de uma vez
export async function getDashboardData() {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 150));

  const [metrics, recentStudents, topPlans] = await Promise.all([
    getDashboardMetrics(),
    getRecentStudents(4),
    getTopPlans(5),
  ]);

  return {
    metrics,
    recentStudents,
    topPlans,
  };
}

// Buscar estatísticas de crescimento
export async function getGrowthStats() {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    monthlyGrowth: 15, // 15% de crescimento mensal
    retentionRate:
      (dashboardMockData.activeStudents / dashboardMockData.totalStudents) *
      100,
    targetRetentionRate: 85,
    revenueGrowth: 12, // 12% de crescimento na receita
  };
}
