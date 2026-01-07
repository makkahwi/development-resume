import { brandConfig } from "@/brand/config";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const base = brandConfig.appUrl.replace(/\/+$/, "");

  const locales = ["en", "ar"] as const;
  const paths = [
    "",
    "/about",
    "/hands-on",
    "/hands-off",
    "/non-profit",
    "/blog",
  ];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    paths.forEach((path) => {
      const url = `${base}/${locale}${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    });
  });

  return entries;
};

export default sitemap;
