export interface Student {
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
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    document: "987.654.321-00",
    status: "active",
    plan: plans[1],
    createdAt: "2024-05-27T17:30:00Z",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    document: "456.789.123-00",
    status: "inactive",
    plan: plans[0],
    createdAt: "2024-05-27T17:00:00Z",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@email.com",
    document: "321.654.987-00",
    status: "active",
    plan: plans[1],
    createdAt: "2024-05-27T16:30:00Z",
  },
  {
    id: "5",
    name: "Lucas Ferreira",
    email: "lucas@email.com",
    document: "789.123.456-00",
    status: "active",
    plan: plans[2],
    createdAt: "2024-05-27T16:00:00Z",
  },
  {
    id: "6",
    name: "Beatriz Almeida",
    email: "beatriz@email.com",
    document: "654.987.321-00",
    status: "inactive",
    plan: plans[0],
    createdAt: "2024-05-27T15:30:00Z",
  },
  {
    id: "7",
    name: "Carlos Eduardo",
    email: "carlos@email.com",
    document: "147.258.369-00",
    status: "active",
    plan: plans[1],
    createdAt: "2024-05-27T15:00:00Z",
  },
  {
    id: "8",
    name: "Fernanda Lima",
    email: "fernanda@email.com",
    document: "369.258.147-00",
    status: "active",
    plan: plans[2],
    createdAt: "2024-05-27T14:30:00Z",
  },
];
