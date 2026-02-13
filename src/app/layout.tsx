import { brandConfig } from "@/brand/config";

import type { Metadata } from "next";
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
  return children;
};

export default RootLayout;
