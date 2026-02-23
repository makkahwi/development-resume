"use client";

import AnalyticsProvider from "@/components/AnalyticsProvider";
import ConsentBanner from "@/components/ConsentBanner";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
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
};

export default Providers;
