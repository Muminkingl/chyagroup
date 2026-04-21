"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { NewsPost } from '@/lib/news_fetch';
import { Iconify } from '@/components/ui/Iconify';

interface LatestNewsSectionProps {
  posts: NewsPost[];
}

export default function LatestNewsSection({ posts }: LatestNewsSectionProps) {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale];

  return (
    <section className="w-full py-24 bg-[#09090b] border-b border-white/5 relative overflow-hidden">
      {/* Background ambient glow - matching feature section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Iconify icon="solar:document-text-linear" className="text-white/70" />
              <span className="text-xs font-medium text-white/80 uppercase tracking-widest leading-none">
                {t.news.eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white text-start">
              {t.news.headline}
            </h2>
          </div>
          
          <Link 
            href="/news"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-white"
          >
            <span>{t.news.viewAll}</span>
            <Iconify 
              icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} 
              className={cn("text-lg transition-transform", isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1")} 
            />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((item) => (
            <article 
              key={item.id} 
              className="group flex flex-col rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:bg-white/[0.04] transition-colors"
            >
              <Link href={`/news/${item.id}`} className="block relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20">
                  <span className="px-3 py-1 text-[10px] font-semibold bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white/90 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </Link>
              
              <div className="flex flex-col flex-grow p-6 text-start">
                <time className="text-xs text-white/40 mb-3">{item.date}</time>
                <Link href={`/news/${item.id}`}>
                    <h3 className="text-xl font-medium text-white mb-3 line-clamp-2 group-hover:text-white/80 transition-colors">
                      {item.title}
                    </h3>
                </Link>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-6 font-light">
                  {item.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <Link 
                    href={`/news/${item.id}`} 
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    {t.news.readArticle}
                    <Iconify 
                        icon={isRTL ? "solar:arrow-left-up-linear" : "solar:arrow-right-up-linear"} 
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
