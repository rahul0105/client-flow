"use client";

import { useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import {
  MoreHorizontal,
  UserRound,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

type ClientRecord = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
  _count: {
    projects: number;
  };
};

type ClientsTableProps = {
  clients: ClientRecord[];
  onEditClient: (client: ClientsTableProps["clients"][number]) => void;
  onDeleteClient: (clientId: string) => void;
};

const PAGE_SIZE = 10;
const MENU_WIDTH = 176;
const MENU_HEIGHT = 208;

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function ClientsTable({
  clients,
  onEditClient,
  onDeleteClient,
}: ClientsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const router = useRouter();

  function closeMenu() {
    setOpenMenuId(null);
    setMenuPosition(null);
  }

  function handleMenuToggle(
    event: MouseEvent<HTMLButtonElement>,
    clientId: string,
  ) {
    if (openMenuId === clientId) {
      closeMenu();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const preferredTop = rect.bottom + 8;

    const top =
      preferredTop + MENU_HEIGHT > window.innerHeight
        ? Math.max(8, rect.top - MENU_HEIGHT - 8)
        : preferredTop;

    const left = Math.min(
      Math.max(8, rect.right - MENU_WIDTH),
      window.innerWidth - MENU_WIDTH - 8,
    );

    setMenuPosition({ top, left });
    setOpenMenuId(clientId);
  }

  const totalClients = clients.length;
  const totalPages = Math.max(1, Math.ceil(totalClients / PAGE_SIZE));

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const visibleClients = clients.slice(startIndex, startIndex + PAGE_SIZE);

  if (totalClients === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-10 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UserRound className="size-6" />
        </div>

        <h2 className="text-base font-semibold text-foreground">
          No clients yet
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Add your first client to start managing projects, tasks and invoices.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="border-b border-border bg-muted/30">
            <tr className="text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Projects</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {visibleClients.map((client) => (
              <tr
                key={client.id}
                className="transition-colors hover:bg-muted/20"
              >
                {/* Client Name and Avatar */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {getInitials(client.name)}
                    </div>

                    <span className="font-medium text-foreground">
                      {client.name}
                    </span>
                  </div>
                </td>

                {/* Company */}
                <td className="px-4 py-3 text-muted-foreground">
                  {client.company || "—"}
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-muted-foreground">
                  {client.email || "—"}
                </td>

                {/* Phone */}
                <td className="px-4 py-3 text-muted-foreground">
                  {client.phone || "—"}
                </td>

                {/* Projects */}
                <td className="px-4 py-3 text-muted-foreground">
                  {client._count.projects}{" "}
                  {client._count.projects === 1 ? "project" : "projects"}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      client.status === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {client.status === "ACTIVE" ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Created Date */}
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {formatDate(client.createdAt)}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={(event) => handleMenuToggle(event, client.id)}
                    className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={`Actions for ${client.name}`}
                    aria-expanded={openMenuId === client.id}
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet and Mobile Cards */}
      <div className="grid gap-3 p-3 lg:hidden">
        {visibleClients.map((client) => (
          <div
            key={client.id}
            className="rounded-lg border border-border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {getInitials(client.name)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {client.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {client.company || "No company"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(event) => handleMenuToggle(event, client.id)}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                aria-label={`Actions for ${client.name}`}
                aria-expanded={openMenuId === client.id}
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-primary">
                {client._count.projects}{" "}
                {client._count.projects === 1 ? "project" : "projects"}
              </span>

              <span
                className={`rounded-full px-2 py-1 font-medium ${
                  client.status === "ACTIVE"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {client.status === "ACTIVE" ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="mt-3 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
              <p className="break-all">{client.email || "No email"}</p>
              <p>{client.phone || "No phone"}</p>
              <p>{formatDate(client.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Actions Menu - Portal */}
      {openMenuId && menuPosition && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed z-[100] w-44 rounded-lg border border-border bg-card p-1 text-left shadow-lg"
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
              }}
            >
              {[
                "View Client",
                "Edit Client",
                "Create Project",
                "Create Invoice",
              ].map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => {
                    if (action === "Edit Client") {
                      const selectedClient = clients.find(
                        (client) => client.id === openMenuId,
                      );

                      if (selectedClient) {
                        onEditClient(selectedClient);
                      }
                    }

                    if (action === "View Client" && openMenuId) {
                      router.push(`/clients/${openMenuId}`);
                    }

                    closeMenu();
                  }}
                  className="w-full rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                >
                  {action}
                </button>
              ))}

              <div className="my-1 border-t border-border" />

              <button
                type="button"
                onClick={() => {
                  if (openMenuId) {
                    onDeleteClient(openMenuId);
                  }

                  closeMenu();
                }}
                className="w-full rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
              >
                Delete Client
              </button>
            </div>,
            document.body,
          )
        : null}

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {startIndex + 1}–
          {Math.min(startIndex + PAGE_SIZE, totalClients)} of {totalClients}{" "}
          clients
        </p>

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2 text-xs hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-3.5" />
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(0, 5)
            .map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`size-8 rounded-md text-xs font-medium ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2 text-xs hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
