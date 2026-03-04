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
  }
};

export default nextConfig;
