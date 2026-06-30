"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

const actualLogos = [
  { name: "Tip Top", logo: "/clients/tiptop.png", scale: 1.20 },
  { name: "Huawei", logo: "/clients/huawei.png", scale: 1.35 },
  { name: "Team Mart", logo: "/clients/teammart.png", scale: 1.3 },
  { name: "Swiss Market", logo: "/clients/swissmarket.png", scale: 1.5 },
  { name: "Mini Slava", logo: "/clients/minislava.png", scale: 1.14 },
  { name: "UTEST Group", logo: "/clients/utest.png", scale: 1.20 },
  { name: "King İnşaat", logo: "/clients/kinginsaat.png", scale: 1.15 },
  { name: "King Natural", logo: "/clients/kingnature.png", scale: 1.3 },
  { name: "BRZ", logo: "/clients/brz.png", scale: 1.45 },
  { name: "Kadeer", logo: "/clients/kadeer.png", scale: 1.15 },
  { name: "Modest Art", logo: "/clients/xx.png", scale: 1.20 }, 
  { name: "Al Essam Cars", logo: "/clients/alessam.png", scale: 1.2 },
  { name: "Hersh", logo: "/clients/hersh.png", scale: 1.2 },
  { name: "Auto Plus", logo: "/clients/autoplus.png", scale: 1.2 },
  { name: "Super Star", logo: "/clients/superstar.png", scale: 1.6 },
  { name: "Terrapack", logo: "/clients/terrapack.png", scale: 1.59 },
  { name: "Dyar", logo: "/clients/dyarrealestate.png", scale: 1.3 },
  { name: "Haji Hussein", logo: "/clients/hajihussin.png", scale: 1.35 },
  { name: "Jihany Camera", logo: "/clients/cameraworld.png", scale: 1.5 },
  { name: "M One Store", logo: "/clients/mone.png", scale: 1.3 },
  { name: "Optimal Krd", logo: "/clients/target.png", scale: 1.69 },
  { name: "Maowj Al Dawa", logo: "/clients/maowialdawa.png", scale: 1.21 },
  { name: "Pharmatech", logo: "/clients/pharmatech.png", scale: 1.3 },
  { name: "Rose Land", logo: "/clients/rosaland.png", scale: 1.15 },
  { name: "Dol", logo: "/clients/dolcom.png", scale: 1.18 },
  { name: "mega", logo: "/clients/mega.png", scale: 1.18 },
 { name: "Mashkaly Mall", logo: "/clients/mashxal.png", scale: 1.3 },
  { name: "House Care", logo: "/clients/housecare.png", scale: 1.35 },
  { name: "Rotana Erbil", logo: "/clients/rotanaerbil.png", scale: 1.2 },
   { name: "Max Motors", logo: "/clients/1A.png", scale: 1.2 }, 
  { name: "Velora Travel", logo: "/clients/verola.png", scale: 1.40 },
  { name: "Jaffa Travel", logo: "/clients/jaffa.png", scale: 1.25 },
  { name: "Skip City", logo: "/clients/skipcity.png", scale: 1.2 },
  { name: "Business Class", logo: "/clients/businssclas.png", scale: 1.55 },
  { name: "Delman Brand", logo: "/clients/delman.png", scale: 1.3 },
  { name: "Milan Class", logo: "/clients/milan.png", scale: 1.35 },
  { name: "Peak Sport", logo: "/clients/peak.png", scale: 1.3 },
  { name: "Samen", logo: "/clients/samen.png", scale: 1.3 },
  { name: "Banaz Drug Store", logo: "/clients/banaz.png", scale: 1.28 },
  { name: "Bekhal", logo: "/clients/bekhal.png", scale: 1.25 },
  { name: "Wrdilan", logo: "/clients/wrdilan.png", scale: 1.25 },
  { name: "Bey Zade", logo: "/clients/beyzada.png", scale: 1.2 }
];

// Use the 40 unique logos directly without duplication
const brands = actualLogos;

const BrandCard = ({ name, logo, scale = 1 }: { name: string, logo: string, scale?: number }) => {
  const isOptimal = name === "Optimal Krd";

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white rounded-[12px] border border-[#0c1a2e]/[0.04] p-1 md:p-1.5 h-[100px] md:h-[115px] lg:h-[125px] shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden">
      <div className={`w-full flex items-center justify-center ${isOptimal ? 'h-[68%] md:h-[72%]' : 'h-full'}`}>
        <img
          src={logo}
          alt={`${name} Logo`}
          style={{ transform: `scale(${scale})` }}
          className="w-full h-full max-w-[96%] max-h-[92%] object-contain opacity-95 group-hover:opacity-100 transition-all duration-300"
        />
      </div>
      {isOptimal && (
        <span className="text-[11px] md:text-[12px] font-bold text-black select-none tracking-wide text-center leading-none mt-1">
          Optimal
        </span>
      )}
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
            <span dir="auto" className={`font-bold text-[#0c1a2e] uppercase ${isRTL ? 'text-[15px] tracking-normal' : 'text-[12px] tracking-widest'}`}>
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
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-5">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="w-[calc(50%-6px)] sm:w-[calc(33.33%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(16.66%-17px)] xl:w-[calc(16.66%-17px)] flex-shrink-0"
            >
              <BrandCard name={brand.name} logo={brand.logo} scale={brand.scale} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
