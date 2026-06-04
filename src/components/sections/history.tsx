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

  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15, triggerOnce: true });

  return (
    <>
      <style>{`
        @keyframes historyImageIn {
          0%   { opacity: 0; transform: translateX(${isRTL ? '-4%' : '4%'}) scale(1.04); }
          100% { opacity: 1; transform: translateX(0%) scale(1); }
        }
        @keyframes historyLineGrow {
          0%   { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes historyShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .history-image-wrap {
          opacity: 0;
          transform: translateX(${isRTL ? '-4%' : '4%'}) scale(1.04);
          transition: opacity 1.3s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 1.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .history-image-wrap.visible {
          opacity: 1;
          transform: translateX(0%) scale(1);
        }

        .history-line {
          transform-origin: ${isRTL ? 'right' : 'left'};
          transform: scaleX(0);
          opacity: 0;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                      opacity 0.5s ease 0.2s;
        }
        .history-line.visible {
          transform: scaleX(1);
          opacity: 1;
        }

        .history-badge {
          opacity: 0;
          transform: translateY(14px) scale(0.95);
          transition: opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
        }
        .history-badge.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .history-title {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.25s,
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.25s;
        }
        .history-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .history-title-italic {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.4s,
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.4s;
        }
        .history-title-italic.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .history-desc {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.55s,
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.55s;
        }
        .history-desc.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .history-cta {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.72s,
                      transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.72s;
        }
        .history-cta.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section
        id="history"
        dir="ltr"
        ref={ref}
        className="relative w-full min-h-[700px] lg:min-h-[85vh] overflow-hidden -mt-1 z-10"
        style={{ background: '#faf9f6' }}
      >
        {/* Top blend gradient */}
        <div className="absolute -top-6 left-0 right-0 h-18 bg-gradient-to-b from-[#faf9f6] via-[#faf9f6]/80 to-transparent z-30 pointer-events-none" />

        {/* Skyscraper image — animated entrance, always on the RIGHT */}
        <div
          className={`history-image-wrap${isVisible ? ' visible' : ''} absolute bottom-0 top-0 right-0 w-full sm:w-[65%] lg:w-[55%] h-full`}
        >
          <img
            src="/sky.jpg"
            alt="Modern City Skyline"
            className="w-full h-full object-cover object-right opacity-[0.45] sm:opacity-100"
            style={{
              maskImage: `linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)`,
              WebkitMaskImage: `linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)`,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'destination-in',
              filter: 'brightness(1.05) contrast(1.05)',
            }}
          />
        </div>

        {/* Mobile readability overlay */}
        <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#faf9f6] via-[#faf9f6]/80 to-transparent sm:hidden z-10 pointer-events-none`} />

        {/* Content — dir=ltr keeps layout fixed; individual text uses dir=auto */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center min-h-[700px] lg:min-h-[85vh]">
          <div className="max-w-lg py-24 lg:py-32 text-left">

            {/* Eyebrow */}
            <div className={`history-badge${isVisible ? ' visible' : ''} flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
              <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
              <span dir="auto" className={`font-bold text-[#0c1a2e] uppercase ${isRTL ? 'text-[15px] tracking-normal' : 'text-[12px] tracking-widest'}`}>
                {t.eyebrow}
              </span>
            </div>

            {/* Main headline */}
            <h2 dir="auto" className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.08]">
              <span className={`block history-title${isVisible ? ' visible' : ''}`}>
                {locale === 'en' ? (
                  <>
                    <span className="text-[#e84040]">CHYA</span>{' '}
                    <span className="text-[#0a2a56]">GROUP</span>
                  </>
                ) : locale === 'ar' ? (
                  <>
                    <span className="text-[#0a2a56]">مجموعة</span>{' '}
                    <span className="text-[#e84040]">چیا</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#e84040]">چیا</span>{' '}
                    <span className="text-[#0a2a56]">گرووپ</span>
                  </>
                )}
              </span>
              <span className={`block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium italic text-[#0a2a56] history-title-italic${isVisible ? ' visible' : ''}`}>
                {t.since}
              </span>
            </h2>

            {/* Description */}
            <p dir="auto" className={`history-desc${isVisible ? ' visible' : ''} mt-8 text-base md:text-lg ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#0c1a2e]/55 font-light'} leading-relaxed max-w-md text-justify`}>
              {t.description}
            </p>

            {/* CTA Button */}
            <div className={`history-cta${isVisible ? ' visible' : ''} mt-10`}>
              <Link
                href="/about#history"
                className="group inline-flex items-center justify-center gap-2 bg-[#0c1a2e] text-white font-semibold h-[46px] rounded-full ps-6 pe-5 text-sm hover:bg-[#162d4f] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span className="text-nowrap" dir="auto">{t.readMore}</span>
                <Iconify icon="solar:alt-arrow-right-linear" width={16} className="ms-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle bridge transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#faf9f6] to-transparent z-30 pointer-events-none" />
      </section>
    </>
  );
}