"use client";
import React from 'react';
import Link from 'next/link';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur';
import { BlurInText } from '@/components/ui/blur-in-text';


const partners = [
    { name: "FIB", logo: "https://fib.iq/wp-content/themes/FIB/assets/images/header-mobile-logo.svg", url: "https://fib.iq/" },
    { name: "AIIB", logo: "/asia.svg", url: "https://aiib.iq/" },
    { name: "NW", logo: "/nass.svg", url: "https://nw.iq/" },
    { name: "Shift", logo: "/shift.svg", url: "https://www.shifttransfer.com/" },
    { name: "Direct Remit", logo: "/retmi.png", url: "https://www.emiratesnbd.com/en/foreign-exchange/directremit" },
    { name: "Qi Card", logo: "https://qi.iq/images/logo.svg?1=1", url: "https://qi.iq/en/home" },
    { name: "Zain Cash", logo: "https://zaincash.com/static/media/ZainCashLogo.fea8cf3bb90421f45dd384d6afc6fe3b.svg", url: "https://zaincash.com/" },
    { name: "Switch", logo: "/switch.png", url: "https://switch.com.iq/" },
    { name: "Fast Pay", logo: "https://www.fast-pay.iq/img/clogo.png", url: "https://www.fast-pay.iq/" },
    { name: "Asia Pay", logo: "https://www.asiapay.iq/en/images/header-footer/Logo.png", url: "https://www.asiapay.iq/" },
    { name: "Blue", logo: "/blue.png", url: "https://blue.com.iq/en/home/" },
    { name: "Houzz", logo: "/houzz.png", url: "https://shophouzz.com/pages/creditcard" },
];

const PartnerLogo = ({ name, logo, url }: { name: string, logo: string, url: string }) => (
    <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-4 h-12 transition-all duration-300 grayscale-[0.2] opacity-75 hover:grayscale-0 hover:opacity-100 group"
    >
        <img 
            src={logo} 
            alt={`${name} Logo`} 
            className="h-full w-auto max-w-[120px] object-contain transition-transform duration-300 group-hover:scale-110" 
        />
    </a>
);

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '@/components/ui/Iconify';

export default function HeroSection() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].hero;

    return (
        <>
            <main className="overflow-x-hidden">
                <section>
                    <div className="relative">
                        {/* Hero Content - sits above background */}
                        <div className="aspect-2/3 relative z-10 flex flex-col justify-end px-6 lg:aspect-video">
                            <div className="mx-auto w-full max-w-7xl pb-10 lg:px-12 lg:pb-36">
                                <div className="max-w-4xl text-start">
                                    {/* Main headline with BlurInText */}
                                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
                                        <span className="block">
                                            <BlurInText
                                                text={t.line1}
                                                blurAmount={12}
                                                duration={1}
                                                stagger={0.06}
                                                split={isRTL ? "word" : "letter"}
                                                trigger="mount"
                                            />
                                        </span>
                                        <span className="block font-light italic text-white/70">
                                            <BlurInText
                                                text={t.line2}
                                                blurAmount={12}
                                                duration={1.1}
                                                stagger={0.06}
                                                split={isRTL ? "word" : "letter"}
                                                trigger="mount"
                                            />
                                        </span>
                                    </h1>

                                    {/* Subline */}
                                    <p className="mt-4 text-base md:text-lg text-white/50 max-w-md leading-relaxed font-light text-start">
                                        {t.description}
                                    </p>

                                    <div className="mt-10 flex items-center gap-3">
                                        <Link
                                            href="#partners"
                                            className="flex items-center justify-center bg-white text-black font-semibold h-12 rounded-full ps-6 pe-4 text-sm hover:bg-neutral-200 transition-colors"
                                        >
                                            <span className="text-nowrap">{t.learnMore}</span>
                                            {isRTL ? (
                                                <Iconify icon="solar:alt-arrow-left-linear" className="ms-1 w-4 h-4" />
                                            ) : (
                                                <Iconify icon="solar:alt-arrow-right-linear" width={16} className="ms-1 h-4 w-4" />
                                            )}
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="flex items-center justify-center text-white/70 border border-white/10 h-12 rounded-full px-6 text-sm hover:bg-white/5 transition-colors backdrop-blur-sm"
                                        >
                                            <span className="text-nowrap">{t.contactUs}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Image with grid overlay */}
                        <div className="aspect-2/3 pointer-events-none absolute inset-0 overflow-hidden rounded-3xl lg:aspect-video lg:rounded-[3rem]">
                            {/* The background image */}
                            <img
                                src="/image.png"
                                alt="Chya Group Hero"
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />
                            {/* Dark overlay to ensure text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                            {/* Grid texture overlay */}
                            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                            {/* Bottom fade */}
                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent" />
                        </div>
                    </div>
                </section>

                {/* Logo Ticker */}
                <section id="partners" className="bg-[#09090b] py-6 border-t border-white/5 scroll-mt-24">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:border-white/10 md:pr-6 whitespace-nowrap">
                                <p className="text-center md:text-end text-xs font-bold text-white/60 tracking-[0.2em] uppercase">{t.partners}</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)] overflow-hidden">
                                <InfiniteSlider
                                    speedOnHover={20}
                                    speed={40}
                                    gap={80}
                                    reverse={isRTL}
                                >
                                    {partners.map((partner, index) => (
                                        <PartnerLogo key={`${partner.name}-${index}`} {...partner} />
                                    ))}
                                </InfiniteSlider>
                                <div className="bg-gradient-to-r from-[#09090b] absolute inset-y-0 left-0 w-20 z-10" />
                                <div className="bg-gradient-to-l from-[#09090b] absolute inset-y-0 right-0 w-20 z-10" />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20 z-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20 z-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}