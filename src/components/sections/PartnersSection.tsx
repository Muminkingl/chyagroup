"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

const partners = [
    { name: "FIB Bank", logo: "/fib.png", url: "https://fib.iq/" },
    { name: "Qi Card co.", logo: "/qi.png", url: "https://qi.iq/en/home" },
    { name: "Zain Cash co.", logo: "https://zaincash.com/static/media/ZainCashLogo.fea8cf3bb90421f45dd384d6afc6fe3b.svg", url: "https://zaincash.com/" },
    { name: "Switch co.", logo: "/switch.png", url: "https://switch.com.iq/" },
    { name: "Fastpay co.", logo: "https://www.fast-pay.iq/img/clogo.png", url: "https://www.fast-pay.iq/" },
    { name: "AsiaPay co.", logo: "/aciapay.png", url: "https://www.asiapay.iq/" },
    { name: "Nasspay co.", logo: "/nassepay.png", url: "#" },
    { name: "Nasswallet bank", logo: "/nass.png", url: "https://nw.iq/" },
    { name: "Houzz Card co.", logo: "/houzz.png", url: "https://shophouzz.com/pages/creditcard" },
    { name: "BazarCards co.", logo: "/bazarcard.jpg", url: "#" },
    { name: "AIIB Bank", logo: "/aiib.png", url: "https://aiib.iq/" },
    { name: "Blue co.", logo: "/blue.jpg", url: "https://blue.com.iq/en/home/" },
    { name: "Shift Int co.", logo: "/shiftt.png", url: "https://www.shifttransfer.com/" },
    { name: "DubaiRemit Int co.", logo: "/dubairemit.png", url: "#" },
];

export default function PartnersSection() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].partners;

    return (
        <section dir="ltr" id="partners" className="relative bg-[#faf9f6] py-24 overflow-hidden scroll-mt-24">
            {/* Subtle background lines/curves (similar to screenshot) */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-1/2 -translate-y-1/2 right-[-20%] w-[1000px] h-[1000px] rounded-full border-[1px] border-[#0c1a2e]/5" />
                <div className="absolute top-1/2 -translate-y-1/2 right-[-10%] w-[800px] h-[800px] rounded-full border-[1px] border-[#0c1a2e]/5" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
                
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
                            <span dir="auto" className="text-[12px] font-bold tracking-widest text-[#0c1a2e] uppercase">
                                {t.eyebrow}
                            </span>
                        </div>
                        <h2 dir="auto" className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c1a2e] leading-[1.2]">
                            {t.headline.part1}<br />
                            <span className="text-[#162d4f] font-semibold">{t.headline.part2}</span>
                        </h2>
                    </div>

                    <div className="max-w-md lg:max-w-sm pb-2">
                        <p dir="auto" className={`text-sm ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#3a4f6a]'} leading-relaxed`}>
                            {t.subtitle}
                        </p>
                    </div>
                </div>

                {/* Grid of Partners */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {partners.map((partner, index) => (
                        <a 
                            key={index}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-white h-[120px] md:h-[140px] w-[calc(50%-0.5rem)] md:w-[calc(25%-1.125rem)] rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#0c1a2e]/5 transition-all duration-300 hover:-translate-y-1 p-6"
                        >
                            <img 
                                src={partner.logo} 
                                alt={`${partner.name} Logo`}
                                className="max-w-[180px] max-h-[85px] w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/200x100/ffffff/0c1a2e?text=${encodeURIComponent(partner.name)}`;
                                }}
                            />
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}
