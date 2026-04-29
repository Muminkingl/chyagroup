"use client";

import Link from 'next/link';
import { Iconify } from '../ui/Iconify';
import { Post } from '@/data/newsData';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { cn } from '@/lib/utils';

export default function FeaturedGrid({ posts }: { posts: Post[] }) {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].newsArchive;

  if (!posts || posts.length < 1) return null;

  const heroPost = posts[0];
  const sidePosts = posts.slice(1, 3);
  const hasHeroImage = !!(heroPost.imageUrl && heroPost.imageUrl.trim() !== '');

  // Localized date formatting
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'ar' ? 'ar-EG' : 'ku-IQ', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* HERO POST - Spans 8 columns */}
      <Link 
        href={`/news/${heroPost.id}`}
        className="group relative lg:col-span-8 rounded-3xl overflow-hidden border border-[#0c1a2e]/5 min-h-[400px] lg:min-h-[500px] flex flex-col justify-end transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"
        style={{ background: hasHeroImage ? undefined : 'linear-gradient(135deg, #f4f7f9 0%, #ffffff 100%)' }}
      >
        {/* Background image */}
        {hasHeroImage && (
          <div className="absolute inset-0">
            <img 
              src={heroPost.imageUrl} 
              alt={heroPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent opacity-95" />
          </div>
        )}

        {/* No image: decorative gradient */}
        {!hasHeroImage && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#162d4f]/20 rounded-full blur-[80px]" />
          </div>
        )}

        <div className="relative p-8 flex flex-col justify-end flex-1 text-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#3b82f6]/10 backdrop-blur-md text-[#3b82f6] border border-[#3b82f6]/20 uppercase tracking-wider">
              {heroPost.category}
            </span>
            <span className="text-sm text-[#3a4f6a] flex items-center gap-1.5 font-medium">
              <Iconify icon="solar:calendar-linear" width={16} />
              {formatDate(heroPost.date)}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0c1a2e] mb-3 group-hover:text-[#3b82f6] transition-colors" dir="auto">
            {heroPost.title}
          </h2>
          <p className="text-[#3a4f6a] text-base md:text-lg max-w-2xl mb-6 line-clamp-2 font-medium leading-relaxed" dir="auto">
            {heroPost.excerpt}
          </p>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f4f7f9] border border-[#0c1a2e]/10 flex items-center justify-center">
              <span className="text-xs font-bold text-[#3a4f6a]">CG</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0c1a2e]">{t.author}</p>
              <p className="text-xs text-[#3a4f6a] flex items-center gap-1 font-medium">
                <Iconify icon="solar:clock-circle-linear" width={11} />
                {t.readTime.replace('{minutes}', heroPost.readTime)}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* SIDE POSTS - Span 4 columns */}
      {sidePosts.length > 0 && (
        <div className="lg:col-span-4 flex flex-col gap-6">
          {sidePosts.map((post) => {
            const hasSideImage = !!(post.imageUrl && post.imageUrl.trim() !== '');
            return (
              <Link 
                key={post.id}
                href={`/news/${post.id}`}
                className="group relative flex-1 rounded-3xl overflow-hidden border border-[#0c1a2e]/5 bg-white backdrop-blur-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[235px]"
              >
                {/* Side post image (background) */}
                {hasSideImage && (
                  <div className="absolute inset-0">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/60" />
                  </div>
                )}

                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0c1a2e]/5 rounded-full blur-[50px] group-hover:bg-[#0c1a2e]/10 transition-colors pointer-events-none" />
                
                <div className="relative p-6 flex flex-col h-full justify-between text-start">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-[#3b82f6] uppercase tracking-widest">
                        {post.category}
                      </span>
                      <div className={cn(
                        "text-[#3a4f6a] group-hover:text-[#0c1a2e] transition-colors transform duration-300",
                        isRTL ? "group-hover:-translate-x-1 group-hover:-translate-y-1" : "group-hover:translate-x-1 group-hover:-translate-y-1"
                      )}>
                        {isRTL ? (
                          <Iconify icon="solar:alt-arrow-left-up-linear" width={18} />
                        ) : (
                          <Iconify icon="solar:alt-arrow-right-up-linear" width={18} />
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[#0c1a2e] mb-2 group-hover:text-[#3b82f6] line-clamp-3 transition-colors" dir="auto">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#3a4f6a] line-clamp-2 font-medium leading-relaxed" dir="auto">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#0c1a2e]/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#f4f7f9] border border-[#0c1a2e]/10 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-[#3a4f6a]">CG</span>
                      </div>
                        <span className="text-xs text-[#0c1a2e] font-medium">{t.author}</span>
                    </div>
                    <span className="text-xs text-[#3a4f6a] flex items-center gap-1 font-medium">
                      <Iconify icon="solar:clock-circle-linear" width={11} />
                      {t.readTime.replace('{minutes}', post.readTime)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
