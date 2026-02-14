/**
 * Parse a date string in YYYY-MM-DD format
 */
export const parseDate = (dateString: string): Date | null => {
  if (!dateString || dateString === "current" || dateString === "present") {
    return null;
  }
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Format a date string (YYYY-MM-DD) to "Month Year" format
 * @example formatMonthYear("2025-10-01") => "Oct 2025"
 */
export const formatMonthYear = (dateString: string): string => {
  const date = parseDate(dateString);
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
};

/**
 * Check if a date string represents "current" or ongoing status
 */
export const isCurrent = (dateString: string): boolean =>
  dateString === "current" || dateString === "present";

/**
 * Calculate the number of months between two dates
 * If end date is "current" or "present", uses today's date
 * @example periodCalculator("2020-01-15", "2020-12-31") => 11
 */
export const periodCalculator = (startStr: string, endStr: string): number => {
  const startDate = parseDate(startStr);
  if (!startDate) return 0;

  let endDate: Date;
  if (isCurrent(endStr)) {
    endDate = new Date();
  } else {
    const parsed = parseDate(endStr);
    if (!parsed) return 0;
    endDate = parsed;
  }

  // Calculate difference in months
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthDiff = endDate.getMonth() - startDate.getMonth();

  return Math.max(0, yearDiff * 12 + monthDiff + 1);
};

/**
 * Format a period with start and end dates
 * @example formatPeriod("2025-10-01", "current", "Present") => "Oct 2025 - Present"
 * @example formatPeriod("2020-01-15", "2020-12-31", "Present") => "Jan 2020 - Dec 2020"
 * @param presentLabel - The label to use for current/present dates (default: "Present")
 */
export const formatPeriod = (
  startStr: string,
  endStr: string,
  presentLabel: string = "Present",
): string => {
  const startFormatted = formatMonthYear(startStr);
  const endFormatted = isCurrent(endStr)
    ? presentLabel
    : formatMonthYear(endStr);

  if (!startFormatted) return "";

  return `${startFormatted} - ${endFormatted}`;
};

/**
 * Format a period with duration in months
 * @example formatPeriodWithDuration("2025-10-01", "current", "Present", "ongoing", "month", "months")
 *   => "Oct 2025 - Present (ongoing)"
 * @example formatPeriodWithDuration("2020-01-15", "2020-12-31", "Present", "ongoing", "month", "months")
 *   => "Jan 2020 - Dec 2020 (12 months)"
 * @param presentLabel - The label to use for current/present dates (default: "Present")
 * @param ongoingLabel - The label for ongoing periods (default: "ongoing")
 * @param monthLabel - The singular form of months (default: "month")
 * @param monthsPluralLabel - The plural form of months (default: "months")
 */
export const formatPeriodWithDuration = (
  startStr: string,
  endStr: string,
  presentLabel: string = "Present",
  ongoingLabel: string = "ongoing",
  monthLabel: string = "month",
  monthsPluralLabel: string = "months",
): string => {
  const period = formatPeriod(startStr, endStr, presentLabel);
  if (!period) return "";

  const months = periodCalculator(startStr, endStr);
  const durationText = isCurrent(endStr)
    ? ongoingLabel
    : `${months} ${months !== 1 ? monthsPluralLabel : monthLabel}`;

  return `${period} (${durationText})`;
};

/**
 * Calculate total months across multiple periods
 * Useful for jobs with multiple non-consecutive periods
 */
export const calculateTotalPeriodMonths = (
  periods: Array<{ start: string; end: string }>,
): number => {
  return periods.reduce((total, { start, end }) => {
    return total + periodCalculator(start, end);
  }, 0);
};
