"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ClientFormDialog } from "@/components/clients/client-form-dialog";

type EditableClient = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  status: "ACTIVE" | "INACTIVE";
};

type ClientDetailsActionsProps = {
  client: EditableClient;
};

export function ClientDetailsActions({ client }: ClientDetailsActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>
        <Pencil className="mr-2 size-4" />
        Edit Client
      </Button>

      <ClientFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        client={client}
      />
    </>
  );
}
