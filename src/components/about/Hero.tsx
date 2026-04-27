"use client";

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '../ui/Iconify';

export default function Hero() {
  const { locale } = useLanguage();
  const t = translations[locale].about.hero;

  return (
    <div className="relative h-[75vh] min-h-[580px] w-full overflow-hidden flex items-start">

      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: 'url("https://i.ibb.co/cX16crDh/7b79b4a1-c630-4d4f-88d0-2d7ced15ebd9.png")',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Gradient overlay — very opaque light at top so dark text reads clearly */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(240,247,255,0.75) 0%,
              rgba(220,235,255,0.55) 30%,
              rgba(12,26,46,0.55) 65%,
              rgba(12,26,46,1) 100%
            )
          `
        }}
      />

      {/* Content — pushed down from top to clear the fixed header */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto w-full pt-32 md:pt-36">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-6 h-[2px] bg-red-600 rounded-full"></span>
          <span className="text-xs font-bold tracking-[0.25em] text-[#1e3a5f] uppercase">
            {t.eyebrow}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0c1a2e] mb-6">
          {t.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-[#1e3a5f] max-w-2xl mx-auto font-semibold leading-relaxed">
          {t.description}
        </p>
      </div>

      {/* Bottom Navy Fade */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0c1a2e] to-transparent z-20"></div>
    </div>
  );
}