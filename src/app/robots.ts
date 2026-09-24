import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/chat/"],
    },
    sitemap: "https://ai.suhaib.dev/sitemap.xml",
    host: "https://ai.suhaib.dev",
  };
}
