import { Students } from "@/modules/students/students";
import * as React from "react";

export default function StudentsPage() {
  return (
    <React.Suspense>
      <Students />
    </React.Suspense>
  );
}
