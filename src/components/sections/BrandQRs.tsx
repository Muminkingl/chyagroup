"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '@/components/ui/Iconify';

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
        {/* Outer background */}
        <rect width="100" height="100" rx="8" fill="#F8FAFC" />
        
        {/* Corner Squares (Blue) */}
        <path fillRule="evenodd" clipRule="evenodd" d="M15 15H35V35H15V15ZM20 20H30V30H20V20Z" fill="#0C1A2E" />
        <path fillRule="evenodd" clipRule="evenodd" d="M65 15H85V35H65V15ZM70 20H80V30H70V20Z" fill="#0C1A2E" />
        <path fillRule="evenodd" clipRule="evenodd" d="M15 65H35V85H15V65ZM20 70H30V80H20V70Z" fill="#0C1A2E" />
        
        {/* Small corner dots */}
        <rect x="22.5" y="22.5" width="5" height="5" fill="#0C1A2E" />
        <rect x="72.5" y="22.5" width="5" height="5" fill="#0C1A2E" />
        <rect x="22.5" y="72.5" width="5" height="5" fill="#0C1A2E" />

        {/* Random scattered pattern (Mix of Red and Navy) */}
        <rect x="40" y="15" width="5" height="5" fill="#0C1A2E" />
        <rect x="50" y="15" width="10" height="5" fill="#FF4D4D" />
        <rect x="40" y="25" width="15" height="5" fill="#0C1A2E" />
        <rect x="55" y="30" width="5" height="10" fill="#FF4D4D" />
        
        <rect x="15" y="40" width="10" height="5" fill="#0C1A2E" />
        <rect x="30" y="40" width="5" height="5" fill="#FF4D4D" />
        <rect x="15" y="50" width="5" height="10" fill="#0C1A2E" />
        
        <rect x="75" y="40" width="10" height="5" fill="#0C1A2E" />
        <rect x="65" y="45" width="5" height="10" fill="#FF4D4D" />
        <rect x="80" y="55" width="5" height="5" fill="#0C1A2E" />
        
        <rect x="40" y="70" width="5" height="5" fill="#0C1A2E" />
        <rect x="50" y="75" width="15" height="5" fill="#FF4D4D" />
        <rect x="45" y="80" width="5" height="5" fill="#0C1A2E" />
        <rect x="60" y="65" width="5" height="10" fill="#0C1A2E" />
        <rect x="70" y="75" width="10" height="10" fill="#0C1A2E" />
        
        <rect x="35" y="60" width="5" height="5" fill="#FF4D4D" />
        <rect x="40" y="50" width="5" height="5" fill="#0C1A2E" />
        <rect x="55" y="50" width="5" height="5" fill="#0C1A2E" />
        <rect x="35" y="45" width="5" height="5" fill="#0C1A2E" />
        <rect x="60" y="40" width="5" height="5" fill="#FF4D4D" />

        {/* Center Logo Placeholder (Red border with inner M shape) */}
        <rect x="42.5" y="42.5" width="15" height="15" fill="white" />
        <path d="M44 44H56V56H44V44Z" stroke="#FF4D4D" strokeWidth="1.5" fill="none" />
        <path d="M46 54V48L50 51L54 48V54" stroke="#FF4D4D" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const BrandCard = ({ brand }: { brand: typeof brands[0] }) => {
    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(12,26,46,0.04)] border border-[#0c1a2e]/[0.02] flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
            {/* Top Icon */}
            <div className="w-10 h-10 mb-4 bg-white border border-[#0c1a2e]/10 rounded-xl flex items-center justify-center shadow-sm">
                <Iconify icon="solar:graph-up-linear" className="text-[#0c1a2e]" width={20} />
            </div>
            
            {/* Brand Name & Tagline */}
            <h3 className="text-[15px] font-bold text-[#0c1a2e] mb-1 tracking-wide">{brand.name}</h3>
            <p className="text-xs text-[#3a4f6a]/70 font-medium mb-6">{brand.tagline}</p>
            
            {/* QR Code */}
            <div className="w-32 h-32 mb-6">
                <QRCodeSVG />
            </div>
            
            {/* Footer */}
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#3a4f6a]/60 uppercase tracking-widest mt-auto pt-2">
                <Iconify icon="solar:smartphone-linear" width={14} />
                <span>SCAN TO FOLLOW</span>
            </div>
        </div>
    );
};

