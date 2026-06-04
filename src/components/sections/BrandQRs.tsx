"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { Iconify } from '@/components/ui/Iconify';
import { motion, animate, useInView } from 'framer-motion';
import * as QRLib from 'qrcode';

const parentBrand = {
    id: "chyagroup",
    logo: "/logo.svg",
    logoScale: 1.2,
    qrLink: "https://www.instagram.com/chyagroup.iq/",
    name: {
        en: "HOLDING",
        ar: "هولدينغ",
        ku: "هۆڵدینگ"
    },
    tagline: {
        en: "",
        ar: "",
        ku: ""
    }
};

const brands = [
    // Row 1
    {
        id: "marjan",
        logo: "/brands/lamattt.png",
        logoScale: 1.45,
        qrLink: "https://www.instagram.com/lamat.almarjan_co?igsh=d2txbnp1cXRuNjhn",
        name: {
            en: "Lamat Al Marjan",
            ar: "شركة لمعة المرجان",
            ku: "کۆمپانیای لمعة المرجان"
        },
        tagline: {
            en: "General Trading",
            ar: "تجارة عامة",
            ku: "بازرگانی گشتی"
        }
    },
    {
        id: "chyaymaten",
        logo: "/brands/chyaymat.png",
        logoScale: 1.50,
        qrLink: "https://www.instagram.com/chyay_mateen.co?igsh=NWljZDg1ZnR6NWJm",
        name: {
            en: "Chyay Mateen",
            ar: "شركة جياى متين",
            ku: "کۆمپانیای چیای مەتین"
        },
        tagline: {
            en: "General Trading",
            ar: "تجارة عامة",
            ku: "بازرگانی گشتی"
        }
    },
    {
        id: "khakesarwar",
        logo: "/brands/khakisarwar.png",
        logoScale: 1.25,
        qrLink: "https://www.instagram.com/khaki_sarwar.co?igsh=MW43NXdoamhsODJoYg==",
        name: {
            en: "Khaki Sarwar",
            ar: "شركة خاكى سەروەر",
            ku: "کۆمپانیای خاکی سەروەر"
        },
        tagline: {
            en: "Financial Services",
            ar: "الخدمات المالية",
            ku: "ئاڵوگۆڕی دراو و دارایی"
        }
    },
    // Row 2
    {
        id: "blueprinting",
        logo: "/brands/BLUE PRINT-1.png",
        logoScale: 1.8,
        qrLink: "https://www.instagram.com/blue.printing_office?igsh=MTk4MHU0NHc3eXBxNg==",
        name: {
            en: "Blue Printing",
            ar: "مکتب بلو طباعە",
            ku: "نووسینگەی بلو پرێنتینگ"
        },
        tagline: {
            en: "Printing & Photocopy",
            ar: "الطباعة والتصوير",
            ku: "چاپەمەنی و فۆتۆکۆپی"
        }
    },
    {
        id: "hangaw",
        logo: "/brands/hangawexchange.png",
        logoScale: 1.45,
        qrLink: "https://www.instagram.com/hangaw_exchangemoney?igsh=M2h4ZTEyZmRud21y",
        name: {
            en: "Hangaw Exchange",
            ar: "مکتب هەنگاو",
            ku: "نووسینگەی هەنگاو"
        },
        tagline: {
            en: "Financial Services",
            ar: "الخدمات المالية",
            ku: "ئاڵوگۆڕی دراو و دارایی"
        }
    },
    {
        id: "ChyaExchnage",
        logo: "/brands/chyaexchnage.png",
        logoScale: 1.25,
        qrLink: "https://www.instagram.com/chya_exchangemoney?igsh=c3VnYzMxY2o5OGVu",
        name: {
            en: "Chya Exchange",
            ar: "مكتب جيا",
            ku: "نووسینگەی چیا"
        },
        tagline: {
            en: "Financial Services",
            ar: "الخدمات المالية",
            ku: "ئاڵوگۆڕی دراو و دارایی"
        }
    },
    // Row 3
    {
        id: "Chyagold",
        logo: "/brands/qapat-1.png",
        logoScale: 1.50,
        qrLink: "https://www.instagram.com/chya_gold.turkey?igsh=NTV1dm9vMzlrcHhi",
        name: {
            en: "Chya Gold",
            ar: "مكتب جيا كولد",
            ku: "نووسینگەی چیا گۆڵد"
        },
        tagline: {
            en: "Financial Services",
            ar: "الخدمات المالية",
            ku: "ئاڵوگۆڕی دراو و دارایی"
        }
    },
    {
        id: "Lutkay chya",
        logo: "/brands/lutkay chya-1.png",
        logoScale: 1.30,
        qrLink: "https://www.instagram.com/lutkay.chya_exchangemoney?igsh=ajVzMzN2dWx4dnY4",
        name: {
            en: "Lutkay Chya",
            ar: "مكتب لوتكەی جيا",
            ku: "نووسینگەی لوتکەی چیا"
        },
        tagline: {
            en: "Financial Services",
            ar: "الخدمات المالية",
            ku: "ئاڵوگۆڕی دراو و دارایی"
        }
    },
    {
        id: "Barzy chya",
        logo: "/brands/BARZY CHYAY-1.png",
        logoScale: 1.15,
        qrLink: "https://www.instagram.com/barzy.chya_exchange?igsh=MnhwZHE2aGoweWU0",
        name: {
            en: "Barzy Chya",
            ar: "مکتب بەرزی جيا",
            ku: "نووسینگەی بەرزی چیا"
        },
        tagline: {
            en: "Financial Services",
            ar: "الخدمات المالية",
            ku: "ئاڵوگۆڕی دراو و دارایی"
        }
    },
    // Row 4
    {
        id: "Manfazdebaga",
        logo: "/brands/Manfaz Dibaga-1.png",
        logoScale: 1.20,
        qrLink: "https://www.instagram.com/manfaz.dibaga_hangaw?igsh=ZGtoamJtNzd6MHJm",
        name: {
            en: "Manfaz Dibaga",
            ar: "منفذ ديبكة",
            ku: "منفذ دیبەگە"
        },
        tagline: {
            en: "Financial Services",
            ar: "الخدمات المالية",
            ku: "ئاڵوگۆڕی دراو و دارایی"
        }
    },
    {
        id: "Chya amazone",
        logo: "/brands/Chya Amazon-1.png",
        logoScale: 1.25,
        qrLink: "https://www.instagram.com/chya_amazon.iq?igsh=cHQzbXV5aHc4amhj",
        name: {
            en: "Chya Amazon",
            ar: "مشروع جيا أمازون",
            ku: "چیا ئەمازۆن"
        },
        tagline: {
            en: "General Trading",
            ar: "تجارة عامة",
            ku: "بازرگانی گشتی"
        }
    },
    {
        id: "Chya phone",
        logo: "/brands/chya phone-1.png",
        logoScale: 1.25,
        qrLink: "https://www.instagram.com/chya_phone.iq?igsh=MTcza2o2azEwbjlxYg==",
        name: {
            en: "Chya Phone",
            ar: "محل جيا فون",
            ku: "پێشانگای چیا فۆن"
        },
        tagline: {
            en: "Mobile & Technology",
            ar: "الموبايل والتكنولوجيا",
            ku: "مۆبایل و تەکنەلۆژیا"
        }
    },
    // Row 5
    {
        id: "Chya trael",
        logo: "/brands/CHYA travel-1.png",
        logoScale: 2.0,
        qrLink: "https://www.instagram.com/chya_travel.iq?igsh=MTFzMDE5ODV5ODN1bQ==",
        name: {
            en: "Chya Travel",
            ar: "جيا تراڤل",
            ku: "کاری چیا تڕاڤل"
        },
        tagline: {
            en: "Online Trading",
            ar: "التداول الإلكتروني",
            ku: "بازرگانی ئۆنلاین"
        }
    },
    {
        id: "chya tech",
        logo: "/brands/chyatech.png",
        logoScale: 2.15,
        qrLink: "https://www.instagram.com/chya_tech.iq?igsh=MTNzcWp5a2F4d3dmZg==",
        name: {
            en: "Chya Tech",
            ar: "جيا تيك",
            ku: "کاری چیا تێك"
        },
        tagline: {
            en: "Mobile & Technology",
            ar: "الموبايل والتكنولوجيا",
            ku: "مۆبایل و تەکنەلۆژیا"
        }
    },
    {
        id: "kivaluxury",
        logo: "/brands/kivaluxary.png",
        logoScale: 1.30,
        qrLink: "https://www.instagram.com/kiva.luxuryshop?igsh=emFtbXNpbjBmMnh6",
        name: {
            en: "Kiva Luxury",
            ar: "كيفا لوكزوري",
            ku: "کاری کیڤا لوکژوری"
        },
        tagline: {
            en: "Online Trading",
            ar: "التداول الإلكتروني",
            ku: "بازرگانی ئۆنلاین"
        }
    }
];

