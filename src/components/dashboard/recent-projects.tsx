
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type RecentProject = {
  id: string;
  name: string;
  progress: number;
  status: string;
  deadline: Date | null;
  client: {
    name: string;
    company: string | null;
  };
};

type RecentProjectsProps = {
  data: RecentProject[];
  timezone: string;
};

const STATUS_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  PLANNING: {
    label: "Planning",
    className: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-400",
  },
  REVIEW: {
    label: "Review",
    className: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400",
  },
  COMPLETED: {
    label: "Completed",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400",
  },
  ON_HOLD: {
    label: "On Hold",
    className: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400",
  },
};

function formatDeadline(
  deadline: Date | null,
  timezone: string
) {
  if (!deadline) return "Not set";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: timezone,
  }).format(deadline);
}

export function RecentProjects({
  data,
  timezone,
}: RecentProjectsProps) {
  return (
    <Card className="gap-0 border-border/80 py-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 pt-4 pb-3">
        <CardTitle className="text-base font-semibold">
          Recent Projects
        </CardTitle>

        <Link
          href="/projects"
          className="shrink-0 text-xs font-medium text-primary hover:underline"
        >
          View all →
        </Link>
      </CardHeader>

      <CardContent className="px-0 pb-2">
        {data.length === 0 ? (
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 px-4 text-center">
            <p className="text-sm font-medium text-foreground">
              No projects yet
            </p>

            <p className="max-w-xs text-xs text-muted-foreground">
              Your recently created projects will appear here.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-xs">
              <thead>
                <tr className="border-y bg-muted/40 text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">
                    Project
                  </th>
                  <th className="px-3 py-2.5 font-medium">
                    Client
                  </th>
                  <th className="px-3 py-2.5 font-medium">
                    Progress
                  </th>
                  <th className="px-3 py-2.5 font-medium">
                    Status
                  </th>
                  <th className="px-4 py-2.5 font-medium">
                    Deadline
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((project) => {
                  const status =
                    STATUS_STYLES[project.status] ?? {
                      label: project.status,
                      className: "border-muted bg-muted text-muted-foreground",
                    };

                  return (
                    <tr
                      key={project.id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="max-w-[180px] truncate px-4 py-3 font-medium text-foreground">
                        {project.name}
                      </td>

                      <td className="max-w-[150px] truncate px-3 py-3 text-muted-foreground">
                        {project.client.company ||
                          project.client.name}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex min-w-[105px] items-center gap-2">
                          <div
                            className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                            role="progressbar"
                            aria-label={`${project.name} progress`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={project.progress}
                          >
                            <div
                              className="h-full rounded-full bg-emerald-500"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(0, project.progress)
                                )}%`,
                              }}
                            />
                          </div>

                          <span className="tabular-nums text-muted-foreground">
                            {project.progress}%
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        <Badge
                          variant="outline"
                          className={status.className}
                        >
                          {status.label}
                        </Badge>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {formatDeadline(
                          project.deadline,
                          timezone
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
