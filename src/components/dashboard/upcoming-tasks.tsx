
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type UpcomingTask = {
  id: string;
  title: string;
  dueDate: Date | null;
  priority: string;
  project: {
    name: string;
  };
  assignee: {
    name: string | null;
  } | null;
};

type UpcomingTasksProps = {
  data: UpcomingTask[];
  timezone: string;
};

const PRIORITY_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  LOW: {
    label: "Low",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400",
  },
  MEDIUM: {
    label: "Medium",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400",
  },
  HIGH: {
    label: "High",
    className:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-400",
  },
  URGENT: {
    label: "Urgent",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
  },
};

function getDateKey(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function formatDueDate(
  dueDate: Date | null,
  timezone: string
) {
  if (!dueDate) return "Not set";

  const today = getDateKey(new Date(), timezone);
  const tomorrowDate = new Date(`${today}T00:00:00Z`);

  tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);

  const tomorrow = tomorrowDate.toISOString().slice(0, 10);
  const taskDate = getDateKey(dueDate, timezone);

  if (taskDate === today) return "Today";
  if (taskDate === tomorrow) return "Tomorrow";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: timezone,
  }).format(dueDate);
}

export function UpcomingTasks({
  data,
  timezone,
}: UpcomingTasksProps) {
  return (
    <Card className="gap-0 border-border/80 py-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 pt-4 pb-3">
        <CardTitle className="text-base font-semibold">
          Upcoming Tasks
        </CardTitle>

        <Link
          href="/tasks"
          className="shrink-0 text-xs font-medium text-primary hover:underline"
        >
          View all →
        </Link>
      </CardHeader>

      <CardContent className="px-0 pb-2">
        {data.length === 0 ? (
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 px-4 text-center">
            <p className="text-sm font-medium text-foreground">
              No upcoming tasks
            </p>

            <p className="max-w-xs text-xs text-muted-foreground">
              Incomplete tasks with upcoming due dates will
              appear here.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-xs">
              <thead>
                <tr className="border-y bg-muted/40 text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">
                    Task
                  </th>

                  <th className="px-3 py-2.5 font-medium">
                    Project
                  </th>

                  <th className="px-3 py-2.5 font-medium">
                    Due
                  </th>

                  <th className="px-4 py-2.5 font-medium">
                    Priority
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((task) => {
                  const priority =
                    PRIORITY_STYLES[task.priority] ?? {
                      label: task.priority,
                      className:
                        "border-muted bg-muted text-muted-foreground",
                    };

                  return (
                    <tr
                      key={task.id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="max-w-[180px] truncate px-4 py-3 font-medium text-foreground">
                        {task.title}
                      </td>

                      <td className="max-w-[150px] truncate px-3 py-3 text-muted-foreground">
                        {task.project.name}
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                        {formatDueDate(task.dueDate, timezone)}
                      </td>

                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={priority.className}
                        >
                          {priority.label}
                        </Badge>
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
