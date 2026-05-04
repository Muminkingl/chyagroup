"use client";
import React, { useState } from 'react';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '@/components/ui/Iconify';

const agents = [
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

const AgentLogo = ({ name, logo, url }: { name: string, logo: string, url: string }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center w-[220px] h-[200px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#0c1a2e]/5 transition-all duration-300 group hover:-translate-y-1 mx-2"
    >
        <img
            src={logo}
            alt={`${name} Logo`}
            className="w-auto h-auto max-w-[155px] max-h-[95px] object-contain transition-transform duration-300 group-hover:scale-110"
        />
        <span className="mt-4 text-sm font-semibold text-[#0c1a2e]/80 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-6">
            {name}
        </span>
    </a>
);

export default function AgentLoop() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].agents;
    const [isReversed, setIsReversed] = useState(isRTL);

    return (
        <section dir="ltr" id="agents" className="relative bg-[#faf9f6] py-24 overflow-hidden scroll-mt-24">
            {/* Subtle background circles */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 -translate-y-1/2 left-[-10%] w-[600px] h-[600px] rounded-full border-[1px] border-[#0c1a2e]/5" />
                <div className="absolute top-1/2 -translate-y-1/2 left-[-15%] w-[800px] h-[800px] rounded-full border-[1px] border-[#0c1a2e]/5" />
                <div className="absolute top-1/2 -translate-y-1/2 right-[-10%] w-[600px] h-[600px] rounded-full border-[1px] border-[#0c1a2e]/5" />
                <div className="absolute top-1/2 -translate-y-1/2 right-[-15%] w-[800px] h-[800px] rounded-full border-[1px] border-[#0c1a2e]/5" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
                            <span dir="auto" className="text-[12px] font-bold tracking-widest text-[#0c1a2e] uppercase">
                                {t.eyebrow}
                            </span>
                        </div>
                        <h2 dir="auto" className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c1a2e] leading-[1.1]">
                            {t.headline.excellence}<br />
                            <span className="text-[#162d4f] font-semibold">{t.headline.united} {t.headline.trust}</span>
                        </h2>
                    </div>

                    <div className="max-w-sm">
                        <p dir="auto" className={`text-sm ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#3a4f6a]'} leading-relaxed`}>
                            {t.subtitle}
                        </p>
                    </div>
                </div>

                {/* Slider Container with Arrows */}
                <div className="relative flex items-center justify-center">

                    {/* Left Navigation Button */}
                    <button
                        onClick={() => setIsReversed(false)}
                        className="absolute left-0 lg:-left-4 z-20 w-12 h-12 rounded-full bg-[#0c1a2e] hover:bg-[#162d4f] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 hidden md:flex"
                        aria-label="Scroll left"
                    >
                        <Iconify icon="solar:arrow-left-linear" width={20} />
                    </button>

                    <div className="w-full px-4 md:px-16 overflow-hidden">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={16}
                            reverse={isReversed}
                        >
                            {agents.map((agent, index) => (
                                <AgentLogo key={`${agent.name}-${index}`} {...agent} />
                            ))}
                        </InfiniteSlider>

                        {/* Edge Gradients */}
                        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#faf9f6] to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#faf9f6] to-transparent z-10 pointer-events-none" />
                    </div>

                    {/* Right Navigation Button */}
                    <button
                        onClick={() => setIsReversed(true)}
                        className="absolute right-0 lg:-right-4 z-20 w-12 h-12 rounded-full bg-[#0c1a2e] hover:bg-[#162d4f] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 hidden md:flex"
                        aria-label="Scroll right"
                    >
                        <Iconify icon="solar:arrow-right-linear" width={20} />
                    </button>

                </div>
            </div>
        </section>
    );
}
