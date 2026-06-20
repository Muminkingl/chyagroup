"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
}

export default function SmartImage({ src, alt = "", className, containerClassName }: SmartImageProps) {
  const [isPortrait, setIsPortrait] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div className={cn("w-full h-full bg-zinc-100 flex items-center justify-center", containerClassName)}>
        <span className="text-zinc-400 text-xs">No image</span>
      </div>
    );
  }

  // Parse Y-position and zoom scale from URL hash (e.g. #position=35&zoom=1.2)
  const positionMatch = src.match(/[#&]position=(\d+)/);
  const positionY = positionMatch ? `${positionMatch[1]}%` : "50%";

  const zoomMatch = src.match(/[#&]zoom=([\d.]+)/);
  const zoom = zoomMatch ? parseFloat(zoomMatch[1]) : 1;

  const cleanSrc = src.split('#')[0];

  return (
    <div className={cn("relative w-full h-full overflow-hidden select-none bg-[#f4f7f9] flex items-center justify-center", containerClassName)}>
      {/* Hidden img to determine aspect ratio */}
      <img
        src={cleanSrc}
        alt=""
        className="hidden"
        onLoad={(e) => {
          const { naturalWidth, naturalHeight } = e.currentTarget;
          if (naturalWidth && naturalHeight) {
            setIsPortrait(naturalWidth < naturalHeight);
            setLoaded(true);
          }
        }}
      />

      {/* Background blurred image for portrait or zoomed out images */}
      {(isPortrait || zoom < 1.0) && loaded && (
        <div className="absolute inset-0 z-0">
          <img
            src={cleanSrc}
            alt=""
            className="w-full h-full object-cover blur-xl scale-110 opacity-30 select-none pointer-events-none"
          />
        </div>
      )}

      {/* Main Image */}
      <img
        src={cleanSrc}
        alt={alt}
        className={cn(
          "transition-all duration-500",
          (isPortrait || zoom < 1.0) && loaded
            ? "relative z-10 max-w-full max-h-full object-contain p-2"
            : "w-full h-full object-cover",
          className
        )}
        style={{
          objectPosition: `50% ${positionY}`,
          transform: `scale(${zoom})`
        }}
      />
    </div>
  );
}