const FinderPattern = ({ x, y }: { x: number; y: number }) => (
    <g>
        {/* Outer Ring - squircle */}
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
        {/* Inner Dot - squircle */}
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

// Generate QR matrix using qrcode library (guaranteed to be valid and scannable)
function buildMatrix(value: string): boolean[][] {
    const qr = QRLib.create(value, { errorCorrectionLevel: 'M', version: 5 });
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
        return rowDiff <= 2 && colDiff <= 4; // Clears exactly 5 rows and 9 columns in the center
    };

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (matrix[r][c]) {
                if (isFinder(r, c)) continue;
                if (isCenterMask(r, c)) continue;

                // Render as separate rounded squares filled with a premium luxury gradient
                // (Size 0.84, rx 0.25 provides maximum binarization contrast for scanners like ZXing)
                dots.push(
                    <rect
                        key={`${r}-${c}`}
                        x={c + padding + 0.08}
                        y={r + padding + 0.08}
                        width={0.84}
                        height={0.84}
                        rx={0.25}
                        fill="url(#qr-dot-gradient)"
                    />
                );
            }
        }
    }

    const clipId = `clip-${logo.replace(/[^a-zA-Z0-9]/g, '')}`;

    return (
        <svg
            viewBox={`0 0 ${boardSize} ${boardSize}`}
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Premium satin bronze-gold linear gradient for data dots */}
                <linearGradient id="qr-dot-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0c1a2e" />
                    <stop offset="100%" stopColor="#4a5b70" />
                </linearGradient>

                {/* Floating drop shadow filter for central landscape logo card */}
                <filter id="qr-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0.35" stdDeviation="0.45" floodColor="#0c1a2e" floodOpacity="0.14" />
                </filter>

                <clipPath id={clipId}>
                    <rect
                        x={boardSize / 2 - 4.3}
                        y={boardSize / 2 - 2.3}
                        width={8.6}
                        height={4.6}
                        rx={0.8}
                    />
                </clipPath>
            </defs>

            {/* Pure white card background */}
            <rect width={boardSize} height={boardSize} rx={boardSize * 0.08} fill="#ffffff" />

            {/* Perfect Squircle Finder Corners */}
            <FinderPattern x={padding} y={padding} />
            <FinderPattern x={size - 7 + padding} y={padding} />
            <FinderPattern x={padding} y={size - 7 + padding} />

            {/* Circular Dots Matrix */}
            {dots}

            {/* Floating central landscape logo card */}
            <g filter="url(#qr-shadow)">
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
                <g clipPath={`url(#${clipId})`}>
                    <image
                        href={logo}
                        x={boardSize / 2 - 4.1}
                        y={boardSize / 2 - 2.1}
                        width={8.2}
                        height={4.2}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </g>
            </g>
        </svg>
    );
};

