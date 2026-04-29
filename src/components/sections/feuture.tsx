"use client";
import React, { useRef } from 'react';
import { Iconify } from '@/components/ui/Iconify';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const FEATURE_CONFIG = [
  {
    id: 'general-trading',
    icon: 'solar:global-linear',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
    accent: '#3b6fd4',
  },
  {
    id: 'money-exchange',
    icon: 'solar:wallet-linear',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=600&auto=format&fit=crop',
    accent: '#2e9e6b',
  },
  {
    id: 'mobile-tech',
    icon: 'solar:smartphone-linear',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
    accent: '#8b5cf6',
  },
  {
    id: 'printing',
    icon: 'solar:printer-linear',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop',
    accent: '#e07b39',
  },
  {
    id: 'online-trading',
    icon: 'solar:cart-linear',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
    accent: '#e84040',
  },
];

export default function FeatureSection() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].features;

  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.15, triggerOnce: true });
  const [cardsRef, cardsVisible] = useIntersectionObserver({ threshold: 0.08, triggerOnce: true });

  const features = FEATURE_CONFIG.map((config, idx) => ({
    ...config,
    ...t.items[idx],
    num: String(idx + 1).padStart(2, '0'),
  }));

  return (
    <>
      <style>{`
        /* ── Header elements ── */
        .fs-eyebrow {
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.6s ease 0.05s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s;
        }
        .fs-eyebrow.in { opacity: 1; transform: translateY(0); }

        .fs-headline {
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.18s,
                      transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.18s;
        }
        .fs-headline.in { opacity: 1; transform: translateY(0); }

        .fs-desc {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.75s ease 0.34s, transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.34s;
        }
        .fs-desc.in { opacity: 1; transform: translateY(0); }

        .fs-pill {
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease 0.5s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s;
        }
        .fs-pill.in { opacity: 1; transform: translateY(0); }

        .fs-btn {
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.65s ease 0.65s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.65s;
        }
        .fs-btn.in { opacity: 1; transform: translateY(0); }

        .fs-quote {
          opacity: 0; transform: translateY(24px) scale(0.97);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s,
                      transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s;
        }
        .fs-quote.in { opacity: 1; transform: translateY(0) scale(1); }

        /* ── Cards staggered ── */
        .fs-card {
          opacity: 0; transform: translateY(40px) scale(0.97);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.3s ease;
        }
        .fs-card.in { opacity: 1; transform: translateY(0) scale(1); }
        .fs-card:nth-child(1) { transition-delay: 0.05s; }
        .fs-card:nth-child(2) { transition-delay: 0.17s; }
        .fs-card:nth-child(3) { transition-delay: 0.29s; }
        .fs-card:nth-child(4) { transition-delay: 0.41s; }
        .fs-card:nth-child(5) { transition-delay: 0.53s; }

        /* Card number — large decorative */
        .fs-card-num {
          font-size: 4.5rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          /* visible gradient number */
          background: linear-gradient(135deg, var(--accent) 0%, transparent 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.35;
          transition: opacity 0.3s ease;
          user-select: none;
          pointer-events: none;
        }
        .fs-card:hover .fs-card-num { opacity: 0.6; }

        /* Card image zoom */
        .fs-card-img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .fs-card:hover .fs-card-img { transform: scale(1.1); }

        /* Accent dot */
        .fs-accent-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        /* Icon ring glow on hover */
        .fs-icon-ring {
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }
        .fs-card:hover .fs-icon-ring {
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 15%, transparent);
        }

        /* Pill stat hover */
        .fs-stat:hover { background: rgba(12,26,46,0.06); border-radius: 999px; }

        /* Quote shimmer line */
        .fs-quote-line {
          height: 2px;
          background: linear-gradient(90deg, #8baef2 0%, #4a7ddf 50%, #8baef2 100%);
          background-size: 200% 100%;
          animation: shimmerLine 2.5s linear infinite;
          border-radius: 999px;
        }
        @keyframes shimmerLine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <section className="relative w-full overflow-hidden bg-[#faf9f6] pb-28">

        {/* Background image with gradients */}
        <div className="absolute top-0 left-0 w-full h-[850px] z-0 overflow-hidden">
          <img
            src="/chyaa.png"
            alt="Chya Group Background"
            className={`w-full h-full object-cover object-[85%_0%] transition-all duration-[2500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.05]'}`}
          />
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#faf9f6] via-[#faf9f6]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-[#faf9f6]/5 to-transparent pointer-events-none" />
          <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-[55%] h-full bg-gradient-to-${isRTL ? 'l' : 'r'} from-[#faf9f6]/90 via-[#faf9f6]/40 to-transparent pointer-events-none`} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32">

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className={`flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Left */}
            <div className={`flex flex-col max-w-xl ${isRTL ? 'text-right' : 'text-left'}`}>

              {/* Eyebrow */}
              <div className={`fs-eyebrow${headerVisible ? ' in' : ''} flex items-center gap-3 mb-5 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
                <span className="text-[12px] font-bold tracking-widest text-[#0c1a2e] uppercase">
                  OUR SECTORS
                </span>
              </div>

              <h2 className={`fs-headline${headerVisible ? ' in' : ''} text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-[#0c1a2e] leading-[1.05] tracking-tight mb-6`}>
                {t.headline.five} {t.headline.sectors}
                <br />
                {t.headline.one} <span className="text-[#162d4f]">{t.headline.vision}</span>
              </h2>

              <p className={`fs-desc${headerVisible ? ' in' : ''} text-[#1e293b] text-[16px] leading-[1.7] max-w-[480px] font-medium`}>
                Chya Group operates across five dynamic industries, spanning 14 branches with 44 professionals driving growth across the region.
              </p>

              {/* Stats Pill */}
              <div className={`fs-pill${headerVisible ? ' in' : ''} flex items-center gap-6 md:gap-8 bg-white/95 backdrop-blur-md rounded-[2rem] px-8 py-5 mt-10 border border-[#0c1a2e]/5 shadow-sm w-fit ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[
                  { icon: 'solar:users-group-rounded-linear', value: '14+', label: 'Branches' },
                  { icon: 'solar:buildings-2-linear', value: '44+', label: 'Professionals' },
                  { icon: 'solar:medal-ribbon-linear', value: 'One', label: 'Unified Vision' },
                ].map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    {i > 0 && <div className="w-px h-10 bg-[#0c1a2e]/10" />}
                    <div className={`fs-stat flex items-center gap-4 cursor-default transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-11 h-11 rounded-full border-[1.5px] border-[#0c1a2e]/10 flex items-center justify-center text-[#0c1a2e]">
                        <Iconify icon={stat.icon} width={22} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[20px] font-bold text-[#0c1a2e] leading-tight mb-0.5">{stat.value}</span>
                        <span className="text-[12px] font-medium text-[#3a4f6a]">{stat.label}</span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Button */}
              <div className={`fs-btn${headerVisible ? ' in' : ''} mt-10`}>
                <button className={`group px-8 py-3.5 bg-[#0c1a2e] hover:bg-[#162d4f] text-white rounded-full text-sm font-medium transition-all shadow-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>Our Journey</span>
                  <Iconify
                    icon={isRTL ? 'solar:arrow-left-linear' : 'solar:arrow-right-linear'}
                    width={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </div>

            {/* Quote card */}
            <div className={`fs-quote${headerVisible ? ' in' : ''} mt-12 lg:mt-[360px] lg:mr-16 z-20`}>
              <div className="bg-[#0c1424] rounded-[20px] p-6 w-full sm:w-[280px] shadow-2xl relative overflow-hidden group hover:-translate-y-1.5 transition-transform duration-300 border border-white/5">
                {/* animated shimmer line top */}
                <div className="w-16 h-[2px] bg-[#2563eb] mb-5" />

                <div className="text-[#2563eb] text-5xl font-serif leading-none h-8 mb-3 -ml-1">"</div>
                <p className={`text-white text-[14px] font-medium leading-[1.6] tracking-wide ${isRTL ? 'text-right' : 'text-left'}`}>
                  Diverse expertise.<br />
                  Unified purpose.<br />
                  Lasting impact.
                </p>

                {/* subtle glow orb */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-[#2563eb]/10 blur-2xl pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ── Cards Grid ── */}
          <div
            ref={cardsRef}
            className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mt-16 lg:mt-24 ${isRTL ? 'dir-rtl' : ''}`}
          >
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`fs-card${cardsVisible ? ' in' : ''} group relative bg-white/95 backdrop-blur-sm rounded-[1.5rem] overflow-hidden border border-white/70 shadow-sm hover:shadow-xl flex flex-col h-[420px] ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ '--accent': feature.accent } as React.CSSProperties}
              >
                {/* Card top content */}
                <div className="p-6 pb-3 flex flex-col flex-1 relative">

                  {/* Large decorative number — top right, visible & styled */}
                  <div
                    className="fs-card-num absolute top-3 right-4"
                    style={{ '--accent': feature.accent } as React.CSSProperties}
                  >
                    {feature.num}
                  </div>

                  {/* Icon */}
                  <div
                    className="fs-icon-ring w-12 h-12 rounded-full bg-[#f5f0ea] border border-[#0c1a2e]/8 flex items-center justify-center mb-5 shadow-sm"
                    style={{ color: feature.accent }}
                  >
                    <Iconify icon={feature.icon} width={22} />
                  </div>

                  {/* Accent dot + title */}
                  <div className={`flex items-start gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="fs-accent-dot mt-[7px]" style={{ '--accent': feature.accent } as React.CSSProperties} />
                    <h3 className="text-[13px] font-bold text-[#0c1a2e] leading-snug uppercase tracking-wide">
                      {feature.cardTitle}
                    </h3>
                  </div>

                  <p className="text-[11.5px] text-[#3a4f6a] leading-relaxed line-clamp-3">
                    {feature.contentBody}
                  </p>
                </div>

                {/* Bottom image */}
                <div className="h-[165px] relative mt-auto p-2.5">
                  <div className="w-full h-full rounded-[1rem] overflow-hidden relative">
                    <img
                      src={feature.image}
                      alt={feature.cardTitle}
                      className="fs-card-img w-full h-full object-cover"
                    />
                    {/* color-tinted overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-400"
                      style={{ background: feature.accent }}
                    />
                  </div>

                  {/* Arrow button — accent colored */}
                  <button
                    className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg z-10 scale-90 group-hover:scale-100`}
                    style={{ background: feature.accent }}
                  >
                    <Iconify icon={isRTL ? 'solar:arrow-left-linear' : 'solar:arrow-right-linear'} width={14} />
                  </button>
                </div>

                {/* Bottom accent line that grows on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-[1.5rem]"
                  style={{ background: feature.accent }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}