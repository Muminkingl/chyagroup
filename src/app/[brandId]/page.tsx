"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND_DATA } from "@/lib/brand-data";
import { Iconify } from "@/components/ui/Iconify";
import { cn } from "@/lib/utils";
import * as QRLib from "qrcode";

const PAGE_TRANS = {
  en: {
    backToSector: "Back to Sector",
    ourServices: "Our Services & Specialities",
    branches: "Our Branches & Locations",
    contactUs: "Get In Touch",
    scanFollow: "Scan to Follow on Instagram",
    email: "Email Address",
    phone: "Phone Number",
    instagram: "Official Instagram",
    website: "Official Website",
    sectorNames: {
      "general-trading": "General Trading",
      "money-exchange": "Money Exchange",
      "mobile-tech": "Mobile & Technology",
      "printing": "Printing & Photocopy",
      "online-trading": "Online Trading",
    }
  },
  ar: {
    backToSector: "العودة إلى القطاع",
    ourServices: "خدماتنا وتخصصاتنا",
    branches: "فروعنا ومواقعنا",
    contactUs: "اتصل بنا",
    scanFollow: "امسح الرمز للمتابعة على إنستغرام",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    instagram: "إنستغرام الرسمي",
    website: "الموقع الرسمي",
    sectorNames: {
      "general-trading": "التجارة العامة",
      "money-exchange": "الصرافة والخدمات المالية",
      "mobile-tech": "الموبايل والتكنولوجيا",
      "printing": "الطباعة والتصوير",
      "online-trading": "التجارة عبر الإنترنت",
    }
  },
  ku: {
    backToSector: "گەڕانەوە بۆ سێکتەر",
    ourServices: "خزمەتگوزاری و تایبەتمەندییەکانمان",
    branches: "لق و شوێنەکانمان",
    contactUs: "پەیوەندیمان پێوە بکەن",
    scanFollow: "کۆدەکە سکان بکە بۆ فۆڵۆوکردنی ئینستاگرام",
    email: "ناونیشانی ئیمەیڵ",
    phone: "ژمارەی تەلەفۆن",
    instagram: "ئینستاگرامی فەرمی",
    website: "ماڵپەڕی فەرمی",
    sectorNames: {
      "general-trading": "بازرگانی گشتی",
      "money-exchange": "ئاڵوگۆڕی دراو و سێرڤسی دارایی",
      "mobile-tech": "مۆبایل و تەکنەلۆژیا",
      "printing": "چاپەمەنی و فۆتۆکۆپی",
      "online-trading": "بازرگانی بە ئۆنڵاین",
    }
  }
};

const FinderPattern = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect
      x={x + 0.5}
      y={y + 0.5}
      width={6.0}
      height={6.0}
      rx={1.5}
      fill="none"
      stroke="#0c1a2e"
      strokeWidth={1.0}
    />
    <rect
      x={x + 2.0}
      y={y + 2.0}
      width={3.0}
      height={3.0}
      rx={0.6}
      fill="#0c1a2e"
    />
  </g>
);

function buildMatrix(value: string): boolean[][] {
  const qr = QRLib.create(value, { errorCorrectionLevel: "M", version: 5 });
  const n = qr.modules.size;
  const matrix: boolean[][] = [];
  for (let r = 0; r < n; r++) {
    matrix[r] = [];
    for (let c = 0; c < n; c++) {
      matrix[r][c] = qr.modules.get(r, c) === 1;
    }
  }
  return matrix;
}

