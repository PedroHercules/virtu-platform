import { Dashboard } from "@/modules/dashboard/dashboard";
import { getDashboardData } from "@/modules/dashboard/services/dashboard-service";

export default async function DashboardPage() {
  // Busca os dados no servidor
  const dashboardData = await getDashboardData();

  return <Dashboard data={dashboardData} />;
}
