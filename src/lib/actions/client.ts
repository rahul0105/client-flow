"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db/prisma";
import { clientSchema } from "@/lib/validation/client";
import { requireWorkspace } from "@/lib/workspace";

export async function createClient(input: unknown) {
  const result = clientSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: "Please check the information you entered.",
    };
  }

  const { workspace } = await requireWorkspace();

  try {
    const client = await prisma.client.create({
      data: {
        ...result.data,
        workspaceId: workspace.id,
      },
    });

    revalidatePath("/clients");

    return {
      success: true,
      clientId: client.id,
    };
  } catch {
    return {
      success: false,
      error: "Something went wrong while creating the client.",
    };
  }
}

export async function updateClient(clientId: string, input: unknown) {
  if (!clientId || typeof clientId !== "string") {
    return {
      success: false,
      error: "Invalid client.",
    };
  }

  const result = clientSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: "Please check the information you entered.",
    };
  }

  const { workspace } = await requireWorkspace();

  try {
    const updatedClient = await prisma.client.updateMany({
      where: {
        id: clientId,
        workspaceId: workspace.id,
      },
      data: result.data,
    });

    if (updatedClient.count === 0) {
      return {
        success: false,
        error: "Client not found or you don't have permission to update it.",
      };
    }

    revalidatePath("/clients");

    return {
      success: true,
      clientId,
    };
  } catch {
    return {
      success: false,
      error: "Something went wrong while updating the client.",
    };
  }
}

/**
 * Deletes a client belonging to the authenticated workspace.
 */
export async function deleteClient(clientId: string) {
  if (!clientId || typeof clientId !== "string") {
    return {
      success: false,
      error: "Invalid client.",
    };
  }
  const { workspace } = await requireWorkspace();

  try {
    // Verify that the client belongs to the current workspace.
    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
        workspaceId: workspace.id,
      },
      select: {
        id: true,
      },
    });

    if (!client) {
      return {
        success: false,
        error: "Client not found.",
      };
    }

    // Prevent deletion if related projects or invoices exist.
    const [projectCount, invoiceCount] = await Promise.all([
      prisma.project.count({
        where: {
          clientId,
          workspaceId: workspace.id,
        },
      }),
      prisma.invoice.count({
        where: {
          clientId,
          workspaceId: workspace.id,
        },
      }),
    ]);

    if (projectCount > 0 || invoiceCount > 0) {
      return {
        success: false,
        error:
          "This client has associated projects or invoices. Please remove those first.",
      };
    }

    await prisma.client.delete({
      where: {
        id: client.id,
      },
    });

    revalidatePath("/clients");
    revalidatePath(`/clients/${clientId}`);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Something went wrong while deleting the client.",
    };
  }
}
