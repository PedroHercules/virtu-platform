import { EditStudent } from "@/modules/students/edit-student";

interface StudentDetailsPageProps {
  params: {
    id: string;
  };
}

export default function StudentDetailsPage({
  params,
}: StudentDetailsPageProps) {
  return <EditStudent studentId={params.id} />;
}
