import * as Sentry from "@sentry/nextjs";

export const reportError = (
  err: unknown,
  ctx: Record<string, unknown> = {},
) => {
  Sentry.captureException(err, { extra: ctx });
};
