export const studentsRoutes = {
  students: "/students",
  studentsDetails: (id: string) => `/students/${id}`,
  studentsCreate: "/students/create",
} as const;
