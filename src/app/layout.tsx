import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai.suhaib.dev"),
  title: "Makkahwi AI — A conversational interface to Suhaib",
  description: "Explore Suhaib Ahmad’s public work, projects, and experience through conversation.",
  openGraph: {
    title: "Makkahwi AI",
    description: "A conversational interface to Suhaib Ahmad.",
    url: "https://ai.suhaib.dev",
    siteName: "Makkahwi AI",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var theme=localStorage.getItem("makkahwi_theme");document.documentElement.dataset.theme=theme==="dark"?"dark":"light"}catch{document.documentElement.dataset.theme="light"}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
