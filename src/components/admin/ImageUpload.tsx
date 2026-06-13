"use client";

import { useState, useRef } from "react";
import { getPresignedUrlAction } from "@/app/admin/actions";
import { clsx } from "clsx";
import { Iconify } from "@/components/ui/Iconify";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  defaultImage?: string;
  label?: string;
}

export default function ImageUpload({ onUploadComplete, defaultImage, label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to dynamically convert HEIC to JPEG on client side
  const convertHeicToJpeg = async (file: File): Promise<File> => {
    const isHeic = file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif");
    if (!isHeic) return file;

    try {
      console.log("HEIC file detected, loading conversion library...");
      const heic2anyModule = await import("heic2any");
      
      // Handle different module bundling export structures securely
      let heic2any: any = heic2anyModule.default || heic2anyModule;
      if (typeof heic2any !== "function" && heic2any && typeof heic2any.heic2any === "function") {
        heic2any = heic2any.heic2any;
      }

      if (typeof heic2any !== "function") {
        throw new Error("Loaded heic2any is not a function module");
      }

      console.log("Starting client-side HEIC to JPEG conversion...");
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.8,
      });

      const jpegBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      const newFilename = file.name.replace(/\.(heic|heif)$/i, ".jpg");
      
      console.log("HEIC conversion successful. New file:", newFilename);
      return new File([jpegBlob], newFilename, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
    } catch (err) {
      console.error("HEIC conversion failed, using original file:", err);
      return file;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    // Convert if it is a HEIC image
    file = await convertHeicToJpeg(file);

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    await performUpload(file);
  };

  const performUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const result = await getPresignedUrlAction(file.name, file.type);
      if (result.error || !result.uploadUrl || !result.publicUrl) {
        throw new Error(result.error || "Could not generate upload URL");
      }

      const uploadResponse = await fetch(result.uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status: ${uploadResponse.status}`);
      }

      onUploadComplete(result.publicUrl);
      setPreview(result.publicUrl);
    } catch (err: any) {
      console.error("Image direct upload error:", err);
      setError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    let file = e.dataTransfer.files?.[0];
    if (file) {
      const isImg = file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name);
      if (isImg) {
        setIsUploading(true);
        setError(null);
        
        file = await convertHeicToJpeg(file);

        // Local preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        
        await performUpload(file);
      }
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-zinc-200">{label}</label>}
      
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={clsx(
          "relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300",
          preview ? "border-white/10" : "border-white/5 hover:border-white/10 bg-zinc-950/50",
          isUploading && "animate-pulse opacity-70 cursor-wait"
        )}
        onClick={triggerUpload}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
          accept="image/*,.heic,.HEIC,.heif,.HEIF"
        />

        {preview ? (
          <div className="relative aspect-video w-full">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="flex flex-col items-center gap-2">
                  <Iconify icon="solar:upload-linear" className="text-3xl text-white" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Change Image</span>
               </div>
            </div>
            {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Uploading to R2...</span>
                    </div>
                </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-4 transition-transform group-hover:scale-[1.02]">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:bg-zinc-800 transition-colors">
               <Iconify icon="solar:camera-linear" className="text-3xl text-zinc-500 group-hover:text-zinc-200" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-300">Click or drag image to upload</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Supports PNG, JPG, WebP, HEIC (Max 50MB)</p>
            </div>
            {isUploading && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-rose-500 mt-2 flex items-center gap-1.5">
            <Iconify icon="solar:danger-circle-bold" />
            {error}
        </p>
      )}
      
      {preview && !isUploading && !error && (
          <p className="text-[10px] text-emerald-500 flex items-center gap-1.5 font-bold uppercase tracking-widest mt-1">
              <Iconify icon="solar:check-circle-bold" />
              Image ready for publication
          </p>
      )}
    </div>
  );
}
