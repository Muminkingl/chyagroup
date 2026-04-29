"use client";
import React from 'react';
import { Iconify } from '@/components/ui/Iconify';
import { useLanguage } from '@/context/LanguageContext';

const sectorsData = [
  {
    id: 'general-trading',
    title: 'GENERAL TRADING',
    icon: 'ph:globe-light',
    desc: 'Our general trading arm spans a diverse product portfolio, supplying markets across the region with quality and reliability.',
    items: ['Lammat Al marjan', 'Chyay Mateen', 'Chya amazon']
  },
  {
    id: 'money-exchange',
    title: 'MONEY EXCHANGE &\nFINANCIAL SERVICE',
    icon: '',
    customSvg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path
          d="M14 9H11.5C10.6716 9 10 9.67157 10 10.5C10 11.3284 10.6716 12 11.5 12H12.5C13.3284 12 14 12.6716 14 13.5C14 14.3284 13.3284 15 12.5 15H10M12 8V9M12 15V16M18 12H18.01M6 12H6.01M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2ZM18.5 12C18.5 12.2761 18.2761 12.5 18 12.5C17.7239 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.7239 11.5 18 11.5C18.2761 11.5 18.5 11.7239 18.5 12ZM6.5 12C6.5 12.2761 6.27614 12.5 6 12.5C5.72386 12.5 5.5 12.2761 5.5 12C5.5 11.7239 5.72386 11.5 6 11.5C6.27614 11.5 6.5 11.7239 6.5 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    desc: 'Chya Group operates a dedicated money exchange division delivering fast, secure, and competitive financial services.',
    items: ['Khaki Sarwar', 'Chya', 'Chya gold', 'Lutkay chya', 'Barzy chya', 'Hangaw dibaga station']
  },
  {
    id: 'mobile-tech',
    title: 'MOBILE &\nTECHNOLOGY',
    icon: 'solar:smartphone-linear',
    desc: 'From mobile devices to digital solutions, our technology division powers consumers and enterprises alike.',
    items: ['Chya phone', 'Chya tech']
  },
  {
    id: 'printing',
    title: 'PRINTING &\nPHOTOCOPY',
    icon: 'ph:printer-light',
    desc: 'Our printing and photocopy center delivers high-quality print solutions for businesses, institutions, and individuals.',
    items: ['Blue printing']
  },
  {
    id: 'online-trading',
    title: 'ONLINE TRADING',
    icon: 'ph:handbag-light',
    desc: 'Our online trading division operates 3 active digital market channels, giving clients access to global financial opportunities.',
    items: ['Chya travel', 'Kiva luxury']
  }
];

