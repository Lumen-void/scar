import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "../../docs",
  basePath: "/scar",
  assetPrefix: "/scar/",
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  transpilePackages: ["@scar/domain", "@scar/ui", "@scar/db"],
  serverExternalPackages: ["@prisma/client", "prisma"],
  typedRoutes: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;
