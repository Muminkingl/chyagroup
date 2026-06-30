const fs = require('fs');
const path = require('path');

const sectorPath = path.join(__dirname, '../src/i18n/sector-translations.ts');

if (fs.existsSync(sectorPath)) {
    let content = fs.readFileSync(sectorPath, 'utf8');

    // 1. Update English general-trading history block (First Company In The Group -> First Company In Chya Group, 2 Registered Companies -> 2 Companies)
    content = content.replace(
        `"The General Trading Sector Is The Founding Pillar Of Chya Group, Established With ( Lamat Al Marjan Co. ) On 30/11/2019  The First Company In The Group. It Specializes In Construction Materials Such As ( Wood, MDF, Furniture, Steel, Fugue, Cement, And Concrete )."`,
        `"The General Trading Sector Is The Founding Pillar Of Chya Group, Established With ( Lamat Al Marjan Co. ) On 30/11/2019  The First Company In Chya Group. It Specializes In Construction Materials Such As ( Wood, MDF, Furniture, Steel, Fugue, Cement, And Concrete )."`
    );
    content = content.replace(
        `"Today, The General Trading Sector Operates 3 Active Works — ( 2 Registered Companies And 1 Work ) Delivering Quality Products And Connecting Markets Across The Region."`,
        `"Today, The General Trading Sector Operates 3 Active Works — ( 2 Companies And 1 Work ) Delivering Quality Products And Connecting Markets Across The Region."`
    );

    // 2. Update Kurdish general-trading history block (یەکەم کۆمپانیای گرووپەکە -> یەکەم کۆمپانیای چیا گرووپ)
    content = content.replace(
        `"سێکتەری بازرگانی گشتی کۆڵەکەی سەرەکی چیا گرووپە کە بە دامەزراندنی کۆمپانیای ( لامات المرجان ) لە 2019/11/30 وەک یەکەم کۆمپانیای گرووپەکە دەستی پێکرد. ئەم سێکتەرە تایبەتمەندە لە کەرەستەی بیناسازی وەک ( دار، ئێم دی ئێف، مۆبیلیات، ئاسن، فووگە، چیمەنتۆ و کۆنکرێت )."`,
        `"سێکتەری بازرگانی گشتی کۆڵەکەی سەرەکی چیا گرووپە کە بە دامەزراندنی کۆمپانیای ( لامات المرجان ) لە 2019/11/30 وەک یەکەم کۆمپانیای چیا گرووپ دەستی پێکرد. ئەم سێکتەرە تایبەتمەندە لە کەرەستەی بیناسازی وەک ( دار، ئێم دی ئێف، مۆبیلیات، ئاسن، فووگە، چیمەنتۆ و کۆنکرێت )."`
    );

    // 3. Update Arabic general-trading history block (كأول شركة في المجموعة -> كأول شركة في مجموعة چيا, شركتين مسجلتين -> شركتين)
    content = content.replace(
        `"التجارة العامة هي العمود الفقري لمجموعة چيا، حيث بدأت بتأسيس ( شركة لمعة المرجان ) في 2019/11/30 كأول شركة في المجموعة. وهي متخصصة في مواد البناء مثل ( الخشب، الـ MDF، الأثاث، الحديد، الفوجا، الإسمنت، والخرسانة )."`,
        `"التجارة العامة هي العمود الفقري لمجموعة چيا، حيث بدأت بتأسيس ( شركة لمعة المرجان ) في 2019/11/30 كأول شركة في مجموعة چيا. وهي متخصصة في مواد البناء مثل ( الخشب، الـ MDF، الأثاث، الحديد، الفوجا، الإسمنت، والخرسانة )."`
    );
    content = content.replace(
        `"اليوم، يضم قطاع التجارة العامة 3 أعمال نشطة ( شركتين مسجلتين و عمل واحد )، مما يوفر منتجات عالية الجودة ويربط أسواق المنطقة."`,
        `"اليوم، يضم قطاع التجارة العامة 3 أعمال نشطة ( شركتين و عمل واحد )، مما يوفر منتجات عالية الجودة ويربط أسواق المنطقة."`
    );

    // 4. Update branch locations for general-trading (English, Kurdish, Arabic)
    // English replacement
    const targetEnBranches = `      "general-trading": [
        { city: "Erbil - Bakhtyari Street", address: "Bakhtyari Street , Erbil 44001, Kurdistan Region, Iraq" },
        { city: "Soran — Chya Amazon", address: "Rawanduz Road , Soran" }
      ],`;
    const replacementEnBranches = `      "general-trading": [
        { city: "Erbil — Bakhtyari Street" , address: "Bakhtyari Street , Erbil ( Lamat Al Marjan Co. )" } ,
        { city: "Erbil — Runaki Street" , address: "Runaki Street , Erbil ( Chyay Mateen Co. )" } ,
        { city: "Soran" , address: "Rawanduz Road , Soran ( Chya Amazon )" }
      ],`;
    content = content.replace(targetEnBranches, replacementEnBranches);

    // Kurdish replacement
    const targetKuBranches = `      "general-trading": [
        { city: "هەولێر - شەقامی بەختیاری", address: "شەقامی بەختیاری ، هەولێر 44001، هەرێمی کوردستان، عێراق" },
        { city: "سۆران - چیای ئەمازۆن", address: "ڕێگای ڕەواندز ، سۆران" }
      ],`;
    const replacementKuBranches = `      "general-trading": [
        { city: "هەولێر — شەقامی بەختیاری" , address: "شەقامی بەختیاری ، هەولێر ( کۆمپانیای لامات المرجان )" } ,
        { city: "هەولێر — شەقامی ڕووناکی" , address: "شەقامی ڕووناکی ، هەولێر ( کۆمپانیای چیای مەتین )" } ,
        { city: "سۆران" , address: "ڕێگای ڕەواندز ، سۆران ( چیا ئەمازۆن )" }
      ],`;
    content = content.replace(targetKuBranches, replacementKuBranches);

    // Arabic replacement
    const targetArBranches = `      "general-trading": [
        { city: "أربيل - شارع بختياري", address: "شارع بختياري ، أربيل 44001، إقليم كوردستان، العراق" },
        { city: "سوران - چيا أمازون", address: "طريق رواندز ، سوران" }
      ],`;
    const replacementArBranches = `      "general-trading": [
        { city: "أربيل — شارع بختياري" , address: "شارع بختياري ، أربيل ( شركة لمت المرجان )" } ,
        { city: "أربيل — شارع رونامي" , address: "شارع رونامي ، أربيل ( شركة جياى متين )" } ,
        { city: "سوران" , address: "طريق رواندز ، سوران ( مشروع جيا أمازون )" }
      ],`;
    content = content.replace(targetArBranches, replacementArBranches);

    fs.writeFileSync(sectorPath, content, 'utf8');
    console.log('Successfully completed sector-translations.ts modifications for general-trading');
}
