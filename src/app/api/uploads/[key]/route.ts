import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

// Simple in-memory cache: key → { data: Uint8Array, contentType: string }
// Capped at MAX_ENTRIES to avoid unbounded memory growth.
const MAX_ENTRIES = 100;
const cache = new Map<string, { data: Uint8Array; contentType: string }>();

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ key: string }> }
) {
  const { key } = await props.params;

  // Serve from in-memory cache if available (instant – no network round-trip)
  if (cache.has(key)) {
    const cached = cache.get(key)!;
    return new NextResponse(cached.data as any, {
      headers: {
        "Content-Type": cached.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Cache": "HIT",
      },
    });
  }

  try {
    const response = await r2Client.send(new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }));

    if (!response.Body) {
      return new NextResponse("File not found", { status: 404 });
    }

    const bytes = await response.Body.transformToByteArray();
    const contentType = response.ContentType || "application/octet-stream";

    // Evict oldest entry if cache is full
    if (cache.size >= MAX_ENTRIES) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }
    cache.set(key, { data: bytes, contentType });

    return new NextResponse(bytes as any, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Error fetching file from R2:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
