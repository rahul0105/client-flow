/**
 * Calculates percentage change between current and previous values.
 *
 * Returns:
 * - 0 when both values are zero.
 * - null when the previous value is zero but current is positive.
 * - A percentage otherwise.
 */
export function getPercentageChange(
  current: number,
  previous: number
): number | null {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }

  return ((current - previous) / previous) * 100;
}

/**
 * Formats a percentage change for dashboard display.
 */
export function formatPercentageChange(
  change: number | null
): string {
  if (change === null) {
    return "New";
  }

  const sign = change > 0 ? "+" : "";

  return `${sign}${change.toFixed(1)}%`;
}

/**
 * Formats a monetary amount using the workspace currency.
 */
export function formatCurrency(
  amount: number,
  currency = "INR"
): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Converts YYYY-MM into a readable month label.
 * Example: 2026-11 -> Nov 2026
 */
export function formatMonthLabel(month: string): string {
  const date = new Date(`${month}-01T00:00:00.000Z`);

  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}