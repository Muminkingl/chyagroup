"use client";
import React, { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '@/components/ui/Iconify';
import { motion, animate, useInView } from 'framer-motion';

const brands = [
    { name: "CHYA EXCHANGE", tagline: "Financial Solutions" },
    { name: "CHYA GROUP", tagline: "General Trading" },
    { name: "CHYA TECHNOLOGY", tagline: "Mobile & Tech" },
    { name: "CHYA PRINT", tagline: "Printing Solutions" },
    { name: "CHYA ENERGY", tagline: "Energy Solutions" },
    { name: "CHYA LOGISTICS", tagline: "Logistics & Transport" },
    { name: "CHYA INVEST", tagline: "Investment Services" },
    { name: "CHYA REAL ESTATE", tagline: "Real Estate Development" },
];

const QRCodeSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="8" fill="#F8FAFC" />
        <path fillRule="evenodd" clipRule="evenodd" d="M15 15H35V35H15V15ZM20 20H30V30H20V20Z" fill="#0C1A2E" />
        <path fillRule="evenodd" clipRule="evenodd" d="M65 15H85V35H65V15ZM70 20H80V30H70V20Z" fill="#0C1A2E" />
        <path fillRule="evenodd" clipRule="evenodd" d="M15 65H35V85H15V65ZM20 70H30V80H20V70Z" fill="#0C1A2E" />
        <rect x="22.5" y="22.5" width="5" height="5" fill="#0C1A2E" />
        <rect x="72.5" y="22.5" width="5" height="5" fill="#0C1A2E" />
        <rect x="22.5" y="72.5" width="5" height="5" fill="#0C1A2E" />
        <rect x="40" y="15" width="5" height="5" fill="#0C1A2E" />
        <rect x="50" y="15" width="10" height="5" fill="#0c1a2e" />
        <rect x="40" y="25" width="15" height="5" fill="#0C1A2E" />
        <rect x="55" y="30" width="5" height="10" fill="#0c1a2e" />
        <rect x="15" y="40" width="10" height="5" fill="#0C1A2E" />
        <rect x="30" y="40" width="5" height="5" fill="#0c1a2e" />
        <rect x="15" y="50" width="5" height="10" fill="#0C1A2E" />
        <rect x="75" y="40" width="10" height="5" fill="#0C1A2E" />
        <rect x="65" y="45" width="5" height="10" fill="#0c1a2e" />
        <rect x="80" y="55" width="5" height="5" fill="#0C1A2E" />
        <rect x="40" y="70" width="5" height="5" fill="#0C1A2E" />
        <rect x="50" y="75" width="15" height="5" fill="#0c1a2e" />
        <rect x="45" y="80" width="5" height="5" fill="#0C1A2E" />
        <rect x="60" y="65" width="5" height="10" fill="#0C1A2E" />
        <rect x="70" y="75" width="10" height="10" fill="#0C1A2E" />
        <rect x="35" y="60" width="5" height="5" fill="#0c1a2e" />
        <rect x="40" y="50" width="5" height="5" fill="#0C1A2E" />
        <rect x="55" y="50" width="5" height="5" fill="#0C1A2E" />
        <rect x="35" y="45" width="5" height="5" fill="#0C1A2E" />
        <rect x="60" y="40" width="5" height="5" fill="#0c1a2e" />
        <rect x="42.5" y="42.5" width="15" height="15" fill="white" />
        <path d="M44 44H56V56H44V44Z" stroke="#0c1a2e" strokeWidth="1.5" fill="none" />
        <path d="M46 54V48L50 51L54 48V54" stroke="#0c1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function Counter({ value, isRTL, inView }: { value: number | string, isRTL: boolean, inView: boolean }) {
    const [displayValue, setDisplayValue] = React.useState("0");

    // Helper to convert Eastern Arabic digits (٠-٩) to Western Arabic (0-9)
    const convertToEn = (str: string) => str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
    
    const numericValue = typeof value === 'string' 
        ? parseInt(convertToEn(value).replace(/[^0-9]/g, '')) 
        : value;

    React.useEffect(() => {
        if (!inView) return;

        if (isNaN(numericValue as number)) {
            setDisplayValue(String(value));
            return;
        }

        const controls = animate(0, numericValue as number, {
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => {
                const rounded = Math.floor(latest);
                let finalStr = String(rounded);
                
                if (isRTL) {
                    const idMap: Record<string, string> = {
                        '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤', '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
                    };
                    finalStr = finalStr.replace(/[0-9]/g, w => idMap[w]);
                }

                if (typeof value === 'string') {
                    // Extract non-digit characters to preserve any suffix (though we currently have none)
                    const suffix = value.replace(/[0-9٠-٩]/g, '').trim();
                    setDisplayValue(suffix ? (isRTL ? `${finalStr} ${suffix}` : `${finalStr} ${suffix}`) : finalStr);
                } else {
                    setDisplayValue(finalStr);
                }
            }
        });
        return () => controls.stop();
    }, [numericValue, isRTL, value, inView]);

    return <span>{displayValue}</span>;
}