function Counter({ value, isRTL, inView }: { value: number | string, isRTL: boolean, inView: boolean }) {
    const [displayValue, setDisplayValue] = React.useState("0");

    // Helper to convert Eastern Arabic digits (٠-٩) to Western Arabic (0-9)
    const convertToEn = (str: string) => str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
    
    const numericValue = typeof value === 'string' 
        ? parseInt(convertToEn(value).replace(/[^0-9]/g, '')) 
        : value;

    React.useEffect(() => {
        if (!inView) return;

        if (isNaN(numericValue as number)) {
            setDisplayValue(String(value));
            return;
        }

        const controls = animate(0, numericValue as number, {
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => {
                const rounded = Math.floor(latest);
                let finalStr = String(rounded);
                if (typeof value === 'string') {
                    // Extract non-digit characters to preserve any suffix (though we currently have none)
                    const suffix = value.replace(/[0-9٠-٩]/g, '').trim();
                    setDisplayValue(suffix ? (isRTL ? `${finalStr} ${suffix}` : `${finalStr} ${suffix}`) : finalStr);
                } else {
                    setDisplayValue(finalStr);
                }
            }
        });
        return () => controls.stop();
    }, [numericValue, isRTL, value, inView]);

    return <span>{displayValue}</span>;
}

const BrandCard = ({ brand, locale, scanText }: { brand: typeof brands[0], locale: 'en' | 'ku' | 'ar', scanText: string }) => {
    const { isRTL } = useLanguage();
    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(12,26,46,0.04)] border border-[#0c1a2e]/[0.02] flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
            <div className="w-20 h-12 mb-4 flex items-center justify-center flex-shrink-0">
                <Image
                    src={brand.logo}
                    alt={brand.name[locale]}
                    width={100}
                    height={50}
                    className="w-full h-full object-contain"
                    style={{ transform: `scale(${brand.logoScale})` }}
                />
            </div>
            <h3 className="text-[15px] font-bold text-[#0c1a2e] mb-1 tracking-wide uppercase">{brand.name[locale]}</h3>
            <p className="text-xs text-[#3a4f6a]/70 font-medium mb-6">{brand.tagline[locale]}</p>
            <div className="w-32 h-32 mb-6">
                <QRCodeSVG value={brand.qrLink} logo={brand.logo} />
            </div>
            <div className={`flex items-center gap-2 font-bold text-[#0c1a2e] uppercase mt-auto pt-2 ${isRTL ? 'text-[13px] tracking-normal' : 'text-[10.5px] tracking-widest'}`}>
                <Iconify icon="solar:smartphone-linear" width={14} className="text-[#0c1a2e]/70" />
                <span dir="auto">{scanText}</span>
            </div>
        </div>
    );
};

