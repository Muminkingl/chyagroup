import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    middlewareClientMaxBodySize: "50mb",
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
} as any as NextConfig;

export default nextConfig;
