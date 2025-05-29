export const homeRoutes = {
  dashboard: "/dashboard",
  students: "/students",
  studentsDetails: (id: string) => `/students/${id}`,
  graduations: "/graduations",
  payments: "/payments",
} as const;
