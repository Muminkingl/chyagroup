"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { sectorTranslations } from "@/i18n/sector-translations";
import { Iconify } from "@/components/ui/Iconify";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { motion } from "framer-motion";

const SECTOR_IMAGES: Record<string, string> = {
  "general-trading": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
  "money-exchange": "/money.png",
  "mobile-tech": "/hmmphone.png",
  "printing": "/printing.jpg",
  "online-trading": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
};

const SECTOR_EMAILS: Record<string, string[]> = {
  "general-trading": [
    "lamatalmarjan2019@gmail.com",
    "chyaymateen2026@gmail.com",
    "chyaamazon2026@gmail.com"
  ],
  "money-exchange": [
    "khakisarwar2025@gmail.com",
    "chyaexchange2021@gmail.com",
    "chyagold2023@gmail.com",
    "lutkaychya2024@gmail.com",
    "barzychya2025@gmail.com",
    "hangawexchange2024@gmail.com",
    "manfazdibagabyhangaw2025@gmail.com"
  ],
  "mobile-tech": [
    "chyatech2025@gmail.com",
    "chyaphone2026@gmail.com"
  ],
  "printing": [
    "blueprinting2025@gmail.com"
  ],
  "online-trading": [
    "chyatravel2020@gmail.com",
    "kivaluxury2022@gmail.com"
  ]
};

interface BrandInstagram {
  id: string;
  name: {
    en: string;
    ar: string;
    ku: string;
  };
  qrLink: string;
}

const SECTOR_BRANDS: Record<string, BrandInstagram[]> = {
  "general-trading": [
    {
      id: "lamatalmarjan",
      name: {
        en: "Lamat Al Marjan",
        ar: "شركة لمعة المرجان",
        ku: "کۆمپانیای لمعة المرجان",
      },
      qrLink: "https://www.instagram.com/lamat.almarjan_co?igsh=d2txbnp1cXRuNjhn",
    },
    {
      id: "chyaymateen",
      name: {
        en: "Chyay Mateen",
        ar: "شركة جياى متين",
        ku: "کۆمپانیای چیای مەتین",
      },
      qrLink: "https://www.instagram.com/chyay_mateen.co?igsh=NWljZDg1ZnR6NWJm",
    },
    {
      id: "chyaamazon",
      name: {
        en: "Chya Amazon",
        ar: "مشروع جيا أمازون",
        ku: "چیا ئەمازۆن",
      },
      qrLink: "https://www.instagram.com/chya_amazon.iq?igsh=cHQzbXV5aHc4amhj",
    },
  ],
  "money-exchange": [
    {
      id: "khakisarwar",
      name: {
        en: "Khaki Sarwar",
        ar: "شركة خاكى سەروەر",
        ku: "کۆمپانیای خاکی سەروەر",
      },
      qrLink: "https://www.instagram.com/khaki_sarwar.co?igsh=MW43NXdoamhsODJoYg==",
    },
    {
      id: "chya",
      name: {
        en: "Chya Exchange",
        ar: "مكتب جيا",
        ku: "نووسینگەی چیا",
      },
      qrLink: "https://www.instagram.com/chya_exchangemoney?igsh=c3VnYzMxY2o5OGVu",
    },
    {
      id: "chyagold",
      name: {
        en: "Chya Gold",
        ar: "مكتب جيا كولد",
        ku: "نووسینگەی چیا گۆڵد",
      },
      qrLink: "https://www.instagram.com/chya_gold.turkey?igsh=NTV1dm9vMzlrcHhi",
    },
    {
      id: "lutkaychya",
      name: {
        en: "Lutkay Chya",
        ar: "مكتب لوتكەی جيا",
        ku: "نووسینگەی لوتکەی چیا",
      },
      qrLink: "https://www.instagram.com/lutkay.chya_exchangemoney?igsh=ajVzMzN2dWx4dnY4",
    },
    {
      id: "barzychya",
      name: {
        en: "Barzy Chya",
        ar: "مکتب بەرزی جيا",
        ku: "نووسینگەی بەرزی چیا",
      },
      qrLink: "https://www.instagram.com/barzy.chya_exchange?igsh=MnhwZHE2aGoweWU0",
    },
    {
      id: "hangaw",
      name: {
        en: "Hangaw Exchange",
        ar: "مکتب هەنگاو",
        ku: "نووسینگەی هەنگاو",
      },
      qrLink: "https://www.instagram.com/hangaw_exchangemoney?igsh=M2h4ZTEyZmRud21y",
    },
    {
      id: "manfazdibaga",
      name: {
        en: "Manfaz Dibaga",
        ar: "منفذ ديبكة",
        ku: "منفذ ديبكة ى هەنگاو",
      },
      qrLink: "https://www.instagram.com/manfaz.dibaga_hangaw?igsh=ZGtoamJtNzd6MHJm",
    },
  ],
  "mobile-tech": [
    {
      id: "chyaphone",
      name: {
        en: "Chya Phone",
        ar: "محل جيا فون",
        ku: "پێشانگای چیا فۆن",
      },
      qrLink: "https://www.instagram.com/chya_phone.iq?igsh=MTcza2o2azEwbjlxYg==",
    },
    {
      id: "chyatech",
      name: {
        en: "Chya Tech",
        ar: "جيا تيك",
        ku: "کاری چیا تێك",
      },
      qrLink: "https://www.instagram.com/chya_tech.iq?igsh=MTNzcWp5a2F4d3dmZg==",
    },
  ],
  "printing": [
    {
      id: "blueprinting",
      name: {
        en: "Blue Printing",
        ar: "مکتب بلو طباعە",
        ku: "نووسینگەی بلو پرێنتینگ",
      },
      qrLink: "https://www.instagram.com/blue.printing_office?igsh=MTk4MHU0NHc3eXBxNg==",
    },
  ],
  "online-trading": [
    {
      id: "chyatravel",
      name: {
        en: "Chya Travel",
        ar: "جيا تراڤل",
        ku: "کاری چیا تڕاڤل",
      },
      qrLink: "https://www.instagram.com/chya_travel.iq?igsh=MTFzMDE5ODV5ODN1bQ==",
    },
    {
      id: "kivaluxury",
      name: {
        en: "Chya Luxury",
        ar: "چيا لوكزوري",
        ku: "کاری چیا لوکژوری",
      },
      qrLink: "https://www.instagram.com/kiva.luxuryshop?igsh=emFtbXNpbjBmMnh6",
    },
  ],
};

