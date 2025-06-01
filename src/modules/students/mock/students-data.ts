export interface Student extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  document: string;
  status: "active" | "inactive";
  plan: {
    id: string;
    name: string;
    monthlyFee: number;
  };
  createdAt: string;
  activeTime: string;
  inactiveTime: string;
}

export const plans = [
  {
    id: "1",
    name: "Plano Basic",
    monthlyFee: 299.9,
  },
  {
    id: "2",
    name: "Plano Standard",
    monthlyFee: 399.9,
  },
  {
    id: "3",
    name: "Plano Premium",
    monthlyFee: 499.9,
  },
];

export const studentsData: Student[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    document: "123.456.789-00",
    status: "active",
    plan: plans[2],
    createdAt: "2024-05-27T18:00:00Z",
    activeTime: "8m 15d",
    inactiveTime: "1m 5d",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    document: "987.654.321-00",
    status: "active",
    plan: plans[1],
    createdAt: "2024-05-27T17:30:00Z",
    activeTime: "6m 20d",
    inactiveTime: "2m 10d",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    document: "456.789.123-00",
    status: "inactive",
    plan: plans[0],
    createdAt: "2024-05-27T17:00:00Z",
    activeTime: "4m 12d",
    inactiveTime: "3m 8d",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@email.com",
    document: "321.654.987-00",
    status: "active",
    plan: plans[1],
    createdAt: "2024-05-27T16:30:00Z",
    activeTime: "7m 2d",
    inactiveTime: "1m 18d",
  },
  {
    id: "5",
    name: "Lucas Ferreira",
    email: "lucas@email.com",
    document: "789.123.456-00",
    status: "active",
    plan: plans[2],
    createdAt: "2024-05-27T16:00:00Z",
    activeTime: "5m 25d",
    inactiveTime: "2m 3d",
  },
  {
    id: "6",
    name: "Beatriz Almeida",
    email: "beatriz@email.com",
    document: "654.987.321-00",
    status: "inactive",
    plan: plans[0],
    createdAt: "2024-05-27T15:30:00Z",
    activeTime: "3m 14d",
    inactiveTime: "4m 16d",
  },
  {
    id: "7",
    name: "Carlos Eduardo",
    email: "carlos@email.com",
    document: "147.258.369-00",
    status: "active",
    plan: plans[1],
    createdAt: "2024-05-27T15:00:00Z",
    activeTime: "6m 8d",
    inactiveTime: "1m 22d",
  },
  {
    id: "8",
    name: "Fernanda Lima",
    email: "fernanda@email.com",
    document: "369.258.147-00",
    status: "active",
    plan: plans[2],
    createdAt: "2024-05-27T14:30:00Z",
    activeTime: "7m 11d",
    inactiveTime: "1m 9d",
  },
  {
    id: "9",
    name: "Carlos Eduardo",
    email: "carlos@email.com",
    document: "147.258.369-00",
    status: "active",
    plan: plans[1],
    createdAt: "2024-05-27T15:00:00Z",
    activeTime: "6m 8d",
    inactiveTime: "1m 22d",
  },
  {
    id: "10",
    name: "Fernanda Lima",
    email: "fernanda@email.com",
    document: "369.258.147-00",
    status: "active",
    plan: plans[2],
    createdAt: "2024-05-27T14:30:00Z",
    activeTime: "7m 11d",
    inactiveTime: "1m 9d",
  },
  {
    id: "11",
    name: "Fernanda Lima",
    email: "fernanda@email.com",
    document: "369.258.147-00",
    status: "active",
    plan: plans[2],
    createdAt: "2024-05-27T14:30:00Z",
    activeTime: "7m 11d",
    inactiveTime: "1m 9d",
  },
];
