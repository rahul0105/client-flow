import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { HeaderActions } from "./Header-actions";
import { MobileSidebar } from "./Mobile-sidebar";

interface ApplicationShellProps {
  children: ReactNode;

  user: {
    name: string | null | undefined;
    email: string | null | undefined;
  };

  workspace: {
  name: string;
  slug: string;
  logo: string | null;
} | null;
}

export function ApplicationShell({
  children,
  user,
  workspace,
}: ApplicationShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col lg:w-16 xl:w-64">
        <Sidebar workspace={workspace} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="h-16 shrink-0 border-b border-border bg-background">
          <div className="flex h-full items-center justify-between px-4 sm:px-5 lg:px-6 xl:px-8">
            <MobileSidebar workspace={workspace} />

            <HeaderActions user={user} />
          </div>
        </header>

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}