import { ApplicationShell } from "@/components/layouts/application-shell";
import { PageContainer } from "@/components/layouts/page-container";
import { requireWorkspace } from "@/lib/workspace";
import { getDashboardData } from "@/lib/queries/dashboard";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RevenueOverview } from "@/components/dashboard/revenue-overview";
import { ProjectStatus } from "@/components/dashboard/project-status";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";

export default async function DashboardPage() {
  const { user, workspace } = await requireWorkspace();

  const dashboardData = await getDashboardData(
    workspace.id,
    workspace.timezone
  );

  return (
    <ApplicationShell
      user={{
        name: user.name,
        email: user.email,
      }}
      workspace={{
        name: workspace.name,
        slug: workspace.slug,
        logo: workspace.logo,
      }}
    >
      <PageContainer className="py-6 lg:py-8">
  <div className="space-y-6">
    <div className="space-y-2">
      <p className="text-sm font-medium text-primary">
        Dashboard
      </p>

      <h1 className="text-3xl font-semibold tracking-tight">
        Welcome to ClientFlow
      </h1>

      <p className="text-muted-foreground">
        Manage {workspace.name} and your business in one place.
      </p>
    </div>

    <DashboardStats
      stats={dashboardData.stats}
      comparisons={dashboardData.comparisons}
      currency={workspace.currency}
    />
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
  <RevenueOverview
    data={dashboardData.revenueOverview}
    currency={workspace.currency}
  />

  <ProjectStatus
    data={dashboardData.projectStatusCounts}
  />
</div>
<div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_1.15fr_0.9fr]">
  <RecentProjects
    data={dashboardData.recentProjects}
    timezone={workspace.timezone}
  />

  <UpcomingTasks
    data={dashboardData.upcomingTasks}
    timezone={workspace.timezone}
  />

  <RecentActivity
    data={dashboardData.recentActivity}
    timezone={workspace.timezone}
  />
</div>
<RecentInvoices
  data={dashboardData.recentInvoices}
  currency={workspace.currency}
  timezone={workspace.timezone}
/>
  </div>
</PageContainer>
    </ApplicationShell>
  );
}