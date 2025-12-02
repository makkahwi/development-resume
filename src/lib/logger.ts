import * as Sentry from "@sentry/nextjs";

export const reportError = (err: unknown, ctx: Record<string, any> = {}) => {
  Sentry.captureException(err, { extra: ctx });
};
