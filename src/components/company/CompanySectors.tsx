"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { Iconify } from "@/components/ui/Iconify";

const LOCALIZED_TEXTS = {
  en: {
    sectionEyebrow: "OUR COMPANY",
    sectionHeadline: "We operate across 16 business units",
    visitProfile: "Visit Profile",
  },
  ar: {
    sectionEyebrow: "شركتنا",
    sectionHeadline: "نعمل في 16 مجالاً تجارياً",
    visitProfile: "زيارة الملف",
  },
  ku: {
    sectionEyebrow: "کۆمپانیاکەمان",
    sectionHeadline: "ئێمە لە ١٦ کاردا کار دەکەین",
    visitProfile: "بینینی پڕۆفایل",
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

export default function CompanySectors() {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale];
  const companyData = t.ourCompany;
  const featuresData = t.features;

  const localizedText = LOCALIZED_TEXTS[locale as "en" | "ar" | "ku"] || LOCALIZED_TEXTS.en;

  const sectorImagesMap: Record<string, string> = {
    'money-exchange': "/money.png",
    'general-trading': "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
    'mobile-tech': "/hmmphone.png",
    'printing': "/printing.jpg",
    'online-trading': "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop",
  };

  const desiredOrder = [
    'general-trading',
    'money-exchange',
    'mobile-tech',
    'printing',
    'online-trading'
  ];

  const orderedItems = desiredOrder.map(id => {
    const item = featuresData.items.find(x => x.id === id);
    return {
      item,
      image: sectorImagesMap[id]
    };
  }).filter(x => x.item !== undefined) as { item: typeof featuresData.items[0], image: string }[];

  return (
    <section className="pt-36 pb-24 bg-[#faf9f6] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header — same pattern as Certifications / TimelineSectors */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="inline-block w-8 h-[2px] bg-[#2563eb]" />
            <span className={`font-bold text-[#0c1a2e] uppercase ${isRTL ? 'text-[14px] md:text-[15px] tracking-normal' : 'text-[11px] md:text-[12px] tracking-[0.22em]'}`}>
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
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto mb-20" dir="ltr">
          {orderedItems.map(({ item, image }) => (
            <Link
              href={`/ourcompany/${item.id}`}
              key={item.id}
              className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(12,26,46,0.07)] flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(12,26,46,0.12)] border border-[#0c1a2e]/5 cursor-pointer block"
            >
              {/* Image */}
              <div className="relative w-full h-[170px] overflow-hidden">
                <img
                  src={image}
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

        {/* Premium Divider */}
        <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[#0c1a2e]/10 to-transparent my-20" />

        {/* Portfolio Section Header */}
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
            className="text-3xl md:text-[2.3rem] font-bold text-[#0c1a2e] leading-tight max-w-3xl mx-auto"
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
                className="bg-white rounded-2xl h-[110px] w-full flex items-center justify-center p-4 shadow-[0_4px_20px_rgba(12,26,46,0.02)] border border-[#0c1a2e]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(12,26,46,0.06)] hover:border-[#2563eb]/20 group relative overflow-hidden"
              >
                {/* Logo wrapper */}
                <div
                  className="w-full h-full flex items-center justify-center relative transition-all duration-300"
                >
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
