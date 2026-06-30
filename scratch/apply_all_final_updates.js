const fs = require('fs');
const path = require('path');

const sectorPath = path.join(__dirname, '../src/i18n/sector-translations.ts');

if (fs.existsSync(sectorPath)) {
    let content = fs.readFileSync(sectorPath, 'utf8');
    const lines = content.split('\n');

    // Find occurrences of "general-trading": [ inside branches block
    let occurrences = [];
    let historyOccurrences = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"general-trading": [')) {
            let isBranches = false;
            for (let j = i; j >= 0; j--) {
                if (lines[j].includes('branches: {')) {
                    isBranches = true;
                    break;
                }
                if (lines[j].includes('history: {')) {
                    break;
                }
            }
            if (isBranches) {
                occurrences.push(i);
            } else {
                historyOccurrences.push(i);
            }
        }
    }

    console.log('Found branches general-trading at lines:', occurrences);
    console.log('Found history general-trading at lines:', historyOccurrences);

    // 1. Update Branches (Reverse order to preserve indices)
    // Arabic branches at occurrences[2]
    if (occurrences[2] !== undefined) {
        let idx = occurrences[2];
        let start = idx + 1;
        let end = start;
        while (!lines[end].includes(']')) end++;
        lines.splice(start, end - start,
            `        { city: "أربيل — شارع بختياري" , address: "شارع بختياري ، أربيل ( شركة لمت المرجان )" } ,`,
            `        { city: "أربيل — شارع رونامي" , address: "شارع رونامي ، أربيل ( شركة جياى متين )" } ,`,
            `        { city: "سوران" , address: "طريق رواندز ، سوران ( مشروع جيا أمازون )" }`
        );
    }

    // Kurdish branches at occurrences[1]
    if (occurrences[1] !== undefined) {
        let idx = occurrences[1];
        let start = idx + 1;
        let end = start;
        while (!lines[end].includes(']')) end++;
        lines.splice(start, end - start,
            `        { city: "هەولێر — شەقامی بەختیاری" , address: "شەقامی بەختیاری ، هەولێر ( کۆمپانیای لامات المرجان )" } ,`,
            `        { city: "هەولێر — شەقامی ڕووناکی" , address: "شەقامی ڕووناکی ، هەولێر ( کۆمپانیای چیای مەتین )" } ,`,
            `        { city: "سۆران" , address: "ڕێگای ڕەواندز ، سۆران ( چیا ئەمازۆن )" }`
        );
    }

    // English branches at occurrences[0]
    if (occurrences[0] !== undefined) {
        let idx = occurrences[0];
        let start = idx + 1;
        let end = start;
        while (!lines[end].includes(']')) end++;
        lines.splice(start, end - start,
            `        { city: "Erbil — Bakhtyare Street" , address: "Bakhtyare Street , Erbil ( Lamat Al Marjan Co. )" } ,`,
            `        { city: "Erbil — Runaki Street" , address: "Runaki Street , Erbil ( Chyay Mateen Co. )" } ,`,
            `        { city: "Soran" , address: "Rawanduz Road , Soran ( Chya Amazon )" }`
        );
    }

    // Let's rebuild the lines array and find the indices for money-exchange branches
    let tempContent = lines.join('\n');
    const newLines = tempContent.split('\n');
    let meOccurrences = [];
    for (let i = 0; i < newLines.length; i++) {
        if (newLines[i].includes('"money-exchange": [')) {
            let isBranches = false;
            for (let j = i; j >= 0; j--) {
                if (newLines[j].includes('branches: {')) {
                    isBranches = true;
                    break;
                }
                if (newLines[j].includes('history: {')) {
                    break;
                }
            }
            if (isBranches) {
                meOccurrences.push(i);
            }
        }
    }

    console.log('Found branches money-exchange at lines:', meOccurrences);

    // Replace money-exchange branches in reverse order
    // Arabic money-exchange branches at meOccurrences[2]
    if (meOccurrences[2] !== undefined) {
        let idx = meOccurrences[2];
        let start = idx + 1;
        let end = start;
        while (!newLines[end].includes(']')) end++;
        newLines.splice(start, end - start,
            `        { city: "أربيل — البورصة القديمة" , address: "البورصة القديمة لمدينة أربيل ( مكتب چيا )" } ,`,
            `        { city: "أربيل — شارع رونامي" , address: "شارع رونامي دو سايد ( مكتب هانكاو ومنفذ ديبكة )" } ,`,
            `        { city: "أربيل — عنكاوا" , address: "حي عنكاوا ( مكتب لوتكي چيا )" } ,`,
            `        { city: "أربيل — طريق بيرمام" , address: "طريق بيرمام ، داخل محطة وقود BM2 ( شركة خاكي سرور )" } ,`,
            `        { city: "سوران" , address: "وسط المدينة ، مقابل سوق لانكة ( مكتب برزي چيا )" } ,`,
            `        { city: "سيلوبي ، شرناق ، تركيا" , address: "سيلوبي ، شارع شرناق ، تركيا ( مكتب چيا الذهبي )" }`
        );
    }

    // Kurdish money-exchange branches at meOccurrences[1]
    if (meOccurrences[1] !== undefined) {
        let idx = meOccurrences[1];
        let start = idx + 1;
        let end = start;
        while (!newLines[end].includes(']')) end++;
        newLines.splice(start, end - start,
            `        { city: "هەولێر — بۆرسەی کۆن" , address: "بۆرسەی کۆنی شاری هەولێر ( نوسینگەی چیا )" } ,`,
            `        { city: "هەولێر — شەقامی ڕووناکی" , address: "شەقامی ڕووناکی دووساید ( نوسینگەی هەنگاو و منفذ ديبكة ى هەنگاو )" } ,`,
            `        { city: "هەولێر — عەنکاوە" , address: "گەڕەکی عەنکاوە ( نوسینگەی لوتکەی چیا )" } ,`,
            `        { city: "هەولێر — ڕێگای پیرمام" , address: "ڕێگای پیرمام ، ناو بەنزینخانەی BM2 ( کۆمپانیای خاکی سەروەر )" } ,`,
            `        { city: "سۆران" , address: "ناوەندی شار ، بەرامبەر بازاڕی لەنگە ( نوسینگەی بەرزی چیا )" } ,`,
            `        { city: "سیلۆپی ، شرناخ ، تورکیا" , address: "سیلۆپی ، شەقامی شرناخ ، تورکیا ( نووسینگەی چیای زێڕین )" }`
        );
    }

    // English money-exchange branches at meOccurrences[0]
    if (meOccurrences[0] !== undefined) {
        let idx = meOccurrences[0];
        let start = idx + 1;
        let end = start;
        while (!newLines[end].includes(']')) end++;
        newLines.splice(start, end - start,
            `        { city: "Erbil — Old Borsa" , address: "Old Borsa Of Erbil City ( Chya Exchange )" } ,`,
            `        { city: "Erbil — Runaki Street" , address: "Two-Way Runaki Street ( Hangaw Exchange & Manfaz Dibaga )" } ,`,
            `        { city: "Erbil — Ankawa" , address: "Ankawa Road ( Lutkay Chya Exchange )" } ,`,
            `        { city: "Erbil — Pirmam Road" , address: "Pirmam Road , Inside BM OIL 2 Petrol Station ( Khaki Sarwar Co. )" } ,`,
            `        { city: "Soran" , address: "City Center , Opposite Langa Baar ( Barzy Chya Exchange )" } ,`,
            `        { city: "Silopi , Şırnak , Türkiye" , address: "Silopi District , Şırnak Street , Türkiye ( Chya Gold Exchange )" }`
        );
    }

    // 2. Replace history descriptions
    // Let's locate the historyOccurrences lines again in the newLines array
    let finalContent = newLines.join('\n');
    const finalLines = finalContent.split('\n');
    let finalHistoryOccurrences = [];
    for (let i = 0; i < finalLines.length; i++) {
        if (finalLines[i].includes('"general-trading": [') && i < 250) {
            finalHistoryOccurrences.push(i);
        }
    }
    console.log('Final history occurrences:', finalHistoryOccurrences);

    // English history general-trading is finalHistoryOccurrences[0]
    if (finalHistoryOccurrences[0] !== undefined) {
        let start = finalHistoryOccurrences[0];
        finalLines[start + 1] = `        "The General Trading Sector Is The Founding Pillar Of Chya Group, Established With ( Lamat Al Marjan Co. ) On 30/11/2019  The First Company In Chya Group. It Specializes In Construction Materials Such As ( Wood, MDF, Furniture, Steel, Fugue, Cement, And Concrete ).",`;
        finalLines[start + 2] = `        "On 01/03/2026, The Sector Expanded With ( Chyay Mateen Co. ), The Second Company In The General Trading Sector, Specializing In ( Electronic Devices, Household Items, Clothing, And Second-Hand Goods ). On The Same Day, ( Chya Amazon ) Was Launched On Rawanduz Road In The Independent Administration Of Soran, Conducting Retail And Wholesale Of Second-Hand Goods According To The Legitimate System.",`;
        finalLines[start + 3] = `        "Today, The General Trading Sector Operates 3 Active Works — ( 2 Companies And 1 Work ) Delivering Quality Products And Connecting Markets Across The Region."`;
    }

    // Kurdish history general-trading is finalHistoryOccurrences[1]
    if (finalHistoryOccurrences[1] !== undefined) {
        let start = finalHistoryOccurrences[1];
        finalLines[start + 1] = `        "سێکتەری بازرگانی گشتی کۆڵەکەی سەرەکی چیا گرووپە کە بە دامەزراندنی کۆمپانیای ( لامات المرجان ) لە 2019/11/30 وەک یەکەم کۆمپانیای چیا گرووپ دەستی پێکرد. ئەم سێکتەرە تایبەتمەندە لە کەرەستەی بیناسازی وەک ( دار، ئێم دی ئێف، مۆبیلیات، ئاسن، فووگە، چیمەنتۆ و کۆنکرێت ).",`;
        finalLines[start + 3] = `        "ئەمڕۆ، سێکتەری بازرگانی گشتی خاوەنی 3 کاری چالاکە ( 2 کۆمپانیا و 1 کار )، کە بەرهەمی کوالێتی بەرز پێشکەش دەکەن و بازاڕەکانی ناوچەکە بەیەکەوە دەبەستنەوە."`;
    }

    // Arabic history general-trading is finalHistoryOccurrences[2]
    if (finalHistoryOccurrences[2] !== undefined) {
        let start = finalHistoryOccurrences[2];
        finalLines[start + 1] = `        "التجارة العامة هي العمود الفقري لمجموعة چيا، حيث بدأت بتأسيس ( شركة لمعة المرجان ) في 2019/11/30 كأول شركة في مجموعة چيا. وهي متخصصة في مواد البناء مثل ( الخشب، الـ MDF، الأثاث، الحديد، الفوجا، الإسمنت، والخرسانة ).",`;
        finalLines[start + 3] = `        "اليوم، يضم قطاع التجارة العامة 3 أعمال نشطة ( شركتين و عمل واحد )، مما يوفر منتجات عالية الجودة ويربط أسواق المنطقة."`;
    }

    // Money Exchange History
    let meHistoryOccurrences = [];
    for (let i = 0; i < finalLines.length; i++) {
        if (finalLines[i].includes('"money-exchange": [') && i < 250) {
            meHistoryOccurrences.push(i);
        }
    }
    console.log('Final meHistoryOccurrences:', meHistoryOccurrences);

    // English money-exchange history is meHistoryOccurrences[0]
    if (meHistoryOccurrences[0] !== undefined) {
        let start = meHistoryOccurrences[0];
        finalLines[start + 1] = `        "Chya Group Operates A Dedicated Money Exchange & Financial Service Delivering Fast , Secure , And Competitive Currency Services. Founded With ( Chya Exchange ) On 14/06/2021 In Old Borsa , Erbil City , The Sector Expanded With ( Chya Gold ) On 28/08/2023 In Silopi District , Şırnak , Turkey To Strengthen Our International Network." ,`;
        finalLines[start + 2] = `        "Our network is backed by ( 16 ) bank & company agents to provide unparalleled financial reliability." ,`;
        finalLines[start + 3] = `        "We Take Pride In Our Status As Authorized Agents For Major Financial Institutions , Delivering Excellence And Trust In Every Transaction We Handle."`;
    }

    // Kurdish money-exchange history is meHistoryOccurrences[1]
    if (meHistoryOccurrences[1] !== undefined) {
        let start = meHistoryOccurrences[1];
        finalLines[start + 1] = `        "چیا گرووپ خاوەنی بەشێکی ئاڵوگۆڕی دراو و سێرڤسی داراییە کە خزمەتگوزارییەکی خێرا ، پارێزراو و ڕکابەرییانە پێشکەش دەکات. بە دامەزراندنی ( نوسینگەی چیا ) لە 2021/06/14 لە بۆرسەی کۆنی شاری هەولێر دەستی پێکرد و لە 2023/08/28 لقی ( نوسینگەی چیای زێڕین ) لە سلۆپی ، شرناخ ، تورکیا دامەزرا بۆ بەهێزکردنی تۆڕە داراییەکانمان." ,`;
        finalLines[start + 2] = `        "تۆڕەکەمان بە پاڵپشتی ( 16 ) بریکاری بانک و کۆمپانیاکان کار دەکات بۆ پێشکەشکردنی متمانەی دارایی بێوێنە." ,`;
        finalLines[start + 3] = `        "وەک بریکاری ڕێپێدراوی دامەزراوە داراییە سەرەکییەکان ، ئێمە شانازی بە پێشکەشکردنی متمانە و وردی دەکەین لە هەموو مامەڵەیەکدا."`;
    }

    // Arabic money-exchange history is meHistoryOccurrences[2]
    if (meHistoryOccurrences[2] !== undefined) {
        let start = meHistoryOccurrences[2];
        finalLines[start + 1] = `        "تدير مجموعة چيا قسماً مخصصاً لتصريف العملات والخدمات المالية يقدم خدمات سريعة وآمنة وتنافسية. تأسس مع ( مكتب چيا ) في 2021/06/14 في البورصة القديمة ، أربيل ، وفي 2023/08/28 تم إطلاق ( مكتب چيا الذهبي ) في سيلوبي ، شرناق ، تركيا لتعزيز شبكتنا المالية الدولية." ,`;
        finalLines[start + 2] = `        "تضم شبكتنا ( 16 ) وكيل بنك و شركة لتقديم موثوقية مالية لا مثيل لها." ,`;
        finalLines[start + 3] = `        "بصفتنا وكلاء معتمدين للمؤسسات المالية الكبرى ، نحن نفخر بتقديم التميز والثقة في كل معاملة نقوم بها."`;
    }

    fs.writeFileSync(sectorPath, finalLines.join('\n'), 'utf8');
    console.log('Successfully completed master update of sector-translations.ts');
}