export default function BrandQRs() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].hero;

    return (
        <section id="brand-qrs" className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#f5f0ea' }}>
            
            {/* Decorative dot grid — top left */}
            <div className={`absolute top-20 ${isRTL ? 'right-10' : 'left-10'} opacity-[0.1] pointer-events-none hidden lg:block`}>
                <div className="grid grid-cols-4 gap-2">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0c1a2e]" />
                    ))}
                </div>
            </div>

            {/* Decorative arc grid — top right corner */}
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
                <div className="text-center mb-16">
                    <h2 className="text-[11px] font-bold text-[#ff4d4d] tracking-[0.3em] uppercase mb-4">
                        FOLLOW OUR BRANDS
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-[#0c1a2e] mb-5 tracking-tight">
                        Brand QR Codes
                    </h3>
                    <p className="text-[15px] text-[#3a4f6a]/80 font-medium max-w-md mx-auto leading-relaxed">
                        Scan to explore our brands and stay connected across our diverse business sectors.
                    </p>
                </div>
                
                {/* Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 ${isRTL ? 'direction-rtl' : ''}`}>
                    {brands.map((brand) => (
                        <BrandCard key={brand.name} brand={brand} />
                    ))}
                </div>

                {/* Bottom Stats Banner */}
                <div className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(12,26,46,0.04)] border border-[#0c1a2e]/[0.02] flex flex-col lg:flex-row items-center justify-between gap-8 ${isRTL ? 'direction-rtl' : ''}`}>
                    
                    {/* Banner Left Info */}
                    <div className={`flex items-center gap-5 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                        <div className="w-14 h-14 rounded-full bg-[#0c1a2e] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#0c1a2e]/20">
                            <Iconify icon="solar:global-linear" className="text-white" width={28} />
                        </div>
                        <div>
                            <h4 className="text-[17px] font-bold text-[#0c1a2e] mb-1">One Group. Many Solutions.</h4>
                            <p className="text-[13px] text-[#3a4f6a]/70 font-medium max-w-xs leading-relaxed">
                                Each brand under the Chya Group umbrella is dedicated to delivering excellence in its field.
                            </p>
                        </div>
                    </div>

                    {/* Banner Right Stats */}
                    <div className={`flex flex-wrap items-center justify-center gap-8 md:gap-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        
                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:box-minimalistic-linear" className="text-[#0c1a2e]/50" width={24} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-lg font-bold text-[#0c1a2e] leading-none mb-1">17+</div>
                                <div className="text-[11px] font-bold text-[#3a4f6a]/60 uppercase tracking-wider">Brands</div>
                            </div>
                        </div>

                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:city-linear" className="text-[#0c1a2e]/50" width={24} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-lg font-bold text-[#0c1a2e] leading-none mb-1">10+</div>
                                <div className="text-[11px] font-bold text-[#3a4f6a]/60 uppercase tracking-wider">Industries</div>
                            </div>
                        </div>

                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:users-group-rounded-linear" className="text-[#0c1a2e]/50" width={24} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-lg font-bold text-[#0c1a2e] leading-none mb-1">500+</div>
                                <div className="text-[11px] font-bold text-[#3a4f6a]/60 uppercase tracking-wider">Team Members</div>
                            </div>
                        </div>

                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:user-circle-linear" className="text-[#0c1a2e]/50" width={24} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-lg font-bold text-[#0c1a2e] leading-none mb-1">1 Vision</div>
                                <div className="text-[11px] font-bold text-[#3a4f6a]/60 uppercase tracking-wider">Endless Possibilities</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
