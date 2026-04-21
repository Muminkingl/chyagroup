"use client";
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import AbstractGlassArt from './abstarc';
import { BlurInText } from '@/components/ui/blur-in-text';
import { Iconify } from '@/components/ui/Iconify';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';

const FEATURE_CONFIG = [
  {
    id: 'general-trading',
    icon: 'solar:shop-2-linear',
    image: 'https://media.gettyimages.com/id/171333647/photo/charts-printed-on-paper-and-calculator.jpg?s=612x612&w=0&k=20&c=rkFKVXbLZmH938W0MEvhb976-ZlhBKlsNkKMqFmtwXk=',
    count: 14,
  },
  {
    id: 'money-exchange',
    icon: 'solar:card-transfer-linear',
    image: 'https://media.gettyimages.com/id/1426365017/photo/providing-customers-with-top-notch-service.jpg?s=612x612&w=0&k=20&c=jSrQxjw_ueuBXJ4zubumlR1e_WqLICWtOv2v8tcxFdQ=',
    count: 5,
  },
  {
    id: 'mobile-tech',
    icon: 'solar:smartphone-2-linear',
    image: 'https://media.gettyimages.com/photos/smartphone-showing-health-data-picture-id635946549?k=20&m=635946549&s=612x612&w=0&h=TmJyXdFglUpejaNcECc4baDG59RhqEGiXT633gAMp0o=',
    count: 3,
  },
  {
    id: 'printing',
    icon: 'solar:printer-minimalistic-linear',
    image: 'https://media.istockphoto.com/id/136628290/photo/photocopy.jpg?s=612x612&w=0&k=20&c=L_ytG6BObvzgBjlzObxx_gxQ89znxQmm9HmD45Ewn0U=',
    count: 1,
  },
  {
    id: 'online-trading',
    icon: 'solar:chart-square-linear',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/022/603/274/small/investors-analyzing-stock-market-trading-charts-technical-price-charts-and-indicators-business-and-technology-stock-chart-data-stock-trading-and-investment-concept-forex-trading-analysis-free-photo.jpg',
    count: 3,
  },
];

