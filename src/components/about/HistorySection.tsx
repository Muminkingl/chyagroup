"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { cn } from "@/lib/utils";

/** 
 * LogoBanner — used as the visual hero on BOTH the card and the modal.
 * Logos are displayed large and clearly on a dark gradient background.
 */
function LogoBanner({
  logos,
  height = "h-36",
  logoMaxH = "max-h-20",
}: {
  logos: string[];
  height?: string;
  logoMaxH?: string;
}) {
  // Distribute widths so single logos get more room
  const itemMaxW =
    logos.length === 1
      ? "max-w-[260px]"
      : logos.length === 2
      ? "max-w-[180px]"
      : "max-w-[130px]";

  return (
    <div
      className={cn(
        `w-full ${height} flex items-center justify-center gap-6 px-8 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-b border-white/5 overflow-hidden relative`
      )}
    >
      {/* Subtle radial glow behind logos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)]" />

      {logos.map((src, i) => (
        <div key={i} className={`relative z-10 flex items-center justify-center ${itemMaxW} w-full`}>
          <img
            src={src}
            alt="brand logo"
            className={`w-full h-auto ${logoMaxH} object-contain drop-shadow-[0_2px_16px_rgba(255,255,255,0.18)]`}
            loading="lazy"
          />
        </div>
      ))}

      {/* Dividers between multiple logos */}
      {logos.length > 1 &&
        logos.slice(0, -1).map((_, i) => (
          <div
            key={`div-${i}`}
            className="absolute h-10 w-px bg-white/10"
            style={{ left: `${((i + 1) / logos.length) * 100}%` }}
          />
        ))}
    </div>
  );
}

const CloseIcon = ({ isRTL }: { isRTL: boolean }) => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={cn(
      "absolute top-4 z-[110] p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-colors",
      isRTL ? "left-4" : "right-4"
    )}
  >
    <X size={20} />
  </motion.button>
);

export default function HistorySection({ id }: { id: string }) {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].about.history;
  const [active, setActive] = useState<any | null>(null);
  const layoutId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setActive(null));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Static assets and years metadata merged with localized text
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
    ...(t.timeline as any)[item.key]
  }));

  return (
    <section id={id} className="scroll-mt-32">
      {/* ── Expanded Modal ── */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            />
            <div className="fixed inset-0 grid place-items-center z-[101] px-4">
              <motion.div
                layoutId={`card-${active.key}-${layoutId}`}
                ref={ref}
                className="w-full max-w-[560px] h-fit max-h-[90vh] flex flex-col bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden relative"
              >
                <div onClick={() => setActive(null)}>
                  <CloseIcon isRTL={isRTL} />
                </div>

                {/* Logo banner — large, clear, unmistakable */}
                <motion.div layoutId={`banner-${active.key}-${layoutId}`}>
                  <LogoBanner logos={active.logos} height="h-64" logoMaxH="max-h-48" />
                </motion.div>

                {/* Text content */}
                <div className="p-8 overflow-y-auto text-start">
                  <motion.span
                    layoutId={`year-${active.year}-${layoutId}`}
                    className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold mb-3"
                  >
                    {active.year}
                  </motion.span>
                  <motion.h3
                    layoutId={`title-${active.key}-${layoutId}`}
                    className="text-2xl font-bold text-white mb-4"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-400 text-sm md:text-base leading-relaxed font-light"
                  >
                    {active.content}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── Section Header ── */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 flex items-center gap-4">
          <span className="w-8 h-1 bg-gradient-to-r from-zinc-500 to-zinc-300 rounded-full" />
          {t.title}
        </h2>
        <p className="text-zinc-400 max-w-4xl text-base font-light leading-relaxed">
          {t.summary}
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="relative">
        {/* Vertical line - handle RTL position */}
        <div className={cn(
          "absolute top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-zinc-800 to-transparent transform z-0",
          isRTL 
            ? "right-[15px] md:right-1/2 md:translate-x-1/2" 
            : "left-[15px] md:left-1/2 md:-translate-x-1/2"
        )} />

        <div className="space-y-12 relative">
          {historyTimeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col md:flex-row items-start md:items-center",
                  isEven ? (isRTL ? "md:flex-row" : "md:flex-row-reverse") : (isRTL ? "md:flex-row-reverse" : "md:flex-row")
                )}
              >
                {/* Timeline dot */}
                <div className={cn(
                  "absolute top-4 md:top-auto w-5 h-5 rounded-full bg-[#09090b] border-2 border-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.3)] z-10 flex items-center justify-center",
                  isRTL 
                    ? "right-[-5px] md:right-1/2 md:translate-x-1/2" 
                    : "left-[-5px] md:left-1/2 md:-translate-x-1/2"
                )}>
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                </div>

                {/* Card */}
                <div className={cn(
                  "md:w-1/2",
                  isRTL ? (isEven ? "pr-8 md:pr-0 md:pl-12" : "pr-8 md:pr-12") : (isEven ? "pl-8 md:pl-12" : "pl-8 md:pr-12")
                )}>
                  <motion.div
                    layoutId={`card-${item.key}-${layoutId}`}
                    onClick={() => setActive(item)}
                    className="rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_30px_rgba(251,191,36,0.05)] overflow-hidden bg-white/[0.02]"
                  >
                    {/* ── Logo banner on the card ── */}
                    <motion.div layoutId={`banner-${item.key}-${layoutId}`}>
                      <LogoBanner logos={item.logos} height="h-36" logoMaxH="max-h-20" />
                    </motion.div>

                    {/* Card text */}
                    <div className="p-5 text-start">
                      <motion.span
                        layoutId={`year-${item.year}-${layoutId}`}
                        className="inline-block px-3 py-1 rounded-full bg-white/5 text-amber-400 text-[10px] font-bold mb-3 border border-white/5 uppercase tracking-widest"
                      >
                        {item.year}
                      </motion.span>
                      <motion.h3
                        layoutId={`title-${item.key}-${layoutId}`}
                        className="text-lg font-semibold text-white mb-1 tracking-tight group-hover:text-amber-50"
                      >
                        {item.title}
                      </motion.h3>
                      <p className="text-zinc-500 text-sm leading-relaxed font-light line-clamp-2">{item.desc}</p>

                      <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-400/40 group-hover:text-amber-400 transition-colors font-bold">
                        <span>{t.explore}</span>
                        <div className="w-6 h-px bg-current opacity-40" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
