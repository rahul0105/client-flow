"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createClient, updateClient } from "@/lib/actions/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type EditableClient = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  address?: string | null;
  status: "ACTIVE" | "INACTIVE";
};

type ClientFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: EditableClient | null;
};

export function ClientFormDialog({
  open,
  onOpenChange,
  client = null,
}: ClientFormDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isEditMode = Boolean(client);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && client) {
      setName(client.name);
      setCompany(client.company ?? "");
      setEmail(client.email ?? "");
      setPhone(client.phone ?? "");
      setAddress(client.address ?? "");
      setStatus(client.status);
      setError("");
    } else if (open && !client) {
      resetForm();
    }
  }, [open, client]);

  function resetForm() {
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setAddress("");
    setStatus("ACTIVE");
    setError("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = {
      name,
      company,
      email,
      phone,
      address,
      status,
    };

    startTransition(async () => {
      const result = client
        ? await updateClient(client.id, formData)
        : await createClient(formData);

      if (!result.success) {
        setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      resetForm();
      onOpenChange(false);
      router.refresh();
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && !isPending) {
      resetForm();
    }

    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Client" : "Add Client"}</DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update your client's information."
              : "Add a new client to your workspace. You can update these details later."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="client-name"
              className="text-sm font-medium text-foreground"
            >
              Client Name <span className="text-destructive">*</span>
            </label>

            <input
              id="client-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter client name"
              required
              maxLength={100}
              disabled={isPending}
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="client-company"
              className="text-sm font-medium text-foreground"
            >
              Company
            </label>

            <input
              id="client-company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Company name"
              maxLength={100}
              disabled={isPending}
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="client-email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>

              <input
                id="client-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                maxLength={254}
                disabled={isPending}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="client-phone"
                className="text-sm font-medium text-foreground"
              >
                Phone
              </label>

              <input
                id="client-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+91 98765 43210"
                maxLength={30}
                disabled={isPending}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="client-address"
              className="text-sm font-medium text-foreground"
            >
              Address
            </label>

            <textarea
              id="client-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Client address"
              rows={3}
              maxLength={500}
              disabled={isPending}
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="client-status"
              className="text-sm font-medium text-foreground"
            >
              Status
            </label>

            <select
              id="client-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as "ACTIVE" | "INACTIVE")
              }
              disabled={isPending}
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEditMode
                  ? "Saving..."
                  : "Creating..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
