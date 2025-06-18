export interface StudentDTO {
  name: string;
  email: string;
  phone: string;
  active?: boolean;
  graduationId?: string;
  planId?: string;
}

export interface StudentPaginatedResponse {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  nextPage: number | null;
  previousPage: number | null;
  data: StudentEntity[];
}

export interface StudentEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  graduationId?: string;
  planId?: string;
  createdAt: Date;
  updatedAt: Date;
  Subscription?: StudentSubscriptionEntity[];
  StudentGraduation?: StudentGraduationEntity[];
}

interface StudentPlanEntity {
  id: string;
  name: string;
  price: number;
  durationInMonths: number;
  createdAt: Date;
  updatedAt: Date;
}

interface StudentSubscriptionEntity {
  id: string;
  studentId: string;
  planId: string;
  status: "active" | "inactive" | "cancelled";
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  Plan?: StudentPlanEntity;
}

interface GraduationEntity {
  id: string;
  name: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

interface StudentGraduationEntity {
  id: string;
  studentId: string;
  graduationId: string;
  isCurrent: boolean;
  graduationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  Graduation: GraduationEntity;
}
