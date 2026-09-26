"use client";

import {
  Bell,
  Plus,
  Search,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function HeaderActions() {
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

      {/* User */}
      <Avatar className="size-8">
        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
          RC
        </AvatarFallback>
      </Avatar>
    </div>
  );
}