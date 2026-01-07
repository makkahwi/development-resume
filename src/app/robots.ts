import type { MetadataRoute } from "next";
import { brandConfig } from "@/brand/config";

const robots = (): MetadataRoute.Robots => {
  const base = brandConfig.appUrl.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
};

export default robots;
