"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

// We map the images explicitly here since translations only hold text
const certData = [
  {
    image: "https://sqm.com/wp-content/uploads/2023/11/iso_9001_2015.png",
    link: "/certificate/ISO9001_2015.pdf#view=Fit"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/en/b/b9/International_Accreditation_Forum_Logo.svg",
    link: "/certificate/ISO9001_2015.pdf#view=Fit"
  },
  {
    image: "https://ossmideast.com/wp-content/uploads/2019/05/ossme-logo.jpg",
    link: "/certificate/ISO9001_2015.pdf#view=Fit"
  },
  {
    image: "https://sscert-eg.com/wp-content/uploads/2023/03/egacc0.png",
    link: "/certificate/ISO9001_2015.pdf#view=Fit"
  },
  {
    image: "/ficho.png",
    link: "/certificate/Ficho.pdf#view=Fit"
  },
  {
    image: "./ika.png",
    link: "/certificate/Karlsruhe-University.pdf#view=Fit"
  }
];

export default function CertificationsSection() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].certifications;

    return (
        <section dir="ltr" id="certifications" className="relative bg-[#faf9f6] py-24 overflow-hidden scroll-mt-24">
            {/* Subtle background circles (matching other sections) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 -translate-y-1/2 left-[-10%] w-[600px] h-[600px] rounded-full border-[1px] border-[#0c1a2e]/5" />
                <div className="absolute top-1/2 -translate-y-1/2 right-[-10%] w-[800px] h-[800px] rounded-full border-[1px] border-[#0c1a2e]/5" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
                
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
                            <span dir="auto" className={`font-bold text-[#0c1a2e] uppercase ${isRTL ? 'text-[15px] tracking-normal' : 'text-[12px] tracking-widest'}`}>
                                {t.eyebrow}
                            </span>
                        </div>
                        <h2 dir="auto" className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c1a2e] leading-[1.2]">
                            {t.headline.part1} {t.headline.part2}
                            {t.headline.part3 && <><br />{t.headline.part3}</>}
                        </h2>
                    </div>

                    <div className="max-w-md lg:max-w-sm pb-2">
                        <p dir="auto" className={`text-sm ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#3a4f6a]'} leading-relaxed`}>
                            {t.subtitle}
                        </p>
                    </div>
                </div>

                {/* Grid of Certifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
                    {t.items.map((cert: any, index: number) => (
                        <a 
                            key={index} 
                            href={certData[index].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            dir="auto"
                            className="flex flex-col h-full bg-white p-8 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#0c1a2e]/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                            {/* Logo Area */}
                            <div className="h-[100px] w-full flex items-center justify-center mb-8">
                                <img 
                                    src={certData[index].image} 
                                    alt={cert.title}
                                    className={`max-w-full max-h-full object-contain mix-blend-multiply ${(index === 3 || index === 5) ? 'scale-115 origin-center' : ''}`}
                                    onError={(e) => {
                                        // Fallback if image doesn't exist yet
                                        (e.target as HTMLImageElement).src = `https://placehold.co/200x100/ffffff/0c1a2e?text=${encodeURIComponent(cert.title)}`;
                                    }}
                                />
                            </div>

                            {/* Separator Line */}
                            <div className="w-6 h-0.5 bg-[#2563eb] mb-4" />

                            {/* Text Content */}
                            <h3 className="text-sm font-bold text-[#0c1a2e] mb-2 leading-snug">
                                {cert.title}
                            </h3>
                            <p className="text-xs text-[#3a4f6a] leading-relaxed whitespace-pre-line flex-1">
                                {cert.subtitle}
                            </p>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}
