
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type RecentInvoice = {
  id: string;
  number: string;
  total: number;
  status: string;
  dueDate: Date;
  client: {
    name: string;
    company: string | null;
  };
};

type RecentInvoicesProps = {
  data: RecentInvoice[];
  currency: string;
  timezone: string;
};

const STATUS_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  DRAFT: {
    label: "Draft",
    className: "border-slate-200 bg-slate-50 text-slate-700",
  },
  SENT: {
    label: "Sent",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  PAID: {
    label: "Paid",
    className: "border-green-200 bg-green-50 text-green-700",
  },
  PENDING: {
    label: "Pending",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  OVERDUE: {
    label: "Overdue",
    className: "border-red-200 bg-red-50 text-red-700",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "border-slate-200 bg-slate-50 text-slate-600",
  },
};

function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return amount.toLocaleString("en-IN");
  }
}

function formatDueDate(date: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: timezone,
  }).format(new Date(date));
}

export function RecentInvoices({
  data,
  currency,
  timezone,
}: RecentInvoicesProps) {
  return (
    <Card className="gap-0 border-border/80 py-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 pt-4 pb-3">
        <CardTitle className="text-base font-semibold">
          Recent Invoices
        </CardTitle>

        <Link
          href="/invoices"
          className="shrink-0 text-xs font-medium text-primary hover:underline"
        >
          View all →
        </Link>
      </CardHeader>

      <CardContent className="px-0 pb-2">
        {data.length === 0 ? (
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 px-4 text-center">
            <p className="text-sm font-medium text-foreground">
              No invoices yet
            </p>

            <p className="max-w-xs text-xs text-muted-foreground">
              Your recently created invoices will appear here.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead>
                <tr className="border-y bg-muted/40 text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">
                    Invoice
                  </th>

                  <th className="px-3 py-2.5 font-medium">
                    Client
                  </th>

                  <th className="px-3 py-2.5 font-medium">
                    Amount
                  </th>

                  <th className="px-3 py-2.5 font-medium">
                    Status
                  </th>

                  <th className="px-4 py-2.5 font-medium">
                    Due date
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((invoice) => {
                  const status =
                    STATUS_STYLES[invoice.status] ?? {
                      label: invoice.status,
                      className:
                        "border-muted bg-muted text-muted-foreground",
                    };

                  return (
                    <tr
                      key={invoice.id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground">
                        {invoice.number}
                      </td>

                      <td className="max-w-[150px] truncate px-3 py-3 text-muted-foreground">
                        {invoice.client.company ||
                          invoice.client.name}
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                        {formatCurrency(invoice.total, currency)}
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
                        {formatDueDate(
                          invoice.dueDate,
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
