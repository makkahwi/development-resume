"use client";

import React from "react";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import ConsentBanner from "@/components/ConsentBanner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Analytics & session replay (GA4 + Clarity) */}
      <AnalyticsProvider />

      {/* App content */}
      {children}

      {/* Cookie consent banner */}
      <ConsentBanner />
    </>
  );
}
