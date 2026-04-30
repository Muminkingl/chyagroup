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
    <section dir="ltr" className="w-full py-24 md:py-32 relative overflow-hidden" style={{ background: '#faf9f6' }}>
      {/* Decorative arc grid — top right corner */}
      <svg
        className={`absolute top-0 ${isRTL ? 'left-0 scale-x-[-1]' : 'right-0'} w-[250px] h-[250px] opacity-[0.07] pointer-events-none z-0`}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[80, 120, 160, 200, 240].map((r) => (
          <circle key={r} cx="300" cy="0" r={r} stroke="#0c1a2e" strokeWidth="0.8" />
        ))}
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header area */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className={`flex items-center gap-3 mb-5 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
              <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
              <span dir="auto" className="text-[12px] font-bold tracking-widest text-[#0c1a2e] uppercase">
                {t.news.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h2 dir="auto" className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight text-[#0c1a2e] leading-[1.1] mb-5">
              {t.news.headline}{' '}
              <span className="font-semibold italic text-[#162d4f]">{t.news.headlineAccent}</span>
            </h2>

            {/* Subtitle */}
            <p dir="auto" className={`text-[15px] ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#3a4f6a]'} leading-relaxed max-w-md ${isRTL ? 'ml-auto' : ''}`}>
              {t.news.subtitle}
            </p>
          </div>

          {/* View All button */}
          <Link
            href="/news"
            className={`group inline-flex items-center gap-2.5 px-6 h-[46px] rounded-full bg-[#0c1a2e] text-white text-sm font-semibold hover:bg-[#162d4f] transition-all duration-300 shadow-sm hover:shadow-md shrink-0 self-start md:self-end ${isRTL ? 'flex-row-reverse ml-auto md:ml-0' : ''}`}
          >
            <Iconify icon="solar:document-text-linear" className="w-4 h-4 opacity-80" />
            <span className="text-nowrap">{t.news.viewAll}</span>
            {isRTL ? (
              <Iconify icon="solar:arrow-left-linear" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            ) : (
              <Iconify icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            )}
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {posts.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col rounded-2xl bg-white/70 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#0c1a2e]/5 hover:-translate-y-1"
            >
              {/* Image */}
              <Link href={`/news/${item.id}`} className="block relative h-56 sm:h-60 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category badge */}
                <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                  <span className="px-3.5 py-1.5 text-[10px] font-bold bg-[#0c1a2e] rounded-full text-white uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </Link>

              {/* Card body */}
              <div className={`flex flex-col flex-grow p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {/* Date with icon */}
                <div className={`flex items-center gap-2 mb-3.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Iconify icon="solar:calendar-minimalistic-linear" className="w-3.5 h-3.5 text-[#0c1a2e]/35" />
                  <time className="text-xs font-medium text-[#0c1a2e]/40 tracking-wide">{item.date}</time>
                </div>

                {/* Title */}
                <Link href={`/news/${item.id}`}>
                  <h3 className="text-lg font-bold text-[#0c1a2e] leading-snug mb-3 line-clamp-2 group-hover:text-[#162d4f] transition-colors">
                    {item.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-sm text-[#3a4f6a]/60 leading-relaxed line-clamp-3 mb-6 font-normal">
                  {item.excerpt}
                </p>

                {/* Read article link */}
                <div className="mt-auto">
                  <Link
                    href={`/news/${item.id}`}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#0c1a2e] hover:text-[#162d4f] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {t.news.readArticle}
                    {isRTL ? (
                      <Iconify icon="solar:arrow-left-linear" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    ) : (
                      <Iconify icon="solar:arrow-right-linear" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    )}
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
