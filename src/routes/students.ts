export const studentsRoutes = {
  students: "/students",
  studentsDetails: (id: string) => `/students/${id}`,
} as const;
