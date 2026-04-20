"use client";

import React, { useState, useEffect } from 'react';

export const SplashScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const [scrollState, setScrollState] = useState({ progress: 0, scrollY: 0, vh: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / vh));
      setScrollState({ progress, scrollY, vh });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const { progress, scrollY, vh } = scrollState;
  const leftTransform = `translateX(-${progress * 100}%)`;
  const rightTransform = `translateX(${progress * 100}%)`;
  const contentScale = 0.9 + (0.1 * progress);
  const contentOpacity = 0.2 + (0.8 * progress);
  const contentTranslateY = scrollY < vh && vh > 0 ? -(vh - scrollY) : 0;

  return (
    <div className="relative w-full bg-black min-h-screen">
      
      {/* SPLASH SCREEN LAYER */}
      <div 
        className="fixed inset-0 z-[60] pointer-events-none transition-opacity duration-300"
        style={{ 
          opacity: progress >= 1 ? 0 : 1,
          visibility: progress >= 1 ? 'hidden' : 'visible'
        }}
      >
        {/* Left Splash Half */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-1/2 bg-black flex flex-col justify-center items-end pr-1 md:pr-3 border-r border-[#1a1a1a]"
          style={{ transform: leftTransform, willChange: 'transform' }}
        >
          <div className="relative flex flex-col items-end z-10">
            <h1 className="text-[12vw] md:text-[13vw] font-sans font-black tracking-[-0.04em] leading-none text-[#f5f5f5] select-none">
              CHYA
            </h1>
            <p className="absolute -bottom-4 md:-bottom-6 right-1 text-[8px] md:text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase whitespace-nowrap">
              Welcome To
            </p>
          </div>
        </div>

        {/* Right Splash Half */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-1/2 bg-black flex flex-col justify-center items-start pl-1 md:pl-3"
          style={{ transform: rightTransform, willChange: 'transform' }}
        >
          <div className="relative flex flex-col items-start z-10">
            <h1 className="text-[12vw] md:text-[13vw] font-serif italic font-light tracking-tight leading-none text-[#f5f5f5] select-none">
              GROUP
            </h1>
            <p className="absolute -bottom-4 md:-bottom-6 left-1 text-[8px] md:text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase whitespace-nowrap">
              Ecosystem
            </p>
          </div>
        </div>

        {/* Scroll Hint */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500"
          style={{ opacity: 1 - (progress * 4) }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* SCROLL SPACER */}
      <div className="h-[100vh] w-full" />

      {/* PAGE LAYER */}
      <div 
        className="w-full relative z-10 will-change-transform"
        style={{ transform: `translateY(${contentTranslateY}px)` }}
      >
        <div 
          style={{
            transform: `scale(${contentScale})`,
            opacity: contentOpacity,
            transformOrigin: 'top center',
            willChange: 'transform, opacity'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
