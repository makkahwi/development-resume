import { appDesc, appTitle } from "@/consts/data";
import Footer from "@/layout/Footer";
import CtaSection from "@/sections/cta";

import "bootstrap/dist/css/bootstrap.min.css";
import LandingPopUp from "@/components/LandingPopUp";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Fragment } from "react";
import "./global.scss";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appTitle + " - " + appDesc,
  description: "The website of developer Suhaib Ahmad of Jordan.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={inter.className}>
        <main className="mx-0 mb-0 p-0 w-100 pb-5">{children}</main>

        {/* <LandingPopUp /> */}

        <CtaSection />
        <Footer />

        <Script
          async
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WM1J4NQTGT"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WM1J4NQTGT');
          `}
        </Script>
      </body>
    </html>
  );
}
