import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ar"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Fallback to 'en' if someone hits an unknown locale
  const resolvedLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";

  return {
    // Load messages from /messages/{locale}.json
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
