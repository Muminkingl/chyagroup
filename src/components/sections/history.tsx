"use client";

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import Link from 'next/link';
import { Iconify } from '../ui/Iconify';

export default function ChyaHistorySection() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].history;

  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="history"
      ref={ref}
      className="relative w-full min-h-[700px] lg:min-h-[85vh] overflow-hidden -mt-1 z-10"
      style={{ background: '#f5f0ea' }}
    >
      {/* Top blend gradient to hide hero seam and integrate with Earth atmosphere */}
      <div className="absolute -top-6 left-0 right-0 h-18 bg-gradient-to-b from-transparent via-[#f5f0ea]/50 to-[#f5f0ea] z-30 pointer-events-none" />

      {/* Skyscraper image — right side */}
      <div
        className={`absolute bottom-0 top-0 ${isRTL ? 'left-0' : 'right-0'} w-full sm:w-[65%] lg:w-[55%] h-full`}
      >
        <img
          src="/sky.jpg"
          alt="Modern City Skyline"
          className={`w-full h-full object-cover ${isRTL ? 'object-left' : 'object-right'}`}
          style={{
            maskImage: `linear-gradient(to ${isRTL ? 'right' : 'left'}, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)`,
            WebkitMaskImage: `linear-gradient(to ${isRTL ? 'right' : 'left'}, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)`,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
            filter: 'brightness(1.05) contrast(1.05)',
          }}
        />
      </div>

      {/* Content — left aligned */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex items-center min-h-[700px] lg:min-h-[85vh]">
        <div className={`max-w-lg py-24 lg:py-32 ${isRTL ? 'ms-auto text-right' : 'text-left'}`}>

          {/* Eyebrow badge */}
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[#0c1a2e]/10 bg-[#0c1a2e]/5 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <Iconify icon="solar:buildings-linear" className="text-[#0c1a2e]/60" width={16} />
            <span className="text-xs font-medium text-[#0c1a2e]/70 uppercase tracking-widest">{t.eyebrow}</span>
          </div>

          {/* Main headline */}
          <h2 className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#0c1a2e] leading-[1.08] transition-all duration-1000 delay-150",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            {t.title}
            <span className="block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-[#0c1a2e]/40">
              {t.since}
            </span>
          </h2>

          {/* Description */}
          <p className={cn(
            "mt-8 text-base md:text-lg text-[#0c1a2e]/55 font-light leading-relaxed max-w-md transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            {t.description}
          </p>

          {/* CTA Button */}
          <div className={cn(
            "mt-10 transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <Link
              href="/about#history"
              className={`group inline-flex items-center justify-center gap-2 bg-[#0c1a2e] text-white font-semibold h-[46px] rounded-full ps-6 pe-5 text-sm hover:bg-[#162d4f] transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              <span className="text-nowrap">{t.readMore}</span>
              {isRTL ? (
                <Iconify icon="solar:alt-arrow-left-linear" className="ms-1 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              ) : (
                <Iconify icon="solar:alt-arrow-right-linear" width={16} className="ms-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Soft blend transition to next section */}
      <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[#f5f0ea] z-30 blur-[2px] pointer-events-none" />
    </section>
  );
}
