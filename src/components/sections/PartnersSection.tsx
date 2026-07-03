"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

const partners = [
    { name: "FIB Bank", logo: "/fib.png", url: "https://fib.iq/" },
    { name: "Qi Card Co.", logo: "/qi.png", url: "https://qi.iq/en/home" },
    { name: "Zain Cash Co.", logo: "https://zaincash.com/static/media/ZainCashLogo.fea8cf3bb90421f45dd384d6afc6fe3b.svg", url: "https://zaincash.com/" },
    { name: "Switch Co.", logo: "/switch.png", url: "https://switch.com.iq/" },
    { name: "Fastpay Co.", logo: "https://www.fast-pay.iq/img/clogo.png", url: "https://www.fast-pay.iq/" },
    { name: "AsiaPay Co.", logo: "/aciapay.png", url: "https://www.asiapay.iq/" },
    { name: "Nasspay Co.", logo: "/nassepay.png", url: "#" },
    { name: "Nasswallet bank", logo: "/nass.png", url: "https://nw.iq/" },
    { name: "Houzz Card Co.", logo: "/houzz.png", url: "https://shophouzz.com/pages/creditcard" },
    { name: "BazarCards Co.", logo: "/bazarcard.jpg", url: "#" },
    { name: "AIIB Bank", logo: "/aiib.png", url: "https://aiib.iq/" },
    { name: "Blue Co.", logo: "/blue.jpg", url: "https://blue.com.iq/en/home/" },
    { name: "Western Union", logo: "/WU.png", url: "https://www.westernunion.com/" },
    { name: "DubaiRemit Int Co.", logo: "/dubairemit.png", url: "#" },
    { name: "Shift Int Co.", logo: "/shiftt.png", url: "https://www.shifttransfer.com/" },
    { name: "BPN Co.", logo: "/bpn.png", url: "https://www.bpn.com.tr/" },
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
                            <span dir="auto" className={`font-bold text-[#0c1a2e] uppercase ${isRTL ? 'text-[15px] tracking-normal' : 'text-[12px] tracking-widest'}`}>
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
                    {partners.map((partner, index) => {
                        if (partner.name === "BPN Co.") {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-center gap-3 bg-white h-[120px] md:h-[140px] w-[calc(50%-0.5rem)] md:w-[calc(25%-1.125rem)] rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#0c1a2e]/5 transition-all duration-300 hover:-translate-y-1 p-4 md:p-6 group"
                                >
                                    <img
                                        src="/cliq.png"
                                        alt="Cliq Logo"
                                        className="w-[45%] h-auto max-h-[65px] md:max-h-[80px] object-contain transition-transform duration-300 group-hover:scale-[1.24] scale-[1.14] origin-center"
                                    />
                                    <img
                                        src="/bpn.png"
                                        alt="BPN Logo"
                                        className="w-[52%] h-auto max-h-[75px] md:max-h-[90px] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.26] scale-[1.16] origin-center"
                                    />
                                </div>
                            );
                        }

                        const isCustomWidth = partner.logo.includes('fib.png') || 
                                              partner.logo.includes('nass.png') || 
                                              partner.logo.includes('aciapay.png') || 
                                              partner.logo.includes('nassepay.png') || 
                                              partner.logo.includes('qi.png');

                        const getCustomWidth = () => {
                            if (partner.logo.includes('fib.png')) return '92%';
                            if (partner.logo.includes('nass.png')) return '100%';
                            if (partner.logo.includes('aciapay.png')) return '94%';
                            if (partner.logo.includes('nassepay.png')) return '95%';
                            return '68%'; // for qi.png
                        };

                        const isFib = partner.logo.includes('fib.png');

                        return (
                            <div
                                key={index}
                                className="flex items-center justify-center bg-white h-[120px] md:h-[140px] w-[calc(50%-0.5rem)] md:w-[calc(25%-1.125rem)] rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#0c1a2e]/5 transition-all duration-300 hover:-translate-y-1 p-6"
                            >
                                {isCustomWidth ? (
                                    <img
                                        src={partner.logo}
                                        alt={`${partner.name} Logo`}
                                        style={{ 
                                            width: getCustomWidth(), 
                                            height: 'auto' 
                                        }}
                                        className={`object-contain mix-blend-multiply transition-transform duration-300 hover:scale-110 ${isFib ? 'translate-x-[1%] translate-y-[6%]' : ''}`}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/200x100/ffffff/0c1a2e?text=${encodeURIComponent(partner.name)}`;
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={partner.logo}
                                        alt={`${partner.name} Logo`}
                                        className={`object-contain transition-transform duration-300 mix-blend-multiply ${
                                            partner.logo.includes('aiib.png')
                                                ? 'scale-[1.45] hover:scale-[1.55] origin-center w-full h-full' 
                                                : partner.logo.includes('ZainCashLogo')
                                                    ? 'scale-[0.75] hover:scale-[0.85] origin-center w-full h-full' 
                                                    : partner.logo.includes('dubairemit.png')
                                                        ? 'scale-[1.05] hover:scale-[1.15] origin-center w-full h-full' 
                                                        : partner.logo.includes('WU.png')
                                                            ? 'scale-[1.65] hover:scale-[1.75] origin-center w-full h-full'
                                                            : partner.logo.includes('bpn.png')
                                                                ? 'scale-[1.35] hover:scale-[1.45] origin-center w-full h-full'
                                                                : 'max-w-[180px] max-h-[85px] w-full h-full hover:scale-110'
                                        }`}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/200x100/ffffff/0c1a2e?text=${encodeURIComponent(partner.name)}`;
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
