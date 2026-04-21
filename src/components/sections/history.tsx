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
  
  // Using a threshold of 0.3 means the animation triggers when 30% of the section is visible
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });

  return (
    <section 
      id="history"
      ref={ref} 
      className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#09090b]"
    >
      {/* Background Image with Parallax/Scale effect */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-transform duration-[2000ms] ease-out",
          isVisible ? "scale-100" : "scale-110"
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Modern City Skyline"
          className="w-full h-full object-cover object-center opacity-50"
        />
        
        {/* Sophisticated Gradient Overlays for depth and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />

        {/* Fades - These MUST be on top to blend into #09090b perfectly */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#09090b] via-[#09090b]/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent z-10" />
      </div>


      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Animated Eyebrow Badge */}
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-black/30 backdrop-blur-md transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Iconify icon="solar:buildings-linear" className="text-white/70" />
          <span className="text-xs font-medium text-white/80 uppercase tracking-widest">{t.eyebrow}</span>
        </div>

        {/* Primary Headline */}
        <h2 className={cn(
          "text-5xl md:text-8xl lg:text-[7rem] font-semibold tracking-tighter text-white leading-[1.05] transition-all duration-1000 delay-150",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {t.title}
          <span className="block mt-2 md:mt-4 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 text-4xl md:text-6xl lg:text-7xl">
            {t.since}
          </span>
        </h2>

        {/* Subtitle / Context */}
        <p className={cn(
          "mt-8 max-w-xl mx-auto text-lg md:text-xl text-white/50 font-light leading-relaxed transition-all duration-1000 delay-300",
           isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {t.description}
        </p>

        {/* Primary Action Button */}
        <div className={cn(
          "mt-12 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <Link 
            href="/about#history"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-medium text-black bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <span className="relative z-10 font-semibold tracking-wide">{t.readMore}</span>
            <Iconify 
              icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} 
              className={cn(
                "text-lg relative z-10 transition-transform duration-300",
                isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
              )}
            />
            {/* Subtle highlight effect on hover inside the button */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </Link>
        </div>
      </div>

    </section>
  );
}
