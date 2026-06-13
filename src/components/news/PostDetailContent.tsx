"use client";

import { useState } from "react";
import Link from "next/link";
import { Iconify } from "@/components/ui/Iconify";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { motion, AnimatePresence } from "framer-motion";

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

  // Localization selections
  const title = post[`title_${locale}` as keyof typeof post] as string || post.title;
  const content = post[`content_${locale}` as keyof typeof post] as string || post.content;
  const additionalImages = post.images || [];

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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx + 1) % additionalImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((activeImageIdx - 1 + additionalImages.length) % additionalImages.length);
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

        {/* Featured Image */}
        {post.image_url && (
          <div className="relative aspect-[21/9] mb-16 rounded-3xl overflow-hidden border border-[#0c1a2e]/5 shadow-sm bg-zinc-100">
            <img 
              src={post.image_url} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-transparent opacity-20"></div>
          </div>
        )}

        {/* Article Body */}
        <article 
          className="prose prose-zinc max-w-none text-[#3a4f6a] prose-p:text-[#3a4f6a] prose-p:leading-relaxed prose-p:font-medium prose-headings:text-[#0c1a2e] prose-headings:font-bold prose-headings:tracking-tight prose-strong:text-[#0c1a2e] prose-blockquote:border-[#3b82f6] prose-blockquote:bg-[#0c1a2e]/[0.03] prose-blockquote:p-6 prose-blockquote:rounded-2xl prose-img:rounded-3xl"
          dir="auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* 5. Additional Images Gallery */}
        {additionalImages.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#0c1a2e]/10">
            <h3 className={`text-xl font-bold text-[#0c1a2e] mb-6 tracking-tight ${isRTL ? 'text-right' : 'text-left'}`}>
              {galleryTitle}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {additionalImages.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImageIdx(idx)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#0c1a2e]/5 shadow-sm bg-[#faf9f6] cursor-pointer hover:shadow-md transition-shadow duration-300"
                >
                  <img 
                    src={imgUrl} 
                    alt={`${title} gallery ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-[#0c1a2e]">
                      <Iconify icon="solar:magnifer-zoom-in-linear" width={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Lightbox */}
        <AnimatePresence>
          {activeImageIdx !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIdx(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            >
              <button 
                onClick={() => setActiveImageIdx(null)}
                className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              >
                <Iconify icon="solar:close-circle-linear" width={24} />
              </button>

              {additionalImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 cursor-pointer"
                  >
                    <Iconify icon="solar:alt-arrow-left-linear" width={22} />
                  </button>

                  <button 
                    onClick={nextImage}
                    className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 cursor-pointer"
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
                className="relative max-w-5xl max-h-[80vh] aspect-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={additionalImages[activeImageIdx]} 
                  alt={`${title} full view`} 
                  className="max-w-full max-h-[85vh] object-contain"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">
                  {activeImageIdx + 1} / {additionalImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share / Footer */}
        <div className="mt-20 pt-12 border-t border-[#0c1a2e]/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <div className="w-12 h-12 rounded-full bg-white border border-[#0c1a2e]/10 flex items-center justify-center shadow-sm">
                <span className="text-[#3a4f6a] text-xs font-bold">CG</span>
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
