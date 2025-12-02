"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname();
  
  // Extract locale from pathname if it exists
  const localeMatch = pathname?.match(/^\/(en|ar)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "en";
  const isArabic = locale === "ar";
  
  const content = {
    en: {
      title: "Page Not Found",
      description: "Sorry, the page you are looking for do not exist.",
      returnHome: "Return Home"
    },
    ar: {
      title: "الصفحة غير موجودة",
      description: "عذراً، الصفحة التي تبحث عنها مش موجودة",
      returnHome: "العودة للرئيسية"
    }
  };
  
  const t = content[locale as keyof typeof content];
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-light">
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: "72px", margin: "0", fontWeight: "bold" }}>404</h1>
          <h2 style={{ fontSize: "24px", margin: "20px 0" }}>{t.title}</h2>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
            {t.description}
          </p>
          <Link 
            href={`/${locale}`}
            style={{
              padding: "12px 24px",
              backgroundColor: "#0070f3",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px"
            }}
          >
            {t.returnHome}
          </Link>
        </div>
      </body>
    </html>
  );
}

export default NotFound;