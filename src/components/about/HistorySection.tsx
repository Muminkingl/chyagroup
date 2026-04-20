"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { X } from "lucide-react";

// Extended data for the expandable timeline
const historyTimeline = [
  {
    year: "1998",
    title: "Foundation",
    description: "The company was established with a vision to revolutionize the sector.",
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    content: () => (
      <p>
        In 1998, Chya Group was born from a singular vision: to bridge the gap between traditional commerce 
        and the emerging global markets. Our journey began in a small office with a handful of dedicated 
        professionals who believed that transparency and local expertise could redefine trading in the region. 
        <br /><br />
        These early years were defined by establishing deep-rooted trust with local suppliers and carving 
        out a unique space in the general trading sector. We focused on building a foundation of integrity 
        that would support decades of exponential growth.
      </p>
    )
  },
  {
    year: "2005",
    title: "Market Expansion",
    description: "Successfully expanded operations globally and established key partnerships.",
    src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    content: () => (
      <p>
        By 2005, Chya Group had outgrown its initial market, successfully expanding operations into international 
        territories. This era marked our strategic move into financial services, establishing our first 
        dedicated money exchange centers and forging partnerships with global banks.
        <br /><br />
        We became an essential link for businesses needing secure cross-border transactions. Our expansion 
        validated our business model—consistent growth through a deep understanding of market dynamics and 
        unwavering customer service.
      </p>
    )
  },
  {
    year: "2015",
    title: "Digital Transformation",
    description: "Led the industry in digital adoption and modernized our infrastructure.",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    content: () => (
      <p>
        Recognizing the shift toward the digital economy, Chya Group underwent a massive infrastructure 
        modernization in 2015. We invested heavily in technology divisions, bridging the gap between 
        on-the-ground presence and digital-first trading platforms.
        <br /><br />
        This era saw the launch of our specialized online trading channels and the integration of advanced 
        ERP systems across our 14 branches. We pivoted from being a traditional trading house to a 
        tech-enabled enterprise, setting a new benchmark for operational efficiency in our industry.
      </p>
    )
  },
  {
    year: "Present",
    title: "Continuing the Legacy",
    description: "Today, we stand as a leader in our field, driven by our core values.",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    content: () => (
      <p>
        Today, Chya Group is a diversified multi-sector powerhouse. With 14 branches and over 44 
        professionals, we continue to innovate across general trading, financial services, and 
        technology. 
        <br /><br />
        As we look toward the future, our focus remains on sustainable growth and regional development. 
        We are not just a group of companies; we are a partner in the region's progress, committed 
        to the same vision of excellence and unity that guided us in 1998.
      </p>
    )
  }
];

const CloseIcon = () => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute top-4 right-4 z-[110] p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-colors"
  >
    <X size={20} />
  </motion.button>
);

export default function HistorySection({ id }: { id: string }) {
  const [active, setActive] = useState<(typeof historyTimeline)[number] | null>(null);
  const layoutId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setActive(null));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <section id={id} className="scroll-mt-32">
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <div className="fixed inset-0 grid place-items-center z-[101] px-4">
              <motion.div
                layoutId={`card-${active.title}-${layoutId}`}
                ref={ref}
                className="w-full max-w-[600px] h-fit max-h-[90vh] flex flex-col bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden relative"
              >
                <div onClick={() => setActive(null)}>
                  <CloseIcon />
                </div>
                
                <motion.div layoutId={`image-${active.title}-${layoutId}`}>
                  <img
                    src={active.src}
                    alt={active.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </motion.div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.span 
                        layoutId={`year-${active.year}-${layoutId}`}
                        className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold mb-2"
                      >
                        {active.year}
                      </motion.span>
                      <motion.h3
                        layoutId={`title-${active.title}-${layoutId}`}
                        className="text-2xl font-bold text-white"
                      >
                        {active.title}
                      </motion.h3>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-400 text-sm md:text-base leading-relaxed overflow-y-auto max-h-48 scrollbar-hide"
                  >
                    {active.content()}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 flex items-center gap-4">
          <span className="w-8 h-1 bg-gradient-to-r from-zinc-500 to-zinc-300 rounded-full"></span>
          Our History
        </h2>
        <p className="text-zinc-400 max-w-2xl text-base font-light">
          A legacy of excellence built over decades of dedication. Click on each milestone to explore our detailed journey.
        </p>
      </div>

      <div className="relative pl-4 md:pl-0">
        <div className="absolute left-[15px] md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-zinc-800 to-transparent transform md:-translate-x-1/2"></div>

        <div className="space-y-12 relative">
          {historyTimeline.map((item, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              <div className="absolute left-[-5px] md:left-1/2 top-1.5 md:top-auto w-5 h-5 rounded-full bg-zinc-950 border-2 border-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.3)] transform md:-translate-x-1/2 z-10 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
              </div>

              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                <motion.div 
                  layoutId={`card-${item.title}-${layoutId}`}
                  onClick={() => setActive(item)}
                  className="glass-panel p-6 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer group hover:bg-white/5"
                >
                  <motion.span 
                    layoutId={`year-${item.year}-${layoutId}`}
                    className="inline-block px-3 py-1 rounded-full bg-zinc-800/80 text-amber-400 text-xs font-medium mb-3 border border-white/5"
                  >
                    {item.year}
                  </motion.span>
                  <motion.h3 
                    layoutId={`title-${item.title}-${layoutId}`}
                    className="text-xl font-medium text-white mb-2 tracking-tight group-hover:text-amber-50"
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-400/50 group-hover:text-amber-400 transition-colors">
                    <span>Click to explore</span>
                    <div className="w-8 h-px bg-current opacity-30"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
