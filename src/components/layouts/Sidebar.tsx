import { SidebarNav } from "./Sidebar-nav";

const primaryNavigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Clients",
    href: "/clients",
    icon: "clients",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: "projects",
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: "tasks",
  },
  {
    label: "Invoices",
    href: "/invoices",
    icon: "invoices",
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: "calendar",
  },
  {
    label: "Team",
    href: "/team",
    icon: "team",
  },
  {
    label: "Reports",
    href: "/reports",
    icon: "reports",
  },
];

const secondaryNavigation = [
  {
    label: "Settings",
    href: "/settings",
    icon: "settings",
  },
  {
    label: "Help & Support",
    href: "/help",
    icon: "help",
  },
];

interface SidebarProps {
  mobile?: boolean;
  workspace: {
    name: string;
    slug: string;
    logo: string | null;
  } | null;
}

export function Sidebar({ mobile = false, workspace }: SidebarProps) {
  const workspaceName = workspace?.name || "Workspace";

const workspaceInitials = workspaceName
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((word) => word[0])
  .join("")
  .toUpperCase();
  return (
    <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div
        className={`flex h-16 shrink-0 items-center border-b border-sidebar-border ${
          mobile
            ? "justify-start px-5"
            : "justify-center px-2 xl:justify-start xl:px-5"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
            <span className="text-sm font-bold text-sidebar-primary-foreground">
              C
            </span>
          </div>

          <span
            className={
              mobile
                ? "text-base font-semibold tracking-tight"
                : "hidden text-base font-semibold tracking-tight xl:inline"
            }
          >
            ClientFlow
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <SidebarNav
          items={primaryNavigation}
          mobile={mobile}
        />

        <div className="my-4 h-px bg-sidebar-border" />

        <SidebarNav
          items={secondaryNavigation}
          mobile={mobile}
        />
      </nav>

      {/* Workspace */}
      <div className="shrink-0 border-t border-sidebar-border p-3">
        <button
          type="button"
          title={workspace?.name || "Workspace"}
          className={`flex w-full items-center rounded-md p-2 text-left transition-colors hover:bg-sidebar-accent ${
            mobile
              ? "justify-start gap-3"
              : "justify-center xl:justify-start xl:gap-3"
          }`}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-xs font-semibold">
            {workspaceInitials}
          </div>

          <div
            className={
              mobile
                ? "min-w-0 flex-1"
                : "hidden min-w-0 flex-1 xl:block"
            }
          >
            <p className="truncate text-sm font-medium">
  {workspace?.name || "Workspace"}
</p>

          </div>

          <span
            className={
              mobile
                ? "text-sidebar-foreground/50"
                : "hidden text-sidebar-foreground/50 xl:inline"
            }
          >
            ⌄
          </span>
        </button>
      </div>
    </aside>
  );
}