import { ApplicationShell } from "@/components/layouts/application-shell";
import { PageContainer } from "@/components/layouts/page-container";
import { requireWorkspace } from "@/lib/workspace";

export default async function DashboardPage() {
  const { user, workspace } = await requireWorkspace();

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
      </PageContainer>
    </ApplicationShell>
  );
}