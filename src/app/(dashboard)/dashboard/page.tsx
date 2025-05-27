import { Dashboard } from "@/modules/dashboard/dashboard";
import * as React from "react";

export default function DashboardPage() {
  return (
    <React.Suspense>
      <Dashboard />
    </React.Suspense>
  );
}
