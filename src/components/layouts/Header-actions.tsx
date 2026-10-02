"use client";

import {
  Bell,
  LogOut,
  Plus,
  Search,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderActionsProps {
  user: {
    name: string | null | undefined;
    email: string | null | undefined;
  };
}

function getInitials(
  name?: string | null,
  email?: string | null,
) {
  const value = name?.trim() || email?.trim() || "User";

  const parts = value.split(/\s+/);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return value.slice(0, 2).toUpperCase();
}

export function HeaderActions({ user }: HeaderActionsProps) {
  const initials = getInitials(user.name, user.email);

  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <div className="flex items-center gap-2">
      {/* Search */}
      <Button
        variant="ghost"
        size="icon"
        className="size-9 text-muted-foreground"
        aria-label="Search"
      >
        <Search className="size-4" />
      </Button>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="relative size-9 text-muted-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-4" />

        <span
          className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive"
          aria-hidden="true"
        />
      </Button>

      {/* Quick Create */}
      <Button className="hidden sm:inline-flex">
        <Plus className="size-4" />
        New
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 rounded-full"
              aria-label="Open user menu"
            />
          }
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56"
        >
          {/* User information */}
          <div className="px-2 py-2">
            <p className="text-sm font-medium">
              {user.name || "User"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user.email || "No email"}
            </p>
          </div>

          <DropdownMenuSeparator />

          {/* Profile */}
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Sign out */}
          <DropdownMenuItem
            variant="destructive"
            onClick={handleLogout}
          >
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}