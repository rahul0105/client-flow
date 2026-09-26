"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db/prisma";
import { registerSchema } from "@/lib/validation/auth";
import { createSlug } from "@/lib/utils";

export async function registerUser(input: unknown) {
  const result = registerSchema.safeParse(input);
  

  if (!result.success) {
    return {
      success: false,
      error: "Please check the information you entered.",
    };
  }

  const { name, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      error: "An account with this email already exists.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.$transaction(async (tx) => {
        
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      });

      const workspaceSlug = `${createSlug(name)}-workspace-${newUser.id.slice(-8)}`;

      const workspace = await tx.workspace.create({
        data: {
          name: `${name}'s Workspace`,
          slug: workspaceSlug,
        },
      });

      await tx.workspaceMember.create({
        data: {
          userId: newUser.id,
          workspaceId: workspace.id,
          role: "OWNER",
        },
      });

      return newUser;
    });

    return {
      success: true,
      userId: user.id,
    };
  } catch {
    return {
      success: false,
      error: "Something went wrong while creating your account.",
    };
  }
}