export default function FeatureSection() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].features;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Merge config with translations
  const features = FEATURE_CONFIG.map((config, idx) => ({
    ...config,
    ...t.items[idx]
  }));

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % features.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance every 13 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 13000);
    return () => clearInterval(timer);
  }, [features.length]);


  return (
    <section className="w-full px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Headline & Carousel - Order flips in RTL via flex-row-reverse usually, but grid handles it if we use logical props */}
        <div className="flex flex-col relative z-20">
          
          {/* Headline Area */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1] mb-6 flex flex-col md:block text-start">
              <div className="inline-flex gap-2 mr-2 rtl:mr-0 rtl:ml-2">
                <BlurInText text={t.headline.five} stagger={0.04} split={isRTL ? "word" : "letter"} /> 
                <span className="font-editorial text-white/70 font-normal">
                    <BlurInText text={t.headline.sectors} stagger={0.04} split={isRTL ? "word" : "letter"} />
                </span>
              </div>
              <br className="hidden md:block" />
              <div className="inline-flex gap-2">
                <BlurInText text={t.headline.one} stagger={0.04} split={isRTL ? "word" : "letter"} />
                <span className="font-editorial text-white/70 font-normal">
                    <BlurInText text={t.headline.vision} stagger={0.04} split={isRTL ? "word" : "letter"} />
                </span>
              </div>
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-md leading-relaxed text-start">
              {t.description}
            </p>
          </div>

          {/* Card Carousel */}
          <div className="relative h-[500px] w-full max-w-[550px] perspective-1000">
            {features.map((feature, index) => {
              // Calculate relative position for the stack effect
              const offset = (index - activeIndex + features.length) % features.length;
              
              // Define styles based on stack position
              let stackClasses = "";
              let zIndex = 0;
              
              const multiplier = isRTL ? -1 : 1;
              
              if (offset === 0) {
                // Front active card
                stackClasses = "translate-x-0 translate-y-0 scale-100 opacity-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]";
                zIndex = 30;
              } else if (offset === 1) {
                // Middle card
                stackClasses = clsx(
                    "translate-y-8 scale-[0.92] opacity-60 border-white/5",
                    isRTL ? "-translate-x-8" : "translate-x-8"
                );
                zIndex = 20;
              } else if (offset === 2) {
                // Back card
                stackClasses = clsx(
                    "translate-y-16 scale-[0.84] opacity-30 border-white/5",
                    isRTL ? "-translate-x-16" : "translate-x-16"
                );
                zIndex = 10;
              } else {
                // Hidden cards (if more than 3)
                stackClasses = clsx(
                    "translate-y-24 scale-75 opacity-0",
                    isRTL ? "-translate-x-24" : "translate-x-24"
                );
                zIndex = 0;
              }

              return (
                <div 
                  key={feature.id}
                  className={clsx(
                    "absolute top-0 left-0 w-full h-full rounded-2xl glass-panel transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col overflow-hidden",
                    stackClasses
                  )}
                  style={{ zIndex }}
                >
                  <div className="absolute inset-0 z-0">
                     <img src={feature.image} alt={feature.cardTitle} className="w-full h-full object-cover opacity-50 mix-blend-lighten" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  
                  {/* Decorative glass art inside the card */}
                   <div className="absolute inset-0 z-0 mix-blend-overlay opacity-60">
                     <AbstractGlassArt variant={index} />
                  </div>
                  
                  {/* Card Content Overlay */}
                  <div className="relative z-10 flex-1 p-6 flex flex-col justify-between text-start">
                    <div className="flex justify-between items-start">
                      <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[9px] tracking-widest uppercase text-white/50 border border-white/5 flex items-center gap-1.5">
                        <Iconify icon={feature.icon} width={12} />
                        {feature.tag}
                      </div>
                      <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold tracking-tighter text-white/90 drop-shadow-lg mb-4">
                        {feature.cardTitle}
                      </h3>
                      <div className="flex gap-2">
                        <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-[10px] tracking-wider uppercase text-white/70 border border-white/10 flex items-center gap-1.5">
                          <Iconify icon="solar:shield-check-linear" />
                          {locale === 'en' ? 'Verified' : locale === 'ar' ? 'موثوق' : 'پشاندراو'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Carousel Controls */}
            <div className="absolute -bottom-16 left-0 rtl:left-auto rtl:right-0 flex items-center gap-4 z-40">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
                aria-label="Previous feature"
              >
                <Iconify icon={isRTL ? "solar:arrow-right-linear" : "solar:arrow-left-linear"} width={20} />
              </button>
              <div className="flex gap-2">
                {features.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={clsx(
                      "h-1 rounded-full transition-all duration-300",
                      idx === activeIndex ? "w-6 bg-white/80" : "w-2 bg-white/20"
                    )}
                  />
                ))}
              </div>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
                aria-label="Next feature"
              >
                <Iconify icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col mt-8 lg:mt-0 pt-0 lg:pt-12 items-start lg:items-end">
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-10 justify-start lg:justify-end">
            {features.map((f, idx) => (
              <button
                key={f.tag}
                onClick={() => setActiveIndex(idx)}
                className={clsx(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border",
                  idx === activeIndex 
                    ? "bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                    : "bg-transparent text-white/40 border-transparent hover:text-white/70 hover:bg-white/5"
                )}
              >
                {f.tag}
                <span className={clsx(
                  "text-[10px] px-1.5 py-0.5 rounded-full bg-black/50",
                  idx === activeIndex ? "text-white/80" : "text-white/30"
                )}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Info Card */}
          <div 
            key={activeIndex} 
            className="glass-panel rounded-2xl p-8 lg:p-10 animate-fade-slide relative overflow-hidden text-start"
          >
            {/* Subtle highlight effect on the card */}
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <div className="flex justify-between items-start mb-8">
              <div className="text-[10px] tracking-[0.2em] font-semibold text-white/40 uppercase">
                {features[activeIndex].contentLabel}
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-4">
              {features[activeIndex].contentTitle}
            </h2>
            
            <div className="space-y-4 mb-10 text-sm lg:text-base text-white/50 leading-relaxed font-light">
              <p>
                {features[activeIndex].contentBody}
              </p>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              {features[activeIndex].metrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="text-2xl font-semibold text-white tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-white/40">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}