import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ar"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = "en";
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
