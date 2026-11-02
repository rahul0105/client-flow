import "server-only";

import { prisma } from "@/lib/db/prisma";

/**
 * Returns clients belonging to a specific workspace.
 */
export async function getClients(workspaceId: string) {
  return prisma.client.findMany({
    where: {
      workspaceId,
    },
    select: {
      id: true,
      name: true,
      company: true,
      email: true,
      phone: true,
      address: true,
      status: true,
      createdAt: true,
      _count: {
        select: {
          projects: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Returns a single client belonging to a specific workspace.
 */
export async function getClientById(clientId: string, workspaceId: string) {
  return prisma.client.findFirst({
    where: {
      id: clientId,
      workspaceId,
    },
    select: {
      id: true,
      name: true,
      company: true,
      email: true,
      phone: true,
      address: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          projects: true,
          invoices: true,
        },
      },
    },
  });
}
