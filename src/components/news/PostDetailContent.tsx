"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Iconify } from "@/components/ui/Iconify";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "../ui/SmartImage";

interface PostDetailContentProps {
  post: {
    id: string;
    title: string;
    content: string;
    category?: string;
    created_at: string;
    views_count?: number;
    image_url?: string;
    title_en?: string;
    title_ar?: string;
    title_ku?: string;
    content_en?: string;
    content_ar?: string;
    content_ku?: string;
    images?: string[];
  };
}

export default function PostDetailContent({ post }: PostDetailContentProps) {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].newsArchive;
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // Localization selections
  const title = post[`title_${locale}` as keyof typeof post] as string || post.title;
  const content = post[`content_${locale}` as keyof typeof post] as string || post.content;
  const additionalImages = post.images || [];

  // Combine featured banner image + additional gallery images for a unified lightbox pool
  const allImages = [
    ...(post.image_url ? [post.image_url] : []),
    ...additionalImages
  ];

  // Localized Gallery Headings
  const galleryTitle = {
    en: "Post Gallery",
    ar: "معرض الصور",
    ku: "پێشانگای وێنەکان"
  }[locale] || "Gallery";

  // Format date based on locale
  const formattedDate = new Date(post.created_at).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'ar' ? 'ar-EG' : 'ku-IQ', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Zoom and Pan states for full screen lightbox
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [clickStart, setClickStart] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const resetZoomAndPan = useCallback(() => {
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
    setDragged(false);
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIdx !== null && allImages.length > 0) {
      const nextIdx = (activeImageIdx + 1) % allImages.length;
      setActiveImageIdx(nextIdx);
      setCurrentSlideIdx(nextIdx);
      resetZoomAndPan();
    }
  }, [activeImageIdx, allImages.length, resetZoomAndPan]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIdx !== null && allImages.length > 0) {
      const prevIdx = (activeImageIdx - 1 + allImages.length) % allImages.length;
      setActiveImageIdx(prevIdx);
      setCurrentSlideIdx(prevIdx);
      resetZoomAndPan();
    }
  }, [activeImageIdx, allImages.length, resetZoomAndPan]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragged(false);
    setClickStart({ x: e.clientX, y: e.clientY });
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [zoomScale, pan.x, pan.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = Math.abs(e.clientX - clickStart.x);
    const dy = Math.abs(e.clientY - clickStart.y);
    if (dx > 5 || dy > 5) {
      setDragged(true);
    }
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, clickStart, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setDragged(false);
    const touch = e.touches[0];
    setClickStart({ x: touch.clientX, y: touch.clientY });
    setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
  }, [pan.x, pan.y]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - clickStart.x);
    const dy = Math.abs(touch.clientY - clickStart.y);
    if (dx > 5 || dy > 5) {
      setDragged(true);
    }
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  }, [isDragging, clickStart, dragStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (dragged) return;
    if (zoomScale > 1) {
      resetZoomAndPan();
    } else {
      setZoomScale(2);
    }
  }, [dragged, zoomScale, resetZoomAndPan]);

  const handleZoomIn = useCallback(() => {
    setZoomScale((prev) => Math.min(prev + 0.25, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomScale((prev) => Math.max(prev - 0.25, 0.25));
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activeImageIdx === null) return;
      if (e.key === "Escape") {
        setActiveImageIdx(null);
        resetZoomAndPan();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIdx, nextImage, prevImage, resetZoomAndPan]);

  // Autoplay functionality for slideshow
  useEffect(() => {
    if (allImages.length <= 1 || activeImageIdx !== null) return;

    const timer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % allImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlideIdx, allImages.length, activeImageIdx]);

  // Swipe gesture hooks
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlideIdx((prev) => (prev + 1) % allImages.length);
    } else if (isRightSwipe) {
      setCurrentSlideIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/news" 
          className={`group inline-flex items-center gap-2 text-[#3a4f6a] hover:text-[#0c1a2e] transition-colors mb-12 text-sm font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className="w-8 h-8 rounded-full border border-[#0c1a2e]/10 flex items-center justify-center group-hover:bg-[#0c1a2e]/5 transition-all bg-white shadow-sm">
            <Iconify icon={isRTL ? "solar:alt-arrow-right-linear" : "solar:alt-arrow-left-linear"} width={16} />
          </div>
          <span>{locale === 'en' ? 'Back to News' : locale === 'ar' ? 'العودة إلى الأخبار' : 'گەڕانەوە بۆ هەواڵەکان'}</span>
        </Link>

        {/* Article Header */}
        <header className={`mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-[10px] font-bold uppercase tracking-widest border border-[#3b82f6]/20">
              {post.category || 'General'}
            </span>
            <div className="h-px w-8 bg-[#0c1a2e]/10"></div>
            <span className="text-[#3a4f6a] text-[10px] uppercase tracking-widest font-bold">
              {locale === 'en' ? 'Article' : locale === 'ar' ? 'مقالة' : 'وتار'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0c1a2e] mb-8 tracking-tight leading-[1.15]" dir="auto">
            {title}
          </h1>

          <div className={`flex flex-wrap items-center gap-y-4 gap-x-8 text-sm text-[#3a4f6a] font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Iconify icon="solar:calendar-linear" width={14} className="text-[#3b82f6]" />
              <span>{formattedDate}</span>
            </div>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Iconify icon="solar:clock-circle-linear" width={14} className="text-[#3b82f6]" />
              <span>{locale === 'en' ? '5 min read' : locale === 'ar' ? 'قراءة في 5 دقائق' : 'خوێندنەوەی ٥ خولەک'}</span>
            </div>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Iconify icon="solar:eye-linear" width={14} className="text-[#3b82f6]" />
              <span>{(post.views_count || 0) + 1} {locale === 'en' ? 'views' : locale === 'ar' ? 'مشاهدة' : 'بینین'}</span>
            </div>
          </div>
        </header>

        {/* Gallery Slider / Featured Image */}
        {allImages.length > 0 && (
          <div className="mb-16">
            {allImages.length === 1 ? (
              // Single image: static banner zoomable on click
              <div 
                onClick={() => setActiveImageIdx(0)}
                className="relative aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden border border-[#0c1a2e]/5 shadow-sm bg-zinc-100 cursor-pointer group hover:shadow-md transition-shadow duration-300"
              >
                <SmartImage 
                  src={allImages[0]} 
                  alt={title}
                  className="group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <div className="w-12 h-12 rounded-full bg-white/90 shadow flex items-center justify-center text-[#0c1a2e]">
                    <Iconify icon="solar:magnifer-zoom-in-linear" width={20} />
                  </div>
                </div>
              </div>
            ) : (
              // Multiple images: premium interactive slideshow slider
              <div className="space-y-4" dir="ltr">
                {/* Main slide display */}
                <div 
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  onClick={() => setActiveImageIdx(currentSlideIdx)}
                  className="relative aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden border border-[#0c1a2e]/5 shadow-md bg-zinc-900 cursor-pointer group hover:shadow-lg transition-all duration-300"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlideIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      <SmartImage
                        src={allImages[currentSlideIdx]}
                        alt={`${title} - image ${currentSlideIdx + 1}`}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Manual Arrow Controls (Glassmorphism overlay) */}
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlideIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
                      }}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-white/30 cursor-pointer pointer-events-auto shadow-sm"
                    >
                      <Iconify icon="solar:alt-arrow-left-linear" width={20} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlideIdx((prev) => (prev + 1) % allImages.length);
                      }}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-white/30 cursor-pointer pointer-events-auto shadow-sm"
                    >
                      <Iconify icon="solar:alt-arrow-right-linear" width={20} />
                    </button>
                  </div>

                  {/* Image Counter Overlay */}
                  <div className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest pointer-events-none">
                    {currentSlideIdx + 1} / {allImages.length}
                  </div>

                  {/* Hover Zoom Hint */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow flex items-center justify-center text-[#0c1a2e]">
                      <Iconify icon="solar:magnifer-zoom-in-linear" width={20} />
                    </div>
                  </div>
                </div>

                {/* Clickable Thumbnail Row */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200">
                  {allImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIdx(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#faf9f6] ${
                        currentSlideIdx === idx 
                          ? "border-[#3b82f6] shadow-sm scale-95 opacity-100" 
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Article Body */}
        <article 
          className="prose prose-zinc max-w-none text-[#3a4f6a] prose-p:text-[#3a4f6a] prose-p:leading-relaxed prose-p:font-medium prose-headings:text-[#0c1a2e] prose-headings:font-bold prose-headings:tracking-tight prose-strong:text-[#0c1a2e] prose-blockquote:border-[#3b82f6] prose-blockquote:bg-[#0c1a2e]/[0.03] prose-blockquote:p-6 prose-blockquote:rounded-2xl prose-img:rounded-3xl"
          dir="auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />



        {/* Gallery Lightbox */}
        <AnimatePresence>
          {activeImageIdx !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setActiveImageIdx(null);
                resetZoomAndPan();
              }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
              dir="ltr"
            >
              {/* Zoom Control Overlay */}
              <div 
                className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <Iconify icon="solar:magnifer-zoom-out-linear" width={20} />
                </button>
                <span className="text-xs font-bold min-w-[3.5rem] text-center select-none">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <Iconify icon="solar:magnifer-zoom-in-linear" width={20} />
                </button>
                {zoomScale !== 1 && (
                  <button
                    onClick={resetZoomAndPan}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors ml-1 border-l border-white/10 pl-2.5 cursor-pointer"
                    title="Reset Zoom"
                  >
                    <Iconify icon="solar:restart-linear" width={16} />
                  </button>
                )}
              </div>

              <button 
                onClick={() => {
                  setActiveImageIdx(null);
                  resetZoomAndPan();
                }}
                className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 cursor-pointer"
              >
                <Iconify icon="solar:close-circle-linear" width={24} />
              </button>

              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 cursor-pointer z-50"
                  >
                    <Iconify icon="solar:alt-arrow-left-linear" width={22} />
                  </button>

                  <button 
                    onClick={nextImage}
                    className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 cursor-pointer z-50"
                  >
                    <Iconify icon="solar:alt-arrow-right-linear" width={22} />
                  </button>
                </>
              )}

              <motion.div 
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="relative max-w-5xl max-h-[80vh] aspect-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-zinc-950"
                onClick={handleContainerClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  cursor: zoomScale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in"
                }}
              >
                <img 
                  src={allImages[activeImageIdx]} 
                  alt={`${title} full view`} 
                  className="max-w-full max-h-[85vh] object-contain select-none pointer-events-none transition-transform duration-100 ease-out"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`
                  }}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest pointer-events-none">
                  {activeImageIdx + 1} / {allImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share / Footer */}
        <div className="mt-20 pt-12 border-t border-[#0c1a2e]/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <div className="w-12 h-12 rounded-full bg-white border border-[#0c1a2e]/10 flex items-center justify-center shadow-sm p-1 overflow-hidden">
                <img src="/logo.svg" alt="Chya Group Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0c1a2e] mb-0.5">{t.author}</h4>
                <p className="text-xs text-[#3a4f6a] font-medium">
                  {locale === 'en' ? 'Official corporate publications department.' : locale === 'ar' ? 'قسم المنشورات المؤسسية الرسمي.' : 'بەشی بڵاوکراوە فەرمییەکانی کۆمپانیا.'}
                </p>
              </div>
            </div>
            
            <Link 
              href="/news" 
              className="px-6 py-3 rounded-full bg-white border border-[#0c1a2e]/10 text-xs font-bold text-[#0c1a2e] hover:bg-[#f4f7f9] hover:border-[#0c1a2e]/20 transition-all text-center shadow-sm"
            >
              {locale === 'en' ? 'More Articles' : locale === 'ar' ? 'المزيد من المقالات' : 'وتاری زیاتر'}
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
