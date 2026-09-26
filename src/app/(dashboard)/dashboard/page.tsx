import { ApplicationShell } from "@/components/layouts/application-shell";
import { PageContainer } from "@/components/layouts/page-container";

export default function DashboardPage() {
  return (
    <ApplicationShell>
      <PageContainer className="py-6 lg:py-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">
            Dashboard
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome to ClientFlow
          </h1>

          <p className="text-muted-foreground">
            Manage your clients, projects and business in one place.
          </p>
        </div>
      </PageContainer>
    </ApplicationShell>
  );
}