export default function TimelineSectors() {
  const { isRTL } = useLanguage();

  return (
    <section className="relative w-full bg-[#faf9f6] pt-12 pb-24 z-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[11.5px] font-bold tracking-[0.2em] text-[#3b82f6] uppercase mb-4 block">
            OUR SECTORS
          </span>
          <h2 className="text-[36px] md:text-[46px] font-bold tracking-tight text-[#0c1a2e] mb-5">
            Diverse Strengths, Unified <span className="text-[#162d4f]">Vision.</span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#3a4f6a] max-w-xl leading-relaxed mb-6">
            Chya Group operates across five dynamic sectors,
            <br className="hidden md:block" />
            delivering trusted solutions and creating value in every direction we serve.
          </p>
          <div className="w-10 h-[2px] bg-[#3b82f6] rounded-full" />
        </div>

        {/* DESKTOP TIMELINE (lg+) */}
        <div className={`hidden lg:flex relative w-full items-stretch justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          
          {/* Horizontal dotted line perfectly intersecting the arc ends */}
          <div className="absolute left-[10%] right-[10%] top-[100px] h-0 border-t-[1.5px] border-dotted border-[#3b82f6]/50 z-0" />

          {sectorsData.map((sector, index) => (
            <div key={sector.id} className="relative z-10 flex flex-col items-center w-[20%] px-2.5 group">
              
              {/* Number Badge */}
              <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_14px_rgb(0,0,0,0.06)] flex items-center justify-center z-20 transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-[#3b82f6] font-bold text-[13px] tracking-wide">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Vertical dotted line */}
              <div className="w-0 h-[14px] border-l-[1.5px] border-dotted border-[#3b82f6]/70 z-10" />

              {/* Arc and Icon Container */}
              <div className="relative flex flex-col items-center mb-6">
                
                {/* Arc */}
                <div className="w-[140px] h-[46px] relative z-10 pointer-events-none">
                  <svg viewBox="0 0 140 46" className="w-full h-full overflow-visible">
                    <path d="M 10 46 C 10 8, 130 8, 130 46" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                    <circle cx="70" cy="17.5" r="3" fill="#3b82f6" />
                    <circle cx="10" cy="46" r="2.5" fill="#3b82f6" />
                    <circle cx="130" cy="46" r="2.5" fill="#3b82f6" />
                  </svg>
                </div>

                {/* Icon */}
                <div className="relative w-[110px] h-[110px] rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center z-20 -mt-[24px] transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]">
                  <div className="w-[90px] h-[90px] rounded-full bg-[#faf9f6] flex items-center justify-center">
                    <div className="w-[66px] h-[66px] rounded-full bg-[#0c1a2e] flex items-center justify-center shadow-inner transition-colors duration-300 group-hover:bg-[#162d4f]">
                      <Iconify icon={sector.icon} width={26} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 w-full bg-white rounded-[24px] p-6 lg:p-7 flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#0c1a2e]/5 transition-transform duration-500 group-hover:-translate-y-1">
                
                {/* Title */}
                <h3 className="text-center font-bold text-[#0c1a2e] text-[14.5px] xl:text-[15.5px] tracking-wide whitespace-pre-line leading-snug h-[44px] flex items-center justify-center mb-4 uppercase">
                  {sector.title}
                </h3>
                
                {/* Blue separator line */}
                <div className="w-6 h-[2px] bg-[#3b82f6] mx-auto mb-6" />

                {/* Description */}
                <p className={`text-[12.5px] xl:text-[13px] text-[#3a4f6a] leading-relaxed mb-6 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                  {sector.desc}
                </p>

                {/* Bullet list */}
                <ul className={`text-[12.5px] xl:text-[13px] text-[#3a4f6a] space-y-2.5 w-full mb-8 flex-1 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                  {sector.items.map((item, i) => (
                    <li key={i} className={`flex items-start gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] flex-shrink-0 mt-[6px]" />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className={`w-full flex items-center justify-between px-5 py-3.5 bg-[#f8f5f0] hover:bg-[#eae4dc] transition-colors rounded-full text-[#0c1a2e] text-[13px] font-bold group/btn mt-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>Explore More</span>
                  <Iconify icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width={16} className={`text-[#0c1a2e] transition-transform ${isRTL ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* MOBILE TIMELINE (< lg) */}
        <div className="lg:hidden relative flex flex-col gap-12 max-w-[420px] mx-auto mt-10">
          {sectorsData.map((sector, index) => (
            <div key={sector.id} className="relative z-10 flex flex-col items-center w-full group">
              
              {/* Number Badge */}
              <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_14px_rgb(0,0,0,0.06)] flex items-center justify-center z-20">
                <span className="text-[#3b82f6] font-bold text-[13px] tracking-wide">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Vertical dotted line */}
              <div className="w-0 h-[14px] border-l-[1.5px] border-dotted border-[#3b82f6]/70 z-10" />

              {/* Arc and Icon Container */}
              <div className="relative flex flex-col items-center mb-6">
                
                {/* Arc */}
                <div className="w-[120px] h-[40px] relative z-10 pointer-events-none">
                  <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                    <path d="M 10 40 C 10 8, 110 8, 110 40" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                    <circle cx="60" cy="16" r="3" fill="#3b82f6" />
                    <circle cx="10" cy="40" r="2.5" fill="#3b82f6" />
                    <circle cx="110" cy="40" r="2.5" fill="#3b82f6" />
                  </svg>
                </div>

                {/* Icon */}
                <div className="relative w-[100px] h-[100px] rounded-full bg-white shadow-md flex items-center justify-center z-20 -mt-[20px] transition-transform group-hover:scale-105">
                  <div className="w-[82px] h-[82px] rounded-full bg-[#faf9f6] flex items-center justify-center">
                    <div className="w-[60px] h-[60px] rounded-full bg-[#0c1a2e] flex items-center justify-center shadow-inner group-hover:bg-[#162d4f]">
                      <Iconify icon={sector.icon} width={26} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white rounded-[24px] p-7 md:p-8 flex flex-col shadow-sm border border-[#0c1a2e]/5">
                <h3 className="text-center font-bold text-[#0c1a2e] text-[16px] tracking-wide whitespace-pre-line leading-tight mb-4 uppercase">
                  {sector.title}
                </h3>
                <div className="w-6 h-[2px] bg-[#3b82f6] mx-auto mb-6" />
                <p className={`text-[13.5px] text-[#3a4f6a] leading-relaxed mb-6 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
                  {sector.desc}
                </p>
                <ul className={`text-[13.5px] text-[#3a4f6a] space-y-3 w-full mb-8 flex-1 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                  {sector.items.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] flex-shrink-0 mt-[6px]" />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full flex items-center justify-between px-6 py-4 bg-[#f8f5f0] hover:bg-[#eae4dc] transition-colors rounded-full text-[#0c1a2e] text-[14px] font-bold group/btn mt-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>Explore More</span>
                  <Iconify icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width={18} className={`text-[#0c1a2e] transition-transform ${isRTL ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}