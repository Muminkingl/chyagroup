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
  images: {
    // Allow optimization of images from Cloudflare R2 storage (via the /api/uploads proxy)
    remotePatterns: [
      {
        // Direct Cloudflare R2 public access URL
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      {
        // Custom Cloudflare R2 public domain (if configured)
        protocol: "https",
        hostname: "**.r2.dev",
      },
    ],
    // Serve modern formats for better compression (reduces raw image size → less GPU memory pressure)
    formats: ["image/avif", "image/webp"],
    // Cap device sizes to avoid serving unnecessarily large textures to the GPU
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
} as any as NextConfig;

export default nextConfig;
