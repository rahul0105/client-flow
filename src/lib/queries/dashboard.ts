
import "server-only";

import { prisma } from "@/lib/db/prisma";
import {Prisma} from "../../../generated/prisma/client";
import { getMonthDateRange } from "@/lib/utils/date-ranges";

/**
 * Returns the total number of clients in a workspace.
 */
export async function getTotalClients(workspaceId: string) {
  return prisma.client.count({
    where: {
      workspaceId,
    },
  });
}

/**
 * Returns the number of active projects in a workspace.
 *
 * Active = Planning + In Progress + Review
 */
export async function getActiveProjects(workspaceId: string) {
  return prisma.project.count({
    where: {
      workspaceId,
      status: {
        in: ["PLANNING", "IN_PROGRESS", "REVIEW"],
      },
    },
  });
}

/**
 * Returns the number of pending tasks in a workspace.
 *
 * Pending = Todo + In Progress + Review
 */
export async function getPendingTasks(workspaceId: string) {
  return prisma.task.count({
    where: {
      workspaceId,
      status: {
        in: ["TODO", "IN_PROGRESS", "REVIEW"],
      },
    },
  });
}

/**
 * Returns total revenue from all paid invoices in a workspace.
 */
export async function getTotalRevenue(workspaceId: string) {
  const result = await prisma.invoice.aggregate({
    where: {
      workspaceId,
      status: "PAID",
    },
    _sum: {
      total: true,
    },
  });

  return result._sum.total ?? 0;
}

/**
 * Returns project counts grouped by status for a workspace.
 */
export async function getProjectStatusCounts(workspaceId: string) {
  return prisma.project.groupBy({
    by: ["status"],
    where: {
      workspaceId,
    },
    _count: {
      _all: true,
    },
  });
}

/**
 * Returns the next five incomplete tasks with upcoming due dates.
 */
export async function getUpcomingTasks(workspaceId: string) {
  return prisma.task.findMany({
    where: {
      workspaceId,
      status: {
        not: "COMPLETED",
      },
      dueDate: {
        gte: new Date(),
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    take: 5,
    include: {
      project: {
        select: {
          name: true,
        },
      },
      assignee: {
        select: {
          name: true,
        },
      },
    },
  });
}

/**
 * Returns the five most recently created projects in a workspace.
 */
export async function getRecentProjects(workspaceId: string) {
  return prisma.project.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      client: {
        select: {
          name: true,
          company: true,
        },
      },
    },
  });
}

/**
 * Returns the six most recent activity records in a workspace.
 */
export async function getRecentActivity(workspaceId: string) {
  return prisma.activity.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
}

/**
 * Returns the five most recently created invoices in a workspace.
 */
export async function getRecentInvoices(workspaceId: string) {
  return prisma.invoice.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      client: {
        select: {
          name: true,
          company: true,
        },
      },
    },
  });
}

/**
 * Returns paid invoice revenue grouped by month
 * for the current month and previous five months.
 *
 * Uses the workspace timezone for accurate month boundaries.
 * Invoices without paidAt are excluded.
 */
export async function getSixMonthRevenue(
  workspaceId: string,
  timezone: string
) {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now);

  const year = Number(
    parts.find((part) => part.type === "year")?.value
  );

  const currentMonth = Number(
    parts.find((part) => part.type === "month")?.value
  );

  const startMonth = currentMonth - 5;

  const startDate = new Date(
    Date.UTC(year, startMonth - 1, 1)
  );

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth() + index,
        1
      )
    );

    return date.toISOString().slice(0, 7);
  });

  const rows = await prisma.$queryRaw<
    Array<{ month: string; revenue: Prisma.Decimal }>
  >(Prisma.sql`
    SELECT
      TO_CHAR(
        DATE_TRUNC('month', "paidAt" AT TIME ZONE ${timezone}),
        'YYYY-MM'
      ) AS month,
      SUM(total) AS revenue
    FROM "Invoice"
    WHERE
      "workspaceId" = ${workspaceId}
      AND status = 'PAID'
      AND "paidAt" >= (
        DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE ${timezone})
        - INTERVAL '5 months'
      ) AT TIME ZONE ${timezone}
      AND "paidAt" < (
        DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE ${timezone})
        + INTERVAL '1 month'
      ) AT TIME ZONE ${timezone}
    GROUP BY 1
    ORDER BY 1 ASC
  `);

  const revenueByMonth = new Map(
    rows.map((row) => [
      row.month,
      Number(row.revenue),
    ])
  );

  return months.map((month) => ({
    month,
    revenue: revenueByMonth.get(month) ?? 0,
  }));
}

