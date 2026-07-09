export interface BrandData {
  id: string;
  sectorId: string;
  logo: string;
  logoScale: number;
  qrLink: string;
  email: string;
  phone: string;
  heroImage: string;
  name: { en: string; ar: string; ku: string };
  tagline: { en: string; ar: string; ku: string };
  description: { en: string; ar: string; ku: string };
  services: {
    en: string[];
    ar: string[];
    ku: string[];
  };
  branches: {
    city: { en: string; ar: string; ku: string };
    address: { en: string; ar: string; ku: string };
  }[];
}

export const BRAND_DATA: Record<string, BrandData> = {
  lamatalmarjan: {
    id: "lamatalmarjan",
    sectorId: "general-trading",
    logo: "/brands/lamattt.png",
    logoScale: 1.45,
    qrLink: "https://www.instagram.com/lamat.almarjan_co?igsh=d2txbnp1cXRuNjhn",
    email: "lamatalmarjan2019@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Lamat Al Marjan",
      ar: "شركة لمعة المرجان",
      ku: "کۆمپانیای لمعة المرجان",
    },
    tagline: {
      en: "General Trading & Construction Materials Supply",
      ar: "التجارة العامة وتوريد المواد الإنشائية",
      ku: "بازرگانی گشتی و دابینکردنی کەرستەی بیناسازی",
    },
    description: {
      en: "Lamat Al Marjan Co. For General Trading Is The First Company Of The General Trading Sector Of Chya Group , Founded On 30/11/2019 On Bakhtyare Street In Erbil City , It Specializes In Construction Materials Such As ( Wood , MDF , Furniture , Steel , Cement & Concrete ) , And Supplies High-Quality Building Materials To Major Infrastructure Projects Across The Region.",
      ar: "شركة لمعة المرجان للتجارة العامة ، هي الشركة الأولى في قطاع التجارة العامة لمجموعة چيا ، تأسست في 30/11/2019 في شارع بختياري في مدينة أربيل ، تتخصص في مواد البناء مثل ( الأخشاب , MDF , الأثاث , الحديد , الإسمنت & الخرسانة ) , وتوفر مواد بناء عالية الجودة لمشاريع البنية التحتية الكبرى في المنطقة.",
      ku: "کۆمپانیای لمعة المرجان بۆ بازرگانی گشتی ، یەکەم کۆمپانیای سێکتەری بازرگانی گشتی چیا گروپە ، لە 30/11/2019 لە شەقامی بەختیاری لە شاری هەولێر دامەزراوە ، پسپۆڕە لە کەرستەی بیناسازی وەک ( دار , MDF , مۆبیلیات , ئاسن , چیمەنتۆ & کۆنکرێت ) , و کەرستەی بیناسازی کوالێتی بەرز بۆ پڕۆژە گەورەکانی ناوچەکە دابین دەکات.",
    },
    services: {
      en: ["High-Quality Wood & MDF Supply", "Steel & Structural Metals", "Cement & Readymix Concrete", "Premium Office & Home Furniture", "Bulk Supply Logistics"],
      ar: ["توريد الأخشاب والـ MDF عالية الجودة", "الحديد والمعادن الهيكلية", "الإسمنت والخرسانة الجاهزة", "الأثاث المكتبي والمنزلي الفاخر", "خدمات اللوجستيات والتوريد بالجملة"],
      ku: ["دابینکردنی داری کوالێتی بەرز و MDF", "ئاسن و کانزا بیناسازییەکان", "چیمەنتۆ و کۆنکرێتی ئامادەکراو", "مۆبیلیاتی نایابی نووسینگە و ماڵان", "لۆجیستیک و دابینکردنی بەکۆم"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "Bakhtyare Street , Erbil",
          ar: "شارع بختياري ، أربيل",
          ku: "شەقامی بەختیاری ، هەولێر",
        },
      },
    ],
  },
  chyaymateen: {
    id: "chyaymateen",
    sectorId: "general-trading",
    logo: "/brands/chyaymat.png",
    logoScale: 1.4,
    qrLink: "https://www.instagram.com/chyay_mateen.co?igsh=NWljZDg1ZnR6NWJm",
    email: "chyaymateen2026@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "https://imgs.search.brave.com/xXSktWJYf-PEY2MRnql4AXm1QeMX7aXAFywJIp8KdmU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi94bWFz/LWVsZWN0cm9uaWNz/LXN0b3JlLXZpbG5p/dXMtbGl0aHVhbmlh/LWRlY2VtYmVyLWVs/ZWt0cm9tYXJrdC1j/b25zdW1lci1wYW5v/cmFtYS1oeXBlci1t/YXJrZXQtbGFyZ2Vz/dC1zZWxsZXItNDgz/MDYzMTguanBn",
    name: {
      en: "Chyay Mateen",
      ar: "شركة جياى متين",
      ku: "کۆمپانیای چیای مەتین",
    },
    tagline: {
      en: "General Trading & Wholesale Consumer Goods",
      ar: "التجارة العامة وتجارة البضائع الاستهلاكية بالجملة",
      ku: "بازرگانی گشتی و کۆفرۆشی کاڵا و پێداویستییەکان",
    },
    description: {
      en: "Chyay Mateen Co. For General Trading Is The Second Company Of The General Trading Sector Of Chya Group , Founded On 01/03/2026 On Rawanduz Road In Soran City , It Specializes In Wholesale Distribution Of Consumer Electronics , Premium Household Goods , Apparel & High-Quality Second-Hand Goods Across Local Markets.",
      ar: "شركة جياى متين للتجارة العامة ، هي الشركة الثانية في قطاع التجارة العامة لمجموعة چيا ، تأسست في 01/03/2026 على طريق رواندز في مدينة سوران ، تتخصص في التوزيع بالجملة للإلكترونيات الاستهلاكية , البضائع المنزلية الممتازة , الملابس & البضائع المستعملة عالية الجودة في الأسواق المحلية.",
      ku: "کۆمپانیای چیای مەتین بۆ بازرگانی گشتی ، دووەم کۆمپانیای سێکتەری بازرگانی گشتی چیا گروپە ، لە 01/03/2026 لە ڕێگای ڕواندز لە شاری سۆران دامەزراوە ، پسپۆڕە لە دابەشکردنی کۆفرۆشی ئامێرە ئەلیکترۆنییەکان , کەلوپەلی ناوماڵی نایاب , جلوبەرگ & کاڵای بەکارهاتووی کوالێتی بەرز لە بازاڕەکانی ناوخۆ.",
    },
    services: {
      en: ["Consumer Electronics Wholesale", "Premium Household Items Supply", "Apparel & Textiles Distribution", "High-Quality Second-hand Goods", "Regional Distribution Network"],
      ar: ["جملة الأجهزة الإلكترونية الاستهلاكية", "توريد الأدوات المنزلية الممتازة", "توزيع الملابس والمنسوجات", "سلع مستعملة عالية الجودة", "شبكة التوزيع الإقليمية"],
      ku: ["کۆفرۆشی ئامێرە ئەلیکترۆنییەکان", "دابینکردنی کەلوپەلی ناوماڵ", "دابەشکردنی جلوبەرگ و قوماش", "کاڵای بەکارهاتووی کوالێتی بەرز", "تۆڕی دابەشکردنی ناوچەیی"],
    },
    branches: [
      {
        city: { en: "Soran", ar: "سوران", ku: "سۆران" },
        address: {
          en: "Rawanduz Road , Soran",
          ar: "طريق رواندز ، سوران",
          ku: "ڕێگای ڕواندز ، سۆران",
        },
      },
    ],
  },
  chyaamazon: {
    id: "chyaamazon",
    sectorId: "general-trading",
    logo: "/brands/Chya Amazon-1.png",
    logoScale: 1.35,
    qrLink: "https://www.instagram.com/chya_amazon.iq?igsh=cHQzbXV5aHc4amhj",
    email: "chyaamazon2026@gmail.com",
    phone: "+964 770 445 2688",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Chya Amazon",
      ar: "مشروع جيا أمازون",
      ku: "چیا ئەمازۆن",
    },
    tagline: {
      en: "General Trading & Certified Second-Hand Goods",
      ar: "التجارة العامة والسلع المستعملة المعتمدة",
      ku: "بازرگانی گشتی و کاڵای بەکارهاتووی کوالێتی بەرز",
    },
    description: {
      en: "Chya Amazon For General Trading Is The Third Company Of The General Trading Sector Of Chya Group , Founded On 01/03/2026 On Rawanduz Road In Soran City , It Specializes In Certified Second-Hand Consumer Goods , Clothing , Household Appliances & Utensils In Both Retail & Wholesale Markets Following Strict Quality Assurance Standards.",
      ar: "مشروع جيا أمازون للتجارة العامة ، هي الشركة الثالثة في قطاع التجارة العامة لمجموعة چيا ، تأسست في 01/03/2026 على طريق رواندز في مدينة سوران ، تتخصص في السلع المستعملة المعتمدة , الملابس , الأجهزة المنزلية & الأدوات بكل من أسواق التجزئة & الجملة وفقاً لمعايير الجودة الصارمة.",
      ku: "پڕۆژەی چیا ئەمازۆن بۆ بازرگانی گشتی ، سێیەم کۆمپانیای سێکتەری بازرگانی گشتی چیا گروپە ، لە 01/03/2026 لە ڕێگای ڕواندز لە شاری سۆران دامەزراوە ، پسپۆڕە لە کاڵای بەکارهاتووی مەرجدارکراو , جلوبەرگ , ئامێرە ناوماڵییەکان & پێداویستییەکان بە شێوەی تاک & کۆ لەگەڵ مۆڵەتی کوالێتی نایاب.",
    },
    services: {
      en: ["Wholesale Second-Hand Goods", "Retail Clothing & Textiles", "Household Appliances & Utensils", "Quality Inspection & Grading", "Delivery Across Soran Region"],
      ar: ["بيع السلع المستعملة بالجملة", "تجزئة الملابس والمنسوجات", "الأجهزة والأدوات المنزلية", "فحص الجودة وتصنيف السلع", "التوصيل عبر منطقة سوران"],
      ku: ["کۆفرۆشی کاڵای بەکارهاتوو", "فرۆشتنی تاکەکەسی جلوبەرگ", "ئامێر و پێداویستییەکانی ناوماڵ", "پشکنینی کوالێتی و پۆلێنکردن", "گەیاندن لە سەرانسەری ناوچەی سۆران"],
    },
    branches: [
      {
        city: { en: "Soran", ar: "سوران", ku: "سۆران" },
        address: {
          en: "Rawanduz Road , Soran",
          ar: "طريق رواندز ، سوران",
          ku: "ڕێگای ڕواندز ، سۆران",
        },
      },
    ],
  },
  khakisarwar: {
    id: "khakisarwar",
    sectorId: "money-exchange",
    logo: "/brands/khakisarwar.png",
    logoScale: 1.45,
    qrLink: "https://www.instagram.com/khaki_sarwar.co?igsh=MW43NXdoamhsODJoYg==",
    email: "khakisarwar2025@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "/money.png",
    name: {
      en: "Khaki Sarwar",
      ar: "شركة خاكى سەروەر",
      ku: "کۆمپانیای خاکی سەروەر",
    },
    tagline: {
      en: "Money Exchange & Financial Services Company",
      ar: "شركة الصرافة والخدمات المالية",
      ku: "کۆمپانیای ئاڵوگۆڕی دراو و سێرڤسی دارایی",
    },
    description: {
      en: "Khaki Sarwar Co. For Currency Exchange Is The Fourth Branch Of The Currency Exchange & Financial Services Sector Of Chya Group , Founded On 16/02/2025 On Pirmam Road Inside BM OIL 2 STATION In Erbil City , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash & Bank Accounts , And Sending Money To All Local & International Bank Cards.",
      ar: "شركة خاكي سرور لتبادل العملات ، هو الفرع الرابع التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چيا ، تأسست في 2025/02/16 على طريق بيرمام داخل محطة وقود BM OIL 2 STATION في مدينة أربيل ، وتعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "کۆمپانیای خاکی سەروەر بۆ ئاڵوگۆڕی دراو ، چوارەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2025/02/16 لە ڕێگای پیرمام نێو بەنزینخانەی BM OIL 2 STATION لە شاری هەولێر دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان.",
    },
    services: {
      en: ["Global Money Transfers", "Multi-Currency Exchange", "Secure Bank Wire Assistance", "Local Cash Payout Services", "Corporate Liquidity Solutions"],
      ar: ["حوالات مالية عالمية", "صرافة عملات متعددة", "المساعدة في الحوالات البنكية الآمنة", "خدمات الدفع النقدي المحلي", "حلول السيولة للشركات"],
      ku: ["حەواڵەکردنی پارە بۆ سەرانسەری جیهان", "ئاڵوگۆڕی دراوە جیاوازەکان", "پشتیوانی حەواڵەی بانکی پارێزراو", "خزمەتگوزاری ڕادەستکردنی کاش بە شێوەی ناوخۆیی", "چارەسەری نەختینەیی بۆ کۆمپانیاکان"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "Pirmam Road , Inside BM OIL 2 Petrol Station , Erbil",
          ar: "طريق بيرمام ، داخل محطة وقود BM OIL 2 ، أربيل",
          ku: "ڕێگای پیرمام ، ناو بەنزینخانەی BM OIL 2 ، هەولێر",
        },
      },
    ],
  },
  hangaw: {
    id: "hangaw",
    sectorId: "money-exchange",
    logo: "/brands/hangawexchange.png",
    logoScale: 1.45,
    qrLink: "https://www.instagram.com/hangaw_exchangemoney?igsh=M2h4ZTEyZmRud21y",
    email: "hangawexchange2024@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "/money.png",
    name: {
      en: "Hangaw Exchange",
      ar: "مکتب هەنگاو",
      ku: "نووسینگەی هەنگاو",
    },
    tagline: {
      en: "Money Exchange & Financial Services Office",
      ar: "مكتب الصرافة والخدمات المالية",
      ku: "نووسینگەی ئاڵوگۆڕی دراو و سێرڤسی دارایی",
    },
    description: {
      en: "Hangaw Exchange For Currency Exchange Is The Third Branch Of The Currency Exchange & Financial Services Sector Of Chya Group , Founded On 21/03/2024 On Runaki Two-Way Street In Erbil City , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash & Bank Accounts , And Sending Money To All Local & International Bank Cards.",
      ar: "مكتب هەنگاو لتبادل العملات ، هو الفرع الثالث التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چيا ، تأسس في 2024/03/21 على شارع روناكي ذو الاتجاهين في مدينة أربيل ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "نووسینگەی هەنگاو بۆ ئاڵوگۆڕی دراو ، سێیەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2024/03/21 لە جووت سایدی ڕووناکی شاری هەولێر دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان.",
    },
    services: {
      en: ["Fast Global Remittances", "Currency Conversions", "Electronic Transfer Support", "Local Payout Channels", "Personalized Exchange Rates"],
      ar: ["حوالات مالية عالمية سريعة", "تحويلات العملات", "دعم التحويلات الإلكترونية", "قنوات الدفع المحلية", "أسعار صرف مخصصة"],
      ku: ["حەواڵەی خێرا بۆ سەرانسەری جیهان", "گۆڕینەوەی دراوەکان", "پشتیوانی حەواڵەی ئەلیکترۆنی", "قەناڵەکانی ڕادەستکردنی ناوخۆیی", "نرخی گۆڕینەوەی تایبەت"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "Two-Way Runaki Street , Erbil",
          ar: "شارع رونامي دو سايد ، أربيل",
          ku: "شەقامی ڕووناکی دووساید , هەولێر",
        },
      },
    ],
  },
  chya: {
    id: "chya",
    sectorId: "money-exchange",
    logo: "/brands/chyaexchnage.png",
    logoScale: 1.4,
    qrLink: "https://www.instagram.com/chya_exchangemoney?igsh=c3VnYzMxY2o5OGVu",
    email: "chyaexchange2021@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "/money.png",
    name: {
      en: "Chya Exchange",
      ar: "مكتب جيا",
      ku: "نووسینگەی چیا",
    },
    tagline: {
      en: "Money Exchange & Financial Services Office",
      ar: "مكتب الصرافة والخدمات المالية",
      ku: "نووسینگەی ئاڵوگۆڕی دراو و سێرڤسی دارایی",
    },
    description: {
      en: "Chya Exchange For Currency Exchange Is The First Branch Of The Currency Exchange & Financial Services Sector Of Chya Group , Founded On 14/06/2021 In Old Borsa , Erbil City , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash & Bank Accounts , And Sending Money To All Local & International Bank Cards.",
      ar: "مكتب چيا لتبادل العملات ، هو الفرع الأول التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چيا ، تأسس في 2021/06/14 في البورصة القديمة ، أربيل ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "نووسینگەی چیا بۆ ئاڵوگۆڕی دراو ، یەکەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2021/06/14 لە بۆرسەی کۆنی شاری هەولێر دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان.",
    },
    services: {
      en: ["Worldwide Bank & Cash Remittances", "Foreign Exchange & Trading", "Domestic Money Transfers", "Local Card Deposits & Withdrawals", "Authorized Agent Financial Services"],
      ar: ["حوالات بنكية ونقدية عالمية", "صرافة وتداول العملات الأجنبية", "تحويلات الأموال المحلية", "إيداع وسحب البطاقات المحلية", "خدمات مالية كوكيل معتمد"],
      ku: ["حەواڵەی بانکی و کاش بۆ سەرانسەری جیهان", "ئاڵوگۆڕ و بازرگانی دراوە بیانییەکان", "حەواڵەکردنی پارەی ناوخۆیی", "سەحب و سپاردنی کارتە ناوخۆییەکان", "خزمەتگوزارییە داراییەکانی بریکاری ڕێپێدراو"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "Old Borsa , Erbil",
          ar: "البورصة القديمة ، أربيل",
          ku: "بۆرسەی کۆن ، هەولێر",
        },
      },
    ],
  },
  chyagold: {
    id: "chyagold",
    sectorId: "money-exchange",
    logo: "/brands/qapat-1.png",
    logoScale: 1.35,
    qrLink: "https://www.instagram.com/chya_gold.turkey?igsh=NTV1dm9vMzlrcHhi",
    email: "chyagold2023@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "/money.png",
    name: {
      en: "Chya Gold",
      ar: "مكتب جيا كولد",
      ku: "نووسینگەی چیا گۆڵد",
    },
    tagline: {
      en: "Money Exchange & Financial Services Office",
      ar: "مكتب الصرافة والخدمات المالية",
      ku: "نووسینگەی ئاڵوگۆڕی دراو و سێرڤسی دارایی",
    },
    description: {
      en: "Chya Gold For Currency Exchange Is The Second Branch Of The Currency Exchange & Financial Services Sector Of Chya Group , Founded On 28/08/2023 In Silopi In The City Of Sirnak In The Country Of Turkey , It Works In Exchanging All Types Of Currencies And Sending Money To All Turkey Cities & Bank Accounts.",
      ar: "مكتب جيا كولد لتبادل العملات ، هو الفرع الثاني التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چيا ، تأسس في 28/08/2023 في سيلوبي في مدينة شرناخ في دولة تركيا ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع مدن وحسابات بنكية في تركيا.",
      ku: "نووسینگەی چیا گۆڵد بۆ ئاڵوگۆڕی دراو ، دووەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2023/08/28 لە سلۆپی ، شرناخ ، تورکیا دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو شارەکان و حساب بانکیەکانی نێو وڵاتی تورکیا.",
    },
    services: {
      en: ["Turkey-Wide Bank Transfers", "Cross-Border Remittances", "Lira & Foreign Currency Conversion", "B2B Financial Gateways", "Immediate Cash Collections"],
      ar: ["تحويلات بنكية داخل تركيا", "حوالات مالية عابرة للحدود", "تحويل الليرة والعملات الأجنبية", "بوابات مالية للشركات", "الاستلام النقدي الفوري"],
      ku: ["حەواڵەی بانکی بۆ سەرانسەری تورکیا", "حەواڵەی دارایی فرە-سنوور", "گۆڕینەوەی لیرە و دراوە بیانییەکان", "دەروازەی دارایی بۆ کۆمپانیاکان", "وەرگرتنی کاش بە شێوەی دەستبەجێ"],
    },
    branches: [
      {
        city: { en: "Silopi", ar: "سيلوبي", ku: "سیلۆپی" },
        address: {
          en: "Silopi District , Şırnak Street , Türkiye",
          ar: "سيلوبي ، شارع شرناق ، تركيا",
          ku: "سیلۆپی ، شەقامی شرناخ ، تورکیا",
        },
      },
    ],
  },
  lutkaychya: {
    id: "lutkaychya",
    sectorId: "money-exchange",
    logo: "/brands/lutkay chya-1.png",
    logoScale: 1.3,
    qrLink: "https://www.instagram.com/lutkay.chya_exchangemoney?igsh=ajVzMzN2dWx4dnY4",
    email: "lutkaychya2024@gmail.com",
    phone: "+964 751 127 6571",
    heroImage: "/money.png",
    name: {
      en: "Lutkay Chya",
      ar: "مكتب لوتكەی جيا",
      ku: "نووسینگەی لوتکەی چیا",
    },
    tagline: {
      en: "Money Exchange & Financial Services Office",
      ar: "مكتب الصرافة والخدمات المالية",
      ku: "نووسینگەی ئاڵوگۆڕی دراو و سێرڤسی دارایی",
    },
    description: {
      en: "Lutkay Chya Exchange For Currency Exchange Is The Fifth Branch Of The Currency Exchange & Financial Services Sector Of Chya Group , Founded On 20/10/2024 In Erbil City In Ankawa Street , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash & Bank Accounts , And Sending Money To All Local & International Bank Cards.",
      ar: "مكتب لوتكەی جيا لتبادل العملات ، هو الفرع الخامس التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چيا ، تأسس في 2024/10/20 في مدينة أربيل في شارع عنكاوا ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "نووسینگەی لوتکەی چیا بۆ ئاڵوگۆڕی دراو ، پێنجەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2024/10/20 لە گەڕەکی عەنکاوەی شاری هەولێر دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان.",
    },
    services: {
      en: ["International Card Transactions", "Multi-Currency Exchange", "Secure Cash Disbursements", "Expatriate Remittance Support", "Fast Local Transfers"],
      ar: ["معاملات البطاقات الدولية", "صرافة العملات المتعددة", "صرف النقود الآمن", "دعم حوالات المغتربين", "تحويلات محلية سريعة"],
      ku: ["مۆدێلی کارتە نێودەوڵەتییەکان", "گۆڕینەوەی دراوە جیاوازەکان", "ڕادەستکردنی کاش بە شێوەی پارێزراو", "پشتیوانی حەواڵەی بیانییەکان", "حەواڵەی ناوخۆیی خێرا"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "Ankawa Road , Erbil",
          ar: "حي عنكاوا ، أربيل",
          ku: "گەڕەکی عەنکاوە ، هەولێر",
        },
      },
    ],
  },
  barzychya: {
    id: "barzychya",
    sectorId: "money-exchange",
    logo: "/brands/BARZY CHYAY-1.png",
    logoScale: 1.37,
    qrLink: "https://www.instagram.com/barzy.chya_exchange?igsh=MnhwZHE2aGoweWU0",
    email: "barzychya2025@gmail.com",
    phone: "+964 770 445 2688",
    heroImage: "/money.png",
    name: {
      en: "Barzy Chya",
      ar: "مکتب بەرزی جيا",
      ku: "نووسینگەی بەرزی چیا",
    },
    tagline: {
      en: "Money Exchange & Financial Services Office",
      ar: "مكتب الصرافة والخدمات المالية",
      ku: "نووسینگەی ئاڵوگۆڕی دراو و سێرڤسی دارایی",
    },
    description: {
      en: "Barzy Chya Exchange For Currency Exchange Is The Sixth Branch Of The Currency Exchange & Financial Services Sector Of Chya Group , Founded On 06/03/2025 In Soran In The City Center Opposite The Langa Bazar , It Works In Exchanging All Types Of Currencies And Sending Money To All Countries Of The World In Cash & Bank Accounts , And Sending Money To All Local & International Bank Cards.",
      ar: "مكتب بـەرزی چيا لتبادل العملات ، هو الفرع السادس التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چيا , تأسس في 2025/03/06 في سوران في مركز المدينة مقابل بازار اللنگة ، ويعمل في مجال تبادل جميع أنواع العملات وإرسال الأموال إلى جميع دول العالم نقداً وعبر الحسابات البنكية وإرسال الأموال إلى جميع البطاقات البنكية المحلية والدولية.",
      ku: "نووسینگەی بەرزی چیا بۆ ئاڵوگۆڕی دراو ، شەشەم لقی سەر بە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2025/03/06 لە سۆران لە سەنتەری شار بەرامبەر بازاڕی لەنگە دامەزراوە و کار دەکات لە بواری ئاڵوگۆڕی هەموو جۆرە دراوێك و ناردنی پارە بۆ هەموو وڵاتانی جیهان بە کاش و حسابی بانکی و ناردنی پارە بۆ هەموو کارتە بانکیە نێوخۆیی و نێودەوڵەتیەکان.",
    },
    services: {
      en: ["Foreign Currency Exchange", "Global Wire Remittances", "Cash Collection & Payouts", "Direct Local Bank Deposits", "Soran Financial Support"],
      ar: ["صرافة العملات الأجنبية", "الحوالات المالية العالمية", "تحصيل وصرف المبالغ النقدية", "الإيداع المباشر في البنوك المحلية", "الدعم المالي لمنطقة سوران"],
      ku: ["ئاڵوگۆڕی دراوە بیانییەکان", "حەواڵەی دارایی جیهانی", "کۆکردنەوە و ڕادەستکردنی کاش", "سپاردنی ڕاستەوخۆ لە بانکە ناوخۆییەکان", "پشتیوانی دارایی ناوچەی سۆران"],
    },
    branches: [
      {
        city: { en: "Soran", ar: "سوران", ku: "سۆران" },
        address: {
          en: "City Center , Opposite Langa Bazar , Soran",
          ar: "وسط المدينة ، مقابل بازار لانكة ، سوران",
          ku: "ناوەندی شار , بەرامبەر بازاڕی لەنگە , سۆران",
        },
      },
    ],
  },
  manfazdibaga: {
    id: "manfazdibaga",
    sectorId: "money-exchange",
    logo: "/brands/Manfaz Dibaga-1.png",
    logoScale: 1.2,
    qrLink: "https://www.instagram.com/manfaz.dibaga_hangaw?igsh=ZGtoamJtNzd6MHJm",
    email: "manfazdibagabyhangaw2025@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "https://instagram.febl5-1.fna.fbcdn.net/v/t51.82787-15/670640831_17881287648555612_7825719802316848702_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzg4MDE4MzU1MTUwMDY1ODMwNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=BkMHHcEFtdAQ7kNvwEdrF_V&_nc_oc=Adq52J-3OkhNyTzYZaBITL6RPV5t5ix4rkz7BUlh-OnNJbTLQyGv1lt7G0RdOmeDyvw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.febl5-1.fna&_nc_gid=k8zw8qppUuWo_vU13HeIhg&_nc_ss=7a22e&oh=00_AQD7U6o8oJe_Wpe03sHT7rI1MHxanRxjQHLlq7IXKxYdUg&oe=6A5438C6",
    name: {
      en: "Manfaz Dibaga",
      ar: "منفذ ديبكة ی هەنگاو",
      ku: "منفذ ديبكة ى هەنگاو",
    },
    tagline: {
      en: "Money Exchange & Financial Services Place",
      ar: "منفذ الصرافة والخدمات المالية",
      ku: "مەنفەزی ئاڵوگۆڕی دراو و سێرڤسی دارایی",
    },
    description: {
      en: "Manfaz Dibaga For Payout Salaries Is The Seventh Branch Of The Currency Exchange & Financial Services Sector Of Chya Group , Founded On 01/08/2025 On Runaki Street In Erbil City Inside Hangaw Exchange Office , It Works In Payout Military , Civil & Retired Salaries And Qi Card Services , Super Qi & Master Card , Cash Out & Sending Money.",
      ar: "منفذ ديبكة لصرف الرواتب ، هو الفرع السابع التابع لقطاع تبادل العملات والخدمات المالية في مجموعة چيا ، تأسس في 2025/08/01 في شارع روناكي في مدينة أربيل داخل مكتب هەنگاو للصرافة ، ويعمل في صرف الرواتب العسكرية والمدنية والمتقاعدين وخدمات الكي كارد والسوبر كي والماستر كارد وسحب وإرسال الأموال.",
      ku: "منفذ دیبكة ی هەنگاو بۆ صرفی رواتب سەر بە نووسینگەی هەنگاو لە سێکتەری ئاڵوگۆڕی دراو و سێرڤسی دارایی چیا گروپە و لە 2025/08/01 لە جووت سایدی ڕووناکی لە نێو نووسینگەی هەنگاو دامەزراوە و کارەکانی پێک دێت لە صرفی رواتب عسکری و مدنی و تقاعد و جێبەجێکردنی سێرڤسی ( کی کارد , سوپەر کی , ماستەر کارد ) و ناردن و ڕاکێشانی پارە تیایدا.",
    },
    services: {
      en: ["Civilian Payroll Distributions", "Military Salary Processing", "Retirement Fund Payouts", "Qi Card & MasterCard Processing", "Secure Account Cashout Channels"],
      ar: ["توزيع رواتب المدنيين", "صرف رواتب العسكريين", "صرف مستحقات المتقاعدين", "معالجة بطاقات كي كارد وماستر كارد", "قنوات صرف نقدي آمنة للحسابات"],
      ku: ["دابەشکردنی مووچەی مەدەنییەکان", "ڕاییکردنی مووچەی سەربازییەکان", "دابەشکردنی مووچەی خانەنشینان", "کارکردن لەسەر کی کارت و ماستەر کارت", "قەناڵی پارێزراوی سەحبی کاش"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "Two-Way Runaki Street , Erbil",
          ar: "شارع روناكي دو سايد ، أربيل",
          ku: "شەقامی ڕووناکی دووساید ، هەولێر",
        },
      },
    ],
  },
  chyaphone: {
    id: "chyaphone",
    sectorId: "mobile-tech",
    logo: "/brands/chya phone-1.png",
    logoScale: 1.29,
    qrLink: "https://www.instagram.com/chya_phone.iq?igsh=MTcza2o2azEwbjlxYg==",
    email: "chyaphone2026@gmail.com",
    phone: "+964 770 445 2688",
    heroImage: "https://imgs.search.brave.com/hoDr7jVcjagMMjJe5fBE8fS6jHtLtrixo9TF8CijlYs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE1/MzQ3ODgzNi9waG90/by9kaWdpdGFsLXRl/Y2hub2xvZ3ktaW50/ZXJuZXQtbmV0d29y/ay1jb25uZWN0aW9u/LWJpZy1kYXRhLWRp/Z2l0YWwtbWFya2V0/aW5nLWlvdC1pbnRl/cm5ldC1vZi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9dF9D/SFB5SmlJTTItX1pP/UEtzOVZ6OXpMLW9w/U0JadkVHclRsSnpw/Qklncz0",
    name: {
      en: "Chya Phone",
      ar: "محل جيا فون",
      ku: "پێشانگای چیا فۆن",
    },
    tagline: {
      en: "Mobile & Technology & Smart Devices Center",
      ar: "الهواتف والتكنولوجيا ومركز الأجهزة الذكية",
      ku: "مۆبایل و تەکنەلۆژیا و سەنتەری ئامێرە زیرەکەکان",
    },
    description: {
      en: "Chya Phone For Mobile & Technology Is The First Branch Of The Mobile & Technology Sector Of Chya Group , Founded On 24/03/2026 In Soran City Center , It Specializes In Smartphones , iPads , High-Performance Laptops & Genuine Electronic Accessories , And Offers Hardware Diagnostic & Professional Technical Repair Services.",
      ar: "معرض جيا فون للهواتف والتكنولوجيا ، هو الفرع الأول التابع لقطاع الهواتف والتكنولوجيا في مجموعة چيا ، تأسس في 24/03/2026 في وسط مدينة سوران ، ويتخصص في الهواتف الذكية , أجهزة الآيباد , اللابتوبات عالية الأداء & الإكسسوارات الإلكترونية الأصلية , مع تقديم خدمات فحص وصيانة الأجهزة المحترفة.",
      ku: "پێشانگای چیا فۆن بۆ مۆبایل و تەکنەلۆژیا ، یەکەم لقی سەر بە سێکتەری مۆبایل و تەکنەلۆژیای چیا گروپە و لە 24/03/2026 لە سەنتەری شاری سۆران دامەزراوە ، پسپۆڕە لە مۆبایلی زیرەک , ئایپاد , لاپتۆپ و کۆمپیوتەر & ئێکسسواراتی ئەسڵی لەگەڵ پێشکەشکردنی خزمەتگوزاری پیشەیی بۆ پشکنین و چاککردنەوەی ئامێرەکان.",
    },
    services: {
      en: ["Smartphones & iPads Retail", "Laptops & Computing Solutions", "Genuine Electronic Accessories", "Hardware Diagnostic & Repairs", "Soran Retail Electronics Hub"],
      ar: ["تجزئة الهواتف الذكية والآيباد", "اللابتوبات وحلول الحوسبة", "إكسسوارات إلكترونية أصلية", "فحص وإصلاح الأجهزة", "مركز الإلكترونيات في سوران"],
      ku: ["فرۆشتنی مۆبایلی زیرەک و ئایپاد", "لاپتۆپ و چارەسەری کۆمپیوتەر", "ئێکسسواراتی ئەلیکترۆنی ئەسڵی", "پشکنین و چاککردنەوەی ئامێرەکان", "ناوەندی ئەلیکترۆنیاتی سۆران"],
    },
    branches: [
      {
        city: { en: "Soran", ar: "سوران", ku: "سۆران" },
        address: {
          en: "City Center , Soran",
          ar: "وسط المدينة ، سوران",
          ku: "ناوەندی شار ، سۆران",
        },
      },
    ],
  },
  chyatech: {
    id: "chyatech",
    sectorId: "mobile-tech",
    logo: "/brands/chyatech.png",
    logoScale: 1.7,
    qrLink: "https://www.instagram.com/chya_tech.iq?igsh=MTNzcWp5a2F4d3dmZg==",
    email: "chyatech2025@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Chya Tech",
      ar: "جيا تيك",
      ku: "کاری چیا تێك",
    },
    tagline: {
      en: "Mobile & Technology & Software Systems Development",
      ar: "الهواتف والتكنولوجيا وتطوير أنظمة البرمجيات",
      ku: "مۆبایل و تەکنەلۆژیا و گەشەپێدانی سیستمە نەرمەکاڵاییەکان",
    },
    description: {
      en: "Chya Tech For Software & IT Solutions Is The Second Branch Of The Mobile & Technology Sector Of Chya Group , Founded On 11/08/2025 On Runaki Street In Erbil City , It Specializes In Designing Enterprise Accounting Systems , Database Archiving , Personnel Management Software & Business Hardware Solutions.",
      ar: "شركة جيا تيك للبرمجيات وحلول تكنولوجيا المعلومات ، هي الفرع الثاني التابع لقطاع الهواتف والتكنولوجيا في مجموعة چيا ، تأسست في 11/08/2025 في شارع روناكي في مدينة أربيل ، وتتخصص في تصميم أنظمة المحاسبة للمؤسسات , أرشفة قواعد البيانات , برمجيات إدارة الموظفين & حلول الأجهزة والمستلزمات المكتبية.",
      ku: "کۆمپانیای چیا تێک بۆ نەرمەکاڵا و چارەسەری تەکنەلۆژی ، دووەم لقی سەر بە سێکتەری مۆبایل و تەکنەلۆژیای چیا گروپە و لە 11/08/2025 لە شەقامی ڕووناکی لە شاری هەولێر دامەزراوە ، پسپۆڕە لە داڕشتنی سیستمەکانی ژمێریاری , ئەرشیفکردنی داتا , نەرمەکاڵای بەڕێوەبردنی کارمەندان & چارەسەر و دابینکردنی ئامێرە بازرگانی و ئەلیکترۆنییەکان.",
    },
    services: {
      en: ["Enterprise Accounting Softwares", "Database & Archiving Systems", "HR & Employee Management Tools", "Network Setup & Maintenance", "Corporate IT Consulting"],
      ar: ["برامج المحاسبة للمؤسسات", "أنظمة أرشفة البيانات", "أدوات إدارة الموظفين والموارد البشرية", "تركيب وصيانة الشبكات", "استشارات تكنولوجيا المعلومات للشركات"],
      ku: ["نەرمەکاڵای ژمێریاری کۆمپانیاکان", "سیستەمی ئەرشیفکردن و داتا", "ئامرازەکانی بەڕێوەبردنی کارمەندان", "دامەزراندن و چاککردنەوەی تۆڕەکان", "راوێژکاری تەکنەلۆژی بۆ کۆمپانیاکان"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "ONLINE",
          ar: "ONLINE",
          ku: "ONLINE",
        },
      },
    ],
  },
  blueprinting: {
    id: "blueprinting",
    sectorId: "printing",
    logo: "/brands/BLUE PRINT-1.png",
    logoScale: 1.4,
    qrLink: "https://www.instagram.com/blue.printing_office?igsh=MTk4MHU0NHc3eXBxNg==",
    email: "blueprinting2025@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "/printing.jpg",
    name: {
      en: "Blue Printing",
      ar: "مکتب بلو طباعە",
      ku: "نووسینگەی بلو پرێنتینگ",
    },
    tagline: {
      en: "Printing and Photocopy & Official Transactions Center",
      ar: "الطباعة والاستنساخ ومركز المعاملات الرسمية",
      ku: "چاپ و کۆپیکردن و سەنتەری مامەڵە فەرمییەکان",
    },
    description: {
      en: "Blue Printing For Printing & Government Transactions Is The First Branch Of The Printing Sector Of Chya Group , Founded On 19/10/2025 On Runaki Street In Erbil City , It Specializes In High-Volume Printing , Studio Photography , National Card & Passport Fees Payment , And Scheduling Government Department Appointments.",
      ar: "مكتب بلو برينتينغ للطباعة والمعاملات الحكومية ، هو الفرع الأول التابع لقطاع الطباعة في مجموعة چيا ، تأسس في 19/10/2025 في شارع روناكي في مدينة أربيل ، ويتخصص في الطباعة والاستنساخ بكميات كبيرة , التصوير الفوتوغرافي الاستوديو , دفع رسوم الجوازات والبطاقة الوطنية & حجز مواعيد الدوائر الحكومية.",
      ku: "نووسینگەی بلو پرێنتینگ بۆ چاپ و مامەڵە حکومییەکان ، یەکەم لقی سەر بە سێکتەری چاپی چیا گروپە و لە 19/10/2025 لە شەقامی ڕووناکی لە شاری هەولێر دامەزراوە ، پسپۆڕە لە چاپ و کۆپیکردن بە بڕی زۆر , وێنەگرتنی ستۆدیۆ , ڕاییکردنی ڕسوماتەکانی پاسپۆرت و کارتی نیشتمانی & حجزکردنی کاتی فەرمانگە حکومییەکان.",
    },
    services: {
      en: ["High-Volume Printing & Photocopy", "Official Passport Photography", "Passport & National Card Fees Processing", "Government Appointment Bookings", "Document Translation Services"],
      ar: ["الطباعة والتصوير بكميات كبيرة", "تصوير الجوازات الرسمي", "معالجة رسوم الجوازات والبطاقة الوطنية", "حجز المواعيد الحكومية الرسمية", "خدمات ترجمة الوثائق والمستندات"],
      ku: ["چاپی کوالێتی بەرز و کۆپیکردن", "وێنەگرتنی فەرمی پاسپۆرت", "ڕاییکردنی ڕسوماتەکانی پاسپۆرت و کارتی نیشتمانی", "حجزکردنی کاتەکانی فەرمانگە فەرمییەکان", "خزمەتگوزاری وەرگێڕانی بەڵگەنامەکان"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "ONLINE",
          ar: "ONLINE",
          ku: "ONLINE",
        },
      },
    ],
  },
  chyatravel: {
    id: "chyatravel",
    sectorId: "online-trading",
    logo: "/brands/CHYA travel-1.png",
    logoScale: 1.1,
    qrLink: "https://www.instagram.com/chya_travel.iq?igsh=MTFzMDE5ODV5ODN1bQ==",
    email: "chyatravel2020@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "https://imgs.search.brave.com/pGdS_gZv6e4aEBf6TPTu_m-3NaIN1oFxOevkq2WzY5A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tdXdh/aWxlaHRvdXJpc20u/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI2LzAxL2ZsaWdo/dC11YWUud2VicA",
    name: {
      en: "Chya Travel",
      ar: "جيا تراڤل",
      ku: "کاری چیا تڕاڤل",
    },
    tagline: {
      en: "Online Trading & Travel Services Hub",
      ar: "التجارة الإلكترونية ومركز خدمات السفر والسياحة",
      ku: "بازرگانی ئۆنلاین و ناوەندی خزمەتگوزارییەکانی گەشتوگوزار",
    },
    description: {
      en: "Chya Travel For Online Services Is The First Company Of The Online Trading Sector Of Chya Group , Founded On 22/01/2020 In Erbil City , It Specializes In Flight Bookings , Worldwide Visa Processing , Hotel Accommodations & Tourism Services.",
      ar: "شركة جيا ترافيل للخدمات الإلكترونية ، هي الشركة الأولى في قطاع التجارة الإلكترونية لمجموعة چيا ، تأسست في 22/01/2020 في مدينة أربيل ، وتتخصص في حجوزات الطيران , معالجة التأشيرات العالمية , حجوزات الفنادق & الخدمات السياحية.",
      ku: "کۆمپانیای چیا تڕاڤل بۆ خزمەتگوزارییە ئۆنلاینەکان ، یەکەم کۆمپانیای سێکتەری بازرگانی ئۆنلاینی چیا گروپە و لە 22/01/2020 لە شاری هەولێر دامەزراوە ، پسپۆڕە لە بڕینی تکتی فڕین , ڕاییکردنی ڤیزەی جیهانی , حجزی هۆتێل & خزمەتگوزارییە گەشتیارییەکان.",
    },
    services: {
      en: ["Worldwide Airline Ticketing", "Visa Processing Services", "Hotel & Car Rental Bookings", "Tourist Destination Guides", "Medical Travel Translation Support"],
      ar: ["حجوزات الطيران لجميع أنحاء العالم", "خدمات معالجة التأشيرات", "حجز الفنادق وتأجير السيارات", "أدلة الوجهات السياحية", "دعم الترجمة للسفر الطبي"],
      ku: ["بڕینی تکتی فڕۆکەوانی جیهانی", "خزمەتگوزاری ڕاییکردنی ڤیزە", "حجزی هۆتێل و بەکرێدانی ئۆتۆمبێل", "ڕێنمایی گەشتیاری بۆ شوێنەکان", "پاڵپشتی وەرگێڕانی گەشتە پزیشکییەکان"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "ONLINE",
          ar: "ONLINE",
          ku: "ONLINE",
        },
      },
    ],
  },
  chyaluxury: {
    id: "chyaluxury",
    sectorId: "online-trading",
    logo: "/brands/kivaluxary.png",
    logoScale: 1.3,
    qrLink: "https://www.instagram.com/kiva.luxuryshop?igsh=emFtbXNpbjBmMnh6",
    email: "chyaluxury2022@gmail.com",
    phone: "+964 750 479 8788",
    heroImage: "https://imgs.search.brave.com/O3hX2S0doOfl2fVq699G41unLlh5fygLwBLB4lsijr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vd2FsZW5nYS93/YWxlbmdhMTUwMy93/YWxlbmdhMTUwMzAw/MDI1LzM3NTE5MDk3/LW1lbi1hY2Nlc3Nv/cnktZ29sZGVuLXdh/dGNoLXBlbi1hbmQt/bW9iaWxlLXBob25l/LW9uLXRoZS1sZWF0/aGVyLWRpYXJ5Lmpw/Zz92ZXI9Ng",
    name: {
      en: "Chya Luxury",
      ar: "جيا لوكزوري",
      ku: "کاری چیا لوکژوری",
    },
    tagline: {
      en: "Online Trading & Luxury Goods Distribution",
      ar: "التجارة الإلكترونية وتجارة السلع الفاخرة",
      ku: "بازرگانی ئۆنلاین و بازرگانیکردن بە کاڵا لوکسەکان",
    },
    description: {
      en: "Chya Luxury For Online Services Is The Second Company Of The Online Trading Sector Of Chya Group , Founded On 20/01/2022 In Erbil City , It Specializes In Sourcing & Distributing Authentic High-End Jewelry , Luxury Watches , Fashion Accessories & Premium Perfumes From Major Global Brands.",
      ar: "شركة جيا لوكزوري للخدمات الإلكترونية ، هي الشركة الثانية في قطاع التجارة الإلكترونية لمجموعة چيا ، تأسست في 20/01/2022 في مدينة أربيل ، وتتخصص في استيراد وتوزيع المجوهرات الراقية الأصلية , الساعات الفاخرة , الإكسسوارات & العطور الممتازة من كبرى الماركات العالمية.",
      ku: "کۆمپانیای چیا لوکژوری بۆ خزمەتگوزارییە ئۆنلاینەکان ، دووەم کۆمپانیای سێکتەری بازرگانی ئۆنلاینی چیا گروپە و لە 20/01/2022 لە شاری هەولێر دامەزراوە ، پسپۆڕە لە هاوردەکردن و دابەشکردنی خشڵ و گەوهەری ئەسڵی , کاتژمێری لوکس , ئێکسسوارات & بۆنە نایابەکان لە براندە بەناوبانگە جیهانییەکان.",
    },
    services: {
      en: ["Authentic Luxury Watches Retail", "Premium Jewelry & Accessories", "Global Brand Perfumes Supply", "Product Verification & Appraisal", "Secure Insured Shipping Services"],
      ar: ["تجزئة الساعات الفاخرة الأصيلة", "المجوهرات والإكسسوارات الفاخرة", "توريد عطور الماركات العالمية", "التحقق من أصالة وتقييم المنتجات", "خدمات شحن آمنة ومؤمنة"],
      ku: ["فرۆشتنی کاتژمێری ئەسڵی و لوکس", "خشڵ و ئێکسسواراتی بەنرخ", "دابینکردنی بۆنی براندە جیهانییەکان", "پشکنینی ئەسڵبوونی کاڵاکان", "خزمەتگوزاری گەیاندنی پارێزراو"],
    },
    branches: [
      {
        city: { en: "Erbil", ar: "أربيل", ku: "هەولێر" },
        address: {
          en: "ONLINE",
          ar: "ONLINE",
          ku: "ONLINE",
        },
      },
    ],
  },
};
