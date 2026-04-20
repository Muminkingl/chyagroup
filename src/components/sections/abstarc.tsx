import React from 'react';
import clsx from 'clsx';

/**
 * Generates an abstract, layered glass-like visual purely with CSS
 * to mimic the "luminous glass sheets" artwork described in the prompt.
 */
export default function AbstractGlassArt({ variant = 0 }) {
  // Variations to make each card look slightly different
  const variations = [
    {
      gradient: "from-white/10 via-white/5 to-transparent",
      shape1: "rotate-12 translate-x-4",
      shape2: "-rotate-6 -translate-y-8",
    },
    {
      gradient: "from-white/10 via-white/5 to-transparent",
      shape1: "-rotate-12 -translate-x-4",
      shape2: "rotate-6 translate-y-8 scale-110",
    },
    {
      gradient: "from-white/10 via-white/5 to-transparent",
      shape1: "rotate-45 translate-y-12 scale-90",
      shape2: "-rotate-12 translate-x-8",
    }
  ];

  const current = variations[variant % variations.length];

  return (
    <div className="w-full h-full relative bg-[#0f0f12]">
      {/* Base ambient gradient */}
      <div className={clsx("absolute inset-0 bg-gradient-to-br", current.gradient)} />
      
      {/* Grid lines inside art */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      {/* Layered Glass Planes */}
      <div className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-screen">
        {/* Plane 1 */}
        <div className={clsx(
          "absolute w-[120%] h-48 bg-gradient-to-r from-white/5 to-transparent border border-white/10 backdrop-blur-md rounded-[3rem] transition-transform duration-1000",
          current.shape1
        )} />
        
        {/* Plane 2 */}
        <div className={clsx(
          "absolute w-64 h-[150%] bg-gradient-to-b from-white/10 to-transparent border border-white/5 backdrop-blur-lg rounded-[2rem] transition-transform duration-1000",
          current.shape2
        )} />
        
        {/* Core Glow */}
        <div className="absolute w-32 h-32 bg-white/20 blur-3xl rounded-full mix-blend-overlay" />
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-80" />
    </div>
  );
}