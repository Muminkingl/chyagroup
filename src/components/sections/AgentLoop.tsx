"use client";
import React, { useState } from 'react';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { useLanguage } from '@/context/LanguageContext';
import { Iconify } from '@/components/ui/Iconify';

const agents = [
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
            className="w-auto h-auto max-w-[120px] max-h-[80px] object-contain transition-transform duration-300 group-hover:scale-105" 
        />
        {/* Fallback text if logo is purely abstract or missing */}
        <span className="mt-4 text-sm font-semibold text-[#0c1a2e]/80 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-6">
            {name}
        </span>
    </a>
);

export default function AgentLoop() {
    const { isRTL } = useLanguage();
    const [isReversed, setIsReversed] = useState(isRTL);

    return (
        <section id="agents" className="relative bg-[#f5f0ea] py-24 overflow-hidden scroll-mt-24">
            {/* Subtle background circles like the screenshot */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-[-10%]' : 'left-[-10%]'} w-[600px] h-[600px] rounded-full border-[1px] border-[#0c1a2e]/5`} />
                <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-[-15%]' : 'left-[-15%]'} w-[800px] h-[800px] rounded-full border-[1px] border-[#0c1a2e]/5`} />
                
                <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-[-10%]' : 'right-[-10%]'} w-[600px] h-[600px] rounded-full border-[1px] border-[#0c1a2e]/5`} />
                <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-[-15%]' : 'right-[-15%]'} w-[800px] h-[800px] rounded-full border-[1px] border-[#0c1a2e]/5`} />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
                
                {/* Header Section */}
                <div className={`flex flex-col lg:flex-row justify-between items-end gap-8 mb-16 ${isRTL ? 'lg:flex-row-reverse text-right' : 'text-left'}`}>
                    <div className="max-w-2xl">
                        <span className="text-[11px] font-bold tracking-widest text-[#e84040] uppercase mb-4 block">
                            OUR AGENTS
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c1a2e]">
                            Partners in growth,<br />
                            <span className="text-[#3a4f6a] font-medium">united by trust.</span>
                        </h2>
                    </div>
                    
                    <div className="max-w-sm">
                        <p className="text-sm text-[#3a4f6a] leading-relaxed">
                            We collaborate with trusted agents and partners who share our commitment to excellence and drive success across the region.
                        </p>
                    </div>
                </div>

                {/* Slider Container with Arrows */}
                <div className="relative flex items-center justify-center">
                    
                    {/* Left Navigation Button */}
                    <button 
                        onClick={() => setIsReversed(isRTL ? false : true)}
                        className={`absolute ${isRTL ? 'right-0 lg:-right-4' : 'left-0 lg:-left-4'} z-20 w-12 h-12 rounded-full bg-[#0c1a2e] hover:bg-[#162d4f] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 hidden md:flex`}
                        aria-label="Scroll left"
                    >
                        <Iconify icon={isRTL ? "solar:arrow-right-linear" : "solar:arrow-left-linear"} width={20} />
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

                        {/* Edge Gradients for smooth fading */}
                        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f5f0ea] to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f5f0ea] to-transparent z-10 pointer-events-none" />
                    </div>

                    {/* Right Navigation Button */}
                    <button 
                        onClick={() => setIsReversed(isRTL ? true : false)}
                        className={`absolute ${isRTL ? 'left-0 lg:-left-4' : 'right-0 lg:-right-4'} z-20 w-12 h-12 rounded-full bg-[#0c1a2e] hover:bg-[#162d4f] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 hidden md:flex`}
                        aria-label="Scroll right"
                    >
                        <Iconify icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width={20} />
                    </button>

                </div>
            </div>
        </section>
    );
}
