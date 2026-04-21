"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/app/admin/actions";
import { clsx } from "clsx";

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    const formData = new FormData();
    formData.append("image", file);

    const result = await uploadImage(formData);

    if (result.url) {
      onUploadComplete(result.url);
      setPreview(result.url);
    } else {
      setError(result.error || "Upload failed");
    }
    setIsUploading(false);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
        // Local preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        await performUpload(file);
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
          accept="image/*"
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
                  <iconify-icon icon="solar:upload-linear" class="text-3xl text-white"></iconify-icon>
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Change Image</span>
               </div>
            </div>
            {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Uploading to ImgBB...</span>
                    </div>
                </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-4 transition-transform group-hover:scale-[1.02]">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:bg-zinc-800 transition-colors">
               <iconify-icon icon="solar:camera-linear" class="text-3xl text-zinc-500 group-hover:text-zinc-200"></iconify-icon>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-300">Click or drag image to upload</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Supports PNG, JPG, WebP (Max 32MB)</p>
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
            <iconify-icon icon="solar:danger-circle-bold"></iconify-icon>
            {error}
        </p>
      )}
      
      {preview && !isUploading && !error && (
          <p className="text-[10px] text-emerald-500 flex items-center gap-1.5 font-bold uppercase tracking-widest mt-1">
              <iconify-icon icon="solar:check-circle-bold"></iconify-icon>
              Image ready for publication
          </p>
      )}
    </div>
  );
}
