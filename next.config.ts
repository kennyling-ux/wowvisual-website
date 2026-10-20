import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  devIndicators: false,
  images: {
    // YouTube thumbnails for the work grid + video modal facade (§7.2)
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // The persistent Turbopack cache served stale globals.css output in this
    // project (path contains "[03]"/"[01]"), so compile CSS fresh every run.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
  partialPrefetching: true,
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
