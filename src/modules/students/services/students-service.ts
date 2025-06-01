import { Student, plans, studentsData } from "../mock/students-data";
import { graduationsData } from "../mock/graduations-data";

// Simula uma busca no servidor
export async function getStudents(): Promise<Student[]> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100));
  return studentsData;
}

// Busca um estudante específico
export async function getStudentById(id: string): Promise<Student | null> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100));
  return studentsData.find((student) => student.id === id) || null;
}

// Busca todos os planos
export async function getPlans() {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100));
  return plans;
}

// Busca todas as graduações
export async function getGraduations() {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 100));
  return graduationsData;
}

// Criar um novo estudante
export async function createStudent(data: {
  name: string;
  email: string;
  phone?: string;
  planId?: string;
  graduationId?: string;
}): Promise<Student> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simula validações do servidor
  const existingStudent = studentsData.find((s) => s.email === data.email);
  if (existingStudent) {
    throw new Error("Email já está em uso por outro aluno");
  }

  // Busca o plano selecionado
  const selectedPlan = plans.find((p) => p.id === data.planId) || plans[0];

  // Cria o novo estudante
  const newStudent: Student = {
    id: (studentsData.length + 1).toString(),
    name: data.name,
    email: data.email,
    document: "", // Será preenchido posteriormente
    status: "active",
    plan: selectedPlan,
    createdAt: new Date().toISOString(),
    activeTime: "0d",
    inactiveTime: "0d",
  };

  return newStudent;
}

// Atualizar um estudante existente
export async function updateStudent(
  id: string,
  data: {
    name: string;
    email: string;
    phone?: string;
    document: string;
    planId?: string;
    graduationId?: string;
    status: "active" | "inactive";
  }
): Promise<Student> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const student = studentsData.find((s) => s.id === id);
  if (!student) {
    throw new Error("Estudante não encontrado");
  }

  // Simula validações do servidor
  const existingStudent = studentsData.find(
    (s) => s.email === data.email && s.id !== id
  );
  if (existingStudent) {
    throw new Error("Email já está em uso por outro aluno");
  }

  // Busca o plano selecionado
  const selectedPlan = plans.find((p) => p.id === data.planId) || student.plan;

  // Atualiza os dados do estudante
  const updatedStudent: Student = {
    ...student,
    name: data.name,
    email: data.email,
    document: data.document,
    status: data.status,
    plan: selectedPlan,
  };

  return updatedStudent;
}

// Deletar um estudante
export async function deleteStudent(id: string): Promise<void> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 500));

  const studentExists = studentsData.some((s) => s.id === id);
  if (!studentExists) {
    throw new Error("Estudante não encontrado");
  }

  // Em uma aplicação real, aqui removeria do banco de dados
  console.log(`Estudante com ID ${id} foi removido`);
}

// Atualizar status de múltiplos estudantes
export async function updateStudentsStatus(
  studentIds: string[],
  status: "active" | "inactive"
): Promise<void> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Em uma aplicação real, aqui faria uma atualização em lote no banco de dados
  console.log(
    `Status dos estudantes ${studentIds.join(", ")} atualizado para ${status}`
  );
}

// Deletar múltiplos estudantes
export async function deleteStudents(studentIds: string[]): Promise<void> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Em uma aplicação real, aqui faria uma remoção em lote no banco de dados
  console.log(`Estudantes ${studentIds.join(", ")} foram removidos`);
}
