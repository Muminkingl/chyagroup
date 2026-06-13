import type { NextConfig } from "next";

const nextConfig = {
  middlewareClientMaxBodySize: "50mb",
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
} as any as NextConfig;

export default nextConfig;
