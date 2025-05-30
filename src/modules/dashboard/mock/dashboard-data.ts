import { DashboardData } from "../types";

export const dashboardMockData: DashboardData = {
  activeStudents: 125,
  inactiveStudents: 15,
  totalStudents: 140,
  recentStudents: [
    {
      id: "1",
      name: "João Silva",
      email: "joao.silva@email.com",
      monthlyFee: 150,
      status: "active",
      createdAt: "2025-05-28",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      monthlyFee: 180,
      status: "active",
      createdAt: "2025-05-27",
    },
    {
      id: "3",
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      monthlyFee: 150,
      status: "inactive",
      createdAt: "2025-05-26",
    },
    {
      id: "4",
      name: "Ana Costa",
      email: "ana.costa@email.com",
      monthlyFee: 180,
      status: "active",
      createdAt: "2025-05-25",
    },
  ],
  plans: [
    {
      id: "1",
      name: "Plano Mensal",
      monthlyFee: 150,
      studentsCount: 45,
    },
    {
      id: "2",
      name: "Plano Trimestral",
      monthlyFee: 130,
      studentsCount: 35,
    },
    {
      id: "3",
      name: "Plano Semestral",
      monthlyFee: 120,
      studentsCount: 25,
    },
    {
      id: "4",
      name: "Plano Anual",
      monthlyFee: 100,
      studentsCount: 20,
    },
  ],
};
