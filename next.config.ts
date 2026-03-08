import { env } from "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "media.licdn.com",
    //   },
    // ]
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.BACKEND_URL}/api/auth/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/auth/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
