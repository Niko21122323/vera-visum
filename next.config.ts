import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "jdgm.fr",
      },
      {
        protocol: "https",
        hostname: "judgeme.imgix.net",
      },
    ],
  },
  experimental: {
    dynamicIO: true,
    cacheLife: {
      hours: {
        stale: 3600,
        revalidate: 7200,
        expire: 86400,
      },
      data: {
        stale: 300,
        revalidate: 600,
        expire: 3600,
      },
    },
  } as any,
};

export default nextConfig;
