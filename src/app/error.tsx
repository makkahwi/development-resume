"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const pathname = usePathname();

  useEffect(() => {
    // Log to console for now; Sentry will capture in production
    console.error(error);
  }, [error]);

  const localeMatch = pathname?.match(/^\/(en|ar)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "en";
  const isArabic = locale === "ar";

  const content = {
    en: {
      title: "Something went wrong",
      description:
        "An unexpected error occurred. You can try again or return to the home page.",
      retry: "Try Again",
      returnHome: "Return Home",
    },
    ar: {
      title: "حدث خطأ غير متوقع",
      description:
        "حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى أو العودة للصفحة الرئيسية.",
      retry: "أعد المحاولة",
      returnHome: "العودة للرئيسية",
    },
  };

  const t = content[locale as keyof typeof content];
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-light">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "72px", margin: "0", fontWeight: "bold" }}>
            500
          </h1>
          <h2 style={{ fontSize: "24px", margin: "20px 0" }}>{t.title}</h2>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
            {t.description}
          </p>
          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={() => reset()}
              style={{
                padding: "12px 24px",
                backgroundColor: "#111",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            >
              {t.retry}
            </button>
            <Link
              href={`/${locale}`}
              style={{
                padding: "12px 24px",
                backgroundColor: "#0070f3",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            >
              {t.returnHome}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Error;
