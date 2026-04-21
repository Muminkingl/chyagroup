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
        "group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Only render image section if image exists */}
      {hasImage && (
        <div className="relative h-48 overflow-hidden bg-zinc-900">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        </div>
      )}

      {/* If no image, show a subtle accent bar instead */}
      {!hasImage && (
        <div className="h-1 w-full bg-gradient-to-r from-amber-500/30 via-blue-500/30 to-transparent" />
      )}
      
      <div className="p-5 flex flex-col flex-1 text-start">
        <div className="flex items-center gap-3 mb-3 text-xs text-neutral-400">
          <span className="font-semibold text-amber-500/80 uppercase tracking-wider text-[10px]">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
          <span className="flex items-center gap-1">
            <Iconify icon="solar:calendar-linear" width={11} />
            {formattedDate}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold tracking-tight text-white mb-2 line-clamp-2" dir="auto">
          {post.title}
        </h3>
        
        <p className="text-sm text-neutral-400 mb-6 line-clamp-2 flex-1 font-light leading-relaxed" dir="auto">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
              <span className="text-[9px] font-bold text-zinc-400">CG</span>
            </div>
            <span className="text-xs text-neutral-300">{t.author}</span>
          </div>
          <span className="text-xs text-neutral-500 flex items-center gap-1">
            <Iconify icon="solar:book-linear" width={14} />
            {t.readTime.replace('{minutes}', post.readTime)}
          </span>
        </div>
      </div>
    </Link>
  );
}
