import { CreateStudent } from "@/modules/students/create-student";
import { getGraduationsService } from "@/services/graduation/get-graduations.service";
import { getPlansService } from "@/services/plans/get-plans.service";

export default async function CreateStudentPage() {
  // Busca os dados no servidor
  const [plans, graduations] = await Promise.all([
    getPlansService(),
    getGraduationsService(),
  ]);

  return <CreateStudent plans={plans} graduations={graduations} />;
}
