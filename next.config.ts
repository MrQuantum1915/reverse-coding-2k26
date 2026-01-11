import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    cfsafe: {
      stale: 5, // 5sec client side
      revalidate: 10, // 10sec server side
      expire: 86400, // 1 day if unused
    },
  }
};

export default nextConfig;
