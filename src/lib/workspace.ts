import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

export async function getUserWorkspace(userId: string) {
  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId,
    },
    include: {
      workspace: true,
    },
  });

  return membership?.workspace ?? null;
}

export async function requireWorkspace() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId: session.user.id,
    },
    include: {
      workspace: true,
    },
  });

  if (!membership) {
    throw new Error("No workspace found for this user.");
  }

  return {
    user: session.user,
    workspace: membership.workspace,
    role: membership.role,
  };
}