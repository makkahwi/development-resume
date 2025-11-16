import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Suhaib Ahmad – Resume Website",
  description: "Senior full-stack developer, technical advisor, mentor and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For now we hard-code lang="en". When we add localization with [locale],
  // we will move this to a localized layout and toggle dir="rtl" for Arabic.
  return (
    <html lang="en">
      <body className="bg-light">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