/**
 * Returns the number of clients created during a date range.
 */
export async function getClientsCreatedBetween(
  workspaceId: string,
  startDate: Date,
  endDate: Date
) {
  return prisma.client.count({
    where: {
      workspaceId,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
}

/**
 * Returns qualifying projects created during a date range.
 *
 * Qualifying = Planning + In Progress + Review
 */
export async function getActiveProjectsCreatedBetween(
  workspaceId: string,
  startDate: Date,
  endDate: Date
) {
  return prisma.project.count({
    where: {
      workspaceId,
      status: {
        in: ["PLANNING", "IN_PROGRESS", "REVIEW"],
      },
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
}

/**
 * Returns qualifying tasks created during a date range.
 *
 * Qualifying = Todo + In Progress + Review
 */
export async function getPendingTasksCreatedBetween(
  workspaceId: string,
  startDate: Date,
  endDate: Date
) {
  return prisma.task.count({
    where: {
      workspaceId,
      status: {
        in: ["TODO", "IN_PROGRESS", "REVIEW"],
      },
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
}

/**
 * Returns current and previous month comparison data
 * for dashboard KPIs.
 */
export async function getDashboardComparisons(
  workspaceId: string,
  timezone: string
) {
  const currentMonth = getMonthDateRange(timezone, 0);
  const previousMonth = getMonthDateRange(timezone, -1);

  const [
    clientsThisMonth,
    clientsLastMonth,
    projectsThisMonth,
    projectsLastMonth,
    tasksThisMonth,
    tasksLastMonth,
  ] = await Promise.all([
    getClientsCreatedBetween(
      workspaceId,
      currentMonth.startDate,
      currentMonth.endDate
    ),
    getClientsCreatedBetween(
      workspaceId,
      previousMonth.startDate,
      previousMonth.endDate
    ),
    getActiveProjectsCreatedBetween(
      workspaceId,
      currentMonth.startDate,
      currentMonth.endDate
    ),
    getActiveProjectsCreatedBetween(
      workspaceId,
      previousMonth.startDate,
      previousMonth.endDate
    ),
    getPendingTasksCreatedBetween(
      workspaceId,
      currentMonth.startDate,
      currentMonth.endDate
    ),
    getPendingTasksCreatedBetween(
      workspaceId,
      previousMonth.startDate,
      previousMonth.endDate
    ),
  ]);

  return {
    clients: {
      current: clientsThisMonth,
      previous: clientsLastMonth,
    },
    projects: {
      current: projectsThisMonth,
      previous: projectsLastMonth,
    },
    tasks: {
      current: tasksThisMonth,
      previous: tasksLastMonth,
    },
  };
}

/**
 * Fetches all dashboard data for an authenticated workspace.
 *
 * All queries are workspace-scoped and executed in parallel.
 */
export async function getDashboardData(
  workspaceId: string,
  timezone: string
) {
  const [
    totalClients,
    activeProjects,
    pendingTasks,
    totalRevenue,
    projectStatusCounts,
    upcomingTasks,
    recentProjects,
    recentActivity,
    recentInvoices,
    revenueOverview,
    comparisons,
  ] = await Promise.all([
    getTotalClients(workspaceId),
    getActiveProjects(workspaceId),
    getPendingTasks(workspaceId),
    getTotalRevenue(workspaceId),
    getProjectStatusCounts(workspaceId),
    getUpcomingTasks(workspaceId),
    getRecentProjects(workspaceId),
    getRecentActivity(workspaceId),
    getRecentInvoices(workspaceId),
    getSixMonthRevenue(workspaceId, timezone),
    getDashboardComparisons(workspaceId, timezone),
  ]);

  return {
    stats: {
      totalClients,
      activeProjects,
      pendingTasks,
      totalRevenue: Number(totalRevenue),
    },

    comparisons,

    projectStatusCounts: projectStatusCounts.map((item) => ({
      status: item.status,
      count: item._count._all,
    })),

    upcomingTasks,
    recentProjects,
    recentActivity,

    recentInvoices: recentInvoices.map((invoice) => ({
      ...invoice,
      subtotal: Number(invoice.subtotal),
      tax: Number(invoice.tax),
      discount: Number(invoice.discount),
      total: Number(invoice.total),
    })),

    revenueOverview,
  };
}