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

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ key: string }> }
) {
  const { key } = await props.params;
  
  try {
    const response = await r2Client.send(new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }));
    
    if (!response.Body) {
      return new NextResponse("File not found", { status: 404 });
    }
    
    const bytes = await response.Body.transformToByteArray();
    
    return new NextResponse(bytes as any, {
      headers: {
        "Content-Type": response.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error fetching file from R2:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
