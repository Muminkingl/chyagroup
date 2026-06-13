"use client";

import { useState, useRef } from "react";
import { getPresignedUrlAction } from "@/app/admin/actions";
import { clsx } from "clsx";
import { Iconify } from "@/components/ui/Iconify";
import { AnimatePresence, motion } from "framer-motion";

interface MultiImageUploadProps {
  onImagesChange?: (urls: string[]) => void;
  defaultImages?: string[];
  label?: string;
}

export default function MultiImageUpload({ onImagesChange, defaultImages = [], label }: MultiImageUploadProps) {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to dynamically convert HEIC to JPEG on client side
  const convertHeicToJpeg = async (file: File): Promise<File> => {
    const isHeic = file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif");
    if (!isHeic) return file;

    try {
      console.log("HEIC file detected for gallery, loading conversion library...");
      const heic2anyModule = await import("heic2any");
      
      // Handle different module bundling export structures securely
      let heic2any: any = heic2anyModule.default || heic2anyModule;
      if (typeof heic2any !== "function" && heic2any && typeof heic2any.heic2any === "function") {
        heic2any = heic2any.heic2any;
      }

      if (typeof heic2any !== "function") {
        throw new Error("Loaded heic2any is not a function module");
      }

      console.log("Starting client-side HEIC to JPEG conversion for gallery...");
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.8,
      });

      const jpegBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      const newFilename = file.name.replace(/\.(heic|heif)$/i, ".jpg");
      
      console.log("HEIC gallery conversion successful. New file:", newFilename);
      return new File([jpegBlob], newFilename, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
    } catch (err) {
      console.error("HEIC conversion failed for multi-upload, using original file:", err);
      return file;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    await performUpload(Array.from(files));
  };

  const performUpload = async (files: File[]) => {
    setIsUploading(true);
    setError(null);

    const uploadedUrls: string[] = [];
    
    for (let file of files) {
      const isImg = file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name);
      if (!isImg) continue;
      
      try {
        // Convert HEIC to JPEG if needed
        file = await convertHeicToJpeg(file);

        const result = await getPresignedUrlAction(file.name, file.type);
        if (result.error || !result.uploadUrl || !result.publicUrl) {
          throw new Error(result.error || `Could not generate upload URL for ${file.name}`);
        }

        const uploadResponse = await fetch(result.uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error(`Upload failed for ${file.name}`);
        }

        uploadedUrls.push(result.publicUrl);
      } catch (err: any) {
        console.error("Multi-image direct upload error:", err);
        setError(err.message || `Failed to upload ${file.name}`);
      }
    }

    if (uploadedUrls.length > 0) {
      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      if (onImagesChange) {
        onImagesChange(newImages);
      }
    }
    setIsUploading(false);
  };

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, idx) => idx !== indexToRemove);
    setImages(newImages);
    if (onImagesChange) {
      onImagesChange(newImages);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await performUpload(files);
    }
  };

  return (
    <div className="space-y-4">
      {label && <label className="text-sm font-medium text-zinc-200">{label}</label>}
      
      {/* Hidden input to pass data in Form Actions */}
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      {/* Grid of uploaded images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimatePresence>
          {images.map((url, idx) => (
            <motion.div
              key={url + idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative aspect-square rounded-2xl border border-white/5 bg-zinc-950 overflow-hidden group shadow-md"
            >
              <img src={url} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              
              {/* Overlay with remove button */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="p-2 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white transition-colors"
                >
                  <Iconify icon="solar:trash-bin-trash-linear" className="text-lg" />
                </button>
              </div>
            </motion.div>
          ))}
          
          {/* Upload card inside grid if images exist */}
          <motion.div
            layout
            onClick={triggerUpload}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={clsx(
              "aspect-square rounded-2xl border-2 border-dashed border-white/5 hover:border-white/10 bg-zinc-950/20 hover:bg-zinc-950/40 cursor-pointer flex flex-col items-center justify-center gap-2 text-center p-4 transition-all",
              isUploading && "animate-pulse opacity-70 cursor-wait"
            )}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept="image/*,.heic,.HEIC,.heif,.HEIF"
              multiple
            />
            {isUploading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5">
                  <Iconify icon="solar:gallery-add-linear" className="text-xl text-zinc-500" />
                </div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Add Images</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && (
        <p className="text-xs text-rose-500 mt-2 flex items-center gap-1.5">
          <Iconify icon="solar:danger-circle-bold" />
          {error}
        </p>
      )}
    </div>
  );
}
