import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadToR2(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Clean filename extension
  const fileExtension = file.name.split('.').pop() || 'png';
  const key = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
  
  await r2Client.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  }));
  
  const publicUrl = process.env.R2_PUBLIC_URL;
  // If a public URL is configured and is not just the S3 endpoint, use it directly
  if (publicUrl && !publicUrl.includes("cloudflarestorage.com")) {
    return `${publicUrl.replace(/\/$/, '')}/${key}`;
  }
  
  // Otherwise fallback to local Next.js proxy route to bypass credentials and CORS
  return `/api/uploads/${key}`;
}