export default function BrandQRs() {
    const { locale, isRTL } = useLanguage();
    const t = translations[locale].brandQRs;
    const bannerRef = useRef(null);
    const isInView = useInView(bannerRef, { once: true, amount: 0.3 });

    return (
        <section dir="ltr" id="brand-qrs" className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#faf9f6' }}>

            {/* Decorative elements */}
            <div className={`absolute top-20 ${isRTL ? 'right-10' : 'left-10'} opacity-[0.1] pointer-events-none hidden lg:block`}>
                <div className="grid grid-cols-4 gap-2">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0c1a2e]" />
                    ))}
                </div>
            </div>

            <svg
                className={`absolute top-0 ${isRTL ? 'left-0 scale-x-[-1]' : 'right-0'} w-[400px] h-[400px] opacity-[0.05] pointer-events-none`}
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {[80, 120, 160, 200, 240, 280, 320].map((r) => (
                    <circle key={r} cx="300" cy="0" r={r} stroke="#0c1a2e" strokeWidth="0.8" />
                ))}
            </svg>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block w-8 h-[2px] bg-[#0c1a2e]" />
                        <span dir="auto" className={`font-bold text-[#0c1a2e] uppercase ${isRTL ? 'text-[15px] tracking-normal' : 'text-[12px] tracking-widest'}`}>
                            {t.eyebrow}
                        </span>
                    </div>
                    <h2 dir="auto" className="text-4xl md:text-5xl font-bold text-[#0c1a2e] mb-5 tracking-tight leading-tight">
                        {t.title}
                    </h2>
                    <p dir="auto" className={`text-[15.5px] ${isRTL ? 'text-[#0c1a2e] font-bold' : 'text-[#0c1a2e] font-semibold'} max-w-md mx-auto leading-relaxed`}>
                        {t.description}
                    </p>
                </div>

                {/* Center parent brand card */}
                <div className="flex justify-center mb-16">
                    <div className="w-full max-w-[340px] bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(12,26,46,0.04)] border border-[#0c1a2e]/[0.02] flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
                        <div className="flex items-center gap-2.5 mb-5 justify-center flex-shrink-0" dir="ltr">
                            <img src="/logo.svg" alt="Chya Group Logo" className="w-10 h-10 object-contain" />
                            <div className="flex flex-col text-left leading-[1.0] select-none items-start">
                              <span className="text-[17px] font-black tracking-[0.05em] uppercase text-[#e84040]">CHYA</span>
                              <span className="text-[14px] font-bold tracking-[0.12em] uppercase text-[#0a2a56] mt-0.5">GROUP</span>
                            </div>
                        </div>
                        <h3 className="text-[15px] font-bold text-[#0c1a2e] mb-1 tracking-wide uppercase">
                            {parentBrand.name[locale]}
                        </h3>
                        {parentBrand.tagline[locale] && (
                            <p className="text-xs text-[#3a4f6a]/70 font-medium mb-6">
                                {parentBrand.tagline[locale]}
                            </p>
                        )}
                        <div className="w-32 h-32 mb-6">
                            <QRCodeSVG value={parentBrand.qrLink} logo={parentBrand.logo} />
                        </div>
                        <div className={`flex items-center gap-2 font-bold text-[#0c1a2e] uppercase mt-auto pt-2 ${isRTL ? 'text-[13px] tracking-normal' : 'text-[10.5px] tracking-widest'}`}>
                            <Iconify icon="solar:smartphone-linear" width={14} className="text-[#0c1a2e]/70" />
                            <span dir="auto">{t.scanToFollow}</span>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {brands.map((brand) => (
                        <BrandCard key={brand.id} brand={brand} locale={locale as 'en' | 'ku' | 'ar'} scanText={t.scanToFollow} />
                    ))}
                </div>

                {/* Bottom Stats Banner */}
                <div 
                    ref={bannerRef}
                    className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_8px_40px_rgb(12,26,46,0.06)] border border-[#0c1a2e]/[0.02] flex flex-col lg:flex-row items-center justify-between gap-10"
                >

                    <div className={`flex items-center gap-6 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                        <div className="w-16 h-16 rounded-full bg-[#0c1a2e] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#0c1a2e]/20">
                            <Iconify icon="solar:global-linear" className="text-white" width={32} />
                        </div>
                        <div>
                            <h4 dir="auto" className="text-[19px] font-bold text-[#0c1a2e] mb-2">{t.banner.title}</h4>
                            <p dir="auto" className={`text-[14px] ${isRTL ? 'text-[#0c1a2e] font-semibold' : 'text-[#3a4f6a]/70'} font-medium max-w-xs leading-relaxed`}>
                                {t.banner.subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">

                        {/* Vision Stat */}
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:medal-ribbon-linear" className="text-[#0c1a2e]" width={28} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-[20px] font-bold text-[#0c1a2e] leading-none mb-1">
                                    <Counter value={t.banner.stats.vision} isRTL={isRTL} inView={isInView} />
                                </div>
                                <div dir="auto" className="text-[12px] font-bold text-[#0c1a2e]">
                                    {t.banner.stats.visionLabel}
                                </div>
                            </div>
                        </div>

                        {/* Sectors Stat */}
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:city-linear" className="text-[#0c1a2e]" width={28} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-[20px] font-bold text-[#0c1a2e] leading-none mb-1">
                                    <Counter value={t.banner.stats.sectors} isRTL={isRTL} inView={isInView} />
                                </div>
                                <div dir="auto" className="text-[12px] font-bold text-[#0c1a2e]">
                                    {t.banner.stats.sectorsLabel}
                                </div>
                            </div>
                        </div>

                        {/* Offices Stat */}
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:buildings-linear" className="text-[#0c1a2e]" width={28} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-[20px] font-bold text-[#0c1a2e] leading-none mb-1">
                                    <Counter value={t.banner.stats.offices} isRTL={isRTL} inView={isInView} />
                                </div>
                                <div dir="auto" className="text-[12px] font-bold text-[#0c1a2e]">
                                    {t.banner.stats.officesLabel}
                                </div>
                            </div>
                        </div>

                        {/* Professionals Stat */}
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Iconify icon="solar:users-group-rounded-linear" className="text-[#0c1a2e]" width={28} />
                            <div className={isRTL ? 'text-right' : 'text-left'}>
                                <div className="text-[20px] font-bold text-[#0c1a2e] leading-none mb-1">
                                    <Counter value={t.banner.stats.professionals} isRTL={isRTL} inView={isInView} />
                                </div>
                                <div dir="auto" className="text-[12px] font-bold text-[#0c1a2e]">
                                    {t.banner.stats.professionalsLabel}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
