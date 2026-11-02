import { ApplicationShell } from "@/components/layouts/application-shell";
import { PageContainer } from "@/components/layouts/page-container";
import { getClients } from "@/lib/queries/client";
import { requireWorkspace } from "@/lib/workspace";
import { ClientsPageContent } from "@/components/clients/clients-page-content";

export default async function ClientsPage() {
  const { user, workspace } = await requireWorkspace();

  const clients = await getClients(workspace.id);

  return (
    <ApplicationShell
      user={{ name: user.name, email: user.email }}
      workspace={{
        name: workspace.name,
        slug: workspace.slug,
        logo: workspace.logo,
      }}
    >
      <PageContainer className="py-6 lg:py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Clients
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage your clients, their projects, invoices, and activity.
            </p>
          </div>

          <ClientsPageContent clients={clients} />
        </div>
      </PageContainer>
    </ApplicationShell>
  );
}
