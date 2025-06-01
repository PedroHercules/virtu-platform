export const studentsRoutes = {
  students: "/students",
  editStudent: (id: string) => `/students/${id}`,
  studentsCreate: "/students/create",
} as const;
