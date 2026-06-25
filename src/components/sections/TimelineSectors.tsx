"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    icon: 'tabler:device-mobile-cog',
    color: '#ef4444',
    bgColor: '#fef2f2',
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
    color: '#a855f7',
    bgColor: '#faf5ff',
  },
];

// Map each brand name keyword to the correct logo file
const BRAND_LOGOS: Record<string, string> = {
  'lammat': '/brands/lamattt.png',
  'lamat': '/brands/lamattt.png',
  'لمة': '/brands/lamattt.png',
  'لمعة': '/brands/lamattt.png',
  'mateen': '/brands/chyaymat.png',
  'متين': '/brands/chyaymat.png',
  'مەتین': '/brands/chyaymat.png',
  'amazon': '/brands/Chya Amazon-1.png',
  'أمازون': '/brands/Chya Amazon-1.png',
  'ئەمازۆن': '/brands/Chya Amazon-1.png',
  'khaki': '/brands/khakisarwar.png',
  'خاكي': '/brands/khakisarwar.png',
  'خاکی': '/brands/khakisarwar.png',
  'خاكى': '/brands/khakisarwar.png',
  'سەروەر': '/brands/khakisarwar.png',
  'سرور': '/brands/khakisarwar.png',
  'hangaw': '/brands/hangawexchange.png',
  'هەنگاو': '/brands/hangawexchange.png',
  'gold': '/brands/qapat-1.png',
  'غولد': '/brands/qapat-1.png',
  'گۆڵد': '/brands/qapat-1.png',
  // lutkay & barzy MUST be before 'exchange' so they match their specific logo first
  'lutkay': '/brands/lutkay chya-1.png',
  'لوتکەی': '/brands/lutkay chya-1.png',
  'لوتكاي': '/brands/lutkay chya-1.png',
  'barzy': '/brands/BARZY CHYAY-1.png',
  'بەرزى': '/brands/BARZY CHYAY-1.png',
  'بەرزی': '/brands/BARZY CHYAY-1.png',
  'بـەرزى': '/brands/BARZY CHYAY-1.png',
  'exchange': '/brands/chyaexchnage.png',
  'إكسجينج': '/brands/chyaexchnage.png',
  'ئێکستێنج': '/brands/chyaexchnage.png',
  'dibaga': '/brands/Manfaz Dibaga-1.png',
  'ديبكة': '/brands/Manfaz Dibaga-1.png',
  'دیبگة': '/brands/Manfaz Dibaga-1.png',
  'دیبگەی': '/brands/Manfaz Dibaga-1.png',
  'ديکبە': '/brands/Manfaz Dibaga-1.png',
  // Money exchange standalone "Chya" = chyaexchange
  // We handle this below with index logic; fallback to chyaexchange for 'chya' in money-exchange
  'phone': '/brands/chya phone-1.png',
  'فۆن': '/brands/chya phone-1.png',
  'فون': '/brands/chya phone-1.png',
  'tech': '/brands/chyatech.png',
  'تێك': '/brands/chyatech.png',
  'تێک': '/brands/chyatech.png',
  'تيك': '/brands/chyatech.png',
  'تيک': '/brands/chyatech.png',
  'تیك': '/brands/chyatech.png',
  'تیک': '/brands/chyatech.png',
  'تىك': '/brands/chyatech.png',
  'تىک': '/brands/chyatech.png',
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
  'كولد': '/brands/qapat-1.png',
  'لوتكەی': '/brands/lutkay chya-1.png',
  'دیبەگە': '/brands/Manfaz Dibaga-1.png',
  'بلو طباعە': '/brands/BLUE PRINT-1.png',
  'طباعە': '/brands/BLUE PRINT-1.png',
  'تڕاڤل': '/brands/CHYA travel-1.png',
  'تراڤل': '/brands/CHYA travel-1.png',
  'کیفا': '/brands/kivaluxary.png',
  'نووسینگەی چیا': '/brands/chyaexchnage.png',
  'مكتب جيا': '/brands/chyaexchnage.png',
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
  // Chya gold -> qapat logo
  if ((lower.includes('gold') || item.includes('گۆڵد') || item.includes('غولد'))) {
    return '/brands/qapat-1.png';
  }

  return null;
}

