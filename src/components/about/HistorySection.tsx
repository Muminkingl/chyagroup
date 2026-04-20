"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { X } from "lucide-react";

// Real Chya Group company history
const historyTimeline = [
  {
    year: "Nov 2019",
    title: "The Foundation",
    description: "Chya Group & Lamat Al Marjan Company established — the birth of the group.",
    logos: ["/brands/lamatalmarjan.png"],
    content: () => (
      <p>
        On 30 November 2019, two pillars of the Chya Group were founded simultaneously: <strong>Chya Group</strong> itself,
        and <strong>Lamat Al Marjan Company</strong> — a General Trading Ltd. located on Bakhtyari Street inside BM Oil, Erbil.
        <br /><br />
        This marked the beginning of a multi-sector enterprise rooted in the heart of Erbil, driven by a vision to serve
        the local community with quality, transparency, and dedication.
      </p>
    ),
  },
  {
    year: "Jan 2020",
    title: "Chya Travel Launches",
    description: "Expanding into travel services — tickets, visas, and beyond — serving Erbil.",
    logos: ["/brands/CHYA travel-1.png"],
    content: () => (
      <p>
        On 22 January 2020, <strong>Chya Travel</strong> opened its doors in Erbil, offering ticketing and visa
        facilitation services to the local community.
        <br /><br />
        This expansion marked Chya Group's first move into the services sector, broadening its portfolio beyond
        trading and establishing a trusted presence for travel needs in the region.
      </p>
    ),
  },
  {
    year: "Jun 2021",
    title: "Chya Exchange Opens",
    description: "Our first money exchange office, launched at Borsa Bazar in Erbil.",
    logos: ["/brands/chyaexchnage.png"],
    content: () => (
      <p>
        On 14 June 2021, <strong>Chya Exchange</strong> opened at Borsa Bazar, Erbil — our flagship money exchange office
        and the start of Chya Group's financial services arm.
        <br /><br />
        This milestone laid the groundwork for what would become one of the group's most prominent sectors,
        now spanning multiple offices across Erbil, Soran, Silopi, and Ankawa.
      </p>
    ),
  },
  {
    year: "Jan 2022",
    title: "Kiva Luxury Debuts",
    description: "Entering the luxury market with jewellery and accessories in Erbil.",
    logos: ["/brands/kivaluxary.png"],
    content: () => (
      <p>
        On 20 January 2022, <strong>Kiva Luxury</strong> launched in Erbil, offering premium jewellery and accessories
        to the local market.
        <br /><br />
        This bold step into the luxury sector demonstrated Chya Group's versatility — proving our ability to
        curate high-end experiences while maintaining our core commitment to quality service for the Erbil community.
      </p>
    ),
  },
  {
    year: "Aug 2023",
    title: "International Expansion",
    description: "Chya Gold Exchange opens in Silopi, Turkey — our first cross-border venture.",
    logos: ["/brands/chyaexchnage.png"],
    content: () => (
      <p>
        On 28 August 2023, <strong>Chya Gold Exchange</strong> opened in Silopi, Sirnak, Turkey — marking Chya Group's
        first international presence and a major step in cross-border financial services.
        <br /><br />
        This expansion demonstrates the group's growing regional influence and ambition to connect Iraqi-Kurdish
        entrepreneurs with broader economic opportunities.
      </p>
    ),
  },
  {
    year: "Mar 2024",
    title: "Hangaw Exchange Launches",
    description: "A new money exchange office on Runaki Street, Erbil — deepening our local reach.",
    logos: ["/brands/hangawexchange.png"],
    content: () => (
      <p>
        On 21 March 2024, <strong>Hangaw Exchange</strong> opened on Runaki Street, Erbil, further strengthening
        Chya Group's money exchange network across the city.
        <br /><br />
        Together with Chya Exchange in Borsa Bazar, this new branch expanded our capacity to serve a wider
        clientele with convenient, reliable currency services right in the heart of Erbil.
      </p>
    ),
  },
  {
    year: "Oct 2024",
    title: "Lutkay Chya Exchange",
    description: "Opening in Ankawa — bringing proven financial expertise to a new district.",
    logos: ["/brands/lutkay chya-1.png"],
    content: () => (
      <p>
        On 20 October 2024, <strong>Lutkay Chya Exchange</strong> launched in Ankawa, Erbil — one of the city's
        most vibrant and diverse neighbourhoods.
        <br /><br />
        This is the group's fourth money exchange location, each strategically placed to ensure residents across
        Erbil have access to trusted, transparent financial exchange services close to home.
      </p>
    ),
  },
  {
    year: "Feb–Mar 2025",
    title: "Khaki Sarwar & Barzy Exchange",
    description: "Two major launches in weeks — Masif Road (BM OIL) and Soran District.",
    logos: ["/brands/khakisarwar.png", "/brands/BARZY CHYAY-1.png"],
    content: () => (
      <p>
        In early 2025, two new brands launched within weeks of each other: <strong>Khaki Sarwar Company</strong>
        (Money Exchange — Masif Road inside BM OIL, Erbil) on 16 February, and <strong>Barzy Chya Exchange</strong>
        (Soran, Erbil) on 6 March.
        <br /><br />
        This rapid dual expansion reflects the group's accelerating momentum and commitment to delivering
        financial access across Erbil Province.
      </p>
    ),
  },
  {
    year: "Aug 2025",
    title: "Manfaz Dibaga & Chya Tech",
    description: "Qi Card salary center and tech systems office launch on Runaki Street, Erbil.",
    logos: ["/brands/Manfaz Dibaga-1.png", "/brands/chyatech.png"],
    content: () => (
      <p>
        August 2025 saw two pivotal additions: <strong>Manfaz Dibaga by Hangaw</strong> (1 Aug) — a Qi Card,
        Super Qi and MasterCard salary disbursement centre on Runaki Street — and <strong>Chya Tech</strong> (11 Aug),
        our systems and technology solutions office in Erbil.
        <br /><br />
        These launches cemented Chya Group's entry into fintech infrastructure and IT services, positioning
        the group at the intersection of traditional finance and modern technology.
      </p>
    ),
  },
  {
    year: "Oct 2025",
    title: "Blue Printing Office",
    description: "Printing & photocopy services behind Erbil Passport — a brand-new sector for the group.",
    logos: ["/brands/BLUE PRINT-1.png"],
    content: () => (
      <p>
        On 19 October 2025, <strong>Blue Printing Office</strong> opened behind the Erbil Passport office,
        delivering professional printing and photocopy services to residents and businesses in the area.
        <br /><br />
        This addition rounded out Chya Group's portfolio by entering the printing sector — a high-demand service
        closely tied to the administrative hub of Erbil.
      </p>
    ),
  },
  {
    year: "Mar 2026",
    title: "Chyay Mateen, Amazon & Phone",
    description: "Three new brands in Soran — completing our portfolio of 16 active brands.",
    logos: ["/brands/chyaymaten.png", "/brands/Chya Amazon-1.png", "/brands/chya phone-1.png"],
    content: () => (
      <p>
        March 2026 saw our most ambitious month yet. <strong>Chyay Mateen Company</strong> (General Trading, Soran)
        and <strong>Chya Amazon</strong> (Bala Products, Soran) both launched on 1 March, followed by
        <strong> Chya Phone</strong> (Phones, iPads and Laptops, Soran) on 24 March.
        <br /><br />
        These three brands firmly establish Chya Group's presence in Soran, expanding from exchange services
        into e-commerce, electronics retail, and general trading — bringing the group's total portfolio to
        16 active brands across Erbil Province and beyond.
      </p>
    ),
  },
];

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
      className={`
        w-full ${height}
        flex items-center justify-center gap-6 px-8
        bg-gradient-to-br from-zinc-900 via-zinc-950 to-black
        border-b border-white/5
        overflow-hidden relative
      `}
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
      if (event.key === "Escape") setActive(null);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

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
                layoutId={`card-${active.title}-${layoutId}`}
                ref={ref}
                className="w-full max-w-[560px] h-fit max-h-[90vh] flex flex-col bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden relative"
              >
                <div onClick={() => setActive(null)}>
                  <CloseIcon />
                </div>

                {/* Logo banner — large, clear, unmistakable */}
                <motion.div layoutId={`banner-${active.title}-${layoutId}`}>
                  <LogoBanner logos={active.logos} height="h-64" logoMaxH="max-h-48" />
                </motion.div>

                {/* Text content */}
                <div className="p-8 overflow-y-auto">
                  <motion.span
                    layoutId={`year-${active.year}-${layoutId}`}
                    className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold mb-3"
                  >
                    {active.year}
                  </motion.span>
                  <motion.h3
                    layoutId={`title-${active.title}-${layoutId}`}
                    className="text-2xl font-bold text-white mb-4"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-400 text-sm md:text-base leading-relaxed"
                  >
                    {active.content()}
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
          Our History
        </h2>
        <p className="text-zinc-400 max-w-4xl text-base font-light leading-relaxed">
          Chya Group: Established in 2019, we have served the Erbil community for 7 years across 5 diverse sectors: General
          Trading, Money Exchange &amp; Financial Services, Mobile &amp; Technology, Printing &amp; Photocopy, and Online Trading.
          Our team consists of 44 dedicated members, and we proudly own 3 companies, 5 money exchange offices, 1 printing and
          photocopy office, 1 salary disbursement center, 1 project, 1 exhibition, 3 online businesses, and hold 14 banking
          and company agencies.
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="relative pl-4 md:pl-0">
        {/* Vertical line */}
        <div className="absolute left-[15px] md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-zinc-800 to-transparent transform md:-translate-x-1/2" />

        <div className="space-y-12 relative">
          {historyTimeline.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-[-5px] md:left-1/2 top-4 md:top-auto w-5 h-5 rounded-full bg-zinc-950 border-2 border-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.3)] transform md:-translate-x-1/2 z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              </div>

              {/* Card */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                <motion.div
                  layoutId={`card-${item.title}-${layoutId}`}
                  onClick={() => setActive(item)}
                  className="rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_30px_rgba(251,191,36,0.05)] overflow-hidden bg-zinc-900/40"
                >
                  {/* ── Logo banner on the card ── */}
                  <motion.div layoutId={`banner-${item.title}-${layoutId}`}>
                    <LogoBanner logos={item.logos} height="h-36" logoMaxH="max-h-20" />
                  </motion.div>

                  {/* Card text */}
                  <div className="p-5">
                    <motion.span
                      layoutId={`year-${item.year}-${layoutId}`}
                      className="inline-block px-3 py-1 rounded-full bg-zinc-800/80 text-amber-400 text-xs font-medium mb-3 border border-white/5"
                    >
                      {item.year}
                    </motion.span>
                    <motion.h3
                      layoutId={`title-${item.title}-${layoutId}`}
                      className="text-lg font-medium text-white mb-1 tracking-tight group-hover:text-amber-50"
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.description}</p>

                    <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-400/40 group-hover:text-amber-400 transition-colors">
                      <span>Click to explore</span>
                      <div className="w-6 h-px bg-current opacity-40" />
                    </div>
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
