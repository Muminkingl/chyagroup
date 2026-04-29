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
    { key: 'gold', year: "Aug 2023", logos: ["/brands/chyaexchnage.png"] },
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
    <section id={id} className="scroll-mt-32 py-12">
      {/* ── Section Header ── */}
      <div className="mb-20 text-start">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c1a2e] mb-4 flex items-center gap-4">
          <span className="w-8 h-[2px] bg-[#ff4d4d]"></span>
          {t.title}
        </h2>
        <p className="text-[#3a4f6a] max-w-4xl text-lg font-medium leading-relaxed mt-6">
          {t.summary}
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Line */}
        <div className={cn(
          "absolute top-0 bottom-0 w-[2px] bg-[#0c1a2e]/10",
          isRTL ? "right-8 md:right-10" : "left-8 md:left-10"
        )} />

        <div className="space-y-16 relative">
          {historyTimeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={cn(
                "flex items-start gap-6 md:gap-12",
                isRTL ? "flex-row-reverse" : "flex-row"
              )}
            >
              {/* Year Circle Indicator */}
              <div className="relative z-10 shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#b91c1c] flex items-center justify-center text-white text-sm md:text-base font-bold shadow-none">
                  {item.yearOnly}
                </div>
              </div>

              {/* Content Block */}
              <div className="flex-1 pt-4 md:pt-6">
                <h3 className="text-xl md:text-2xl font-bold text-[#0c1a2e] mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[#3a4f6a] text-sm md:text-base leading-relaxed font-medium max-w-2xl">
                  {item.desc || item.content}
                </p>
              </div>

              {/* Brand Logo */}
              <div className="hidden sm:flex shrink-0 items-center justify-center w-20 h-20 md:w-24 md:h-24">
                {item.logos && item.logos[0] && (
                  <img
                    src={item.logos[0]}
                    alt={item.title}
                    className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 hover:scale-105"
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