function getInstagramHandle(url: string): string {
  try {
    const withoutProtocol = url.replace(/(https?:\/\/)?(www\.)?instagram\.com\//i, "");
    const username = withoutProtocol.split("?")[0].replace(/\/$/, "");
    return `instagram.com/${username}`;
  } catch (e) {
    return "instagram.com";
  }
}


const MONEY_EXCHANGE_TIMELINE = [
  {
    id: "chya",
    year: "2021",
    date: {
      en: "June 14, 2021",
      ar: "14 يونيو 2021",
      ku: "14 حوزەیران 2021"
    },
    logo: "/brands/chyaexchnage.png",
    name: {
      en: "Chya Exchange",
      ar: "مكتب چيا",
      ku: "نووسینگەی چیا"
    },
    desc: {
      en: "Chya Exchange For Currency Exchange Is The First Branch Of The Currency Exchange And Financial Services Sector Of Chya Group. Founded On 14/06/2021 In Old Borsa , Erbil City , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash And Bank Accounts , And Sending Money To All Local And International Bank Cards.",
      ar: "مكتب چيا لتبادل العملات ، هو الفرع الأول التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چیا. تأسس في 2021/06/14 في البورصة القديمة ، أربيل ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "نووسینگەی چیا بۆ ئاڵوگۆڕی دراو ، یەکەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2021/06/14 لە بۆرسەی کۆنی شاری هەولێر دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان."
    }
  },
  {
    id: "chyagold",
    year: "2023",
    date: {
      en: "August 28, 2023",
      ar: "28 أغسطس 2023",
      ku: "28 ئاب 2023"
    },
    logo: "/brands/qapat-1.png",
    name: {
      en: "Chya Gold Exchange",
      ar: "مكتب چيا كولد",
      ku: "نووسینگەی چیا گۆڵد"
    },
    desc: {
      en: "Chya Gold Exchange For Currency Exchange Is The Second Branch Of The Currency Exchange And Financial Services Sector Of Chya Group. Founded On 28/08/2023 In Silopi District , Şırnak , Turkey , It Works In Exchanging All Types Of Currencies And Sending Money To All Cities And Bank Accounts Within Turkey.",
      ar: "مكتب چيا كولد لتبادل العملات ، هو الفرع الثاني التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چیا. تأسس في 2023/08/28 في سيلوبي ، شرناق ، تركيا ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع المدن والحسابات البنكية داخل تركيا.",
      ku: "نووسینگەی چیا گۆڵد بۆ ئاڵوگۆڕی دراو ، دووەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2023/08/28 لە سلۆپی ، شرناخ ، تورکیا دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو شارەکان و حساب بانکیەکانی نێو وڵاتی تورکیا."
    }
  },
  {
    id: "hangaw",
    year: "2024",
    date: {
      en: "March 21, 2024",
      ar: "21 مارس 2024",
      ku: "21 ئازار 2024"
    },
    logo: "/brands/hangawexchange.png",
    name: {
      en: "Hangaw Exchange",
      ar: "مكتب هەنگاو",
      ku: "نووسینگەی هەنگاو"
    },
    desc: {
      en: "Hangaw Exchange For Currency Exchange Is The Third Branch Of The Currency Exchange And Financial Services Sector Of Chya Group. Founded On 21/03/2024 On The Two-Way Runaki Street In Erbil City , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash And Bank Accounts , And Sending Money To All Local And International Bank Cards.",
      ar: "مكتب هەنگاو لتبادل العملات ، هو الفرع الثالث التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چیا. تأسس في 2024/03/21 في شارع روناکی ( السايدين ) في مدينة أربيل ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "نووسینگەی هەنگاو بۆ ئاڵوگۆڕی دراو ، سێیەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2024/03/21 لە جووت سایدی ڕووناکی شاری هەولێر دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان."
    }
  },
  {
    id: "lutkaychya",
    year: "2024",
    date: {
      en: "October 20, 2024",
      ar: "20 أكتوبر 2024",
      ku: "20 تشرینی یەکەم 2024"
    },
    logo: "/brands/lutkay chya-1.png",
    name: {
      en: "Lutkay Chya Exchange",
      ar: "مكتب لوتکەی چيا",
      ku: "نووسینگەی لوتکەی چیا"
    },
    desc: {
      en: "Lutkay Chya Exchange For Currency Exchange Is The Fifth Branch Of The Currency Exchange And Financial Services Sector Of Chya Group. Founded On 20/10/2024 In Ankawa Neighborhood In Erbil City , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash And Bank Accounts , And Sending Money To All Local And International Bank Cards.",
      ar: "مكتب لوتکەی چيا لتبادل العملات ، هو الفرع الخامس التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چیا. تأسس في 2024/10/20 في حي عنكاوا بمدينة أربيل ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "نووسینگەی لوتکەی چیا بۆ ئاڵوگۆڕی دراو ، پێنجەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2024/10/20 لە گەڕەکی عەنکاوەی شاری هەولێر دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان."
    }
  },
  {
    id: "khakisarwar",
    year: "2025",
    date: {
      en: "February 16, 2025",
      ar: "16 فبراير 2025",
      ku: "16 شوبات 2025"
    },
    logo: "/brands/khakisarwar.png",
    name: {
      en: "Khaki Sarwar Co.",
      ar: "شركة خاكي سرور",
      ku: "کۆمپانیای خاکی سەروەر"
    },
    desc: {
      en: "Khaki Sarwar Co. For Currency Exchange Is The Fourth Branch Of The Currency Exchange And Financial Services Sector Of Chya Group. Founded On 16/02/2025 On Pirmam Road Inside BM2 Petrol Station In Erbil City , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash And Bank Accounts , And Sending Money To All Local And International Bank Cards.",
      ar: "شركة خاكي سرور لتبادل العملات ، هو الفرع الرابع التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چیا. تأسست في 2025/02/16 على طريق بيرمام داخل محطة وقود BM2 في مدينة أربيل ، وتعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "کۆمپانیای خاکی سەروەر بۆ ئاڵوگۆڕی دراو ، چوارەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2025/02/16 لە ڕێگای پیرمام نێو بەنزینخانەی بی ئێم ٢ لە شاری هەولێر دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان."
    }
  },
  {
    id: "barzychya",
    year: "2025",
    date: {
      en: "March 6, 2025",
      ar: "6 مارس 2025",
      ku: "6 ئازار 2025"
    },
    logo: "/brands/BARZY CHYAY-1.png",
    name: {
      en: "Barzy Chya Exchange",
      ar: "مكتب بـەرزی چيا",
      ku: "نووسینگەی بەرزی چیا"
    },
    desc: {
      en: "Barzy Chya Exchange For Currency Exchange Is The Sixth Branch Of The Currency Exchange And Financial Services Sector Of Chya Group. Founded On 06/03/2025 In Soran In The City Center Opposite The Langa Bazar , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash And Bank Accounts , And Sending Money To All Local And International Bank Cards.",
      ar: "مكتب بـەرزی چيا لتبادل العملات ، هو الفرع السادس التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چیا. تأسس في 2025/03/06 في سوران في مركز المدينة مقابل بازار اللنگة ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "نووسینگەی بەرزی چیا بۆ ئاڵوگۆڕی دراو ، شەشەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2025/03/06 لە سۆران لە سەنتەری شار بەرامبەر بازاڕی لەنگە دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان."
    }
  },
  {
    id: "manfazdibaga",
    year: "2025",
    date: {
      en: "August 1, 2025",
      ar: "1 أغسطس 2025",
      ku: "1 ئاب 2025"
    },
    logo: "/brands/Manfaz Dibaga-1.png",
    name: {
      en: "Manfaz Dibaga",
      ar: "منفذ ديبكة ی هەنگاو",
      ku: "منفذ ديبكة ى هەنگاو"
    },
    desc: {
      en: "Manfaz Dibaga For Salary Disbursement Is Affiliated With Hangaw Exchange In The Currency Exchange And Financial Services Sector Of Chya Group. Founded On 01/08/2025 On The Two-Way Runaki Street Inside Hangaw Exchange , Its Work Consists Of Disbursing Military , Civil , And Retirement Salaries , And Executing Services ( Qi Card , Super Qi , Master Card ) And Sending And Withdrawing Money In It.",
      ar: "منفذ ديبكة ی هەنگاو لصرف الرواتب ، التابع لمكتب هانكاو في قطاع تبادل العملات والخدمات المالية في مجموعة چیا. تأسس في 2025/08/01 في شارع رونامي داخل مكتب هانكاو ، وتتكون أعماله من صرف الرواتب العسكرية والمدنية والتقاعد وتنفيذ خدمات ( كي كارد ، سوبر كي ، ماستر كارد ) وإرسال وسحب الأموال فيها.",
      ku: "منفذ دیبكة ی هەنگاو بۆ صرفی رواتب سەر بە نووسینگەی هەنگاو لە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2025/08/01 لە جووت سایدی ڕووناکی لە نێو نووسینگەی هەنگاو دامەزراوە و کارەکانی پێک دێت لە صرفی رواتب عسکری و مدنی و تقاعد و جێبەجێکردنی سێرڤسی ( کی کارد ، سوپەر کی ، ماستەر کارد ) و ناردن و ڕاکێشانی پارە تیایدا."
    }
  }
];

const GENERAL_TRADING_TIMELINE = [
  {
    id: "lamatalmarjan",
    year: "2019",
    date: {
      en: "November 30, 2019",
      ar: "30 نوفمبر 2019",
      ku: "30 تشرینی دووەم 2019"
    },
    logo: "/brands/lamattt.png",
    name: {
      en: "Lamat Al Marjan Co.",
      ar: "شركة لمعة المرجان",
      ku: "کۆمپانیای لمعة المرجان"
    },
    desc: {
      en: "Lamat Al Marjan Co. For General Trading Is The First Company Of The General Trading Sector Of Chya Group , Founded On 30/11/2019 It Specializes In Construction Materials Such As ( Wood , MDF , Furniture , Steel , Fugue , Cement , And Concrete ).",
      ar: "شركة لمعة المرجان للتجارة العامة ، هي الشركة الأولى التابعة لقطاع التجارة العامة في مجموعة چيا ، تأسست في 2019/11/30 وهي متخصصة في مواد البناء مثل ( الخشب ، MDF ، الأثاث ، الحديد ، الفوكة ، الإسمنت ، والخرسانة ).",
      ku: "کۆمپانیای لمعة المرجان بۆ بازرگانی گشتی ، یەکەم کۆمپانیای سەر بە سێکتەری بازرگانی گشتی چیا گروپە و لە 2019/11/30 دامەزراوە ، تایبەتمەندە لە کەرەستەی بیناسازی وەک ( دار ، ئێم دی ئێف ، مۆبیلیات ، ئاسن ، فووگە ، چیمەنتۆ و کۆنکرێت )."
    }
  },
  {
    id: "chyaymateen",
    year: "2026",
    date: {
      en: "March 1, 2026",
      ar: "1 مارس 2026",
      ku: "1 ئازار 2026"
    },
    logo: "/brands/chyaymat.png",
    name: {
      en: "Chyay Mateen Co.",
      ar: "شركة چياي متين",
      ku: "کۆمپانیای چیای مەتین"
    },
    desc: {
      en: "Chyay Mateen Co. For General Trading Is The Second Company In The General Trading Sector Of Chya Group , Founded On 01/03/2026 It Specializes In ( Electronic Devices , Household Items , Clothing , And Second-Hand Goods ).",
      ar: "شركة چياي متين للتجارة العامة ، هي الشركة الثانية في قطاع التجارة العامة بمجموعة چيا. تأسست في 2026/03/01 ، وهي متخصصة في ( الأجهزة الإلكترونية ، الأدوات المنزلية ، الملابس ، والسلع المستعملة ).",
      ku: "کۆمپانیای چیای مەتین بۆ بازرگانی گشتی ، دووەم کۆمپانیای سێکتەری بازرگانی گشتی چیا گروپە و لە 2026/03/01 دامەزراوە ، تایبەتمەندە لە ( ئامێرە ئەلیکترۆنییەکان ، کەلوپەلی ناوماڵ ، پۆشاک و کەلوپەلی بەکارهاتوو )."
    }
  },
  {
    id: "chyaamazon",
    year: "2026",
    date: {
      en: "March 1, 2026",
      ar: "1 مارس 2026",
      ku: "1 ئازار 2026"
    },
    logo: "/brands/Chya Amazon-1.png",
    name: {
      en: "Chya Amazon",
      ar: "مشروع چيا أمازون",
      ku: "مشروع چیا ئەمازۆن"
    },
    desc: {
      en: "Chya Amazon Was Launched On Rawanduz Road In Soran. Founded On 01/03/2026 , It Conducts Retail And Wholesale Of Second-Hand Goods According To The Legitimate System.",
      ar: "تم إطلاق مشروع چيا أمازون على طريق رواندز في سوران. تأسس في 2026/03/01 ، ويعمل في بيع وشراء السلع المستعملة بالتجزئة والجملة وفق النظام الشرعي.",
      ku: "مشروع چیا ئەمازۆن لەسەر ڕێگای ڕواندز لە سۆران کرایەوە. لە 2026/03/01 دامەزراوە , کار دەکات بۆ کڕین و فرۆشتنی کەلوپەلی بەکارهاتوو بە شێوەی تاک و کۆ بە شێوازێکی شەرعی."
    }
  }
];

const MOBILE_TECH_TIMELINE = [
  {
    id: "chyatech",
    year: "2025",
    date: {
      en: "August 11, 2025",
      ar: "11 أغسطس 2025",
      ku: "11 ئاب 2025"
    },
    logo: "/brands/chyatech.png",
    name: {
      en: "Chya Tech",
      ar: "چيا تيك",
      ku: "کاری چیا تێك"
    },
    desc: {
      en: "Chya Tech For Systems And Computers Belongs To The Online Trading Sector Of Chya Group , Founded On 11/08/2025 Its Work Consists Of Installing Accounting , Statistical , Archiving , And Personnel Systems , And Selling All Electronic Devices.",
      ar: "چيا تيك للأنظمة والكمبيوتر ، تابعة لقطاع التكنولوجيا التابع لمجموعة چيا. تأسست في 2025/08/11 ، وتتكون أعمالها من تنصيب الأنظمة الحسابية والإحصائية والأرشفة والموظفين وبيع الأجهزة الإلكترونية.",
      ku: "کاری چیا تێك بۆ دانانی سیستەم و کۆمپیتەر سەر بە سێکتەری مۆبایل و تەکنەلۆژیای چیا گروپە و لە 2025/08/11 دامەزراوە و کارەکانی پێک دێت لە دانانی سیستەمی ژمێریاری و ئامار و ئەرشیف و کارمەند و فرۆشتنی هەموو ئامێرە ئەلیکتڕۆنیەکان."
    }
  },
  {
    id: "chyaphone",
    year: "2026",
    date: {
      en: "March 24, 2026",
      ar: "24 مارس 2026",
      ku: "24 ئازار 2026"
    },
    logo: "/brands/chya phone-1.png",
    name: {
      en: "Chya Phone",
      ar: "محل چيا فون",
      ku: "پێشانگای چیا فۆن"
    },
    desc: {
      en: "Chya Phone For Cellphones And Accessories. Founded On 24/03/2026 In Soran City Center , Its Work Consists Of Sales , Maintenance , And Software For All Types Of Cellphones.",
      ar: "محل چيا فون لبيع الأجهزة المحمولة وإكسسواراتها. تأسس في 2026/03/24 في وسط مدينة سوران ، وتتكون أعماله من بيع وصيانة وبرمجة جميع أنواع الأجهزة المحمولة.",
      ku: "پێشانگای چیا فۆن بۆ کڕین و فرۆشتنی مۆبایل و ئێکسسوارات لە سەنتەری شاری سۆران لە 2026/03/24 دامەزراوە و کار دەکات لە بواری کڕین و فرۆشتن و چاککردنەوە و سیستم بۆ هەموو جۆرە مۆبایلەکان."
    }
  }
];

const PRINTING_TIMELINE = [
  {
    id: "blueprinting",
    year: "2025",
    date: {
      en: "October 19, 2025",
      ar: "19 أكتوبر 2025",
      ku: "19 تشرینی یەکەم 2025"
    },
    logo: "/brands/BLUE PRINT-1.png",
    name: {
      en: "Blue Printing",
      ar: "مكتب بلو طباعة",
      ku: "نووسینگەی بلو پرێنتینگ"
    },
    desc: {
      en: "Blue Printing For Professional Services , Founded On 19/10/2025 Its Work Consists Of Photocopying , Printing , Document Scanning , Booking Appointments For Official Government Departments , Visa Appointments , And Fee Payments.",
      ar: "مكتب بلو طباعة للخدمات المهنية. تأسس في 2025/10/19 ، وتتكون أعماله من استنساخ وتصوير المستندات والطباعة وحجز المواعيد للدوائر الرسمية وحجز الفيزا ودفع الرسوم.",
      ku: "نووسینگەی بلو پرێنتینگ بۆ سێرڤسی پیشەیی لە 2025/10/19 دامەزراوە و کارەکانی پێک دێت لە فۆتۆکۆپی و تەسویر و چاپ و حجزکردنی موعدی فەرمانگە فەرمیەکان و موعدی ڤیزە و دانانی ڕسوماتەکان."
    }
  }
];

const ONLINE_TRADING_TIMELINE = [
  {
    id: "chyatravel",
    year: "2020",
    date: {
      en: "January 22, 2020",
      ar: "22 يناير 2020",
      ku: "22 کانوونی دووەم 2020"
    },
    logo: "/brands/CHYA travel-1.png",
    name: {
      en: "Chya Travel",
      ar: "چيا تراڤل",
      ku: "کاری چیا تڕاڤل"
    },
    desc: {
      en: "Chya Travel For Tickets And Visas Belongs To The Online Trading Sector Of Chya Group Founded On 22/01/2020 Its Work Consists Of Tourist Ticket And Visa , Booking Hotels , Rent Cars , Tourist Places , Patient Guidance , And Language Translation.",
      ar: "چيا تراڤل لحجز تذاكر الطيران والفيزا ، تابع لقطاع السفر والتجارة الإلكترونية في مجموعة چيا تأسس في 2020/01/22 وتتكون أعماله من حجز تذكرة الطيران والفيزا والفنادق وتأجير السيارات وتوجيه المرضى والترجمة.",
      ku: "کاری چیا تڕاڤل بۆ تکت و ڤیزە سەر بە سێکتەری بازرگانی ئۆنڵاینی چیا گروپە و لە 2020/01/22 دامەزراوە و کارەکانی پێک دێت لە بڕینی تکتی گەشتیاری و ڤیزە و حجزی ئوتێل و ئوتومبیل و شوێنە گەشتیاریەکان و ڕێنماییکردنی نەخۆش و وەرگێڕانی زمان."
    }
  },
  {
    id: "chyaluxury",
    year: "2022",
    date: {
      en: "January 20, 2022",
      ar: "20 يناير 2022",
      ku: "20 کانوونی دووەم 2022"
    },
    logo: "/brands/kivaluxary.png",
    name: {
      en: "Chya Luxury",
      ar: "چيا لوكزوري",
      ku: "کاری چیا لوکژوری"
    },
    desc: {
      en: "Chya Luxury For Jewelry And Accessories Belongs To The Online Trading Sector Of Chya Group , Founded On 20/01/2022 Its Work Consists Of Trading Jewelry , Accessories , Watches , And Perfumes From Global Brands.",
      ar: "چيا لوكزوري للمجوهرات والإكسسوارات ، تابع لقطاع التجارة الإلكترونية لمجموعة چيا. تأسست في 2022/01/20 ، وتتكون أعمالها من تجارة المجوهرات والإكسسوارات والساعات والعطور من الماركات العالمية.",
      ku: "کاری چیا لوکژوری : چیا لوکژوری بۆ گەوهەر و ئێکسسوارات سەر بە سێکتەری بازرگانی ئۆنڵاینی چیا گروپە و لە 2022/01/20 دامەزراوە و کارەکانی پێک دێت لە بازرگانی گەوهەر و ئێکسسوارات و کاتژمێر و بۆن ی بڕاندی جیهانی."
    }
  }
];

const renderFormattedText = (text: string) => {
  if (!text) return "";
  const parts = text.split(/(\([^)]+\))/g);
  return parts.map((part, idx) => {
    if (part.startsWith('(') && part.endsWith(')')) {
      // Only prevent wrapping for short parenthesized texts (like brand/company names)
      // to avoid breaking mobile responsiveness for long lists of items
      if (part.length < 30) {
        return (
          <span key={idx} className="whitespace-nowrap">
            {part}
          </span>
        );
      }
    }
    return part;
  });
};

