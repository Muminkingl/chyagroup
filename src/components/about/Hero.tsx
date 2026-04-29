"use client";
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '@/components/ui/Iconify';

export default function Hero() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].about.hero;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden bg-[#f4f7f9]">
            {/* Background Image of Citadel */}
            <div 
                className={`absolute inset-0 z-0 bg-cover bg-right transition-opacity duration-1000 scale-110 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    backgroundImage: 'url("/cit.png")',
                    backgroundPosition: 'right center',
                }}
            />

            {/* Gradients to fade image to white on the left and bottom */}
            <div 
                className="absolute inset-0 z-10"
                style={{
                    background: isRTL 
                        ? 'linear-gradient(to left, #f4f7f9 0%, rgba(244,247,249,0.9) 30%, rgba(244,247,249,0) 100%)' 
                        : 'linear-gradient(to right, #f4f7f9 0%, rgba(244,247,249,0.95) 35%, rgba(244,247,249,0.4) 60%, rgba(244,247,249,0) 100%)'
                }}
            />
            
            {/* Bottom cloud-like fade to match page background if needed, or white */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f4f7f9] via-[#f4f7f9]/80 to-transparent z-10 pointer-events-none" />

            {/* Main Content Area */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-24 md:pt-40 md:pb-32">
                <div className={`max-w-xl ${isRTL ? 'ms-auto text-right' : 'text-left'}`}>
                    
                    {/* Eyebrow */}
                    <div className={`flex items-center gap-4 mb-6 transition-all duration-700 delay-100 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <span className="w-8 h-[2px] bg-[#3b82f6]"></span>
                        <span className="text-[11px] md:text-xs font-bold tracking-[0.25em] text-[#3a4f6a] uppercase">
                            {t.eyebrow}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className={`text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-[#0c1a2e] mb-6 transition-all duration-700 delay-200 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        {t.title}
                    </h1>

                    {/* Subtitle */}
                    <p className={`text-base md:text-lg text-[#3a4f6a] max-w-[480px] leading-relaxed mb-10 font-medium transition-all duration-700 delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        {t.description}
                    </p>

                    {/* Button */}
                    <div className={`transition-all duration-700 delay-400 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <button className="group flex items-center bg-[#0c1a2e] hover:bg-[#162d4f] text-white rounded-full py-1.5 px-2 pr-6 transition-all duration-300 shadow-md hover:shadow-lg">
                            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#0c1a2e] transition-transform duration-300 group-hover:scale-95">
                                <Iconify icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                            </div>
                            <span className="ml-4 font-semibold text-sm">
                                Discover Our Journey
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}