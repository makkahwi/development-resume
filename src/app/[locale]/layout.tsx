import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Providers from "../providers";

const locales = ["en", "ar"] as const;
type Locale = (typeof locales)[number];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const LocaleLayout = async({ children, params }: Props) => {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-light">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleLayout