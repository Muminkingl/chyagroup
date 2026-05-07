"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlurInText } from '@/components/ui/blur-in-text';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '@/components/ui/Iconify';

export default function HeroSection() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].hero;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Small delay so the browser has painted before triggering animations
        const raf = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <>
            {/* Keyframe definitions injected once */}
            <style>{`
                @keyframes heroGlobeIn {
                    0%   { opacity: 0; transform: translateX(6%) scale(0.96); }
                    100% { opacity: 1; transform: translateX(0%)  scale(1);    }
                }
                @keyframes heroFadeUp {
                    0%   { opacity: 0; transform: translateY(22px); }
                    100% { opacity: 1; transform: translateY(0);     }
                }
                @keyframes heroSvgIn {
                    0%   { opacity: 0; }
                    100% { opacity: 0.12; }
                }

                .hero-globe {
                    opacity: 0;
                }
                .hero-globe.ready {
                    animation: heroGlobeIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
                }

                .hero-arc-grid {
                    opacity: 0;
                }
                .hero-arc-grid.ready {
                    animation: heroSvgIn 1.4s ease 0.05s forwards;
                }

                .hero-fade-up {
                    opacity: 0;
                }
                .hero-fade-up.ready {
                    animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .hero-fade-up.ready.delay-1 { animation-delay: 0.55s; }
                .hero-fade-up.ready.delay-2 { animation-delay: 0.72s; }
            `}</style>

            <section dir="ltr" className="relative w-full overflow-hidden" style={{ background: '#faf9f6' }}>
                {/* Decorative arc grid — top right corner */}
                <svg
                    className={`hero-arc-grid${mounted ? ' ready' : ''} absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none z-0`}
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {[60, 100, 140, 180, 220, 260].map((r) => (
                        <circle key={r} cx="300" cy="0" r={r} stroke="#0c1a2e" strokeWidth="0.8" />
                    ))}
                    {[15, 30, 45, 60, 75].map((deg) => {
                        const rad = (deg * Math.PI) / 180;
                        return (
                            <line
                                key={deg}
                                x1="300"
                                y1="0"
                                x2={300 - Math.cos(rad) * 280}
                                y2={Math.sin(rad) * 280}
                                stroke="#0c1a2e"
                                strokeWidth="0.8"
                            />
                        );
                    })}
                </svg>

                {/* Main hero area */}
                <div className="relative min-h-[600px] lg:min-h-[92vh]">

                    {/* Globe image — adjusted to be fully visible and slightly smaller */}
                    <div
                        className={`hero-globe${mounted ? ' ready' : ''} absolute bottom-[-5%] left-0 right-0 sm:bottom-0 sm:right-0 lg:left-auto lg:bottom-[-2%] lg:right-[4%] w-full sm:w-[90%] md:w-[75%] lg:w-[48%] h-[35%] sm:h-[50%] md:h-[65%] lg:h-[85%] opacity-100 pointer-events-none z-20`}
                    >
                        <img
                            src="/maybenew.png"
                            alt="Global connections"
                            className="w-full h-full object-contain object-bottom"
                            style={{
                                filter: 'brightness(1.1) contrast(1.05)',
                            }}
                        />
                    </div>

                    {/* Text content — dir=ltr keeps layout fixed; individual text uses dir=auto */}
                    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex items-center min-h-[600px] lg:min-h-[92vh]">
                        <div className={`max-w-2xl pt-28 pb-40 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 ${isRTL ? 'text-right' : 'text-left'} relative z-20`}>

                            {/* Main headline */}
                            <h1 dir="auto" className="text-[2.15rem] xs:text-[2.4rem] sm:text-5xl md:text-6xl xl:text-[4.25rem] font-bold tracking-tight text-[#0a2a56] leading-[1.1] mb-6 break-keep">
                                <span className="block lg:whitespace-nowrap">
                                    <BlurInText
                                        text={t.line1}
                                        blurAmount={10}
                                        duration={0.8}
                                        stagger={0.04}
                                        split={isRTL ? "word" : "letter"}
                                        trigger="mount"
                                    />
                                </span>
                                <span className="block font-medium italic text-[#e84040] mt-1">
                                    <BlurInText
                                        text={t.line2}
                                        blurAmount={10}
                                        duration={0.9}
                                        stagger={0.04}
                                        split={isRTL ? "word" : "letter"}
                                        trigger="mount"
                                    />
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p dir="auto" className={`hero-fade-up${mounted ? ' ready delay-1' : ''} text-[15px] sm:text-base ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#3a4f6a] font-normal'} max-w-sm leading-relaxed mb-10 text-justify`}>
                                {t.description}
                            </p>

                            {/* Buttons */}
                            <div className={`hero-fade-up${mounted ? ' ready delay-2' : ''} flex items-center gap-3 flex-wrap`}>
                                <Link
                                    href="#agents"
                                    className="flex items-center justify-center bg-[#0c1a2e] text-white font-semibold h-[46px] rounded-full ps-6 pe-5 text-sm hover:bg-[#162d4f] transition-all duration-300 shadow-md sm:shadow-sm hover:shadow-lg sm:hover:shadow-md ring-2 ring-white/80 sm:ring-0"
                                >
                                    <span className="text-nowrap" dir="auto">{t.learnMore}</span>
                                    <Iconify icon="solar:alt-arrow-right-linear" width={16} className="ms-1.5 h-4 w-4" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-center text-[#0c1a2e] bg-white sm:bg-transparent border border-[#0c1a2e]/15 sm:border-[#0c1a2e]/25 h-[46px] rounded-full px-6 text-sm font-medium hover:bg-[#0c1a2e]/5 sm:hover:bg-[#0c1a2e]/5 transition-all duration-300 shadow-sm sm:shadow-none"
                                >
                                    <span className="text-nowrap" dir="auto">{t.contactUs}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom transition gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-40 bg-gradient-to-t from-[#faf9f6] via-[#faf9f6]/90 to-transparent z-0 pointer-events-none" />
            </section>
        </>
    );
}