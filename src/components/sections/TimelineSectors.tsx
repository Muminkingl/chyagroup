"use client";
import React from 'react';
import Image from 'next/image';
import { Iconify } from '@/components/ui/Iconify';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

const SECTOR_CONFIG = [
  {
    id: 'general-trading',
    icon: 'ph:globe-light',
    color: '#3b82f6',
    bgColor: '#eff6ff',
  },
  {
    id: 'money-exchange',
    icon: 'solar:dollar-linear',
    color: '#22c55e',
    bgColor: '#f0fdf4',
    customSvg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
        <path d="M14 9H11.5C10.6716 9 10 9.67157 10 10.5C10 11.3284 10.6716 12 11.5 12H12.5C13.3284 12 14 12.6716 14 13.5C14 14.3284 13.3284 15 12.5 15H10M12 8V9M12 15V16M18 12H18.01M6 12H6.01M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2ZM18.5 12C18.5 12.2761 18.2761 12.5 18 12.5C17.7239 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.7239 11.5 18 11.5C18.2761 11.5 18.5 11.7239 18.5 12ZM6.5 12C6.5 12.2761 6.27614 12.5 6 12.5C5.72386 12.5 5.5 12.2761 5.5 12C5.5 11.7239 5.72386 11.5 6 11.5C6.27614 11.5 6.5 11.7239 6.5 12Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'mobile-tech',
    icon: 'solar:smartphone-linear',
    color: '#a855f7',
    bgColor: '#faf5ff',
  },
  {
    id: 'printing',
    icon: 'ph:printer-light',
    color: '#f97316',
    bgColor: '#fff7ed',
  },
  {
    id: 'online-trading',
    icon: 'ph:handbag-light',
    color: '#ef4444',
    bgColor: '#fef2f2',
  },
];

// Map each brand name keyword to the correct logo file
const BRAND_LOGOS: Record<string, string> = {
  'lammat': '/brands/lamatalmarjan.png',
  'لمة': '/brands/lamatalmarjan.png',
  'لمعة': '/brands/lamatalmarjan.png',
  'mateen': '/brands/chyaymaten.png',
  'متين': '/brands/chyaymaten.png',
  'مەتین': '/brands/chyaymaten.png',
  'amazon': '/brands/Chya Amazon-1.png',
  'أمازون': '/brands/Chya Amazon-1.png',
  'ئەمازۆن': '/brands/Chya Amazon-1.png',
  'khaki': '/brands/khakisarwar.png',
  'خاكي': '/brands/khakisarwar.png',
  'خاکی': '/brands/khakisarwar.png',
  'hangaw': '/brands/hangawexchange.png',
  'هەنگاو': '/brands/hangawexchange.png',
  'dibaga': '/brands/Manfaz Dibaga-1.png',
  'ديبكة': '/brands/Manfaz Dibaga-1.png',
  'ديکبە': '/brands/Manfaz Dibaga-1.png',
  'lutkay': '/brands/lutkay chya-1.png',
  'لوتکەی': '/brands/lutkay chya-1.png',
  'لوتكاي': '/brands/lutkay chya-1.png',
  'barzy': '/brands/BARZY CHYAY-1.png',
  'بەرزى': '/brands/BARZY CHYAY-1.png',
  'بەرزی': '/brands/BARZY CHYAY-1.png',
  'بـەرزى': '/brands/BARZY CHYAY-1.png',
  // Money exchange standalone "Chya" = chyaexchange
  // We handle this below with index logic; fallback to chyaexchange for 'chya' in money-exchange
  'phone': '/brands/chya phone-1.png',
  'فۆن': '/brands/chya phone-1.png',
  'فون': '/brands/chya phone-1.png',
  'tech': '/brands/chyatech.png',
  'تێك': '/brands/chyatech.png',
  'تيك': '/brands/chyatech.png',
  'blue print': '/brands/BLUE PRINT-1.png',
  'بلو برێنتینگ': '/brands/BLUE PRINT-1.png',
  'بلو پرێنتینگ': '/brands/BLUE PRINT-1.png',
  'بلو برينتينغ': '/brands/BLUE PRINT-1.png',
  'travel': '/brands/CHYA travel-1.png',
  'تڕاڤڵ': '/brands/CHYA travel-1.png',
  'ترافيل': '/brands/CHYA travel-1.png',
  'kiva': '/brands/kivaluxary.png',
  'کیڤا': '/brands/kivaluxary.png',
  'كيفا': '/brands/kivaluxary.png',
};

