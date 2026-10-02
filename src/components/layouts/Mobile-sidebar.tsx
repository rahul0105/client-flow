"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Sidebar } from "./Sidebar";

interface MobileSidebarProps {
  workspace: {
    name: string;
    slug: string;
    logo: string | null;
  } | null;
}

export function MobileSidebar({
  workspace,
}: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-9 lg:hidden"
            aria-label="Open navigation"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 p-0"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>ClientFlow navigation</SheetTitle>
        </SheetHeader>

        <Sidebar
          mobile
          workspace={workspace}
        />
      </SheetContent>
    </Sheet>
  );
}