const BRAND_ROUTES: Record<string, string> = {
  'marjan': '/lamatalmarjan',
  'لمة': '/lamatalmarjan',
  'لمعة': '/lamatalmarjan',
  'mateen': '/chyaymateen',
  'متين': '/chyaymateen',
  'مەتین': '/chyaymateen',
  'amazon': '/chyaamazon',
  'أمازون': '/chyaamazon',
  'ئەمازۆن': '/chyaamazon',
  'khaki': '/khakisarwar',
  'خاكي': '/khakisarwar',
  'خاکی': '/khakisarwar',
  'خاكى': '/khakisarwar',
  'سەروەر': '/khakisarwar',
  'سرور': '/khakisarwar',
  'hangaw': '/hangawexchange',
  'هەنگاو': '/hangawexchange',
  'gold': '/chyagold',
  'غولد': '/chyagold',
  'گۆڵد': '/chyagold',
  'كولد': '/chyagold',
  'lutkay': '/lutkaychya',
  'لوتکەی': '/lutkaychya',
  'لوتكاي': '/lutkaychya',
  'لوتكەی': '/lutkaychya',
  'barzy': '/barzychya',
  'بەرزى': '/barzychya',
  'بەرزی': '/barzychya',
  'بـەرزى': '/barzychya',
  'exchange': '/chyaexchange',
  'إكسجينج': '/chyaexchange',
  'ئێکستێنج': '/chyaexchange',
  'نووسینگەی چیا': '/chyaexchange',
  'مكتب جيا': '/chyaexchange',
  'dibaga': '/manfazdibaga',
  'ديبكة': '/manfazdibaga',
  'دیبگة': '/manfazdibaga',
  'دیبگەی': '/manfazdibaga',
  'ديکبە': '/manfazdibaga',
  'دیبەگە': '/manfazdibaga',
  'phone': '/chyaphone',
  'فۆن': '/chyaphone',
  'فون': '/chyaphone',
  'tech': '/chyatech',
  'تێك': '/chyatech',
  'تێک': '/chyatech',
  'تيك': '/chyatech',
  'تيک': '/chyatech',
  'تیك': '/chyatech',
  'تیک': '/chyatech',
  'تىك': '/chyatech',
  'تىک': '/chyatech',
  'blue print': '/blueprinting',
  'بلو برێنتینگ': '/blueprinting',
  'بلو پرێنتینگ': '/blueprinting',
  'blue printing': '/blueprinting',
  'بلو برينتينغ': '/blueprinting',
  'بلو طباعە': '/blueprinting',
  'طباعە': '/blueprinting',
  'travel': '/chyatravel',
  'تڕاڤڵ': '/chyatravel',
  'ترافيل': '/chyatravel',
  'تڕاڤل': '/chyatravel',
  'تراڤل': '/chyatravel',
  'kiva': '/kivaluxury',
  'کیڤا': '/kivaluxury',
  'كيفا': '/kivaluxury',
};

function getBrandRoute(item: string, sectorId: string): string {
  const lower = item.toLowerCase();
  for (const [key, route] of Object.entries(BRAND_ROUTES)) {
    if (lower.includes(key.toLowerCase())) return route;
  }
  if (sectorId === 'money-exchange' && (lower === 'chya' || item === 'چیا' || item === 'چيا')) {
    return '/chyaexchange';
  }
  return '/';
}

