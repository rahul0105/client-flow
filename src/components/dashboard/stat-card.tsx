
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number | null;
  description?: string;
  showChange?: boolean;
  inverseTrend?: boolean;
};

export function StatCard({
  title,
  value,
  icon: Icon,
  change = null,
  description = "vs last month",
  showChange = true,
  inverseTrend = false,
}: StatCardProps) {
  const isPositive = change !== null && change > 0;
  const isNegative = change !== null && change < 0;
  const isNeutral = change === 0;

  const isGood = inverseTrend ? isNegative : isPositive;
  const isBad = inverseTrend ? isPositive : isNegative;

  const changeLabel =
  change === null
    ? "New"
    : isNeutral
      ? "No change"
      : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;

  const badgeClass = isGood
    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
    : isBad
      ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
      : "border-muted bg-muted/50 text-muted-foreground";

  return (
    <Card className="gap-0 border-border/80 py-0 shadow-none">
      <CardContent className="p-3 sm:p-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              {value}
            </p>
          </div>

          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-[18px]" aria-hidden="true" />
          </div>
        </div>

        {showChange && (
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Badge variant="outline" className={badgeClass}>
              {isPositive ? (
                <ArrowUpRight className="size-3" />
              ) : isNegative ? (
                <ArrowDownRight className="size-3" />
              ) : (
                <Minus className="size-3" />
              )}

              {changeLabel}
            </Badge>

            <span className="hidden text-xs text-muted-foreground sm:inline">
              {description}
            </span>
          </div>
        )}

        {!showChange && description && (
          <p className="mt-2 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
