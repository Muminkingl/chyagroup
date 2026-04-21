"use client";

import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';

export default function TeamCard({ member, featured = false }: { member: any, featured?: boolean }) {
  const { isRTL } = useLanguage();

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-amber-500/5">
      {/* Background Gradient Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
      
      <div className={clsx(
        "relative z-10 flex flex-col h-full",
        featured ? (isRTL ? "sm:flex-row-reverse" : "sm:flex-row") + " items-center" : "flex-col"
      )}>
        
        {/* Image Container */}
        <div className={clsx(
          "overflow-hidden bg-zinc-800 flex-shrink-0",
          featured ? "w-full sm:w-2/5 aspect-square sm:aspect-auto sm:h-64" : "w-full aspect-[4/3]"
        )}>
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover object-top grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        </div>

        {/* Content Container */}
        <div className={clsx(
          "p-6 flex-1 flex flex-col justify-center text-start",
          featured ? "sm:p-8" : ""
        )}>
          <div className={clsx(
            "flex items-center gap-2 mb-2 transition-all duration-300 ease-out delay-100",
            "opacity-0 group-hover:opacity-100",
            isRTL ? "translate-x-4 group-hover:translate-x-0" : "-translate-x-4 group-hover:translate-x-0"
          )}>
            <iconify-icon icon="solar:buildings-2-bold-duotone" class="text-amber-500"></iconify-icon>
            <span className="text-[10px] uppercase tracking-widest text-amber-500/80 font-bold">Leadership</span>
          </div>
          
          <h3 className={clsx(
            "font-semibold text-white tracking-tight mb-2",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}>
            {member.name}
          </h3>
          
          <p className={clsx(
            "text-amber-400 font-light",
            featured ? "text-lg" : "text-sm"
          )}>
            {member.role}
          </p>
          
          {/* Subtle separator line that grows on hover */}
          <div className="w-0 h-px bg-gradient-to-r from-amber-500/50 to-transparent mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
        </div>
      </div>
    </div>
  );
}
