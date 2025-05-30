export interface Student {
  id: string;
  name: string;
  email: string;
  monthlyFee: number;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  monthlyFee: number;
  studentsCount: number;
}

export interface DashboardData {
  activeStudents: number;
  inactiveStudents: number;
  totalStudents: number;
  recentStudents: Student[];
  plans: Plan[];
}
