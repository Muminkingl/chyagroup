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
    phone: "+964 750 123 4567",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Lamat Al Marjan",
      ar: "شركة لمعة المرجان",
      ku: "کۆمپانیای لمعة المرجان",
    },
    tagline: {
      en: "Premium Construction & Building Materials",
      ar: "المواد الإنشائية ومواد البناء الممتازة",
      ku: "کەرستەی بیناسازی نایاب",
    },
    description: {
      en: "Lamat Al Marjan is the premier general trading entity under Chya Group, established on November 30, 2019. We specialize in supplying high-quality construction materials, wood, MDF, steel, cement, concrete, and furniture to major infrastructure developments across the region.",
      ar: "شركة لمعة المرجان هي الكيان التجاري العام الرائد تحت مظلة مجموعة چيا، تأسست في 30 نوفمبر 2019. نحن متخصصون في توريد مواد البناء عالية الجودة، والأخشاب، والـ MDF، والحديد، والإسمنت، والخرسانة، والأثاث لمشاريع البنية التحتية الكبرى في المنطقة.",
      ku: "کۆمپانیای لەمعەت ئەلمەرجان یەکەم و سەرەکیترین کۆمپانیای بازرگانی گشتییە لەژێر چەتری چیا گرووپ، کە لە ٣٠ی تشرینی دووەمی ٢٠١٩ دامەزراوە. ئێمە پسپۆڕین لە دابینکردنی کەرستەی بیناسازی کوالێتی بەرز، دار، MDF، ئاسن، چیمەنتۆ، کۆنکرێت و مۆبیلیات بۆ پڕۆژە گەورەکانی ناوچەکە.",
    },
    services: {
      en: ["High-Quality Wood & MDF Supply", "Steel & Structural Metals", "Cement & Readymix Concrete", "Premium Office & Home Furniture", "Bulk Supply Logistics"],
      ar: ["توريد الأخشاب والـ MDF عالية الجودة", "الحديد والمعادن الهيكلية", "الإسمنت والخرسانة الجاهزة", "الأثاث المكتبي والمنزلي الفاخر", "خدمات اللوجستيات والتوريد بالجملة"],
      ku: ["دابینکردنی داری کوالێتی بەرز و MDF", "ئاسن و کانزا بیناسازییەکان", "چیمەنتۆ و کۆنکرێتی ئامادەکراو", "مۆبیلیاتی نایابی نووسینگە و ماڵان", "لۆجیستیک و دابینکردنی بەکۆم"],
    },
    branches: [
      {
        city: { en: "Erbil HQ", ar: "مقر أربيل", ku: "بارەگای سەرەکی هەولێر" },
        address: {
          en: "Runaki Street, Erbil 44001, Kurdistan Region, Iraq",
          ar: "شارع رونامي، أربيل 44001، إقليم كوردستان، العراق",
          ku: "شەقامی ڕووناکی، هەولێر 44001، هەرێمی کوردستان، عێراق",
        },
      },
    ],
  },
  chyaymateen: {
    id: "chyaymateen",
    sectorId: "general-trading",
    logo: "/brands/chyaymat.png",
    logoScale: 1.5,
    qrLink: "https://www.instagram.com/chyay_mateen.co?igsh=NWljZDg1ZnR6NWJm",
    email: "chyaymateen2026@gmail.com",
    phone: "+964 750 123 4568",
    heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Chyay Mateen",
      ar: "شركة جياى متين",
      ku: "کۆمپانیای چیای مەتین",
    },
    tagline: {
      en: "Electronics, Clothing & Household Wholesale",
      ar: "تجارة الأجهزة الإلكترونية والملابس والأدوات المنزلية بالجملة",
      ku: "بازرگانی گشتی ئامێرەکان، پۆشاک و کەلوپەلی ناوماڵ",
    },
    description: {
      en: "Chyay Mateen stands as a major expansion of our General Trading sector, established on March 1, 2026. The company specializes in wholesale distribution of consumer electronic devices, premium household goods, apparel, and high-quality second-hand goods across local markets.",
      ar: "تعد شركة جياى متين توسعاً كبيراً لقطاع التجارة العامة لدينا، تأسست في 1 مارس 2026. وتتخصص الشركة في التوزيع بالجملة للأجهزة الإلكترونية الاستهلاكية، والأدوات المنزلية الممتازة، والملابس، والسلع المستعملة عالية الجودة في الأسواق المحلية.",
      ku: "کۆمپانیای چیای مەتین فراوانبوونێکی گەورەی کەرتی بازرگانی گشتییە کە لە ١ی ئازاری ٢٠٢٦ دامەزراوە. کۆمپانیاکە پسپۆڕە لە دابینکردنی کۆفرۆشی ئامێرە ئەلیکترۆنییەکان، کەلوپەلی ناوماڵ، جلوبەرگ و کاڵای بەکارهاتووی کوالێتی بەرز بۆ بازاڕەکانی ناوچەکە.",
    },
    services: {
      en: ["Consumer Electronics Wholesale", "Premium Household Items Supply", "Apparel & Textiles Distribution", "High-Quality Second-hand Goods", "Regional Distribution Network"],
      ar: ["جملة الأجهزة الإلكترونية الاستهلاكية", "توريد الأدوات المنزلية الممتازة", "توزيع الملابس والمنسوجات", "سلع مستعملة عالية الجودة", "شبكة التوزيع الإقليمية"],
      ku: ["کۆفرۆشی ئامێرە ئەلیکترۆنییەکان", "دابینکردنی کەلوپەلی ناوماڵ", "دابەشکردنی جلوبەرگ و قوماش", "کاڵای بەکارهاتووی کوالێتی بەرز", "تۆڕی دابەشکردنی ناوچەیی"],
    },
    branches: [
      {
        city: { en: "Erbil HQ", ar: "مقر أربيل", ku: "بارەگای سەرەکی هەولێر" },
        address: {
          en: "Runaki Street, Erbil 44001, Kurdistan Region, Iraq",
          ar: "شارع رونامي، أربيل 44001، إقليم كوردستان، العراق",
          ku: "شەقامی ڕووناکی، هەولێر 44001، هەرێمی کوردستان، عێراق",
        },
      },
    ],
  },
  chyaamazon: {
    id: "chyaamazon",
    sectorId: "general-trading",
    logo: "/brands/Chya Amazon-1.png",
    logoScale: 1.25,
    qrLink: "https://www.instagram.com/chya_amazon.iq?igsh=cHQzbXV5aHc4amhj",
    email: "chyaamazon2026@gmail.com",
    phone: "+964 750 123 4569",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Chya Amazon",
      ar: "مشروع جيا أمازون",
      ku: "چیا ئەمازۆن",
    },
    tagline: {
      en: "Certified Wholesale & Retail Second-Hand Goods",
      ar: "تجارة السلع المستعملة المعتمدة بالتجزئة والجملة",
      ku: "پڕۆژەی فرۆشتنی کاڵای بەکارهاتوو بەکۆ و تاک",
    },
    description: {
      en: "Chya Amazon is an active general trading initiative operating on Rawanduz Road, Soran. Launched on March 1, 2026, the project delivers high-grade second-hand consumer goods, clothing, and housewares in both retail and wholesale markets following strict quality assurance standards.",
      ar: "مشروع جيا أمازون هو مبادرة تجارية عامة نشطة تعمل على طريق رواندز في سوران. تم إطلاق المشروع في 1 مارس 2026، ويقدم سلعاً مستعملة عالية الجودة، وملابس، وأدوات منزلية في أسواق الجملة والتجزئة وفقاً لمعايير الجودة الصارمة.",
      ku: "پڕۆژەی چیا ئەمازۆن کارێکی بازرگانی گشتی چالاکە لەسەر ڕێگای ڕواندز لە سۆران. لە ١ی ئازاری ٢٠٢٦ دەستی پێکردووە، کاڵای بەکارهاتووی کوالێتی بەرز، جلوبەرگ و پێداویستییەکانی ناوماڵ بە شێوەی تاک و کۆ بە کوالێتییەکی نایاب پێشکەش دەکات.",
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
          en: "Rawanduz Road, Independent Administration of Soran, Iraq",
          ar: "طريق رواندز، إدارة سوران المستقلة، العراق",
          ku: "ڕێگای ڕواندز، ئیدارەی سەربەخۆی سۆران، عێراق",
        },
      },
    ],
  },
  khakisarwar: {
    id: "khakisarwar",
    sectorId: "money-exchange",
    logo: "/brands/khakisarwar.png",
    logoScale: 1.25,
    qrLink: "https://www.instagram.com/khaki_sarwar.co?igsh=MW43NXdoamhsODJoYg==",
    email: "khakisarwar2025@gmail.com",
    phone: "+964 750 234 5678",
    heroImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Khaki Sarwar",
      ar: "شركة خاكى سەروەر",
      ku: "کۆمپانیای خاکی سەروەر",
    },
    tagline: {
      en: "Secure Currency Exchange & Global Wire Transfers",
      ar: "صرافة آمنة وحوالات مالية عالمية",
      ku: "خزمەتگوزاری ئاڵوگۆڕی دراو و حەواڵەی جیهانی",
    },
    description: {
      en: "Khaki Sarwar Company is an authorized financial services provider within Chya Group's Money Exchange sector, established on February 16, 2025. Located on Pirmam Road inside BM2 station, we deliver highly secure, swift currency conversions and instant local and international money transfers.",
      ar: "شركة خاكي سرور هي مزود معتمد للخدمات المالية ضمن قطاع الصيرفة في مجموعة چيا، تأسست في 16 فبراير 2025. تقع على طريق بيرمام داخل محطة BM2، وتقدم تحويلات عملات آمنة للغاية وسريعة وحوالات مالية فورية محلياً ودولياً.",
      ku: "کۆمپانیای خاکی سەروەر دابینکەرێکی ڕێپێدراوی خزمەتگوزارییە داراییەکانە لەژێر چەتری سێکتەری ئاڵوگۆڕی دراوی چیا گرووپ، کە لە ١٦ی شوباتی ٢٠٢٥ دامەزراوە. کەوتووەتە سەر ڕێگای پیرمام لە ناو بەنزینخانەی BM2، خزمەتگوزاری گۆڕینەوەی دراو و حەواڵەی خێرا و پارێزراو پێشکەش دەکات.",
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
          en: "Pirmam Road, Inside BM2 Petrol Station, Erbil, Iraq",
          ar: "طريق بيرمام، داخل محطة وقود BM2، أربيل، العراق",
          ku: "ڕێگای پیرمام، ناو بەنزینخانەی BM2، هەولێر، عێراق",
        },
      },
    ],
  },
  hangawexchange: {
    id: "hangawexchange",
    sectorId: "money-exchange",
    logo: "/brands/hangawexchange.png",
    logoScale: 1.45,
    qrLink: "https://www.instagram.com/hangaw_exchangemoney?igsh=M2h4ZTEyZmRud21y",
    email: "hangawexchange2024@gmail.com",
    phone: "+964 750 234 5679",
    heroImage: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Hangaw Exchange",
      ar: "مکتب هەنگاو",
      ku: "نووسینگەی هەنگاو",
    },
    tagline: {
      en: "Rapid Transactions & Verified Financial Services",
      ar: "معاملات سريعة وخدمات مالية معتمدة",
      ku: "مامەڵەی دارایی خێرا و خزمەتگوزاری دارایی باوەڕپێکراو",
    },
    description: {
      en: "Hangaw Exchange is a core operational branch under our financial service division, established on March 21, 2024 on Runaki Two-Way Street. We provide instant local and international money transfers and currency exchange options, backed by major bank partnerships and competitive market rates.",
      ar: "مكتب هەنگاو للصرافة هو فرع تشغيلي رئيسي ضمن قسم الخدمات المالية لدينا، تأسس في 21 مارس 2024 في شارع رونامي ذو السايدين. نحن نقدم خدمات تحويل الأموال الفورية محلياً ودولياً وخيارات صرافة العملات، بدعم من شراكات بنكية كبرى وأسعار سوق تنافسية.",
      ku: "نووسینگەی هەنگاو لقێکی سەرەکی کارکردنی سێکتەری دارایی و ئاڵوگۆڕی دراوە کە لە ٢١ی ئازاری ٢٠٢٤ لەسەر شەقامی دووسایدی ڕووناکی دامەزراوە. خزمەتگوزاری حەواڵەکردنی خێرا بۆ سەرانسەری جیهان و گۆڕینەوەی دراو بە نرخێکی ڕکابەری بازاڕ دابین دەکات.",
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
          en: "Two-Way Runaki Street, Erbil, Iraq",
          ar: "شارع رونامي ذو السايدين، أربيل، العراق",
          ku: "شەقامی ڕووناکی دووساید، هەولێر، عێراق",
        },
      },
    ],
  },
  chyaexchange: {
    id: "chyaexchange",
    sectorId: "money-exchange",
    logo: "/brands/chyaexchnage.png",
    logoScale: 1.25,
    qrLink: "https://www.instagram.com/chya_exchangemoney?igsh=c3VnYzMxY2o5OGVu",
    email: "chyaexchange2021@gmail.com",
    phone: "+964 750 234 5680",
    heroImage: "https://images.unsplash.com/photo-1601597111158-2fceff270190?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Chya Exchange",
      ar: "مكتب جيا",
      ku: "نووسینگەی چیا",
    },
    tagline: {
      en: "The Region's Trusted Currency & Financial Gateway",
      ar: "بوابة الصرافة والخدمات المالية الموثوقة في المنطقة",
      ku: "دەروازەی دارایی و ئاڵوگۆڕی دراوی جێی متمانەی ناوچەکە",
    },
    description: {
      en: "Chya Exchange is the pioneer financial entity under Chya Group, established on June 14, 2021 in the Old Bourse of Erbil. We serve as the core currency gateway for thousands of corporate and individual clients, offering wire transfers, cash management, and cross-border bank payments worldwide.",
      ar: "مكتب جيا للصرافة هو الكيان المالي الرائد في مجموعة چيا، تأسس في 14 يونيو 2021 في بورصة أربيل القديمة. نحن نعمل كبوابة العملات الرئيسية لآلاف العملاء من الشركات والأفراد، ونقدم الحوالات البرقية وإدارة النقد والمدفوعات البنكية العابرة للحدود في جميع أنحاء العالم.",
      ku: "نووسینگەی چیا یەکەم و سەرەکیترین لقی سێکتەری دارایی چیا گرووپە کە لە ١٤ی حوزەیرانی ٢٠٢١ لە بۆرسەی کۆنی هەولێر دامەزراوە. وەک دەروازەیەکی سەرەکی ئاڵوگۆڕی دراو خزمەت بە هەزاران کڕیار دەکات و حەواڵەکردنی پارە بۆ سەرانسەری جیهان بە کاش یان حیسابی بانکی جێبەجێ دەکات.",
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
          en: "Old Bourse of Erbil City, Erbil, Iraq",
          ar: "البورصة القديمة لمدينة أربيل، أربيل، العراق",
          ku: "بۆرسەی کۆنی شاری هەولێر، هەولێر، عێراق",
        },
      },
    ],
  },
  chyagold: {
    id: "chyagold",
    sectorId: "money-exchange",
    logo: "/brands/qapat-1.png",
    logoScale: 1.5,
    qrLink: "https://www.instagram.com/chya_gold.turkey?igsh=NTV1dm9vMzlrcHhi",
    email: "chyagold2023@gmail.com",
    phone: "+90 530 123 4567",
    heroImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Chya Gold",
      ar: "مكتب جيا كولد",
      ku: "نووسینگەی چیا گۆڵد",
    },
    tagline: {
      en: "Cross-Border Currency Solutions & Turkey Money Transfers",
      ar: "حلول العملات العابرة للحدود وحوالات الأموال في تركيا",
      ku: "ئاڵوگۆڕی دراو و حەواڵەی دارایی لەگەڵ وڵاتی تورکیا",
    },
    description: {
      en: "Chya Gold (Chya Altın) was established on August 28, 2023 in the Silopi District of Sirnak, Turkey, to bridge our regional financial services with international networks. We provide secure currency exchange and express transfer channels to all cities and bank accounts within Turkey.",
      ar: "تأسس مكتب جيا كولد للصرافة في 28 أغسطس 2023 في منطقة سيلوبي بمدينة شرناخ في تركيا، لربط خدماتنا المالية الإقليمية بالشبكات الدولية. نحن نقدم قنوات آمنة لصرافة العملات والتحويلات السريعة لجميع المدن والحسابات البنكية داخل تركيا.",
      ku: "نووسینگەی چیا گۆڵد (چیای زێڕین) لە ٢٨ی ئابی ٢٠٢٣ لە قەزای سیلۆپی لە شاری شرناخ لە وڵاتی تورکیا دامەزراوە، بە مەبەستی بەستنەوەی تۆڕە داراییەکانمان بە دەرەوە. خزمەتگوزاری گۆڕینەوەی دراو و گواستنەوەی پارە بۆ سەرجەم بانک و شارەکانی ناو تورکیا دابین دەکات.",
    },
    services: {
      en: ["Turkey-Wide Bank Transfers", "Cross-Border Remittances", "Lira & Foreign Currency Conversion", "B2B Financial Gateways", "Immediate Cash Collections"],
      ar: ["تحويلات بنكية داخل تركيا", "حوالات مالية عابرة للحدود", "تحويل الليرة والعملات الأجنبية", "بوابات مالية للشركات", "الاستلام النقدي الفوري"],
      ku: ["حەواڵەی بانکی بۆ سەرانسەری تورکیا", "حەواڵەی دارایی فرە-سنوور", "گۆڕینەوەی لیرە و دراوە بیانییەکان", "دەروازەی دارایی بۆ کۆمپانیاکان", "وەرگرتنی کاش بە شێوەی دەستبەجێ"],
    },
    branches: [
      {
        city: { en: "Sirnak, Turkey", ar: "شرناخ، تركيا", ku: "شرناخ، تورکیا" },
        address: {
          en: "Silopi District, Sirnak City, Turkey",
          ar: "قضاء سيلوبي، مدينة شرناخ، تركيا",
          ku: "قەزای سیلۆپی، شاری شرناخ، تورکیا",
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
    phone: "+964 750 234 5681",
    heroImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Lutkay Chya",
      ar: "مكتب لوتكەی جيا",
      ku: "نووسینگەی لوتکەی چیا",
    },
    tagline: {
      en: "Premium Financial Conversions & Secure Card Services",
      ar: "تحويلات مالية ممتازة وخدمات بطاقات آمنة",
      ku: "خزمەتگوزاری دارایی ئاست بەرز و حەواڵەی کارتەکان",
    },
    description: {
      en: "Lutkay Chya Exchange was founded on October 20, 2024 in Ankawa, Erbil, to offer specialized retail financial solutions. We provide high-security currency conversions, global bank card loading, and cash remittances, catering to the diverse local and expat community in Ankawa.",
      ar: "تأسس مكتب لوتكەی جيا للصرافة في 20 أكتوبر 2024 في عنكاوا بأربيل، لتقديم حلول مالية متخصصة للأفراد. نحن نقدم تحويلات عملات عالية الأمان، وشحن بطاقات البنوك العالمية، والحوالات النقدية، لتلبية احتياجات المجتمع المحلي والمغتربين في عنكاوا.",
      ku: "نووسینگەی لوتکەی چیا لە ٢٠ی تشرینی یەکەمی ٢٠٢٤ لە گەڕەکی عەنکاوە لە شاری هەولێر دامەزراوە بۆ پێشکەشکردنی خزمەتگوزاری دارایی بە کڕیاران. گۆڕینەوەی دراوی پارێزراو، بارکردنی کارتە بانکییە جیهانییەکان و حەواڵەی کاش بە کوالێتی بەرز پێشکەش دەکات.",
    },
    services: {
      en: ["International Card Transactions", "Multi-Currency Exchange", "Secure Cash Disbursements", "Expatriate Remittance Support", "Fast Local Transfers"],
      ar: ["معاملات البطاقات الدولية", "صرافة العملات المتعددة", "صرف النقود الآمن", "دعم حوالات المغتربين", "تحويلات محلية سريعة"],
      ku: ["مامەڵەی کارتە نێودەوڵەتییەکان", "گۆڕینەوەی دراوە جیاوازەکان", "ڕادەستکردنی کاش بە شێوەی پارێزراو", "پشتیوانی حەواڵەی بیانییەکان", "حەواڵەی ناوخۆیی خێرا"],
    },
    branches: [
      {
        city: { en: "Erbil — Ankawa", ar: "أربيل — عنكاوا", ku: "هەولێر — عەنکاوە" },
        address: {
          en: "Ankawa Neighborhood, Erbil, Iraq",
          ar: "حي عنكاوا، أربيل، العراق",
          ku: "گەڕەکی عەنکاوە، هەولێر، عێراق",
        },
      },
    ],
  },
  barzychya: {
    id: "barzychya",
    sectorId: "money-exchange",
    logo: "/brands/BARZY CHYAY-1.png",
    logoScale: 1.15,
    qrLink: "https://www.instagram.com/barzy.chya_exchange?igsh=MnhwZHE2aGoweWU0",
    email: "barzychya2025@gmail.com",
    phone: "+964 750 234 5682",
    heroImage: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Barzy Chya",
      ar: "مکتب بەرزی جيا",
      ku: "نووسینگەی بەرزی چیا",
    },
    tagline: {
      en: "Soran's Leading Exchange & Money Transfer Services",
      ar: "خدمات الصرافة وتحويل الأموال الرائدة في سوران",
      ku: "پێشەنگی خزمەتگوزاری دارایی و حەواڵە لە دەڤەری سۆران",
    },
    description: {
      en: "Barzy Chya Exchange is our premier financial branch serving the Independent Administration of Soran, established on March 6, 2025. Located in the city center opposite Langa Market, the branch provides comprehensive currency conversions and rapid global wire transfers to the local community.",
      ar: "مكتب بەرزی جيا للصرافة هو فرعنا المالي الرائد الذي يخدم إدارة سوران المستقلة، تأسس في 6 مارس 2025. يقع في وسط المدينة مقابل سوق لانكة، ويقدم خدمات صرافة شاملة وحوالات برقية سريعة للمجتمع المحلي.",
      ku: "نووسینگەی بەرزی چیا لقێکی پێشەنگی داراییە کە خزمەت بە دەڤەری سۆران دەکات و لە ٦ی ئازاری ٢٠٢٥ دامەزراوە. کەوتووەتە سەنتەری شار بەرامبەر بازاڕی لەنگە، خزمەتگوزاری گۆڕینەوەی دراو و حەواڵەی خێرا و گشتی بۆ کڕیاران جێبەجێ دەکات.",
    },
    services: {
      en: ["Foreign Currency Exchange", "Global Wire Remittances", "Cash Collection & Payouts", "Direct Local Bank Deposits", "Soran Region Financial Support"],
      ar: ["صرافة العملات الأجنبية", "الحوالات المالية العالمية", "تحصيل وصرف المبالغ النقدية", "الإيداع المباشر في البنوك المحلية", "الدعم المالي لمنطقة سوران"],
      ku: ["ئاڵوگۆڕی دراوە بیانییەکان", "حەواڵەی دارایی جیهانی", "کۆکردنەوە و ڕادەستکردنی کاش", "سپاردنی ڕاستەوخۆ لە بانکە ناوخۆییەکان", "پشتیوانی دارایی ناوچەی سۆران"],
    },
    branches: [
      {
        city: { en: "Soran", ar: "سوران", ku: "سۆران" },
        address: {
          en: "City Center, Opposite Langa Market, Soran, Iraq",
          ar: "وسط المدينة، مقابل سوق لانكة، سوران، العراق",
          ku: "ناوەندی شار، بەرامبەر بازاڕی لەنگە، سۆران، عێراق",
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
    phone: "+964 750 234 5683",
    heroImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Manfaz Dibaga",
      ar: "منفذ ديبكة",
      ku: "منفذ دیبەگە",
    },
    tagline: {
      en: "Official Government Payroll & Secure Card Services",
      ar: "منفذ رواتب الموظفين الرسمي وخدمات البطاقات الآمنة",
      ku: "مەنفەزی فەرمی دابەشکردنی مووچە و کارتە ئەلیکترۆنییەکان",
    },
    description: {
      en: "Manfaz Dibaga payroll processing center was established on August 1, 2025 inside Hangaw Exchange office on Runaki Street, Erbil. We serve as an official payout channel for military, civil, and retirement salaries, specializing in Qi Card, Super Qi, and MasterCard processing.",
      ar: "تأسس منفذ ديبكة لصرف الرواتب في 1 أغسطس 2025 داخل مكتب هەنگاو في شارع رونامي بأربيل. نحن نعمل كقناة صرف رسمية لرواتب العسكريين والمدنيين والمتقاعدين، ونتخصص في معالجة خدمات كي كارد، سوبر كي، وماستر كارد.",
      ku: "مەنفەزی دیبەگە بۆ دابەشکردنی مووچە لە ١ی ئابی ٢٠٢٥ لە ناو نووسینگەی هەنگاو لە شەقامی ڕووناکی لە شاری هەولێر دامەزراوە. وەک دەستەیەکی فەرمی بۆ دابەشکردنی مووچەی سەربازی، مەدەنی و خانەنشینی کاردەکات و تایبەتمەندە لە خزمەتگوزارییەکانی (کی کارت، سوپەر کی، ماستەر کارت).",
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
          en: "Two-Way Runaki Street, Inside Hangaw Exchange Office, Erbil, Iraq",
          ar: "شارع رونامي ذو السايدين، داخل مكتب هەنگاو، أربيل، العراق",
          ku: "شەقامی ڕووناکی دووساید، لەناو نووسینگەی هەنگاو، هەولێر، عێراق",
        },
      },
    ],
  },
  chyaphone: {
    id: "chyaphone",
    sectorId: "mobile-tech",
    logo: "/brands/chya phone-1.png",
    logoScale: 1.25,
    qrLink: "https://www.instagram.com/chya_phone.iq?igsh=MTcza2o2azEwbjlxYg==",
    email: "chyaphone2026@gmail.com",
    phone: "+964 750 345 6789",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Chya Phone",
      ar: "محل جيا فون",
      ku: "پێشانگای چیا فۆن",
    },
    tagline: {
      en: "Latest Smart Devices, Laptops & Premium Accessories",
      ar: "أحدث الأجهزة الذكية واللابتوبات والإكسسوارات المميزة",
      ku: "نوێترین ئامێرەکانی مۆبایل، لاپتۆپ و ئێکسسواراتی نایاب",
    },
    description: {
      en: "Chya Phone is a premier retail and wholesale technology showroom, established on March 24, 2026 in Soran city center. We supply the latest mobile smartphones, iPads, high-performance laptops, and genuine electronics accessories, accompanied by professional hardware support services.",
      ar: "محل جيا فون هو معرض رائد للتكنولوجيا بالتجزئة والجملة، تأسس في 24 مارس 2026 في وسط مدينة سوران. نحن نوفر أحدث الهواتف الذكية، وأجهزة الآيباد، واللابتوبات عالية الأداء، والإكسسوارات الإلكترونية الأصلية، مصحوبة بخدمات دعم فني محترفة.",
      ku: "پێشانگای چیا فۆن ناوەندێکی پێشەنگی کڕین و فرۆشتنی مۆبایل و ئامێرە زیرەکەکانە کە لە ٢٤ی ئازاری ٢٠٢٦ لە سەنتەری شاری سۆران دامەزراوە. نوێترین مۆبایل، ئایپاد، لاپتۆپ، کۆمپیوتەر و ئێکسسواراتی ئەسڵی لەگەڵ خزمەتگوزاری چاککردنەوەی پیشەیی پێشکەش دەکات.",
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
          en: "City Center, Independent Administration of Soran, Iraq",
          ar: "وسط المدينة، إدارة سوران المستقلة، العراق",
          ku: "ناوەندی شار، ئیدارەی سەربەخۆی سۆران، عێراق",
        },
      },
    ],
  },
  chyatech: {
    id: "chyatech",
    sectorId: "mobile-tech",
    logo: "/brands/chyatech.png",
    logoScale: 2.15,
    qrLink: "https://www.instagram.com/chya_tech.iq?igsh=MTNzcWp5a2F4d3dmZg==",
    email: "chyatech2025@gmail.com",
    phone: "+964 750 345 6790",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Chya Tech",
      ar: "جيا تيك",
      ku: "کاری چیا تێك",
    },
    tagline: {
      en: "Advanced Accounting, Archiving & Software Systems",
      ar: "أنظمة المحاسبة والأرشفة والبرمجيات المتقدمة",
      ku: "سیستمە پێشکەوتووەکانی ژمێریاری، ئەرشیفکردن و نەرمەکاڵا",
    },
    description: {
      en: "Chya Tech is a specialized IT and systems integration company founded on August 11, 2025 on Runaki Street, Erbil. We focus on designing and deploying enterprise accounting systems, database archiving, personnel management software, alongside selling specialized business hardware.",
      ar: "شركة جيا تيك هي شركة متخصصة في تكنولوجيا المعلومات وتكامل الأنظمة، تأسست في 11 أغسطس 2025 في شارع رونامي بأربيل. نحن نركز على تصميم ونشر أنظمة المحاسبة للمؤسسات، وأرشفة قواعد البيانات، وبرامج إدارة الموظفين، إلى جانب بيع الأجهزة المكتبية المتخصصة.",
      ku: "چیا تێک کارێکی پێشکەوتووی تەکنەلۆژیا و سیستمەکانە کە لە ١١ی ئابی ٢٠٢٥ لەسەر شەقامی ڕووناکی لە شاری هەولێر دامەزراوە. پسپۆڕین لە دامەزراندن و داڕشتنی سیستمەکانی ژمێریاری، ئامار، ئەرشیفکردن و نەرمەکاڵای کارمەندان، شانبەشانی فرۆشتنی ئامێرە ئەلیکترۆنییەکان.",
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
          en: "Runaki Street, Erbil 44001, Kurdistan Region, Iraq",
          ar: "شارع رونامي، أربيل 44001، إقليم كوردستان، العراق",
          ku: "شەقامی ڕووناکی، هەولێر 44001، هەرێمی کوردستان، عێراق",
        },
      },
    ],
  },
  blueprinting: {
    id: "blueprinting",
    sectorId: "printing",
    logo: "/brands/BLUE PRINT-1.png",
    logoScale: 1.8,
    qrLink: "https://www.instagram.com/blue.printing_office?igsh=MTk4MHU0NHc3eXBxNg==",
    email: "blueprinting2025@gmail.com",
    phone: "+964 750 456 7890",
    heroImage: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Blue Printing",
      ar: "مکتب بلو طباعە",
      ku: "نووسینگەی بلو پرێنتینگ",
    },
    tagline: {
      en: "High-Quality Printing, Photography & Official Form Services",
      ar: "خدمات الطباعة والتصوير عالية الجودة والنماذج الرسمية",
      ku: "چاپی کوالێتی بەرز، فۆتۆگرافی و ڕاییکردنی فۆرمە فەرمییەکان",
    },
    description: {
      en: "Blue Printing is a professional document solutions hub, established on October 19, 2025 on Runaki Street, Erbil. We specialize in high-volume printing, studio photography, national card and passport fee payments, and scheduling government department appointments with absolute efficiency.",
      ar: "مكتب بلو برينتينغ هو مركز احترافي لحلول الوثائق، تأسس في 19 أكتوبر 2025 في شارع رونامي بأربيل. نحن متخصصون في الطباعة بكميات كبيرة، والتصوير الفوتوغرافي، ودفع رسوم البطاقة الوطنية والجوازات، وحجز مواعيد الدوائر الحكومية بكفاءة مطلقة.",
      ku: "نووسینگەی بلو پرێنتینگ سەنتەرێکی چاپەمەنی پیشەیی و ڕاییکردنی کارە کارگێڕییەکانە کە لە ١٩ی تشرینی یەکەمی ٢٠٢٥ لەسەر شەقامی ڕووناکی لە شاری هەولێر دامەزراوە. کاردەکات لە بواری چاپ، کۆپیکردن، ڕاییکردنی ڕسومات و حجزکردنی کات بۆ بەڕێوەبەرایەتی نیشتمانی و پاسپۆرت.",
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
          en: "Runaki Street, Erbil 44001, Kurdistan Region, Iraq",
          ar: "شارع رونامي، أربيل 44001، إقليم كوردستان، العراق",
          ku: "شەقامی ڕووناکی، هەولێر 44001، هەرێمی کوردستان، عێراق",
        },
      },
    ],
  },
  chyatravel: {
    id: "chyatravel",
    sectorId: "online-trading",
    logo: "/brands/CHYA travel-1.png",
    logoScale: 2.0,
    qrLink: "https://www.instagram.com/chya_travel.iq?igsh=MTFzMDE5ODV5ODN1bQ==",
    email: "chyatravel2020@gmail.com",
    phone: "+964 750 567 8901",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Chya Travel",
      ar: "جيا تراڤل",
      ku: "کاری چیا تڕاڤل",
    },
    tagline: {
      en: "Global Flight Bookings, Visas & Tourism Services",
      ar: "حجوزات الطيران العالمية والتأشيرات والخدمات السياحية",
      ku: "بڕینی تکتی فڕین، فیزە و خزمەتگوزارییە گەشتیارییەکان",
    },
    description: {
      en: "Chya Travel is a trusted digital tourism portal under Chya Group's Online Trading sector, established on January 22, 2020. We provide flight bookings, worldwide visa processing, hotel accommodations, car rentals, tourism translation, and specialized medical travel assistance.",
      ar: "جيا ترافيل هي بوابة سياحية رقمية موثوقة تابعة لقطاع التجارة عبر الإنترنت في مجموعة چيا، تأسست في 22 يناير 2020. نحن نقدم حجوزات الطيران، ومعالجة التأشيرات العالمية، وحجوزات الفنادق، وتأجير السيارات، والترجمة السياحية، والمساعدة في السفر الطبي المتخصص.",
      ku: "چیا تڕاڤل پلاتفۆرمێکی دیجیتاڵی گەشتیارییە لەژێر کەرتی بازرگانی ئۆنلاینی چیا گرووپ کە لە ٢٢ی کانوونی دووەمی ٢٠٢٠ دامەزراوە. خزمەتگوزاری بڕینی تکتی فڕین، ڤیزەی سەرجەم وڵاتان، حجزی هۆتێل و ئۆتۆمبێل، ڕێنمایی گەشتیاری و وەرگێڕان پێشکەش دەکات.",
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
          en: "Runaki Street, Erbil 44001, Kurdistan Region, Iraq",
          ar: "شارع رونامي، أربيل 44001، إقليم كوردستان، العراق",
          ku: "شەقامی ڕووناکی، هەولێر 44001، هەرێمی کوردستان، عێراق",
        },
      },
    ],
  },
  kivaluxury: {
    id: "kivaluxury",
    sectorId: "online-trading",
    logo: "/brands/kivaluxary.png",
    logoScale: 1.3,
    qrLink: "https://www.instagram.com/kiva.luxuryshop?igsh=emFtbXNpbjBmMnh6",
    email: "kivaluxury2022@gmail.com",
    phone: "+964 750 567 8902",
    heroImage: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop",
    name: {
      en: "Kiva Luxury",
      ar: "كيفا لوكزوري",
      ku: "کاری کیڤا لوکژوری",
    },
    tagline: {
      en: "Authentic Jewelry, Global Watches & Premium Perfumes",
      ar: "المجوهرات الأصلية والساعات العالمية والعطور الفاخرة",
      ku: "فرۆشتنی گەوهەر، کاتژمێر و بۆنە لوکسە جیهانییەکان",
    },
    description: {
      en: "Kiva Luxury is a premium digital retail house founded on January 20, 2022 under our Online Trading sector. We specialize in sourcing and distributing authentic high-end jewelry, luxury watches, fashion accessories, and premium perfumes from major global brands directly to the regional market.",
      ar: "كيفا لوكزوري هي دار تجزئة رقمية فاخرة تأسست في 20 يناير 2022 تحت قطاع التجارة عبر الإنترنت. نحن متخصصون في استيراد وتوزيع المجوهرات الراقية الأصلية، والساعات الفاخرة، والإكسسوارات، والعطور الممتازة من كبرى العلامات التجارية العالمية مباشرة إلى السوق الإقليمية.",
      ku: "کیڤا لوکژوری ناوەندێکی لوکس و دەوڵەمەندی بازرگانی ئۆنلاینە کە لە ٢٠ی کانوونی دووەمی ٢٠٢٢ دامەزراوە. پسپۆڕە لە هاوردەکردن و بازرگانیکردن بە خشڵ و گەوهەری ئەسڵی، ئێکسسوارات، کاتژمێر و بۆنی براندە جیهانییە نایابەکان بۆ کڕیارانی ناوچەکە.",
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
          en: "Runaki Street, Erbil 44001, Kurdistan Region, Iraq",
          ar: "شارع رونامي، أربيل 44001، إقليم كوردستان، العراق",
          ku: "شەقامی ڕووناکی، هەولێر 44001، هەرێمی کوردستان، عێراق",
        },
      },
    ],
  },
};
