"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  CircleHelp,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  clients: Users,
  projects: FolderKanban,
  tasks: CheckSquare,
  invoices: FileText,
  calendar: CalendarDays,
  team: Users,
  reports: BarChart3,
  settings: Settings,
  help: CircleHelp,
};

interface SidebarNavItem {
  label: string;
  href: string;
  icon: string;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  mobile?: boolean;
}

export function SidebarNav({
  items,
  mobile = false,
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = icons[item.icon];

        const isActive =
          pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            title={mobile ? undefined : item.label}
            className={`flex h-9 items-center rounded-md text-sm font-medium transition-colors ${
              mobile
                ? "w-full justify-start gap-3 px-3"
                : "justify-center xl:w-full xl:justify-start xl:gap-3 xl:px-3"
            } ${
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Icon
              className="size-4 shrink-0"
              aria-hidden="true"
            />

            <span
              className={
                mobile
                  ? "inline"
                  : "hidden xl:inline"
              }
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}