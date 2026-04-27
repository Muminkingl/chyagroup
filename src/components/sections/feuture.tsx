"use client";
import React from 'react';
import { Iconify } from '@/components/ui/Iconify';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

const FEATURE_CONFIG = [
  {
    id: 'general-trading',
    icon: 'solar:global-linear',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop', // Cargo / Ports
  },
  {
    id: 'money-exchange',
    icon: 'solar:wallet-linear',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=600&auto=format&fit=crop', // Finance / Money
  },
  {
    id: 'mobile-tech',
    icon: 'solar:smartphone-linear',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop', // Phone
  },
  {
    id: 'printing',
    icon: 'solar:printer-linear',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop', // Printer / Office
  },
  {
    id: 'online-trading',
    icon: 'solar:cart-linear',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop', // Stock / Online Trading charts
  },
];

export default function FeatureSection() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].features;

  const features = FEATURE_CONFIG.map((config, idx) => ({
    ...config,
    ...t.items[idx],
    num: `0${idx + 1}`
  }));

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f0ea] pb-24">
      {/* Background Image Container with Gradient */}
      <div className="absolute top-0 left-0 w-full h-[850px] z-0">
        <img
          src="/chyabank.png"
          alt="Chya Group Building"
          className="w-full h-full object-cover object-[85%_10%]"
        />
        {/* Top gradient to seamlessly blend with the previous #f5f0ea section */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#f5f0ea] via-[#f5f0ea]/80 to-transparent z-10" />

        {/* Bottom gradient to blend into the rest of the #f5f0ea section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0ea] via-[#f5f0ea]/10 to-transparent pointer-events-none" />

        {/* Strong horizontal gradient on the left to ensure text readability over the sky */}
        <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-[65%] h-full bg-gradient-to-${isRTL ? 'l' : 'r'} from-[#f5f0ea]/95 via-[#f5f0ea]/60 to-transparent pointer-events-none`} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32">

        {/* Top Header Section */}
        <div className={`flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

          {/* Left Content */}
          <div className={`flex flex-col max-w-xl ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-[11px] font-bold tracking-widest text-[#e84040] uppercase mb-4">
              OUR SECTORS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.8rem] font-bold text-[#0c1a2e] leading-[1.05] tracking-tight mb-6 drop-shadow-sm">
              {t.headline.five} {t.headline.sectors}
              <br />
              {t.headline.one} {t.headline.vision}
            </h2>
            <p className="text-[#3a4f6a] text-[15px] leading-relaxed max-w-[420px]">
              {t.description}
            </p>

            {/* Stats Pill */}
            <div className={`flex items-center gap-5 md:gap-7 bg-[#f5f0ea]/90 backdrop-blur-md rounded-full px-7 py-4 mt-10 border border-[#0c1a2e]/10 shadow-sm w-fit ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-full border border-[#0c1a2e]/10 flex items-center justify-center text-[#0c1a2e]">
                  <Iconify icon="solar:users-group-rounded-linear" width={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[#0c1a2e] leading-tight">14+</span>
                  <span className="text-[10px] font-medium text-[#3a4f6a]">Branches</span>
                </div>
              </div>

              <div className="w-px h-8 bg-[#0c1a2e]/10" />

              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-full border border-[#0c1a2e]/10 flex items-center justify-center text-[#0c1a2e]">
                  <Iconify icon="solar:user-linear" width={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[#0c1a2e] leading-tight">44+</span>
                  <span className="text-[10px] font-medium text-[#3a4f6a]">Professionals</span>
                </div>
              </div>

              <div className="w-px h-8 bg-[#0c1a2e]/10" />

              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-full border border-[#0c1a2e]/10 flex items-center justify-center text-[#0c1a2e]">
                  <Iconify icon="solar:chart-square-linear" width={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[#0c1a2e] leading-tight">One</span>
                  <span className="text-[10px] font-medium text-[#3a4f6a]">Unified Vision</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <button className={`mt-10 px-8 py-3.5 bg-[#0c1a2e] hover:bg-[#162d4f] text-white rounded-full text-sm font-medium transition-all shadow-sm flex items-center gap-2 w-fit ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>Our Journey</span>
              <Iconify icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width={16} />
            </button>
          </div>

          {/* Right Content - Floating Quote Card */}
          <div className="mt-12 lg:mt-[380px] lg:mr-16 z-20">
            <div className="bg-[#10203a] rounded-[24px] p-8 w-full sm:w-[360px] shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-white/10">
              <div className="text-[#8baef2]/80 text-6xl font-serif leading-none h-10 mb-4 -ml-2">
                “
              </div>
              <p className={`text-white text-[18px] font-medium leading-[1.6] tracking-wide ${isRTL ? 'text-right' : 'text-left'}`}>
                Diverse expertise.<br />
                Unified purpose.<br />
                Lasting impact.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mt-16 lg:mt-24 ${isRTL ? 'dir-rtl' : ''}`}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-[#fcfcfb]/95 backdrop-blur-sm rounded-[1.5rem] overflow-hidden border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[400px] group ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {/* Card Top / Text */}
              <div className="p-6 pb-4 flex flex-col flex-1 relative">
                <div className="text-[2.5rem] font-bold text-[#0c1a2e]/5 absolute top-5 right-5 pointer-events-none transition-all duration-300 group-hover:text-[#0c1a2e]/10">
                  {feature.num}
                </div>

                <div className="w-12 h-12 rounded-full bg-[#f5f0ea] border border-[#0c1a2e]/5 flex items-center justify-center text-[#0c1a2e] mb-6 shadow-sm">
                  <Iconify icon={feature.icon} width={22} />
                </div>

                <h3 className="text-base font-bold text-[#0c1a2e] mb-3 leading-tight pr-4">
                  {/* Assuming title could be long, letting it break nicely */}
                  {feature.cardTitle.split('&').map((part, i) => (
                    <React.Fragment key={i}>
                      {part}
                      {i === 0 && feature.cardTitle.includes('&') && ' & '}
                      {i === 0 && feature.cardTitle.includes('&') && <br />}
                    </React.Fragment>
                  ))}
                </h3>

                <p className="text-xs text-[#3a4f6a] leading-relaxed line-clamp-3 pr-2">
                  {feature.contentBody}
                </p>
              </div>

              {/* Card Bottom / Image */}
              <div className="h-[160px] relative mt-auto p-2">
                <div className="w-full h-full rounded-[1rem] overflow-hidden relative">
                  <img
                    src={feature.image}
                    alt={feature.cardTitle}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#0c1a2e]/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Embedded Button */}
                <button className={`absolute bottom-5 ${isRTL ? 'right-5' : 'left-5'} w-8 h-8 bg-[#0c1a2e] hover:bg-[#1a365d] rounded-full flex items-center justify-center text-white transition-colors shadow-lg z-10`}>
                  <Iconify icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}