const BrandCard = ({ brand, scanText }: { brand: typeof brands[0], scanText: string }) => {
    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(12,26,46,0.04)] border border-[#0c1a2e]/[0.02] flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 mb-4 bg-white border border-[#0c1a2e]/10 rounded-xl flex items-center justify-center shadow-sm">
                <Iconify icon="solar:graph-up-linear" className="text-[#0c1a2e]" width={20} />
            </div>
            <h3 className="text-[15px] font-bold text-[#0c1a2e] mb-1 tracking-wide uppercase">{brand.name}</h3>
            <p className="text-xs text-[#3a4f6a]/70 font-medium mb-6">{brand.tagline}</p>
            <div className="w-32 h-32 mb-6">
                <QRCodeSVG />
            </div>
            <div className="flex items-center gap-2 text-[10.5px] font-bold text-[#0c1a2e] uppercase tracking-widest mt-auto pt-2">
                <Iconify icon="solar:smartphone-linear" width={14} className="text-[#0c1a2e]/70" />
                <span dir="auto">{scanText}</span>
            </div>
        </div>
    );
};

export default function BrandQRs() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].brandQRs;
    const bannerRef = useRef(null);
    const isInView = useInView(bannerRef, { once: true, amount: 0.3 });

    return (
        <section dir="ltr" id="brand-qrs" className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#faf9f6' }}>

            {/* Decorative elements */}
            <div className={`absolute top-20 ${isRTL ? 'right-10' : 'left-10'} opacity-[0.1] pointer-events-none hidden lg:block`}>
                <div className="grid grid-cols-4 gap-2">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0c1a2e]" />
                    ))}
                </div>
            </div>

            <svg
                className={`absolute top-0 ${isRTL ? 'left-0 scale-x-[-1]' : 'right-0'} w-[400px] h-[400px] opacity-[0.05] pointer-events-none`}
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {[80, 120, 160, 200, 240, 280, 320].map((r) => (
                    <circle key={r} cx="300" cy="0" r={r} stroke="#0c1a2e" strokeWidth="0.8" />
                ))}
            </svg>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block w-8 h-[2px] bg-[#0c1a2e]" />
                        <span dir="auto" className="text-[12px] font-bold tracking-widest text-[#0c1a2e] uppercase">
                            {t.eyebrow}
                        </span>
                    </div>
                    <h2 dir="auto" className="text-4xl md:text-5xl font-bold text-[#0c1a2e] mb-5 tracking-tight leading-tight">
                        {t.title}
                    </h2>
                    <p dir="auto" className={`text-[15.5px] ${isRTL ? 'text-[#0c1a2e] font-bold' : 'text-[#0c1a2e] font-semibold'} max-w-md mx-auto leading-relaxed`}>
                        {t.description}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {brands.map((brand) => (
                        <BrandCard key={brand.name} brand={brand} scanText={t.scanToFollow} />
                    ))}
                </div>

                {/* Bottom Stats Banner */}
                <div 
                    ref={bannerRef}
                    className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_8px_40px_rgb(12,26,46,0.06)] border border-[#0c1a2e]/[0.02] flex flex-col lg:flex-row items-center justify-between gap-10"
                >

                    <div className={`flex items-center gap-6 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                        <div className="w-16 h-16 rounded-full bg-[#0c1a2e] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#0c1a2e]/20">
                            <Iconify icon="solar:global-linear" className="text-white" width={32} />
                        </div>
                        <div>
                            <h4 dir="auto" className="text-[19px] font-bold text-[#0c1a2e] mb-2">{t.banner.title}</h4>
                            <p dir="auto" className={`text-[14px] ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#3a4f6a]/70'} font-medium max-w-xs leading-relaxed`}>
                                {t.banner.subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">

                        {/* Vision Stat */}
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:medal-ribbon-linear" className="text-[#0c1a2e]" width={28} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-[20px] font-bold text-[#0c1a2e] leading-none mb-1">
                                    <Counter value={t.banner.stats.vision} isRTL={isRTL} inView={isInView} />
                                </div>
                                <div dir="auto" className="text-[12px] font-bold text-[#0c1a2e]">
                                    {t.banner.stats.visionLabel}
                                </div>
                            </div>
                        </div>

                        {/* Sectors Stat */}
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:city-linear" className="text-[#0c1a2e]" width={28} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-[20px] font-bold text-[#0c1a2e] leading-none mb-1">
                                    <Counter value={t.banner.stats.sectors} isRTL={isRTL} inView={isInView} />
                                </div>
                                <div dir="auto" className="text-[12px] font-bold text-[#0c1a2e]">
                                    {t.banner.stats.sectorsLabel}
                                </div>
                            </div>
                        </div>

                        {/* Offices Stat */}
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:buildings-linear" className="text-[#0c1a2e]" width={28} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-[20px] font-bold text-[#0c1a2e] leading-none mb-1">
                                    <Counter value={t.banner.stats.offices} isRTL={isRTL} inView={isInView} />
                                </div>
                                <div dir="auto" className="text-[12px] font-bold text-[#0c1a2e]">
                                    {t.banner.stats.officesLabel}
                                </div>
                            </div>
                        </div>

                        {/* Professionals Stat */}
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:users-group-rounded-linear" className="text-[#0c1a2e]" width={28} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-[20px] font-bold text-[#0c1a2e] leading-none mb-1">
                                    <Counter value={t.banner.stats.professionals} isRTL={isRTL} inView={isInView} />
                                </div>
                                <div dir="auto" className="text-[12px] font-bold text-[#0c1a2e]">
                                    {t.banner.stats.professionalsLabel}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