function getLogoSrc(item: string, sectorId: string): string | null {
  const lower = item.toLowerCase();

  // Check all keyword mappings
  for (const [key, src] of Object.entries(BRAND_LOGOS)) {
    if (lower.includes(key.toLowerCase())) return src;
  }

  // Special: standalone "Chya" / "چیا" in money-exchange sector → use main group logo
  if (sectorId === 'money-exchange' && (lower === 'chya' || item === 'چیا' || item === 'چيا')) {
    return '/logo.svg';
  }
  // Chya gold  = no dedicated logo → use chyaexchange as closest
  if ((lower.includes('gold') || item.includes('گۆڵد') || item.includes('غولد'))) {
    return '/brands/chyaexchnage.png';
  }

  return null;
}

function ItemRow({ item, sectorId }: { item: string; sectorId: string }) {
  const logo = getLogoSrc(item, sectorId);
  return (
    <li className="flex items-center gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] flex-shrink-0" />
      {logo ? (
        <div className="flex-shrink-0 flex items-center justify-center w-[54px] h-10">
          <Image
            src={logo}
            alt={item}
            width={120}
            height={60}
            className={`w-full h-full object-contain ${
              logo.endsWith('.svg')
                ? ''
                : logo.includes('kiva')
                  ? 'scale-[1.1] origin-center'
                  : 'scale-[1.65] origin-center'
            }`}
          />
        </div>
      ) : (
        <div className="flex-shrink-0 flex items-center justify-center w-[54px]">
          <span className="text-[11px] font-bold text-gray-400">{item.charAt(0)}</span>
        </div>
      )}
      <span className="leading-tight text-[#0c1a2e] font-medium text-[12.5px] xl:text-[13px]">{item}</span>
    </li>
  );
}

