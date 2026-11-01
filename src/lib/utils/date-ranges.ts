/**
 * Converts a local date and time in a timezone into a UTC Date.
 */
function zonedDateTimeToUtc(
  year: number,
  month: number,
  day: number,
  timezone: string
): Date {
  const targetUtc = Date.UTC(year, month - 1, day);

  let result = targetUtc;

  for (let i = 0; i < 3; i++) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date(result));

    const values = Object.fromEntries(
      parts.map((part) => [part.type, part.value])
    );

    const representedUtc = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second)
    );

    result += targetUtc - representedUtc;
  }

  return new Date(result);
}

/**
 * Returns the start and end of a calendar month
 * in the specified workspace timezone.
 *
 * monthOffset:
 *  0 = current month
 * -1 = previous month
 * -2 = two months ago
 */
export function getMonthDateRange(
  timezone: string,
  monthOffset = 0
) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());

  const year = Number(
    parts.find((part) => part.type === "year")?.value
  );

  const month = Number(
    parts.find((part) => part.type === "month")?.value
  );

  const targetMonth = new Date(
    Date.UTC(year, month - 1 + monthOffset, 1)
  );

  const nextMonth = new Date(
    Date.UTC(
      targetMonth.getUTCFullYear(),
      targetMonth.getUTCMonth() + 1,
      1
    )
  );

  return {
    startDate: zonedDateTimeToUtc(
      targetMonth.getUTCFullYear(),
      targetMonth.getUTCMonth() + 1,
      1,
      timezone
    ),
    endDate: zonedDateTimeToUtc(
      nextMonth.getUTCFullYear(),
      nextMonth.getUTCMonth() + 1,
      1,
      timezone
    ),
  };
}