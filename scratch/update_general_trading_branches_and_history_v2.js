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
            // Check if this is inside "branches" by looking backwards for "branches: {"
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

    // 1. Replace the history descriptions (Lamaat/Lamat and Registered word deletion)
    // English history general-trading is historyOccurrences[0]
    if (historyOccurrences[0] !== undefined) {
        let start = historyOccurrences[0];
        lines[start + 1] = `        "The General Trading Sector Is The Founding Pillar Of Chya Group, Established With ( Lamat Al Marjan Co. ) On 30/11/2019  The First Company In Chya Group. It Specializes In Construction Materials Such As ( Wood, MDF, Furniture, Steel, Fugue, Cement, And Concrete ).",`;
        lines[start + 2] = `        "On 01/03/2026, The Sector Expanded With ( Chyay Mateen Co. ), The Second Company In The General Trading Sector, Specializing In ( Electronic Devices, Household Items, Clothing, And Second-Hand Goods ). On The Same Day, ( Chya Amazon ) Was Launched On Rawanduz Road In The Independent Administration Of Soran, Conducting Retail And Wholesale Of Second-Hand Goods According To The Legitimate System.",`;
        lines[start + 3] = `        "Today, The General Trading Sector Operates 3 Active Works — ( 2 Companies And 1 Work ) Delivering Quality Products And Connecting Markets Across The Region."`;
    }

    // Kurdish history general-trading is historyOccurrences[1]
    if (historyOccurrences[1] !== undefined) {
        let start = historyOccurrences[1];
        lines[start + 1] = `        "سێکتەری بازرگانی گشتی کۆڵەکەی سەرەکی چیا گرووپە کە بە دامەزراندنی کۆمپانیای ( لامات المرجان ) لە 2019/11/30 وەک یەکەم کۆمپانیای چیا گرووپ دەستی پێکرد. ئەم سێکتەرە تایبەتمەندە لە کەرەستەی بیناسازی وەک ( دار، ئێم دی ئێف، مۆبیلیات، ئاسن، فووگە، چیمەنتۆ و کۆنکرێت ).",`;
    }

    // Arabic history general-trading is historyOccurrences[2]
    if (historyOccurrences[2] !== undefined) {
        let start = historyOccurrences[2];
        lines[start + 1] = `        "التجارة العامة هي العمود الفقري لمجموعة چيا، حيث بدأت بتأسيس ( شركة لمعة المرجان ) في 2019/11/30 كأول شركة في مجموعة چيا. وهي متخصصة في مواد البناء مثل ( الخشب، الـ MDF، الأثاث، الحديد، الفوجا، الإسمنت، والخرسانة ).",`;
        lines[start + 3] = `        "اليوم، يضم قطاع التجارة العامة 3 أعمال نشطة ( شركتين و عمل واحد )، مما يوفر منتجات عالية الجودة ويربط أسواق المنطقة."`;
    }

    // 2. Replace the branches arrays
    // English branches at occurrences[0]
    if (occurrences[0] !== undefined) {
        let idx = occurrences[0];
        lines[idx + 1] = `        { city: "Erbil — Bakhtyare Street" , address: "Bakhtyare Street , Erbil ( Lamat Al Marjan Co. )" } ,`;
        lines[idx + 2] = `        { city: "Erbil — Runaki Street" , address: "Runaki Street , Erbil ( Chyay Mateen Co. )" } ,`;
        lines[idx + 3] = `        { city: "Soran" , address: "Rawanduz Road , Soran ( Chya Amazon )" }`;
    }

    // Kurdish branches at occurrences[1]
    if (occurrences[1] !== undefined) {
        let idx = occurrences[1];
        lines[idx + 1] = `        { city: "هەولێر — شەقامی بەختیاری" , address: "شەقامی بەختیاری ، هەولێر ( کۆمپانیای لامات المرجان )" } ,`;
        lines[idx + 2] = `        { city: "هەولێر — شەقامی ڕووناکی" , address: "شەقامی ڕووناکی ، هەولێر ( کۆمپانیای چیای مەتین )" } ,`;
        lines[idx + 3] = `        { city: "سۆران" , address: "ڕێگای ڕەواندز ، سۆران ( چیا ئەمازۆن )" }`;
    }

    // Arabic branches at occurrences[2]
    if (occurrences[2] !== undefined) {
        let idx = occurrences[2];
        lines[idx + 1] = `        { city: "أربيل — شارع بختياري" , address: "شارع بختياري ، أربيل ( شركة لمت المرجان )" } ,`;
        lines[idx + 2] = `        { city: "أربيل — شارع رونامي" , address: "شارع رونامي ، أربيل ( شركة جياى متين )" } ,`;
        lines[idx + 3] = `        { city: "سوران" , address: "طريق رواندز ، سوران ( مشروع جيا أمازون )" }`;
    }

    fs.writeFileSync(sectorPath, lines.join('\n'), 'utf8');
    console.log('Successfully applied all changes line-by-line');
}
