"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

export default function CompanySectors() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale];
  const companyData = t.ourCompany;
  const featuresData = t.features;

  const sectorImages = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
    "/money-bg.png",
    "/tech-bg.png",
    "/printing.jpg",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop",
  ];

  return (
    <section className="pt-36 pb-24 bg-[#faf9f6] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header — same pattern as Certifications / TimelineSectors */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#0c1a2e] uppercase">
              {companyData.eyebrow}
            </span>
            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
          </div>

          <h1
            dir="auto"
            className="text-4xl md:text-[2.85rem] font-bold text-[#0c1a2e] leading-tight"
          >
            {companyData.headline}
          </h1>
        </div>

        {/* Cards Grid — 3 top, 2 centered bottom */}
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {featuresData.items.map((item, index) => (
            <Link
              href={`/ourcompany/${item.id}`}
              key={item.id}
              className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(12,26,46,0.07)] flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(12,26,46,0.12)] border border-[#0c1a2e]/5 cursor-pointer block"
            >
              {/* Image */}
              <div className="relative w-full h-[170px] overflow-hidden">
                <img
                  src={sectorImages[index]}
                  alt={item.tag}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Label */}
              <div className="px-5 py-5 flex flex-col items-center justify-center gap-3 bg-white flex-grow">
                <h3
                  dir="auto"
                  className="text-[14.5px] font-bold text-[#0c1a2e] text-center leading-snug"
                >
                  {item.tag}
                </h3>
                <div className="w-8 h-[2px] bg-[#2563eb] rounded-full" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
