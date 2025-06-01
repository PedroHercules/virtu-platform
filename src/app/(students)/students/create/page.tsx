import { CreateStudent } from "@/modules/students/create-student";
import {
  getPlans,
  getGraduations,
} from "@/modules/students/services/students-service";

export default async function CreateStudentPage() {
  // Busca os dados no servidor
  const [plans, graduations] = await Promise.all([
    getPlans(),
    getGraduations(),
  ]);

  return <CreateStudent plans={plans} graduations={graduations} />;
}
