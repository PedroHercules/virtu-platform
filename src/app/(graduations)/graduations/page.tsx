import { Graduations } from "@/modules/graduations/graduations";
import * as React from "react";

export const dynamic = "force-dynamic"; // Força a renderização dinâmica
export const revalidate = 0; // Desativa a revalidação automática

export default async function GraduationsPage() {
  return (
    <React.Suspense>
      <Graduations />
    </React.Suspense>
  );
}