const QRCodeSVG = ({ value, logo }: { value: string; logo: string }) => {
  const matrix = buildMatrix(value);
  const size = matrix.length;
  const padding = 4;
  const boardSize = size + padding * 2;
  const center = Math.floor(size / 2);

  const dots: React.ReactNode[] = [];

  const isFinder = (r: number, c: number) => {
    if (r < 7 && c < 7) return true;
    if (r < 7 && c >= size - 7) return true;
    if (r >= size - 7 && c < 7) return true;
    return false;
  };

  const isCenterMask = (r: number, c: number) => {
    const rowDiff = Math.abs(r - center);
    const colDiff = Math.abs(c - center);
    if (logo.includes("Manfaz") || logo.includes("Amazon") || logo.includes("travel") || logo.includes("luxary") || logo.includes("luxury")) {
      return rowDiff <= 3 && colDiff <= 3;
    }
    return rowDiff <= 2 && colDiff <= 4;
  };

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) {
        if (isFinder(r, c)) continue;
        if (isCenterMask(r, c)) continue;

        dots.push(
          <rect
            key={`${r}-${c}`}
            x={c + padding + 0.08}
            y={r + padding + 0.08}
            width={0.84}
            height={0.84}
            rx={0.25}
            fill="url(#brand-qr-gradient)"
          />
        );
      }
    }
  }

  const clipId = `clip-brand-${logo.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox={`0 0 ${boardSize} ${boardSize}`}
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brand-qr-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c1a2e" />
          <stop offset="100%" stopColor="#4a5b70" />
        </linearGradient>

        <filter id="brand-qr-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0.35" stdDeviation="0.45" floodColor="#0c1a2e" floodOpacity="0.14" />
        </filter>

        <clipPath id={clipId}>
          {logo.includes("Manfaz") || logo.includes("Amazon") || logo.includes("travel") || logo.includes("luxary") || logo.includes("luxury") ? (
            <rect
              x={boardSize / 2 - 3.2}
              y={boardSize / 2 - 3.2}
              width={6.4}
              height={6.4}
              rx={1.8}
            />
          ) : (
            <rect
              x={boardSize / 2 - 4.3}
              y={boardSize / 2 - 2.3}
              width={8.6}
              height={4.6}
              rx={0.8}
            />
          )}
        </clipPath>
      </defs>

      <rect width={boardSize} height={boardSize} rx={boardSize * 0.08} fill="#ffffff" />

      <FinderPattern x={padding} y={padding} />
      <FinderPattern x={size - 7 + padding} y={padding} />
      <FinderPattern x={padding} y={size - 7 + padding} />

      {dots}

      <g filter="url(#brand-qr-shadow)">
        {logo.includes("Manfaz") ? (
          <rect
            x={boardSize / 2 - 3.5}
            y={boardSize / 2 - 3.5}
            width={7}
            height={7}
            rx={2}
            fill="#fcd116"
          />
        ) : (logo.includes("luxary") || logo.includes("luxury")) ? (
          <rect
            x={boardSize / 2 - 3.5}
            y={boardSize / 2 - 3.5}
            width={7}
            height={7}
            rx={2}
            fill="#c9a227"
          />
        ) : (logo.includes("Amazon") || logo.includes("travel")) ? (
          <rect
            x={boardSize / 2 - 3.5}
            y={boardSize / 2 - 3.5}
            width={7}
            height={7}
            rx={2}
            fill="white"
            stroke="#0c1a2e"
            strokeWidth={0.12}
            strokeOpacity={0.1}
          />
        ) : (
          <rect
            x={boardSize / 2 - 4.5}
            y={boardSize / 2 - 2.5}
            width={9}
            height={5}
            rx={1}
            fill="white"
            stroke="#0c1a2e"
            strokeWidth={0.12}
            strokeOpacity={0.1}
          />
        )}
        <g clipPath={`url(#${clipId})`}>
          {logo.includes("Manfaz") || logo.includes("travel") ? (
            <image
              href={logo}
              x={boardSize / 2 - 3.2}
              y={boardSize / 2 - 3.2}
              width={6.4}
              height={6.4}
              preserveAspectRatio="xMidYMid meet"
            />
          ) : logo.includes("luxary") || logo.includes("luxury") ? (
            <image
              href={logo}
              x={boardSize / 2 - 3.5}
              y={boardSize / 2 - 3.5}
              width={7}
              height={7}
              preserveAspectRatio="xMidYMid slice"
            />
          ) : logo.includes("Amazon") ? (
            <image
              href={logo}
              x={boardSize / 2 - 3.2}
              y={boardSize / 2 - 3.2}
              width={6.4}
              height={6.4}
              preserveAspectRatio="xMidYMid meet"
            />
          ) : (
            <image
              href={logo}
              x={boardSize / 2 - 4.1}
              y={boardSize / 2 - 2.1}
              width={8.2}
              height={4.2}
              preserveAspectRatio="xMidYMid meet"
            />
          )}
        </g>
      </g>
    </svg>
  );
};

