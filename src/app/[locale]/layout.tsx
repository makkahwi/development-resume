// import AssistantWidget from "@/components/Chat";
import Footer from "@/layout/Footer";
import NavbarComp from "@/layout/Navbar";
import PageNavigator from "@/layout/PageNavigator";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Providers from "../providers";

const locales = ["en"] as const;
type Locale = (typeof locales)[number];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main className="chat-shell mx-0 mb-0 mt-5 w-100 px-0 py-5">
            <div className="chat-page">
              {/* Top navbar */}
              <NavbarComp />

              {/* Optional sticky side navigator (we can control per-page later) */}
              <PageNavigator />

              {/* Main content area */}
              <Providers>{children}</Providers>

              {/* CTA & footer could be here later when we port CtaSection */}
              <Footer locale={locale} />
            </div>
            {/* <AssistantWidget /> */}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
