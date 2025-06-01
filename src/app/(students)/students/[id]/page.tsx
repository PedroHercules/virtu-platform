import { EditStudent } from "@/modules/students/edit-student";
import {
  getStudentById,
  getPlans,
  getGraduations,
} from "@/lib/services/students";
import { notFound } from "next/navigation";

interface StudentDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function StudentDetailsPage({
  params,
}: StudentDetailsPageProps) {
  // Busca os dados no servidor
  const [student, plans, graduations] = await Promise.all([
    getStudentById(params.id),
    getPlans(),
    getGraduations(),
  ]);

  // Se o estudante não foi encontrado, mostra página 404
  if (!student) {
    notFound();
  }

  return (
    <EditStudent student={student} plans={plans} graduations={graduations} />
  );
}