export default function BrandPage() {
  const params = useParams();
  const brandId = params.brandId as string;
  const { locale, isRTL } = useLanguage();

  const brand = BRAND_DATA[brandId];

  if (!brand) {
    notFound();
  }

  const t = PAGE_TRANS[locale as "en" | "ar" | "ku"] || PAGE_TRANS.en;
  const sectorName = t.sectorNames[brand.sectorId as keyof typeof t.sectorNames] || brand.sectorId;

  // Clean Instagram handle extraction
  const cleanInstagramHandle = () => {
    try {
      const withoutProtocol = brand.qrLink.replace(/(https?:\/\/)?(www\.)?instagram\.com\//i, "");
      return "@" + withoutProtocol.split("?")[0].replace(/\/$/, "");
    } catch (e) {
      return "@instagram";
    }
  };

  // Service icons mapping to give visual rich look
  const getServiceIcon = (index: number) => {
    const icons = [
      "solar:check-circle-bold-duotone",
      "solar:star-bold-duotone",
      "solar:shield-check-bold-duotone",
      "solar:verified-check-bold-duotone",
      "solar:medal-ribbon-bold-duotone"
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="relative min-h-screen w-full bg-[#faf9f6]" dir={isRTL ? "rtl" : "ltr"}>
      <Header />

      <main className="relative z-10 pt-24 pb-32">
        {/* Hero Section */}
        <section className="relative w-full h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden mb-16">
          <div
            className="absolute inset-0 z-0 bg-cover transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('${brand.heroImage}')`,
              backgroundPosition: brandId === "chyaluxury" ? "center 40%" : "center",
            }}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c1a2e] via-[#0c1a2e]/70 to-[#0c1a2e]/45" />

          <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
            {/* Brand Logo Circle */}
            <div className={cn(
              "w-28 h-28 bg-white rounded-[2rem] shadow-xl mb-6 flex items-center justify-center border border-white/10 hover:scale-105 transition-transform duration-500 overflow-hidden",
              brandId === "manfazdibaga" ? "p-0" : "p-4"
            )}>
              <Image
                src={brand.logo}
                alt={brand.name[locale as "en" | "ar" | "ku"]}
                width={120}
                height={120}
                className={cn(
                  brandId === "manfazdibaga" ? "w-full h-full object-cover" : "object-contain"
                )}
                style={{ transform: brandId === "manfazdibaga" ? undefined : `scale(${brand.logoScale})` }}
              />
            </div>

            {/* Back to sector */}
            <Link
              href={`/ourcompany/${brand.sectorId}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white/80 hover:text-white hover:bg-white/20 transition-all mb-4"
            >
              <Iconify icon={isRTL ? "solar:arrow-right-linear" : "solar:arrow-left-linear"} width={12} />
              {sectorName}
            </Link>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md mb-4 uppercase">
              {brand.name[locale as "en" | "ar" | "ku"]}
            </h1>
            <p className="text-md md:text-xl font-medium text-white/80 max-w-2xl">
              {brand.tagline[locale as "en" | "ar" | "ku"]}
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left/Main Content Column */}
            <div className="lg:col-span-8 flex flex-col gap-16">

              {/* About description */}
              <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(12,26,46,0.02)] border border-[#0c1a2e]/5">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c1a2e] mb-6 border-b border-[#0c1a2e]/5 pb-4">
                  {brand.name[locale as "en" | "ar" | "ku"]}
                </h2>
                <p className={cn(
                  "text-[#3a4f6a] leading-relaxed text-[16px] md:text-[17px]",
                  isRTL ? "font-semibold leading-[1.8]" : ""
                )}>
                  {brand.description[locale as "en" | "ar" | "ku"]}
                </p>
              </section>

              {/* Services List */}
              <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(12,26,46,0.02)] border border-[#0c1a2e]/5">
                <h3 className="text-2xl font-bold text-[#0c1a2e] mb-8 flex items-center gap-3">
                  <Iconify icon="solar:widget-bold-duotone" width={28} className="text-[#b91c1c]" />
                  {t.ourServices}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {brand.services[locale as "en" | "ar" | "ku"].map((service, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-5 rounded-2xl bg-[#faf9f6] border border-[#0c1a2e]/[0.02] hover:border-[#b91c1c]/10 hover:bg-white transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#b91c1c] transition-colors group-hover:bg-[#b91c1c] group-hover:text-white">
                        <Iconify icon={getServiceIcon(idx)} width={20} />
                      </div>
                      <div>
                        <h4 className={cn("text-[15px] text-[#0c1a2e] leading-snug", isRTL ? "font-bold" : "font-semibold")}>
                          {service}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Branches / Locations */}
              <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(12,26,46,0.02)] border border-[#0c1a2e]/5">
                <h3 className="text-2xl font-bold text-[#0c1a2e] mb-8 flex items-center gap-3">
                  <Iconify icon="solar:map-point-bold-duotone" width={28} className="text-[#b91c1c]" />
                  {t.branches}
                </h3>
                <div className="flex flex-col gap-6">
                  {brand.branches.map((branch, idx) => (
                    <div key={idx} className="flex gap-5 p-6 rounded-2xl bg-[#faf9f6] border border-[#0c1a2e]/[0.02] items-start">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#b91c1c]">
                        <Iconify icon="solar:map-bold-duotone" width={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={cn("text-lg text-[#0c1a2e] mb-1.5", isRTL ? "font-extrabold" : "font-bold")}>
                          {branch.city[locale as "en" | "ar" | "ku"]}
                        </h4>
                        <p className={cn("text-[#3a4f6a] text-sm", isRTL ? "font-semibold" : "font-medium")}>
                          {(() => {
                            const addr = branch.address[locale as "en" | "ar" | "ku"];
                            const match = addr.match(/^(.*?)\s*(\(.*\))\s*$/);
                            if (match) {
                              return (
                                <>
                                  {match[1]} <span className="whitespace-nowrap">{match[2]}</span>
                                </>
                              );
                            }
                            return addr;
                          })()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Right Sidebar Column (Contact Info & Instagram QR) */}
            <div className="lg:col-span-4 flex flex-col gap-10 sticky top-28">

              {/* Instagram QR Portal Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(12,26,46,0.04)] border border-[#0c1a2e]/[0.02] flex flex-col items-center text-center">
                <div className={cn(
                  "mb-4 flex items-center justify-center overflow-hidden",
                  brandId === "manfazdibaga"
                    ? "w-20 h-20 rounded-[1.4rem] p-0 bg-[#fcd116]"
                    : (brandId === "chyaamazon" || brandId === "chyatravel")
                    ? "w-20 h-20 bg-white rounded-2xl"
                    : brandId === "chyaluxury"
                    ? "w-20 h-20 bg-[#c9a227] rounded-2xl"
                    : "w-24 h-14 bg-white rounded-lg"
                )}>
                  <Image
                    src={brand.logo}
                    alt={brand.name[locale as "en" | "ar" | "ku"]}
                    width={120}
                    height={120}
                    className={cn(
                      "w-full h-full",
                      brandId === "manfazdibaga" ? "object-cover" : "object-contain"
                    )}
                    style={{
                      transform: brandId === "manfazdibaga" 
                        ? "scale(1.25)" 
                        : (brandId === "chyaluxury")
                        ? undefined
                        : brand.logoScale 
                        ? `scale(${brand.logoScale})` 
                        : undefined
                    }}
                  />
                </div>
                <h3 className="text-[14px] font-bold text-[#0c1a2e] mb-1 tracking-wide uppercase">
                  {brand.name[locale as "en" | "ar" | "ku"]}
                </h3>
                <p className="text-xs text-[#3a4f6a]/70 font-medium mb-6">
                  {t.scanFollow}
                </p>
                <div className="w-40 h-40 mb-6">
                  <QRCodeSVG value={brand.qrLink} logo={brand.logo} />
                </div>
                <a
                  href={brand.qrLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2 font-bold text-[#0c1a2e] hover:text-[#b91c1c] uppercase mt-auto pt-2 transition-colors",
                    isRTL ? "text-[12px]" : "text-[10px] tracking-widest"
                  )}
                >
                  <Iconify icon="mdi:instagram" width={16} />
                  <span>{cleanInstagramHandle()}</span>
                </a>
              </div>

              {/* Direct Contacts Card */}
              <div className="bg-[#0c1a2e] text-white rounded-[2rem] p-8 shadow-xl flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-x-12 translate-y-12">
                  <Iconify icon="solar:letter-bold" width={240} />
                </div>

                <h3 className="text-xl font-bold border-b border-white/10 pb-3">
                  {t.contactUs}
                </h3>

                <div className="flex flex-col gap-5">
                  <a href={`mailto:${brand.email}`} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center transition-colors group-hover:bg-white/25">
                      <Iconify icon="solar:letter-linear" width={20} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/50 uppercase font-semibold">{t.email}</span>
                      <span className="text-sm font-semibold group-hover:underline break-all">{brand.email}</span>
                    </div>
                  </a>

                  <a href={`tel:${brand.phone.replace(/\s+/g, "")}`} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center transition-colors group-hover:bg-white/25">
                      <Iconify icon="solar:phone-linear" width={20} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/50 uppercase font-semibold">{t.phone}</span>
                      <span className="text-sm font-semibold group-hover:underline">{brand.phone}</span>
                    </div>
                  </a>

                  <a href={brand.qrLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center transition-colors group-hover:bg-white/25">
                      <Iconify icon="mdi:instagram" width={20} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/50 uppercase font-semibold">{t.instagram}</span>
                      <span className="text-sm font-semibold group-hover:underline">{cleanInstagramHandle()}</span>
                    </div>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