export default function TimelineSectors() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].timelineSectors;

  const sectors = SECTOR_CONFIG.map((config, idx) => ({
    ...config,
    ...t.sectors[idx],
  }));

  return (
    <section dir="ltr" className="relative w-full bg-[#faf9f6] pt-12 pb-24 z-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
            <span dir="auto" className="text-[12px] font-bold tracking-widest text-[#0c1a2e] uppercase">
              {t.eyebrow}
            </span>
          </div>
          <h2 dir="auto" className="text-[36px] md:text-[46px] font-bold tracking-tight text-[#0c1a2e] mb-5 leading-tight">
            {t.headline.diverse} {t.headline.unified} <span className="text-[#162d4f]">{t.headline.vision}</span>
          </h2>
          <p dir="auto" className={`text-[14px] md:text-[15px] ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#3a4f6a]'} max-w-xl leading-relaxed`}>
            {t.subtitle}
          </p>
        </div>

        {/* ── DESKTOP TIMELINE (lg+) ── */}
        <div className="hidden lg:flex relative w-full items-stretch justify-between">

          {/* Horizontal dotted line */}
          <div className="absolute left-[10%] right-[10%] top-[100px] h-0 border-t-[1.5px] border-dotted border-[#3b82f6]/40 z-0" />

          {sectors.map((sector, index) => (
            <div key={sector.id} className="relative z-10 flex flex-col items-center w-[20%] px-2.5 group">

              {/* Number Badge */}
              <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_14px_rgb(0,0,0,0.06)] flex items-center justify-center z-20 transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-[#3b82f6] font-bold text-[13px] tracking-wide">
                  {isRTL
                    ? String(index + 1).replace(/[0-9]/g, w => ({ '1': '١', '2': '٢', '3': '٣', '4': '٤', '5': '٥' }[w] || w))
                    : String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Vertical dotted line */}
              <div className="w-0 h-[14px] border-l-[1.5px] border-dotted border-[#3b82f6]/70 z-10" />

              {/* Arc + Icon */}
              <div className="relative flex flex-col items-center mb-6">
                <div className="w-[140px] h-[46px] relative z-10 pointer-events-none">
                  <svg viewBox="0 0 140 46" className="w-full h-full overflow-visible">
                    <path d="M 10 46 C 10 8, 130 8, 130 46" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                    <circle cx="70" cy="17.5" r="3" fill="#3b82f6" />
                    <circle cx="10" cy="46" r="2.5" fill="#3b82f6" />
                    <circle cx="130" cy="46" r="2.5" fill="#3b82f6" />
                  </svg>
                </div>

                {/* Icon — 3-layer ring: white outer → cream ring → dark navy inner */}
                <div className="relative w-[120px] h-[120px] rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center z-20 -mt-[24px] transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]">
                  <div className="w-[94px] h-[94px] rounded-full bg-[#f0f2f5] flex items-center justify-center">
                    <div className="w-[72px] h-[72px] rounded-full bg-[#0c1a2e] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#162d4f] text-white">
                      {sector.customSvg ?? <Iconify icon={sector.icon} width={28} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 w-full bg-white rounded-[24px] p-6 lg:p-7 flex flex-col shadow-[0_2px_16px_rgb(0,0,0,0.04)] border border-gray-100 transition-transform duration-500 group-hover:-translate-y-1">

                {/* Coloured sector icon inside card */}
                <div
                  className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: sector.bgColor, color: sector.color }}
                >
                  {sector.customSvg
                    ? <div style={{ transform: 'scale(0.75)' }}>{sector.customSvg}</div>
                    : <Iconify icon={sector.icon} width={20} />}
                </div>

                {/* Title */}
                <h3
                  dir="auto"
                  className={`text-center font-bold text-[#0c1a2e] ${isRTL ? 'text-[14px] xl:text-[15px]' : 'text-[13.5px] xl:text-[14.5px]'} tracking-wide whitespace-pre-line leading-snug min-h-[40px] flex items-center justify-center mb-5 uppercase`}
                >
                  {sector.title}
                </h3>

                <div className="w-full h-px bg-gray-100 mb-6" />

                {/* Items with real brand logos */}
                <ul dir="auto" className="space-y-3.5 w-full mb-8 flex-1 text-left">
                  {sector.items.map((item, i) => (
                    <ItemRow key={i} item={item} sectorId={sector.id} />
                  ))}
                </ul>

                {/* Button */}
                <button className="w-full flex items-center justify-between px-5 py-3.5 bg-[#f4f5f7] hover:bg-[#e9ecef] transition-colors rounded-full text-[#0c1a2e] text-[13px] font-bold group/btn mt-auto">
                  <span dir="auto">{t.button}</span>
                  <Iconify
                    icon={isRTL ? 'solar:arrow-left-linear' : 'solar:arrow-right-linear'}
                    width={16}
                    className={`text-[#0c1a2e] transition-transform ${isRTL ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── MOBILE TIMELINE (< lg) ── */}
        <div className="lg:hidden relative flex flex-col gap-12 max-w-[420px] mx-auto mt-10">
          {sectors.map((sector, index) => (
            <div key={sector.id} className="relative z-10 flex flex-col items-center w-full group">

              <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_14px_rgb(0,0,0,0.06)] flex items-center justify-center z-20">
                <span className="text-[#3b82f6] font-bold text-[13px] tracking-wide">
                  {isRTL
                    ? String(index + 1).replace(/[0-9]/g, w => ({ '1': '١', '2': '٢', '3': '٣', '4': '٤', '5': '٥' }[w] || w))
                    : String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="w-0 h-[14px] border-l-[1.5px] border-dotted border-[#3b82f6]/70 z-10" />

              <div className="relative flex flex-col items-center mb-6">
                <div className="w-[120px] h-[40px] relative z-10 pointer-events-none">
                  <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                    <path d="M 10 40 C 10 8, 110 8, 110 40" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                    <circle cx="60" cy="16" r="3" fill="#3b82f6" />
                    <circle cx="10" cy="40" r="2.5" fill="#3b82f6" />
                    <circle cx="110" cy="40" r="2.5" fill="#3b82f6" />
                  </svg>
                </div>

                <div className="relative w-[100px] h-[100px] rounded-full bg-white shadow-[0_6px_20px_rgb(0,0,0,0.05)] flex items-center justify-center z-20 -mt-[20px] transition-transform group-hover:scale-105">
                  <div
                    className="w-[66px] h-[66px] rounded-full bg-[#0c1a2e] flex items-center justify-center transition-colors group-hover:bg-[#162d4f] text-white"
                  >
                    {sector.customSvg ?? <Iconify icon={sector.icon} width={24} />}
                  </div>
                </div>
              </div>

              <div className="w-full bg-white rounded-[24px] p-7 md:p-8 flex flex-col shadow-sm border border-gray-100">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
                  style={{ backgroundColor: sector.bgColor, color: sector.color }}
                >
                  {sector.customSvg
                    ? <div style={{ transform: 'scale(0.9)' }}>{sector.customSvg}</div>
                    : <Iconify icon={sector.icon} width={22} />}
                </div>

                <h3
                  dir="auto"
                  className={`text-center font-bold text-[#0c1a2e] ${isRTL ? 'text-[17px]' : 'text-[16px]'} tracking-wide whitespace-pre-line leading-tight mb-5 uppercase`}
                >
                  {sector.title}
                </h3>

                <div className="w-full h-px bg-gray-100 mb-6" />

                <ul dir="auto" className="space-y-4 w-full mb-8 flex-1 text-left">
                  {sector.items.map((item, i) => (
                    <ItemRow key={i} item={item} sectorId={sector.id} />
                  ))}
                </ul>

                <button className="w-full flex items-center justify-between px-6 py-4 bg-[#f4f5f7] hover:bg-[#e9ecef] transition-colors rounded-full text-[#0c1a2e] text-[14px] font-bold group/btn mt-auto">
                  <span dir="auto">{t.button}</span>
                  <Iconify
                    icon={isRTL ? 'solar:arrow-left-linear' : 'solar:arrow-right-linear'}
                    width={18}
                    className={`text-[#0c1a2e] transition-transform ${isRTL ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}