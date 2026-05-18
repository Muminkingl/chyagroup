"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { cn } from "@/lib/utils";

export default function HistorySection({ id }: { id: string }) {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].about.history;

  // Timeline data with logos
  const historyTimeline = [
    { key: 'foundation', year: "Nov 2019", logos: ["/brands/lamatalmarjan.png"] },
    { key: 'travel', year: "Jan 2020", logos: ["/brands/CHYA travel-1.png"] },
    { key: 'exchange', year: "Jun 2021", logos: ["/brands/chyaexchnage.png"] },
    { key: 'luxury', year: "Jan 2022", logos: ["/brands/kivaluxary.png"] },
    { key: 'gold', year: "Aug 2023", logos: ["/brands/qapat-1.png"] },
    { key: 'hangaw', year: "Mar 2024", logos: ["/brands/hangawexchange.png"] },
    { key: 'lutkay', year: "Oct 2024", logos: ["/brands/lutkay chya-1.png"] },
    { key: 'khaki', year: "Feb 2025", logos: ["/brands/khakisarwar.png"] },
    { key: 'barzy', year: "Mar 2025", logos: ["/brands/BARZY CHYAY-1.png"] },
    { key: 'dibaga', year: "Aug 2025", logos: ["/brands/Manfaz Dibaga-1.png"] },
    { key: 'tech', year: "Aug 2025", logos: ["/brands/chyatech.png"] },
    { key: 'blueprint', year: "Oct 2025", logos: ["/brands/BLUE PRINT-1.png"] },
    { key: 'mateen', year: "Mar 2026", logos: ["/brands/chyaymaten.png"] },
    { key: 'amazon', year: "Mar 2026", logos: ["/brands/Chya Amazon-1.png"] },
    { key: 'phone', year: "Mar 2026", logos: ["/brands/chya phone-1.png"] },
  ].map(item => ({
    ...item,
    ...(t.timeline as any)[item.key],
    yearOnly: item.year.split(' ').pop()
  }));

  return (
    <section dir={isRTL ? "rtl" : "ltr"} id={id} className="scroll-mt-32 py-12">
      {/* ── Section Header ── */}
      <div className={cn("mb-20", isRTL ? "text-right" : "text-left")}>
        <h2 dir="auto" className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c1a2e] mb-4 flex items-center gap-4">
          {!isRTL && <span className="w-8 h-[2px] bg-[#ff4d4d] shrink-0"></span>}
          {t.title}
          {isRTL && <span className="w-8 h-[2px] bg-[#ff4d4d] shrink-0"></span>}
        </h2>
        <p dir="auto" className={cn(
          "max-w-4xl text-lg leading-relaxed mt-6 text-justify",
          isRTL ? "text-[#0c1a2e] font-semibold" : "text-[#3a4f6a] font-medium"
        )}>
          {t.summary}
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Line — centered through the w-14 (56px) circle, so left/right = 28px - 1px (half linewidth) = 27px */}
        <div className={cn(
          "absolute top-0 bottom-0 w-[2px] bg-[#0c1a2e]/10",
          isRTL ? "right-[27px]" : "left-[27px]"
        )} />

        <div className="space-y-10 relative">
          {historyTimeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="flex flex-row items-center gap-4 sm:gap-6 md:gap-10"
            >
              {/* Year Circle Indicator — compact */}
              <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 rounded-full bg-[#b91c1c] flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {item.yearOnly}
                </div>
              </div>

              {/* Content Block */}
              <div dir="auto" className="flex-1 py-3">
                <h3 className="text-lg md:text-xl font-bold text-[#0c1a2e] mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className={cn(
                  "text-sm leading-relaxed max-w-xl text-justify",
                  isRTL ? "text-[#0c1a2e] font-semibold" : "text-[#3a4f6a] font-medium"
                )}>
                  {item.desc || item.content}
                </p>
              </div>

              {/* Brand Logo — clearly visible */}
              <div className={cn(
                "flex shrink-0 items-center justify-center transition-all duration-300",
                index === 2 ? "w-16 h-16 sm:w-40 sm:h-40" : index < 3 ? "w-20 h-20 sm:w-44 sm:h-44" : "w-16 h-16 sm:w-36 sm:h-36"
              )}>
                {item.logos && item.logos[0] && (
                  <img
                    src={item.logos[0]}
                    alt={item.title}
                    style={
                      item.logos[0].includes('chyaexchnage')
                        ? { transform: 'scale(1.05)' }
                        : item.logos[0].includes('kivaluxary')
                        ? { transform: 'scale(0.85)' }
                        : item.logos[0].includes('Dibaga')
                        ? { transform: 'scale(0.75)' }
                        : undefined
                    }
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
