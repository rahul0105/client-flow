
"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  formatCurrency,
  formatMonthLabel,
} from "@/lib/utils/dashboard-formatters";

type RevenueData = {
  month: string;
  revenue: number;
};

type RevenueOverviewProps = {
  data: RevenueData[];
  currency: string;
};

export function RevenueOverview({
  data,
  currency,
}: RevenueOverviewProps) {
  const hasRevenue = data.some((item) => item.revenue > 0);

  const chartData = data.map((item) => ({
    ...item,
    monthLabel: formatMonthLabel(item.month),
  }));

  return (
    <Card className="gap-0 border-border/80 py-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-3 px-4 pt-4 pb-2">
        <CardTitle className="text-base font-semibold">
          Revenue Overview
        </CardTitle>

        <span className="rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground">
          Last 6 months
        </span>
      </CardHeader>

      <CardContent className="px-2 pb-4 pt-2 sm:px-4">
        {!hasRevenue ? (
          <div className="flex h-[160px] flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-foreground">
              No revenue recorded yet
            </p>

            <p className="max-w-xs text-xs text-muted-foreground">
              Revenue will appear here when you record payments
              against your invoices.
            </p>
          </div>
        ) : (
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 12,
                  right: 12,
                  left: 8,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#4F46E5"
                      stopOpacity={0.22}
                    />

                    <stop
                      offset="95%"
                      stopColor="#4F46E5"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="monthLabel"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  tickMargin={10}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickFormatter={(value: number) =>
                    new Intl.NumberFormat("en-IN", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                      style: "currency",
                      currency,
                    }).format(value)
                  }
                  width={65}
                />

                <Tooltip
                  cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
                  formatter={(value) => [
                    formatCurrency(Number(value), currency),
                    "Revenue",
                  ]}
                  labelFormatter={(label) => String(label)}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--card)",
                    color: "var(--card-foreground)",
                    fontSize: "12px",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  activeDot={{
                    r: 5,
                    fill: "#4F46E5",
                    stroke: "var(--card)",
                    strokeWidth: 2,
                  }}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
