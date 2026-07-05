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
  const [error, setError] = useState(false);

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
      {/* Shimmer skeleton shown while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 z-20 bg-[#f0f2f5] overflow-hidden">
          <div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
            style={{ animation: 'shimmer 1.6s infinite' }}
          />
        </div>
      )}

      {/* Hidden img to determine aspect ratio — lazy loaded */}
      <img
        src={cleanSrc}
        alt=""
        className="hidden"
        loading="lazy"
        onLoad={(e) => {
          const { naturalWidth, naturalHeight } = e.currentTarget;
          if (naturalWidth && naturalHeight) {
            setIsPortrait(naturalWidth < naturalHeight);
            setLoaded(true);
          }
        }}
        onError={() => {
          setLoaded(true);
          setError(true);
        }}
      />

      {/* Background blurred image for portrait or zoomed out images */}
      {(isPortrait || zoom < 0.5) && loaded && !error && (
        <div className="absolute inset-0 z-0">
          <img
            src={cleanSrc}
            alt=""
            className="w-full h-full object-cover blur-xl scale-110 opacity-30 select-none pointer-events-none"
            loading="lazy"
          />
        </div>
      )}

      {/* Main Image — GPU pre-promoted via will-change + translateZ(0) to prevent
          sudden layer-promotion flicker when hover scale kicks in on 4K/5K images */}
      <img
        src={cleanSrc}
        alt={alt}
        loading="lazy"
        className={cn(
          // Use transition-transform only (NOT transition-all) to avoid costly
          // GPU re-rasterization of every property on large images
          "transition-transform duration-500 ease-out",
          !loaded && "opacity-0",
          loaded && "opacity-100 transition-opacity duration-300",
          (isPortrait || zoom < 0.5) && loaded && !error
            ? "relative z-10 max-w-full max-h-full object-contain p-2"
            : "w-full h-full object-cover",
          className
        )}
        style={{
          objectPosition: `50% ${positionY}`,
          transform: `translateZ(0) scale(${zoom})`,
          // Pre-promote to GPU compositing layer before hover begins.
          // This eliminates the "snap" flicker caused by sudden layer promotion
          // when transform changes from none → scale(1.0x) during hover.
          willChange: "transform",
          imageRendering: "auto",
        }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
