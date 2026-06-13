import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    middlewareClientMaxBodySize: "2gb",
    serverActions: {
      bodySizeLimit: "2gb",
    },
  },
} as any as NextConfig;

export default nextConfig;
