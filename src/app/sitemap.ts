import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://ai.suhaib.dev/", priority: 1 }];
}
