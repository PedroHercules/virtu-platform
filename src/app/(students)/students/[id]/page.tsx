import { EditStudent } from "@/modules/students/edit-student";
import { getGraduationsService } from "@/services/graduation/get-graduations.service";
import { getPlansService } from "@/services/plans/get-plans.service";
import { getStudentByIdService } from "@/services/students/get-student-by-id.service";
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
    getStudentByIdService(params.id),
    getPlansService(),
    getGraduationsService(),
  ]);

  // Se o estudante não foi encontrado, mostra página 404
  if (!student) {
    notFound();
  }

  return (
    <EditStudent student={student} plans={plans} graduations={graduations} />
  );
}
