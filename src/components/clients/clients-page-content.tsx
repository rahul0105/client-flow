"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ClientsToolbar } from "@/components/clients/clients-toolbar";
import { ClientsTable } from "@/components/clients/clients-table";
import { ClientFormDialog } from "@/components/clients/client-form-dialog";
import type { getClients } from "@/lib/queries/client";
import { useRouter } from "next/navigation";
import { deleteClient } from "@/lib/actions/client";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Clients = Awaited<ReturnType<typeof getClients>>;
type Client = Clients[number];

type ClientsPageContentProps = {
  clients: Clients;
};

export function ClientsPageContent({ clients }: ClientsPageContentProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const handleDeleteClient = (clientId: string) => {
    const client = clients.find((item) => item.id === clientId);

    if (!client) return;

    setClientToDelete(client);
    setDeleteError("");
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!clientToDelete || isDeleting) return;

    setIsDeleting(true);
    setDeleteError("");

    try {
      const result = await deleteClient(clientToDelete.id);

      if (!result.success) {
        setDeleteError(result.error || "Failed to delete client.");
        return;
      }

      setDeleteDialogOpen(false);
      setClientToDelete(null);

      router.refresh();
    } catch {
      setDeleteError("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  function handleAddClient() {
    setSelectedClient(null);
    setDialogOpen(true);
  }

  function handleEditClient(client: Client) {
    setSelectedClient(client);
    setDialogOpen(true);
  }

  return (
    <>
      <ClientsToolbar onAddClient={handleAddClient} />

      {clients.length > 0 ? (
        <ClientsTable
          clients={clients}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
        />
      ) : (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-12 text-center">
          <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
              <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>

          <h2 className="text-base font-semibold text-foreground">
            No clients yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Add your first client to start managing projects, tasks and
            invoices.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={handleAddClient}>+ Add Client</Button>

            <Button variant="outline" disabled>
              Import Clients
            </Button>
          </div>
        </div>
      )}

      <ClientFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        client={selectedClient}
      />
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!isDeleting) {
            setDeleteDialogOpen(open);

            if (!open) {
              setClientToDelete(null);
              setDeleteError("");
            }
          }
        }}
      >
        <DialogContent className="sm:max-w-md p-6">
          {/* Warning icon */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
              <AlertTriangle
                className="size-6 text-red-600 dark:text-red-400"
                aria-hidden="true"
              />
            </div>

            <DialogHeader className="items-center gap-2 text-center">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Delete client?
              </DialogTitle>

              <DialogDescription className="text-sm leading-6">
                Are you sure you want to delete{" "}
                <span className="font-medium text-foreground">
                  {clientToDelete?.name}
                </span>
                ? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Error message */}
          {deleteError && (
            <p
              role="alert"
              className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {deleteError}
            </p>
          )}

          {/* Footer actions */}
          <DialogFooter className="-mx-6 -mb-6 rounded-b-xl border-t border-border bg-muted/30 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              disabled={isDeleting}
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={handleConfirmDelete}
            >
              {isDeleting ? "Deleting..." : "Delete Client"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
