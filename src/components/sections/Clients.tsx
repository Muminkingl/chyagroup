"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

const actualLogos = [
  { name: "FIB", logo: "/fib.png" },
  { name: "Switch", logo: "/switch.png" },
  { name: "Zain Cash", logo: "https://zaincash.com/static/media/ZainCashLogo.fea8cf3bb90421f45dd384d6afc6fe3b.svg" },
  { name: "Qi Card", logo: "/qi.png" },
  { name: "AIIB", logo: "/aiib.png" },
  { name: "Blue", logo: "/blue.jpg" },
  { name: "Aciapay", logo: "/aciapay.png" },
  { name: "Fast Pay", logo: "https://www.fast-pay.iq/img/clogo.png" },
  { name: "Bazarcard", logo: "/bazarcard.jpg" },
  { name: "Houzz", logo: "/houzz.png" },
  { name: "Nassepayment", logo: "/nassepay.png" },
  { name: "Nasswallet", logo: "/nass.png" },
  { name: "Shift", logo: "/shiftt.png" },
  { name: "Dubairemit", logo: "/dubairemit.png" },
];

// Duplicate logos to fill the grid
const brands = [...actualLogos, ...actualLogos, ...actualLogos];

const BrandCard = ({ name, logo }: { name: string, logo: string }) => {
  return (
    <div className="flex items-center justify-center bg-white rounded-[12px] border border-[#0c1a2e]/[0.04] p-4 h-[75px] md:h-[85px] lg:h-[95px] shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
      <img 
        src={logo} 
        alt={`${name} Logo`} 
        className="max-w-[75%] max-h-[70%] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
};

export default function ClientsSection() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].clients;

  return (
    <section dir="ltr" id="clients" className="bg-[#faf9f6] py-20 md:py-28 z-10 font-sans border-t border-[#0c1a2e]/5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
            <span dir="auto" className="text-[12px] font-bold tracking-widest text-[#0c1a2e] uppercase">
              {t.eyebrow}
            </span>
          </div>
          <h2 dir="auto" className="text-[32px] md:text-[40px] lg:text-[46px] font-bold tracking-tight text-[#0c1a2e] mb-5">
            {t.headline.trusted} <span className="text-[#162d4f]">{t.headline.worldwide}</span>
          </h2>
          <p dir="auto" className={`text-[14px] md:text-[15px] ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#3a4f6a]'} max-w-2xl leading-relaxed`}>
            {t.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4 lg:gap-5">
          {brands.map((brand, index) => (
            <BrandCard key={index} name={brand.name} logo={brand.logo} />
          ))}
        </div>

      </div>
    </section>
  );
}
