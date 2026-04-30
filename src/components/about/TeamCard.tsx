"use client";

import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { Iconify } from '../ui/Iconify';

export default function TeamCard({ member, featured = false }: { member: any, featured?: boolean }) {
  const { isRTL } = useLanguage();

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white border border-[#0c1a2e]/5 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1">
      {/* Background Gradient Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a2e]/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
      
      <div className={clsx(
        "relative z-10 flex flex-col h-full",
        featured ? (isRTL ? "sm:flex-row-reverse" : "sm:flex-row") + " items-center" : "flex-col"
      )}>
        
        {/* Image Container */}
        <div className={clsx(
          "overflow-hidden bg-[#f4f7f9] flex-shrink-0",
          featured ? "w-full sm:w-2/5 aspect-square sm:aspect-auto sm:h-72" : "w-full aspect-[4/3]"
        )}>
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Content Container */}
        <div className={clsx(
          "p-6 flex-1 flex flex-col justify-center text-start",
          featured ? "sm:p-8" : ""
        )}>
          <div className={clsx(
            "flex items-center gap-2 mb-3 transition-all duration-300 ease-out delay-100",
            "opacity-0 group-hover:opacity-100",
            isRTL ? "translate-x-4 group-hover:translate-x-0" : "-translate-x-4 group-hover:translate-x-0"
          )}>
            <Iconify icon="solar:buildings-2-bold-duotone" className="text-[#b91c1c]" width={16} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#3a4f6a] font-bold">Leadership</span>
          </div>
          
          <h3 className={clsx(
            "font-bold text-[#0c1a2e] tracking-tight mb-2",
            featured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
          )}>
            {member.name}
          </h3>
          
          <p className={clsx(
            "text-[#b91c1c] font-semibold",
            featured ? "text-lg" : "text-sm"
          )}>
            {member.role}
          </p>
          
          {/* Subtle separator line that grows on hover */}
          <div className="w-0 h-[2px] bg-[#0c1a2e] mt-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
        </div>
      </div>
    </div>
  );
}