export default function SectorDetails({ id }: { id: string }) {
  const { locale, isRTL } = useLanguage();
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({
    websites: true,
    emails: false,
    instagram: false,
  });
  const t = translations[locale];
  const st = sectorTranslations[locale];

  const activeSection = useScrollSpy(['history', 'president', 'vision', 'branches', 'links'], 200);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const featureItem = t.features.items.find((item) => item.id === id);

  if (!featureItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <h1 className="text-2xl text-[#0c1a2e] font-bold">{st.ui.sectorNotFound}</h1>
      </div>
    );
  }

  const bgImage = SECTOR_IMAGES[id] || SECTOR_IMAGES["general-trading"];
  const currentEmails = SECTOR_EMAILS[id] || ["chyagroup2019@gmail.com"];
  const currentBrandsInstagrams = SECTOR_BRANDS[id] || [];
  const currentHistory = st.history[id as keyof typeof st.history] || [featureItem.contentBody];
  const currentBranches = st.branches[id as keyof typeof st.branches] || [];

  const getTimelineData = () => {
    switch (id) {
      case "money-exchange":
        return MONEY_EXCHANGE_TIMELINE;
      case "general-trading":
        return GENERAL_TRADING_TIMELINE;
      case "mobile-tech":
        return MOBILE_TECH_TIMELINE;
      case "printing":
        return PRINTING_TIMELINE;
      case "online-trading":
        return ONLINE_TRADING_TIMELINE;
      default:
        return [];
    }
  };

  const timelineData = getTimelineData();

  const currentSectorData = (st as any).sectorData?.[id];
  const currentPresidentQuote = currentSectorData?.presidentQuote || st.ui.presidentQuote;
  const currentVision = currentSectorData?.visionStatement || st.ui.visionStatement;
  const currentMission = currentSectorData?.missionStatement || st.ui.missionStatement;

  const sidebarLinks = [
    { id: 'history', label: st.ui.history },
    { id: 'president', label: st.ui.president },
    { id: 'vision', label: st.ui.visionMission },
    { id: 'branches', label: st.ui.branches },
    { id: 'links', label: st.ui.links },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div className="absolute inset-0 z-10 bg-[#0c1a2e]/60" />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {featureItem.tag}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24">
        <div className="mb-8">
          <Link
            href="/ourcompany"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold text-[#3a4f6a] hover:text-[#b91c1c] transition-colors",
              isRTL ? "flex-row-reverse" : ""
            )}
          >
            <Iconify icon={isRTL ? "solar:arrow-right-linear" : "solar:arrow-left-linear"} width={18} />
            {st.ui.back}
          </Link>
        </div>

        <div className={cn("flex flex-col lg:flex-row gap-10 lg:gap-20", isRTL ? "lg:flex-row-reverse" : "")}>

          {/* Sticky Sidebar Navigation - Hidden on Mobile/Tablet */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-32 bg-[#f4f7fa] rounded-[2rem] p-8 border border-[#0c1a2e]/5 shadow-[0_20px_50px_rgba(12,26,46,0.04)] transition-all duration-500">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#b91c1c] font-bold mb-8">
                {featureItem.tag}
              </h3>
              <nav className="flex flex-col gap-4">
                {sidebarLinks.map((link, index) => (
                  <React.Fragment key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className={cn(
                        "flex items-center gap-3 text-sm transition-all duration-300",
                        activeSection === link.id
                          ? "text-[#0c1a2e] font-bold"
                          : "text-[#3a4f6a] hover:text-[#0c1a2e]",
                        activeSection === link.id && (isRTL ? "-translate-x-2" : "translate-x-2")
                      )}
                    >
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors",
                        activeSection === link.id ? "bg-[#b91c1c] shadow-[0_0_10px_rgba(185,28,28,0.5)]" : "bg-transparent"
                      )} />
                      {link.label}
                    </a>
                    {index < sidebarLinks.length - 1 && (
                      <div className="h-px w-full bg-[#0c1a2e]/5" />
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className={cn("flex-1 min-w-0 flex flex-col gap-16 md:gap-24 text-[#0c1a2e] pt-4", isRTL ? "text-right" : "text-left")}>

            {/* History Section */}
            <section id="history" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:document-text-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className={cn("text-3xl font-bold", isRTL ? "font-extrabold" : "font-bold")}>
                  {st.ui.history}
                </h2>
              </div>

              {timelineData.length > 0 ? (
                <div className="space-y-12">
                  {/* Intro paragraphs */}
                  <div className="flex flex-col justify-center space-y-4">
                    {currentHistory.map((para, idx) => (
                      <p
                        key={idx}
                        className={cn(
                          "text-[16px] text-[#3a4f6a]",
                          isRTL ? "font-semibold leading-[1.8] text-[17px] text-right md:text-justify" : "leading-relaxed text-left"
                        )}
                      >
                        {renderFormattedText(para)}
                      </p>
                    ))}
                  </div>

                  {/* Company Journey Milestones Timeline */}
                  <div className="pt-6">
                    <h3 className={cn("text-xl font-bold text-[#0c1a2e] mb-10 border-b border-[#0c1a2e]/5 pb-4", isRTL ? "font-extrabold" : "font-bold")}>
                      {id === "general-trading"
                        ? (locale === "ku" ? "تۆڕی کۆمپانیاکانمان و قۆناغی گەشەکردنمان" : locale === "ar" ? "شبكة شركاتنا والنمو الزمني" : "Our Companies Network & Growth Timeline")
                        : (locale === "ku" ? "تۆڕی نووسینگەکانمان و قۆناغی گەشەکردنمان" : locale === "ar" ? "شبكة أعمالنا والنمو الزمني" : "Our Business Network & Growth Timeline")}
                    </h3>

                    <div className={cn(
                      "relative space-y-10 mt-4",
                      isRTL
                        ? "border-r-[2px] pr-4 md:pr-10 mr-2 md:mr-6"
                        : "border-l-[2px] pl-4 md:pl-10 ml-2 md:ml-6",
                      "border-[#0c1a2e]/10"
                    )}>
                      {timelineData.map((item, index) => {
                        const nameText = (item.name as any)[locale] || item.name.en;
                        const descText = (item.desc as any)[locale] || item.desc.en;
                        const dateText = (item.date as any)[locale] || item.date.en;

                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="relative flex flex-col md:flex-row gap-6 items-start md:items-center bg-white rounded-3xl p-5 md:p-8 border border-[#0c1a2e]/5 shadow-[0_5px_20px_rgba(12,26,46,0.02)] hover:shadow-[0_15px_40px_rgba(12,26,46,0.06)] hover:-translate-y-1 transition-all duration-300 group"
                          >
                            {/* Dot indicator on the vertical line */}
                            <div className={cn(
                              "absolute top-8 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-white border-[4px] border-[#b91c1c] shadow-[0_0_10px_rgba(185,28,28,0.3)] z-10 transition-transform duration-300 group-hover:scale-125",
                              isRTL ? "right-[-25px] md:right-[-49px]" : "left-[-25px] md:left-[-49px]"
                            )} />

                            {/* Left part: Year & Date */}
                            <div className={cn("flex flex-col shrink-0 min-w-[120px]", isRTL ? "text-right" : "text-left")}>
                              <span className="text-3xl font-black text-[#b91c1c] tracking-tight leading-none mb-1">
                                {item.year}
                              </span>
                              <span className="text-xs font-semibold text-gray-400 tracking-wide">
                                {dateText}
                              </span>
                            </div>

                            {/* Right part: Description and Name */}
                            <div className={cn("flex-1 min-w-0", isRTL ? "text-right" : "text-left")}>
                              <h4 className={cn("text-lg font-bold text-[#0c1a2e] mb-2 tracking-tight", isRTL ? "text-[19px] font-extrabold" : "")}>
                                {nameText}
                              </h4>
                              <p className={cn(
                                "text-[#3a4f6a]",
                                isRTL
                                  ? "text-[16px] font-semibold leading-[1.8] text-right md:text-justify"
                                  : "text-[14px] leading-relaxed text-left"
                              )}>
                                {renderFormattedText(descText)}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {currentHistory.map((para, idx) => (
                    <p
                      key={idx}
                      className={cn(
                        "text-[16px] text-[#3a4f6a]",
                        isRTL ? "font-semibold leading-[1.8] text-[17px] text-right md:text-justify" : "leading-relaxed text-left"
                      )}
                    >
                      {renderFormattedText(para)}
                    </p>
                  ))}
                </div>
              )}
            </section>

            {/* President's Message */}
            <section id="president" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:letter-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className={cn("text-3xl font-bold", isRTL ? "font-extrabold" : "font-bold")}>
                  {st.ui.president}
                </h2>
              </div>
              <p className={cn(
                "text-[16px] text-[#3a4f6a]",
                isRTL ? "font-semibold leading-[1.8] text-[17px]" : "leading-relaxed"
              )}>
                {currentPresidentQuote}
              </p>
            </section>

            {/* Vision & Mission */}
            <section id="vision" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:target-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className={cn("text-3xl font-bold", isRTL ? "font-extrabold" : "font-bold")}>
                  {st.ui.visionMission}
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className={cn("text-lg font-bold text-[#0c1a2e] mb-2", isRTL ? "font-extrabold" : "font-bold")}>
                    {st.ui.vision}
                  </h4>
                  <p className={cn(
                    "text-[16px] text-[#3a4f6a]",
                    isRTL ? "font-semibold leading-[1.8] text-[17px]" : "leading-relaxed"
                  )}>
                    {currentVision}
                  </p>
                </div>
                <div>
                  <h4 className={cn("text-lg font-bold text-[#0c1a2e] mb-2", isRTL ? "font-extrabold" : "font-bold")}>
                    {st.ui.mission}
                  </h4>
                  <p className={cn(
                    "text-[16px] text-[#3a4f6a]",
                    isRTL ? "font-semibold leading-[1.8] text-[17px]" : "leading-relaxed"
                  )}>
                    {currentMission}
                  </p>
                </div>
              </div>
            </section>

            {/* Branches & Locations */}
            <section id="branches" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:map-point-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className="text-3xl font-bold">{st.ui.branches}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentBranches.map((branch: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-[#0c1a2e]/5 shadow-sm group hover:border-[#b91c1c]/20 transition-colors">
                    <h5 className={cn("text-[#0c1a2e] mb-3 flex items-center gap-2", isRTL ? "font-extrabold text-lg" : "font-bold")}>
                      <Iconify icon={branch.icon || (branch.city.includes("Turkey") ? "solar:earth-bold-duotone" : "solar:map-bold-duotone")} className="text-[#b91c1c]" />
                      {branch.city}
                    </h5>
                    <p className={cn("text-sm text-[#3a4f6a] leading-relaxed", isRTL ? "font-medium text-[15px]" : "")}>
                      {(() => {
                        const match = branch.address.match(/^(.*?)\s*(\(.*\))\s*$/);
                        if (match) {
                          return (
                            <>
                              {match[1]} <span className="whitespace-nowrap">{match[2]}</span>
                            </>
                          );
                        }
                        return branch.address;
                      })()}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Links */}
            <section id="links" className="scroll-mt-32 mb-24">
              <div className="flex items-center gap-3 mb-8">
                <Iconify icon="solar:link-bold-duotone" width={32} className="text-[#b91c1c]" />
                <h2 className="text-3xl font-bold">{st.ui.links}</h2>
              </div>

              {(() => {
                const linkCategories = [
                  {
                    id: "websites",
                    title: locale === "en" ? "Website Links" : locale === "ar" ? "روابط المواقع الإلكترونية" : "لینکەکانی ماڵپەڕ",
                    icon: "solar:global-bold-duotone",
                    colorClass: "text-[#b91c1c] bg-[#b91c1c]/5 border-[#b91c1c]/10",
                    items: currentBrandsInstagrams.map((brand) => ({
                      title: brand.name[locale as "en" | "ar" | "ku"] || brand.name["en"],
                      value: `chyagroup.com/${brand.id}`,
                      href: `/${brand.id}`,
                      icon: "solar:global-linear",
                      actionLabel: locale === "en" ? "Visit" : locale === "ar" ? "زيارة" : "سەردانکردن",
                      isInternal: true,
                      isExternal: false,
                    })),
                  },
                  {
                    id: "emails",
                    title: locale === "en" ? "Email Addresses" : locale === "ar" ? "عناوين البريد الإلكتروني" : "ناونیشانەکانی ئیمەیڵ",
                    icon: "solar:letter-bold-duotone",
                    colorClass: "text-[#b91c1c] bg-[#b91c1c]/5 border-[#b91c1c]/10",
                    items: currentEmails.map((email) => ({
                      title: locale === "en" ? "Email Address" : locale === "ar" ? "البريد الإلكتروني" : "ئیمەیڵ",
                      value: email,
                      href: `mailto:${email}`,
                      icon: "solar:letter-linear",
                      actionLabel: locale === "en" ? "Send" : locale === "ar" ? "إرسال" : "ناردن",
                      isInternal: false,
                      isExternal: false,
                    })),
                  },
                  {
                    id: "instagram",
                    title: locale === "en" ? "Instagram" : locale === "ar" ? "إنستغرام" : "ئینستاگرام",
                    icon: "mdi:instagram",
                    colorClass: "text-[#b91c1c] bg-[#b91c1c]/5 border-[#b91c1c]/10",
                    items: currentBrandsInstagrams.map((brand) => ({
                      title: brand.name[locale as "en" | "ar" | "ku"] || brand.name["en"],
                      value: getInstagramHandle(brand.qrLink),
                      href: brand.qrLink,
                      icon: "mdi:instagram",
                      actionLabel: locale === "en" ? "Open" : locale === "ar" ? "فتح" : "کردنەوە",
                      isInternal: false,
                      isExternal: true,
                    })),
                  },
                ].filter((category) => category.items.length > 0);

                return (
                  <div className="flex flex-col gap-10">
                    {linkCategories.map((category) => {
                      const isExpanded = expandedCategories[category.id];
                      return (
                        <div key={category.id} className="flex flex-col gap-4">
                          {/* Category Header Accordion Toggle Button */}
                          <button
                            onClick={() => setExpandedCategories(prev => ({ ...prev, [category.id]: !prev[category.id] }))}
                            className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#faf9f6]/60 border border-[#0c1a2e]/5 hover:bg-[#faf9f6] hover:border-[#b91c1c]/10 transition-all duration-300 text-left rtl:text-right group"
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border bg-white", category.colorClass)}>
                                <Iconify icon={category.icon} width={22} />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-[#0c1a2e]">{category.title}</span>
                                <span className="bg-white border border-[#0c1a2e]/5 text-[#3a4f6a] px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm">
                                  {category.items.length}
                                </span>
                              </div>
                            </div>

                            <div className="w-8 h-8 rounded-lg bg-white border border-[#0c1a2e]/5 text-[#3a4f6a] group-hover:text-[#b91c1c] flex items-center justify-center transition-all duration-300 shadow-sm">
                              <Iconify
                                icon="solar:alt-arrow-down-linear"
                                width={18}
                                className={cn("transition-transform duration-300", isExpanded ? "rotate-180" : "")}
                              />
                            </div>
                          </button>

                          {/* List of Link Cards (Rows) when Expanded */}
                          {isExpanded && (
                            <div className="flex flex-col gap-3 pl-3 rtl:pl-0 rtl:pr-3 border-l-2 rtl:border-l-0 rtl:border-r-2 border-dashed border-[#b91c1c]/15">
                              {category.items.map((item, idx) => {
                                const LinkComponent = item.isInternal ? Link : "a";
                                const linkProps = item.isInternal
                                  ? { href: item.href }
                                  : { href: item.href, target: item.isExternal ? "_blank" : undefined, rel: item.isExternal ? "noopener noreferrer" : undefined };

                                return (
                                  <LinkComponent
                                    key={idx}
                                    {...(linkProps as any)}
                                    className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white text-[#0c1a2e] border border-[#0c1a2e]/5 hover:border-[#b91c1c]/20 p-5 rounded-2xl group transition-all duration-300 hover:shadow-md w-full min-w-0"
                                  >
                                    <div className="flex items-center gap-4 min-w-0 flex-1 mr-4 rtl:mr-0 rtl:ml-4 w-full">
                                      <div className="w-12 h-12 rounded-xl bg-[#faf9f6] flex items-center justify-center flex-shrink-0 text-[#b91c1c] border border-[#0c1a2e]/[0.02]">
                                        <Iconify icon={item.icon} width={22} />
                                      </div>
                                      <div className="flex flex-col items-start min-w-0 flex-1 w-full">
                                        <span className="text-[11px] font-bold text-[#b91c1c] uppercase tracking-wider mb-0.5">{item.title}</span>
                                        <span className="font-semibold text-sm text-[#3a4f6a] break-all leading-normal">{item.value}</span>
                                      </div>
                                    </div>

                                    <div className="w-10 h-10 rounded-xl bg-[#faf9f6] border border-[#0c1a2e]/5 text-[#b91c1c] group-hover:bg-[#b91c1c] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm self-end sm:self-auto">
                                      <Iconify
                                        icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"}
                                        width={18}
                                        className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                                      />
                                    </div>
                                  </LinkComponent>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}

