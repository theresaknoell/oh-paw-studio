import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: { globalNotFound: true },
  images: {
    // Produktbilder kommen direkt von Gumroad
    remotePatterns: [
      { protocol: "https", hostname: "public-files.gumroad.com" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
