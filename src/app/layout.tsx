import { brandConfig } from "@/brand/config";

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${brandConfig.siteName} – ${brandConfig.siteTagline}`,
    template: `%s | ${brandConfig.siteName}`,
  },
  description: brandConfig.siteDescription,
  metadataBase: new URL(brandConfig.appUrl),
  alternates: {
    canonical: brandConfig.appUrl,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}

      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-WB2XN091EX"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WB2XN091EX');
        `}
      </Script>

      <Script id="clarity-tag" strategy="afterInteractive">
        {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vbkug8drim");
          `}
      </Script>
    </>
  );
};

export default RootLayout;
