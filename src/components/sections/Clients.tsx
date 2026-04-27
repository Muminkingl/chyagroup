"use client";
import React from 'react';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

const clients = [
    { name: "Client 1", logo: "https://via.placeholder.com/150x80/111111/ffffff?text=CLIENT+1" },
    { name: "Client 2", logo: "https://via.placeholder.com/150x80/111111/ffffff?text=CLIENT+2" },
    { name: "Client 3", logo: "https://via.placeholder.com/150x80/111111/ffffff?text=CLIENT+3" },
    { name: "Client 4", logo: "https://via.placeholder.com/150x80/111111/ffffff?text=CLIENT+4" },
    { name: "Client 5", logo: "https://via.placeholder.com/150x80/111111/ffffff?text=CLIENT+5" },
    { name: "Client 6", logo: "https://via.placeholder.com/150x80/111111/ffffff?text=CLIENT+6" },
];

const ClientLogo = ({ name, logo }: { name: string, logo: string }) => (
    <div className="flex items-center justify-center px-8 h-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
        <img 
            src={logo} 
            alt={`${name} Logo`} 
            className="h-full w-auto object-contain filter invert" 
        />
    </div>
);

export default function ClientsSection() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].hero;

    return (
        <section id="clients" className="bg-[#09090b] py-16 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-10">
                <h2 className="text-xs font-bold text-white/40 tracking-[0.3em] uppercase text-center">
                    {t.clients}
                </h2>
            </div>
            
            <div className="relative">
                <InfiniteSlider
                    speed={30}
                    gap={60}
                    reverse={!isRTL}
                >
                    {clients.map((client, index) => (
                        <ClientLogo key={`${client.name}-${index}`} {...client} />
                    ))}
                </InfiniteSlider>
                
                <div className="bg-gradient-to-r from-[#09090b] absolute inset-y-0 left-0 w-32 z-10" />
                <div className="bg-gradient-to-l from-[#09090b] absolute inset-y-0 right-0 w-32 z-10" />
                <ProgressiveBlur
                    className="pointer-events-none absolute left-0 top-0 h-full w-32 z-20"
                    direction="left"
                    blurIntensity={1.5}
                />
                <ProgressiveBlur
                    className="pointer-events-none absolute right-0 top-0 h-full w-32 z-20"
                    direction="right"
                    blurIntensity={1.5}
                />
            </div>
        </section>
    );
}
