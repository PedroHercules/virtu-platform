import {
  Student,
  plans,
  studentsData,
} from "@/modules/students/mock/students-data";
import { graduationsData } from "@/modules/students/mock/graduations-data";

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
