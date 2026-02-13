import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  webpack: (config, { dev }) => {
    // Disable source maps in development to avoid malformed source map errors
    if (dev) {
      config.devtool = false;
      // Suppress source map warnings
      config.ignoreWarnings = [
        /Failed to parse source map/,
        /Critical dependency/,
      ];
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
