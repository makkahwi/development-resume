import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
  // Adjust as you like; start small so you don't spam traces
  tracesSampleRate: 0.1, // 10% of requests for performance
  replaysSessionSampleRate: 0.0, // session replay off by default
  replaysOnErrorSampleRate: 1.0, // record sessions when an error happens
});
