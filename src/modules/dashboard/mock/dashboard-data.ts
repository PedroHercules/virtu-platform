export interface Student {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  createdAt: string;
  monthlyFee: number;
}

export interface Plan {
  id: string;
  name: string;
  studentsCount: number;
  monthlyFee: number;
}

export interface DashboardData {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  recentStudents: Student[];
  plans: Plan[];
}

export const dashboardMockData: DashboardData = {
  totalStudents: 156,
  activeStudents: 134,
  inactiveStudents: 22,
  plans: [
    {
      id: "1",
      name: "Plano Basic",
      studentsCount: 45,
      monthlyFee: 299.9,
    },
    {
      id: "2",
      name: "Plano Standard",
      studentsCount: 67,
      monthlyFee: 399.9,
    },
    {
      id: "3",
      name: "Plano Premium",
      studentsCount: 44,
      monthlyFee: 499.9,
    },
  ],
  recentStudents: [
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      status: "active",
      createdAt: "2024-05-27T18:00:00Z",
      monthlyFee: 499.9,
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@email.com",
      status: "active",
      createdAt: "2024-05-27T17:30:00Z",
      monthlyFee: 399.9,
    },
    {
      id: "3",
      name: "Pedro Oliveira",
      email: "pedro@email.com",
      status: "inactive",
      createdAt: "2024-05-27T17:00:00Z",
      monthlyFee: 299.9,
    },
    {
      id: "4",
      name: "Ana Costa",
      email: "ana@email.com",
      status: "active",
      createdAt: "2024-05-27T16:30:00Z",
      monthlyFee: 449.9,
    },
    {
      id: "5",
      name: "Lucas Ferreira",
      email: "lucas@email.com",
      status: "active",
      createdAt: "2024-05-27T16:00:00Z",
      monthlyFee: 349.9,
    },
  ],
};
