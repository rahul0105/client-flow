
import {
  Users,
  FolderKanban,
  ListChecks,
  Wallet,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import {
  formatCurrency,
  getPercentageChange,
} from "@/lib/utils/dashboard-formatters";

type DashboardStatsProps = {
  stats: {
    totalClients: number;
    activeProjects: number;
    pendingTasks: number;
    totalRevenue: number;
  };
  comparisons: {
    clients: {
      current: number;
      previous: number;
    };
    projects: {
      current: number;
      previous: number;
    };
    tasks: {
      current: number;
      previous: number;
    };
  };
  currency: string;
};

export function DashboardStats({
  stats,
  comparisons,
  currency,
}: DashboardStatsProps) {
  const clientChange = getPercentageChange(
    comparisons.clients.current,
    comparisons.clients.previous
  );

  const projectChange = getPercentageChange(
    comparisons.projects.current,
    comparisons.projects.previous
  );

  const taskChange = getPercentageChange(
    comparisons.tasks.current,
    comparisons.tasks.previous
  );

  return (
    <section
      aria-label="Business statistics"
      className="grid grid-cols-2 gap-3 xl:grid-cols-4"
    >
      <StatCard
        title="Total Clients"
        value={stats.totalClients}
        icon={Users}
        change={clientChange}
      />

      <StatCard
        title="Active Projects"
        value={stats.activeProjects}
        icon={FolderKanban}
        change={projectChange}
      />

      <StatCard
        title="Pending Tasks"
        value={stats.pendingTasks}
        icon={ListChecks}
        change={taskChange}
        inverseTrend
      />

      <StatCard
        title="Total Revenue"
        value={formatCurrency(stats.totalRevenue, currency)}
        icon={Wallet}
        showChange={false}
        description="All-time paid invoices"
      />
    </section>
  );
}
