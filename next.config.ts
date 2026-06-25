import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    middlewareClientMaxBodySize: "2gb",
    serverActions: {
      bodySizeLimit: "2gb",
    },
    allowedDevOrigins: [
      "192.168.1.12",
    ],
  },
} as any as NextConfig;

export default nextConfig;
