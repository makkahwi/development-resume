import "server-only";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const experienceDirectory = join(process.cwd(), "knowledge-base/knowledge/professional/experience");

function field(markdown: string, name: "start" | "end"): string | null {
  return markdown.match(new RegExp(`^${name}: "([^"]+)"`, "m"))?.[1] ?? null;
}

/** Counts distinct calendar months covered by developer roles; overlapping roles count once. */
export function getDeveloperExperienceMonths(asOf = new Date()): number {
  const latest = new Date(Date.UTC(asOf.getUTCFullYear(), asOf.getUTCMonth(), asOf.getUTCDate()));
  const months = new Set<string>();

  for (const filename of readdirSync(experienceDirectory)) {
    if (!filename.startsWith("job-developer-") || !filename.endsWith(".md")) continue;
    const markdown = readFileSync(join(experienceDirectory, filename), "utf8");
    const startValue = field(markdown, "start");
    const endValue = field(markdown, "end");
    if (!startValue || !endValue) continue;
    const start = new Date(`${startValue}T00:00:00Z`);
    const end = endValue === "current" || endValue === "present"
      ? latest
      : new Date(`${endValue}T00:00:00Z`);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) continue;
    const last = end < latest ? end : latest;
    for (let year = start.getUTCFullYear(), month = start.getUTCMonth();
      year < last.getUTCFullYear() || (year === last.getUTCFullYear() && month <= last.getUTCMonth());
      month += 1) {
      if (month > 11) { year += 1; month = 0; }
      months.add(`${year}-${month}`);
    }
  }
  return months.size;
}
