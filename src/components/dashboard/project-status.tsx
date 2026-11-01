
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectStatusItem = {
  status: string;
  count: number;
};

type ProjectStatusProps = {
  data: ProjectStatusItem[];
};

const PROJECT_STATUSES = [
  {
    status: "PLANNING",
    label: "Planning",
    color: "bg-blue-500",
  },
  {
    status: "IN_PROGRESS",
    label: "In Progress",
    color: "bg-indigo-500",
  },
  {
    status: "REVIEW",
    label: "Review",
    color: "bg-amber-500",
  },
  {
    status: "COMPLETED",
    label: "Completed",
    color: "bg-emerald-500",
  },
  {
    status: "ON_HOLD",
    label: "On Hold",
    color: "bg-rose-500",
  },
  // {
  //   status: "CANCELLED",
  //   label: "Cancelled",
  //   color: "bg-slate-400",
  // },
] as const;

export function ProjectStatus({ data }: ProjectStatusProps) {
  const statusCounts = new Map(
    data.map((item) => [item.status, item.count])
  );

const totalProjects = PROJECT_STATUSES.reduce(
  (total, item) => total + (statusCounts.get(item.status) ?? 0),
  0
);

  const statuses = PROJECT_STATUSES.map((item) => {
    const count = statusCounts.get(item.status) ?? 0;

    const percentage =
      totalProjects > 0
        ? (count / totalProjects) * 100
        : 0;

    return {
      ...item,
      count,
      percentage,
    };
  });

  return (
    <Card className="gap-0 border-border/80 py-0 shadow-none">
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-base font-semibold">
          Project Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-4 pt-2 pb-4">
        {totalProjects === 0 ? (
          <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-foreground">
              No projects yet
            </p>

            <p className="max-w-xs text-xs text-muted-foreground">
              Your project status breakdown will appear here
              when you create projects.
            </p>
          </div>
        ) : (
          statuses.map((item) => (
            <div
              key={item.status}
              className="grid grid-cols-[78px_minmax(0,1fr)_24px_36px] items-center gap-2 sm:grid-cols-[82px_minmax(0,1fr)_28px_38px]"
            >
              <span className="truncate text-xs font-medium text-foreground">
                {item.label}
              </span>

              <div
                className="h-2.5 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-label={`${item.label} projects`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(item.percentage)}
              >
                <div
                  className={`h-full rounded-full transition-all ${item.color}`}
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>

              <span className="text-right text-xs tabular-nums text-foreground">
                {item.count}
              </span>

              <span className="text-right text-xs tabular-nums text-muted-foreground">
                {Math.round(item.percentage)}%
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
