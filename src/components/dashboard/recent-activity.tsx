
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  CreditCard,
  FolderPlus,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RecentActivityItem = {
  id: string;
  entityType: string;
  action: string;
  description: string;
  createdAt: Date;
  user: {
    name: string | null;
  } | null;
};

type RecentActivityProps = {
  data: RecentActivityItem[];
  timezone: string;
};

function getActivityIcon(entityType: string) {
  switch (entityType.toUpperCase()) {
    case "PROJECT":
      return FolderPlus;
    case "TASK":
      return CheckCircle2;
    case "INVOICE":
      return CreditCard;
    case "MEMBER":
    case "USER":
      return Users;
    default:
      return Activity;
  }
}

function formatRelativeTime(
  date: Date,
  timezone: string
) {
  const now = Date.now();
  const timestamp = new Date(date).getTime();
  const difference = timestamp - now;

  if (!Number.isFinite(timestamp)) {
    return "Date unavailable";
  }

  const minutes = Math.round(difference / 60000);
  const hours = Math.round(difference / 3600000);
  const days = Math.round(difference / 86400000);

  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  if (Math.abs(minutes) < 60) {
    return formatter.format(minutes, "minute");
  }

  if (Math.abs(hours) < 24) {
    return formatter.format(hours, "hour");
  }

  if (Math.abs(days) < 7) {
    return formatter.format(days, "day");
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: timezone,
  }).format(new Date(date));
}

export function RecentActivity({
  data,
  timezone,
}: RecentActivityProps) {
  return (
    <Card className="gap-0 border-border/80 py-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 pt-4 pb-3">
        <CardTitle className="text-base font-semibold">
          Recent Activity
        </CardTitle>

        <Link
          href="/activity"
          className="shrink-0 text-xs font-medium text-primary hover:underline"
        >
          View all →
        </Link>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {data.length === 0 ? (
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-foreground">
              No recent activity
            </p>

            <p className="max-w-xs text-xs text-muted-foreground">
              Workspace activity will appear here as you and
              your team work in ClientFlow.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {data.map((item) => {
              const Icon = getActivityIcon(item.entityType);

              return (
                <li
                  key={item.id}
                  className="flex items-start gap-3"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon
                      className="size-4"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm leading-5 text-foreground">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                      <span>
                        {item.user?.name ?? "Workspace member"}
                      </span>

                      <span aria-hidden="true">·</span>

                      <time dateTime={new Date(item.createdAt).toISOString()}>
                        {formatRelativeTime(
                          item.createdAt,
                          timezone
                        )}
                      </time>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
