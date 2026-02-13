"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { readConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const AnalyticsProvider = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  // Read consent on mount
  useEffect(() => {
    const consent = readConsent();
    setAnalyticsAllowed(!!consent.analytics);
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!analyticsAllowed || !GA_ID) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    if (typeof window.gtag === "function") {
      window.gtag("config", GA_ID, {
        page_path: url,
      });
    }
  }, [analyticsAllowed, pathname, searchParams]);

  if (!analyticsAllowed) {
    // Do not render any tracking scripts until consent granted
    return null;
  }

  return (
    <>
      {GA_ID && (
        <>
          {/* Global site tag (gtag.js) - Google Analytics */}
          <Script
            id="ga-script-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="ga-script-inline"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname
                });
              `,
            }}
          />
        </>
      )}

      {CLARITY_ID && (
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />
      )}
    </>
  );
};

export default AnalyticsProvider;
