"use client";

import Link from 'next/link';
import { Iconify } from '../ui/Iconify';
import { clsx } from 'clsx';
import { Post } from '@/data/newsData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

export default function PostCard({ post, className }: { post: Post, className?: string }) {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].newsArchive;
  const hasImage = !!(post.imageUrl && post.imageUrl.trim() !== '');

  // Deriving localized title and dynamic excerpt from content
  const localizedTitle = (post as any)[`title_${locale}`] || post.title;
  const localizedContent = (post as any)[`content_${locale}`] || post.content || '';
  const localizedExcerpt = localizedContent
    ? localizedContent.replace(/<[^>]*>/g, '').substring(0, 160) + '...'
    : post.excerpt;

  // Format date based on locale
  const formattedDate = new Date(post.date).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'ar' ? 'ar-EG' : 'ku-IQ', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <Link 
      href={`/news/${post.id}`}
      className={clsx(
        "group flex flex-col rounded-2xl border border-[#0c1a2e]/5 bg-white overflow-hidden hover:border-[#0c1a2e]/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Only render image section if image exists */}
      {hasImage && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#f4f7f9]">
          <img 
            src={post.imageUrl} 
            alt={localizedTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* If no image, show a subtle accent bar instead */}
      {!hasImage && (
        <div className="h-1 w-full bg-gradient-to-r from-[#162d4f]/30 via-[#3b82f6]/30 to-transparent" />
      )}
      
      <div className="p-5 flex flex-col flex-1 text-start">
        <div className="flex items-center gap-3 mb-3 text-xs text-[#3a4f6a]">
          <span className="font-semibold text-[#3b82f6] uppercase tracking-wider text-[10px]">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-[#0c1a2e]/20"></span>
          <span className="flex items-center gap-1">
            <Iconify icon="solar:calendar-linear" width={11} />
            {formattedDate}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold tracking-tight text-[#0c1a2e] mb-2 line-clamp-2" dir="auto">
          {localizedTitle}
        </h3>
        
        <p className="text-sm text-[#3a4f6a] mb-6 line-clamp-2 flex-1 font-medium leading-relaxed" dir="auto">
          {localizedExcerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f4f7f9] border border-[#0c1a2e]/10 flex items-center justify-center">
              <span className="text-[9px] font-bold text-[#3a4f6a]">CG</span>
            </div>
            <span className="text-xs text-[#0c1a2e] font-medium">{t.author}</span>
          </div>
          <span className="text-xs text-[#3a4f6a] flex items-center gap-1">
            <Iconify icon="solar:book-linear" width={14} />
            {t.readTime.replace('{minutes}', post.readTime)}
          </span>
        </div>
      </div>
    </Link>
  );
}
