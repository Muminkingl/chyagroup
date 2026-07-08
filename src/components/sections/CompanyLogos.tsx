"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const LOCALIZED_TEXTS = {
  en: {
    sectionEyebrow: "OUR COMPANY",
    sectionHeadline: "We operate across 16 business units",
  },
  ar: {
    sectionEyebrow: "شركتنا",
    sectionHeadline: "نعمل في 16 مجالاً تجارياً",
  },
  ku: {
    sectionEyebrow: "کۆمپانیاکەمان",
    sectionHeadline: "ئێمە لە ١٦ کاردا کار دەکەین",
  },
};

const BRANDS_15 = [
  {
    id: "lamatalmarjan",
    name: {
      en: "Lamat Al Marjan",
      ar: "شركة لمعة المرجان",
      ku: "کۆمپانیای لمعة المرجان",
    },
    logo: "/brands/lamattt.png",
    route: "/lamatalmarjan",
    style: { transform: "scale(1.345)" },
  },
  {
    id: "chyaymateen",
    name: {
      en: "Chyay Mateen",
      ar: "شركة جياى متين",
      ku: "کۆمپانیای چیای مەتین",
    },
    logo: "/brands/chyaymat.png",
    route: "/chyaymateen",
    style: { transform: "scale(1.37)" },
  },
  {
    id: "khakisarwar",
    name: {
      en: "Khaki Sarwar",
      ar: "شركة خاكى سەروەر",
      ku: "کۆمپانیای خاکی سەروەر",
    },
    logo: "/brands/khakisarwar.png",
    route: "/khakisarwar",
    style: { transform: "scale(1.05)" },
  },
  {
    id: "blueprinting",
    name: {
      en: "Blue Printing",
      ar: "مکتب بلو طباعە",
      ku: "نووسینگەی بلو پرێنتینگ",
    },
    logo: "/brands/BLUE PRINT-1.png",
    route: "/blueprinting",
    style: { transform: "scale(2.45)" },
  },
  {
    id: "hangaw",
    name: {
      en: "Hangaw Exchange",
      ar: "مکتب هەنگاو",
      ku: "نووسینگەی هەنگاو",
    },
    logo: "/brands/hangawexchange.png",
    route: "/hangaw",
    style: { transform: "scale(1.25)" },
  },
  {
    id: "chya",
    name: {
      en: "Chya Exchange",
      ar: "مكتب جيا",
      ku: "نووسینگەی چیا",
    },
    logo: "/brands/chyaexchnage.png",
    route: "/chya",
    style: { transform: "scale(1.35)" },
  },
  {
    id: "chyagold",
    name: {
      en: "Chya Gold",
      ar: "مكتب جيا كولد",
      ku: "نووسینگەی چیا گۆڵد",
    },
    logo: "/brands/qapat-1.png",
    route: "/chyagold",
    style: { transform: "scale(1.68)" },
  },
  {
    id: "lutkaychya",
    name: {
      en: "Lutkay Chya",
      ar: "مكتب لوتكەی جيا",
      ku: "نووسینگەی لوتکەی چیا",
    },
    logo: "/brands/lutkay chya-1.png",
    route: "/lutkaychya",
    style: { transform: "scale(1.6)" },
  },
  {
    id: "barzychya",
    name: {
      en: "Barzy Chya",
      ar: "مکتب بەرزی جيا",
      ku: "نووسینگەی بەرزی چیا",
    },
    logo: "/brands/BARZY CHYAY-1.png",
    route: "/barzychya",
    style: { transform: "scale(1.5)" },
  },
  {
    id: "manfazdibaga",
    name: {
      en: "Manfaz Dibaga",
      ar: "منفذ ديبكة",
      ku: "منفذ ديبكة ى هەنگاو",
    },
    logo: "/brands/Manfaz Dibaga-1.png",
    route: "/manfazdibaga",
    style: { transform: "scale(1.5)" },
  },
  {
    id: "chyaamazon",
    name: {
      en: "Chya Amazon",
      ar: "مشروع جيا أمازون",
      ku: "چیا ئەمازۆن",
    },
    logo: "/brands/Chya Amazon-1.png",
    route: "/chyaamazon",
    style: { transform: "scale(1.08)" },
  },
  {
    id: "chyaphone",
    name: {
      en: "Chya Phone",
      ar: "محل جيا فون",
      ku: "پێشانگای چیا فۆن",
    },
    logo: "/brands/chya phone-1.png",
    route: "/chyaphone",
    style: { transform: "scale(1.0)" },
  },
  {
    id: "chyatech",
    name: {
      en: "Chya Tech",
      ar: "جيا تيك",
      ku: "کاری چیا تێك",
    },
    logo: "/brands/chyatech.png",
    route: "/chyatech",
    style: { transform: "scale(3.2)" },
  },
  {
    id: "chyatravel",
    name: {
      en: "Chya Travel",
      ar: "جيا تراڤل",
      ku: "کاری چیا تڕاڤل",
    },
    logo: "/brands/CHYA travel-1.png",
    route: "/chyatravel",
    style: { transform: "scale(2.90)" },
  },
  {
    id: "chyaluxury",
    name: {
      en: "Chya Luxury",
      ar: "جيا لوكزوري",
      ku: "کاری چیا لوکژوری",
    },
    logo: "/brands/kivaluxary.png",
    route: "/chyaluxury",
    style: { transform: "scale(1.55)" },
  },
];

export default function CompanyLogos() {
  const { locale, isRTL } = useLanguage();
  const localizedText = LOCALIZED_TEXTS[locale as "en" | "ar" | "ku"] || LOCALIZED_TEXTS.en;

  return (
    <section className="relative bg-[#faf9f6] py-24 overflow-hidden scroll-mt-24">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 left-[-10%] w-[600px] h-[600px] rounded-full border-[1px] border-[#0c1a2e]/5" />
        <div className="absolute top-1/2 -translate-y-1/2 right-[-10%] w-[800px] h-[800px] rounded-full border-[1px] border-[#0c1a2e]/5" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header section matching certifications style */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
            <span className={`font-bold text-[#0c1a2e] uppercase ${isRTL ? 'text-[14px] md:text-[15px] tracking-normal' : 'text-[11px] md:text-[12px] tracking-[0.22em]'}`}>
              {localizedText.sectionEyebrow}
            </span>
            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
          </div>

          <h2
            dir="auto"
            className="text-4xl md:text-[2.85rem] font-bold text-[#0c1a2e] leading-tight"
          >
            {localizedText.sectionHeadline}
          </h2>
        </div>

        {/* 15 Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
          {BRANDS_15.map((brand) => {
            const name = brand.name[locale as "en" | "ar" | "ku"] || brand.name.en;
            return (
              <Link
                href={brand.route}
                key={brand.id}
                className="bg-[#faf9f6]/40 rounded-2xl h-[110px] w-full flex items-center justify-center p-4 shadow-[0_4px_20px_rgba(12,26,46,0.02)] border border-[#0c1a2e]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(12,26,46,0.06)] hover:border-[#2563eb]/20 group relative overflow-hidden bg-white"
              >
                {/* Logo wrapper */}
                <div className="w-full h-full flex items-center justify-center relative transition-all duration-300">
                  <img
                    src={brand.logo}
                    alt={name}
                    className="max-w-[85%] max-h-[70%] object-contain transition-all duration-500 group-hover:scale-105"
                    style={brand.style}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
