import { notFound } from "next/navigation";

import { ApplicationShell } from "@/components/layouts/application-shell";
import { PageContainer } from "@/components/layouts/page-container";
import { getClientById } from "@/lib/queries/client";
import { requireWorkspace } from "@/lib/workspace";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientDetailsActions } from "@/components/clients/client-details-actions";

type ClientDetailsPageProps = {
  params: Promise<{ clientId: string }>;
};

export default async function ClientDetailsPage({
  params,
}: ClientDetailsPageProps) {
  const { clientId } = await params;
  const { user, workspace } = await requireWorkspace();

  const client = await getClientById(clientId, workspace.id);

  if (!client) {
    notFound();
  }

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
          <Link
            href="/clients"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Clients
          </Link>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Clients</p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {client.name}
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                {client.company || "Client profile"}
              </p>
            </div>

            <ClientDetailsActions
              client={{
                id: client.id,
                name: client.name,
                company: client.company,
                email: client.email,
                phone: client.phone,
                address: client.address,
                status: client.status,
              }}
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground">
              Contact Information
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="mt-1 text-sm text-foreground">
                  {client.email || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="mt-1 text-sm text-foreground">
                  {client.phone || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="mt-1 text-sm text-foreground">
                  {client.address || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="mt-1 text-sm text-foreground">
                  {client.status === "ACTIVE" ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Projects</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {client._count.projects}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Invoices</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {client._count.invoices}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </ApplicationShell>
  );
}
