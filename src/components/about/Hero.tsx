"use client";

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '../ui/Iconify';

export default function Hero() {
  const { locale } = useLanguage();
  const t = translations[locale].about.hero;

  return (
    <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* High-quality contextual background image (urban/corporate architecture) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transform scale-105"
        style={{ 
          backgroundImage: 'url("https://aknafalsawary.com/wp-content/uploads/2024/06/Erbil-City.jpg")',
          backgroundAttachment: 'fixed' // Parallax effect
        }}
      />
      
      {/* Complex gradient overlay to ensure text readability and set the mood */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#09090b]/80 via-[#09090b]/60 to-[#09090b]"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-16">
        <div className="inline-flex items-center gap-2 mb-6">
          <Iconify icon="solar:star-fall-bold-duotone" className="text-amber-400 text-xl" />
          <span className="text-sm font-medium tracking-wide text-zinc-300 uppercase">{t.eyebrow}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 drop-shadow-lg">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
          {t.description}
        </p>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#09090b] to-transparent z-20"></div>
    </div>
  );
}
