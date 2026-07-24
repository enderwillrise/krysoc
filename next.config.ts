import type { NextConfig } from "next";

// Static export for GitHub Pages. Locale detection happens client-side in
// public/index.html (proxy.ts cannot run on a static host).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