function ItemRow({ item, sectorId }: { item: string; sectorId: string }) {
  const logo = getLogoSrc(item, sectorId);
  const route = getBrandRoute(item, sectorId);
  const isGeneralTrading = sectorId === 'general-trading';

  /* ── General Trading: center alignment ── */
  if (isGeneralTrading && logo) {
    let logoTransform = '';

    if (logo.includes('lamattt')) {
      logoTransform = 'scale-[1.08] translate-x-[4px] -translate-y-[8px]'; // Slightly smaller to prevent text label overflow
    } else if (logo.includes('chyaymat')) {
      logoTransform = 'scale-[1.12] translate-x-[4px] -translate-y-[13px]'; // Perfectly sized and balanced
    } else if (logo.toLowerCase().includes('amazon')) {
      logoTransform = 'scale-x-[1.10] scale-y-[0.98] translate-x-[2px] -translate-y-[21px]'; // Gentle size boost and shifted right to avoid bullet overlap
    }

    return (
      <li className="flex items-center justify-center w-full min-w-0">
        <Link
          href={route}
          className="flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:opacity-85"
          style={{ width: '96px', height: '58px' }}
        >
          <Image
            src={logo}
            alt={item}
            width={400}
            height={240}
            className={`w-full h-full object-contain ${logoTransform}`.trim()}
          />
        </Link>
      </li>
    );
  }

  /* ── All other sectors: default center styling ── */
  let logoScale = 1.0;
  let logoScaleX = 1.0;
  let logoScaleY = 1.0;
  let logoTranslateX = 0;
  let logoTranslateY = 0;
  let textClasses = 'text-[11px] xl:text-[12px] tracking-tight'; // Standard text size

  if (logo && logo.includes('BARZY')) {
    logoScale = 1.19; // Zoom out Barzy specifically
    logoTranslateY = 14;
    textClasses = 'text-[11px] xl:text-[11px] tracking-tighter'; // Smaller text for long name
  } else if (logo && logo.includes('lutkay')) {
    logoScaleX = 1.39; // Make it wider
    logoScaleY = 1.20;
    logoTranslateY = 7;
    textClasses = 'text-[11px] xl:text-[11px] tracking-tighter'; // Smaller text for long name
  } else if (logo && logo.includes('qapat-1')) {
    logoScaleX = 1.42; // Make it wider
    logoScaleY = 1.30;
    logoTranslateX = -2.4; // Shift to the left side a tiny bit
    textClasses = 'text-[11px] xl:text-[11px] tracking-tighter'; // Apply same tiny font size to Chya Gold
  } else if (logo && logo.includes('hangawexchange')) {
    logoScale = 1.40;
    logoTranslateY = 8;
  } else if (logo && logo.includes('chyatech')) {
    logoScale = 2.05; // Zoom in Chya Tech to match Chya Phone size perfectly
    logoTranslateY = -2;
  } else if (logo && logo.includes('phone')) {
    logoScale = 1.12; // Zoom in Chya Phone to make it larger
  } else if (logo && logo.includes('BLUE PRINT')) {
    logoScale = 1.64; // Zoom in Blue Printing
  } else if (logo && logo.includes('travel')) {
    logoScale = 2.46; // Increased scale to make it beautifully large and clear
  } else if (logo && logo.includes('kiva')) {
    logoScale = 1.40; // Decreased scale since it is a large solid square natively
    logoTranslateY = 14;
  } else if (logo && logo.includes('khakisarwar')) {
    logoScale = 1.20; // Perfectly sized and balanced center-aligned logo
  } else if (logo && logo.includes('chyaexchnage')) {
    logoScaleX = 1.22; // Make it wider
    logoScaleY = 1.15;
    logoTranslateX = -3.1; // Shift to the left side a bit
  } else if (logo && logo.toLowerCase().includes('dibaga')) {
    logoScaleX = 1.34; // Make it wider
    logoScaleY = 1.22;
    logoTranslateY = 8;
  }

  if (logoScaleX === 1.0 && logoScaleY === 1.0 && logoScale !== 1.0) {
    logoScaleX = logoScale;
    logoScaleY = logoScale;
  }

  return (
    <li className="flex items-center justify-center w-full min-w-0">
      {logo ? (
        <Link
          href={route}
          className="flex-shrink-0 flex items-center justify-center w-[72px] h-[48px] transition-all duration-300 hover:scale-105 hover:opacity-85"
        >
          <Image
            src={logo}
            alt={item}
            width={120}
            height={60}
            className="w-full h-full object-contain"
            style={{ transform: `scale(${logoScaleX}, ${logoScaleY}) translateX(${logoTranslateX}px) translateY(${logoTranslateY}px)` }}
          />
        </Link>
      ) : (
        <div className="flex-shrink-0 flex items-center justify-center w-[72px]">
          <span className="text-[11px] font-bold text-gray-400">{item.charAt(0)}</span>
        </div>
      )}
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
    <section id="timelineSection" dir="ltr" className="relative w-full bg-[#faf9f6] pt-12 pb-24 z-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
            <span dir="auto" className={`font-bold text-[#0c1a2e] uppercase ${isRTL ? 'text-[15px] tracking-normal' : 'text-[12px] tracking-widest'}`}>
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

          {/* Horizontal solid line with middle dots */}
          <div className="absolute left-[10%] right-[10%] top-[126px] h-0 z-0 flex items-center pointer-events-none">
            <div className="absolute left-0 right-0 h-[1px] bg-[#cbd5e1]" />
            <div className="absolute left-[12.5%] -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[#3b82f6]" />
            <div className="absolute left-[37.5%] -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[#3b82f6]" />
            <div className="absolute left-[62.5%] -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[#3b82f6]" />
            <div className="absolute left-[87.5%] -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[#3b82f6]" />
          </div>

          {sectors.map((sector, index) => (
            <div key={sector.id} className="relative z-10 flex flex-col items-center w-[20%] px-2.5 group">

              {/* Number Badge */}
              <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_14px_rgb(0,0,0,0.06)] flex items-center justify-center z-20 transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-[#3b82f6] font-bold text-[13px] tracking-wide">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Vertical solid line */}
              <div className="w-[1px] h-[12px] bg-[#3b82f6] z-10" />

              {/* Arc + Icon */}
              <div className="relative flex flex-col items-center mb-6 w-full">
                <div className="w-[160px] h-[80px] relative z-10 pointer-events-none">
                  <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
                    <path d="M 10 74 A 70 70 0 0 1 150 74" fill="none" stroke="#3b82f6" strokeWidth="1" />
                    <circle cx="80" cy="4" r="2.5" fill="#3b82f6" />
                    <circle cx="10" cy="74" r="2.5" fill="#3b82f6" />
                    <circle cx="150" cy="74" r="2.5" fill="#3b82f6" />
                  </svg>
                </div>

                {/* Icon — 3-layer ring: white outer → cream ring → dark navy inner */}
                <div className="relative w-[120px] h-[120px] rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center z-20 -mt-[66px] transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]">
                  <div className="w-[94px] h-[94px] rounded-full bg-[#f0f2f5] flex items-center justify-center">
                    <div className="w-[72px] h-[72px] rounded-full bg-[#0c1a2e] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#162d4f] text-white">
                      {sector.customSvg ?? <Iconify icon={sector.icon} width={28} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 w-full bg-white rounded-[24px] p-6 lg:px-4 xl:px-6 lg:py-7 flex flex-col shadow-[0_2px_16px_rgb(0,0,0,0.04)] border border-gray-100 transition-transform duration-500 group-hover:-translate-y-1">

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
                <ul dir="ltr" className="space-y-3.5 w-full mb-8 flex-1 text-left ltr">
                  {sector.items.map((item, i) => (
                    <ItemRow key={i} item={item} sectorId={sector.id} />
                  ))}
                </ul>

                {/* Button */}
                <Link href={`/ourcompany/${sector.id}`} className="w-full flex items-center justify-between px-5 py-3.5 bg-[#f4f5f7] hover:bg-[#e9ecef] transition-colors rounded-full text-[#0c1a2e] text-[13px] font-bold group/btn mt-auto">
                  <span dir="auto">{t.button}</span>
                  <Iconify
                    icon={isRTL ? 'solar:arrow-left-linear' : 'solar:arrow-right-linear'}
                    width={16}
                    className={`text-[#0c1a2e] transition-transform ${isRTL ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`}
                  />
                </Link>
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
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="w-[1px] h-[12px] bg-[#3b82f6] z-10" />

              <div className="relative flex flex-col items-center mb-6 w-full">
                <div className="w-[140px] h-[70px] relative z-10 pointer-events-none">
                  <svg viewBox="0 0 140 70" className="w-full h-full overflow-visible">
                    <path d="M 10 64 A 60 60 0 0 1 130 64" fill="none" stroke="#3b82f6" strokeWidth="1" />
                    <circle cx="70" cy="4" r="2.5" fill="#3b82f6" />
                    <circle cx="10" cy="64" r="2.5" fill="#3b82f6" />
                    <circle cx="130" cy="64" r="2.5" fill="#3b82f6" />
                  </svg>
                </div>

                <div className="relative w-[100px] h-[100px] rounded-full bg-white shadow-[0_6px_20px_rgb(0,0,0,0.05)] flex items-center justify-center z-20 -mt-[56px] transition-transform group-hover:scale-105">
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

                <ul dir="ltr" className="space-y-4 w-full mb-8 flex-1 text-left ltr">
                  {sector.items.map((item, i) => (
                    <ItemRow key={i} item={item} sectorId={sector.id} />
                  ))}
                </ul>

                <Link href={`/ourcompany/${sector.id}`} className="w-full flex items-center justify-between px-6 py-4 bg-[#f4f5f7] hover:bg-[#e9ecef] transition-colors rounded-full text-[#0c1a2e] text-[14px] font-bold group/btn mt-auto">
                  <span dir="auto">{t.button}</span>
                  <Iconify
                    icon={isRTL ? 'solar:arrow-left-linear' : 'solar:arrow-right-linear'}
                    width={18}
                    className={`text-[#0c1a2e] transition-transform ${isRTL ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}