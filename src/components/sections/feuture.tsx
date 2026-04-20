"use client";
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import AbstractGlassArt from './abstarc';
import { BlurInText } from '@/components/ui/blur-in-text';

const features = [
  {
    id: 'general-trading',
    tag: 'General Trading',
    count: 14,
    cardTitle: 'GENERAL TRADING',
    icon: 'solar:shop-2-linear',
    image: 'https://media.gettyimages.com/id/171333647/photo/charts-printed-on-paper-and-calculator.jpg?s=612x612&w=0&k=20&c=rkFKVXbLZmH938W0MEvhb976-ZlhBKlsNkKMqFmtwXk=',
    contentLabel: 'GENERAL TRADING',
    contentBadge: 'CORE',
    contentTitle: 'Powering commerce across the region',
    contentBody: 'Our general trading arm spans a diverse product portfolio, supplying markets across the region with reliability and scale. With 14 branches and deep supplier networks, we keep commerce moving.',
    metrics: [
      { label: 'Branches', value: '14' },
      { label: 'Employees', value: '44' },
      { label: 'Companies', value: '3' }
    ]
  },
  {
    id: 'money-exchange',
    tag: 'Money Exchange',
    count: 5,
    cardTitle: 'MONEY EXCHANGE & FINANCIAL SERVICE',
    icon: 'solar:card-transfer-linear',
    image: 'https://media.gettyimages.com/id/1426365017/photo/providing-customers-with-top-notch-service.jpg?s=612x612&w=0&k=20&c=jSrQxjw_ueuBXJ4zubumlR1e_WqLICWtOv2v8tcxFdQ=',
    contentLabel: 'FINANCIAL SERVICES',
    contentBadge: 'LICENSED',
    contentTitle: 'Trusted financial exchange & services',
    contentBody: 'Chya Group operates 5 dedicated money exchange offices delivering fast, secure, and competitive currency exchange alongside comprehensive financial services for individuals and businesses.',
    metrics: [
      { label: 'Offices', value: '5' },
      { label: 'Currencies', value: '20+' },
      { label: 'Daily Ops', value: '24/7' }
    ]
  },
  {
    id: 'mobile-tech',
    tag: 'Mobile & Tech',
    count: 3,
    cardTitle: 'MOBILE & TECHNOLOGY',
    icon: 'solar:smartphone-2-linear',
    image: 'https://media.gettyimages.com/photos/smartphone-showing-health-data-picture-id635946549?k=20&m=635946549&s=612x612&w=0&h=TmJyXdFglUpejaNcECc4baDG59RhqEGiXT633gAMp0o=',
    contentLabel: 'MOBILE & TECHNOLOGY',
    contentBadge: 'GROWTH',
    contentTitle: 'Connecting people through technology',
    contentBody: 'From mobile devices to digital solutions, our technology division serves consumers and enterprises alike. We bridge the gap between cutting-edge tech and everyday needs across the region.',
    metrics: [
      { label: 'Online Ops', value: '3' },
      { label: 'Partners', value: '10+' },
      { label: 'Support', value: '24/7' }
    ]
  },
  {
    id: 'printing',
    tag: 'Printing',
    count: 1,
    cardTitle: 'PRINTING & PHOTOCOPY',
    icon: 'solar:printer-minimalistic-linear',
    image: 'https://media.istockphoto.com/id/136628290/photo/photocopy.jpg?s=612x612&w=0&k=20&c=L_ytG6BObvzgBjlzObxx_gxQ89znxQmm9HmD45Ewn0U=',
    contentLabel: 'PRINTING & PHOTOCOPY',
    contentBadge: 'SERVICE',
    contentTitle: 'Professional printing for every need',
    contentBody: 'Our printing and photocopy center delivers high-quality print solutions for businesses, institutions, and individuals. From documents to banners, we handle it all with precision and speed.',
    metrics: [
      { label: 'Office', value: '1' },
      { label: 'Formats', value: 'All' },
      { label: 'Turnaround', value: 'Fast' }
    ]
  },
  {
    id: 'online-trading',
    tag: 'Online Trading',
    count: 3,
    cardTitle: 'ONLINE TRADING',
    icon: 'solar:chart-square-linear',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/022/603/274/small/investors-analyzing-stock-market-trading-charts-technical-price-charts-and-indicators-business-and-technology-stock-chart-data-stock-trading-and-investment-concept-forex-trading-analysis-free-photo.jpg',
    contentLabel: 'ONLINE TRADING',
    contentBadge: 'DIGITAL',
    contentTitle: 'Smart trading in digital markets',
    contentBody: 'Our online trading division operates 3 active digital market channels, giving clients access to global financial instruments. Backed by 14 bank & company partnerships for seamless execution.',
    metrics: [
      { label: 'Channels', value: '3' },
      { label: 'Bank Partners', value: '14' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
];

export default function FeatureSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
  }, []);


  return (
    <section className="w-full px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Headline & Carousel */}
        <div className="flex flex-col relative z-20">
          
          {/* Headline Area */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1] mb-6 flex flex-col md:block">
              <div className="inline-flex gap-2 mr-2">
                <BlurInText text="Five" stagger={0.04} /> 
                <span className="font-editorial text-white/70 font-normal"><BlurInText text="sectors," stagger={0.04} /></span>
              </div>
              <br className="hidden md:block" />
              <div className="inline-flex gap-2">
                <BlurInText text="one" stagger={0.04} />
                <span className="font-editorial text-white/70 font-normal"><BlurInText text="vision." stagger={0.04} /></span>
              </div>
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-md leading-relaxed">
              Chya Group operates across five dynamic industries, spanning 14 branches with 44 professionals driving growth across the region.
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
              
              if (offset === 0) {
                // Front active card
                stackClasses = "translate-x-0 translate-y-0 scale-100 opacity-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]";
                zIndex = 30;
              } else if (offset === 1) {
                // Middle card
                stackClasses = "translate-x-8 translate-y-8 scale-[0.92] opacity-60 border-white/5";
                zIndex = 20;
              } else if (offset === 2) {
                // Back card
                stackClasses = "translate-x-16 translate-y-16 scale-[0.84] opacity-30 border-white/5";
                zIndex = 10;
              } else {
                // Hidden cards (if more than 3)
                stackClasses = "translate-x-24 translate-y-24 scale-75 opacity-0";
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
                  <div className="relative z-10 flex-1 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[9px] tracking-widest uppercase text-white/50 border border-white/5 flex items-center gap-1.5">
                        <iconify-icon icon={feature.icon} width="12"></iconify-icon>
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
                          <iconify-icon icon="solar:shield-check-linear"></iconify-icon>
                          Verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Carousel Controls */}
            <div className="absolute -bottom-16 left-0 flex items-center gap-4 z-40">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
                aria-label="Previous feature"
              >
                <iconify-icon icon="solar:arrow-left-linear" width="20"></iconify-icon>
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
                <iconify-icon icon="solar:arrow-right-linear" width="20"></iconify-icon>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col mt-8 lg:mt-0 pt-0 lg:pt-12">
          
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

          {/* Info Card - We use a key based on activeIndex to trigger CSS animation on change */}
          <div 
            key={activeIndex} 
            className="glass-panel rounded-2xl p-8 lg:p-10 animate-fade-slide relative overflow-hidden"
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
              <p>
                Experience the next evolution of platform engineering with zero friction and maximum visibility.
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