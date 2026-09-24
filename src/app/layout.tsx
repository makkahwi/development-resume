import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai.suhaib.dev"),
  title: "Makkahwi AI | Explore Suhaib Ahmad’s Work and Projects",
  description:
    "Explore Suhaib Ahmad’s public work, projects, technical skills, education, and interests. Makkahwi AI is a conversational guide to his experience.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Makkahwi AI | Explore Suhaib Ahmad",
    description:
      "A conversational guide to Suhaib Ahmad’s projects, development experience, and public interests.",
    url: "/",
    siteName: "Makkahwi AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Makkahwi AI | Explore Suhaib Ahmad",
    description: "Explore Suhaib Ahmad’s public work and projects.",
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
