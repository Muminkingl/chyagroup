const fs = require('fs');
const path = require('path');

const sectorPath = path.join(__dirname, '../src/i18n/sector-translations.ts');

if (fs.existsSync(sectorPath)) {
    let content = fs.readFileSync(sectorPath, 'utf8');

    // 1. Update English money-exchange history block
    const targetEnHistory = `      "money-exchange": [
        "Chya Group Operates A Dedicated Money Exchange & Financial Service Delivering Fast , Secure , And Competitive Currency Services. Founded With ( Chya Exchange ) On 14/06/2021 In Erbil City , The Sector Expanded With ( Chya Gold ) On 28/08/2023 In Turkey To Strengthen Our International Network.",
        "Our Network Includes Key Operational Arms: ( Khaki Sarwar Co. , Chya Exchange , Chya Gold , Lutkay Chya , Barzy Chya , Hangaw Exchange , And Manfaz Dibaga ) Each Dedicated To Providing Unparalleled Financial Reliability Backed By ( 16 ) Bank & Company Agents.",
        "We Take Pride In Our Status As Authorized Agents For Major Financial Institutions , Delivering Excellence And Trust In Every Transaction We Handle."
      ],`;

    const replacementEnHistory = `      "money-exchange": [
        "Chya Group Operates A Dedicated Money Exchange & Financial Service Delivering Fast , Secure , And Competitive Currency Services. Founded With ( Chya Exchange ) On 14/06/2021 In Old Borsa , Erbil City , The Sector Expanded With ( Chya Gold ) On 28/08/2023 In Silopi , Şırnak , Turkey To Strengthen Our International Network.",
        "Our Network Includes Key Operational Arms: ( Khaki Sarwar Co. , Chya Exchange , Chya Gold , Lutkay Chya , Barzy Chya , Hangaw Exchange , And Manfaz Dibaga ) Each Dedicated To Providing Unparalleled Financial Reliability Backed By ( 16 ) Bank & Company Agents.",
        "We Take Pride In Our Status As Authorized Agents For Major Financial Institutions , Delivering Excellence And Trust In Every Transaction We Handle."
      ],`;

    content = content.replace(targetEnHistory, replacementEnHistory);

    // 2. Update Arabic money-exchange history block to use البورصة القديمة and سيلوبي، شرناق، تركيا
    const targetArHistory = `      "money-exchange": [
        "تدير مجموعة چيا قسماً مخصصاً لتصريف العملات والخدمات المالية يقدم خدمات سريعة وآمنة وتنافسية. تأسس مع ( مكتب چيا ) في 2021/06/14 في أربيل، وفي 2023/08/28 تم إطلاق ( مكتب چيا الذهبي ) في تركيا لتعزيز شبكتنا المالية الدولية.",
        "تضم شبكتنا أذرعاً تشغيلية رئيسية تشمل: ( شركة خاكي سرور، مكتب چيا، مكتب چيا الذهبي، مكتب لوتكي چيا، مكتب برزي چيا، مكتب هانكاو، و منفذ ديبكة ) حيث يلتزم كل منها بتوفير موثوقية مالية لا ميل لها بمدعم من ( 16 ) وكيل بنك و شركة.",
        "بصفتنا وكلاء معتمدين للمؤسسات المالية الكبرى، نحن نفخر بتقديم التميز والثقة في كل معاملة نقوم بها."
      ],`;

    const replacementArHistory = `      "money-exchange": [
        "تدير مجموعة چيا قسماً مخصصاً لتصريف العملات والخدمات المالية يقدم خدمات سريعة وآمنة وتنافسية. تأسس مع ( مكتب چيا ) في 2021/06/14 في البورصة القديمة ، أربيل ، وفي 2023/08/28 تم إطلاق ( مكتب چيا الذهبي ) في سيلوبي ، شرناق ، تركيا لتعزيز شبكتنا المالية الدولية.",
        "تضم شبكتنا أذرعاً تشغيلية رئيسية تشمل: ( شركة خاكي سرور ، مكتب چيا ، مكتب چيا الذهبي ، مكتب لوتكي چيا ، مكتب برزي چيا ، مكتب هانكاو ، و منفذ ديبكة ) حيث يلتزم كل منها بتوفير موثوقية مالية لا مثيل لها بدعم من ( 16 ) وكيل بنك و شركة.",
        "بصفتنا وكلاء معتمدين للمؤسسات المالية الكبرى ، نحن نفخر بتقديم التميز والثقة في كل معاملة نقوم بها."
      ],`;

    content = content.replace(targetArHistory, replacementArHistory);

    // 3. Update Kurdish money-exchange history block to use سلۆپی، شرناخ، تورکیا
    const targetKuHistory = `      "money-exchange": [
        "چیا گرووپ خاوەنی بەشێکی تایبەتی ئاڵوگۆڕی دراو و سێرڤسی داراییە کە خزمەتگوزارییەکی خێرا، پارێزراو و ڕکابەرییانە پێشکەش دەکات. بە دامەزراندنی ( نوسینگەی چیا ) لە 2021/06/14 لە بۆرسەی کۆنی شاری هەولێر دەستی پێکرد و لە 2023/08/28 لقی ( نوسینگەی چیای زێڕین ) لە سلۆپی تورکیا دامەزرا بۆ بەهێزکردنی تۆڕە داراییەکانمان.",
        "ئەم سێکتەرە چەندین لقی چالاک لەخۆدەگرێت وەک: ( کۆمپانیای خاکی سەروەر، نوسینگەی چیا، نوسینگەی چیای زێڕین، نوسینگەی لوتکەی چیا، نوسینگەی بەرزی چیا, نوسینگەی هەنگاو، و مەنفەزی دیبەگە ) کە هەموویان بە پاڵپشتی ( 16 ) بریکاری بانک و کۆمپانیاکان کار دەکەن.",
        "وەک بریکاری ڕێپێدراوی دامەزراوە داراییە سەرەکییەکان، ئێمە شانازی بە پێشکەشکردنی متمانە و وردی دەکەین لە هەموو مامەڵەیەکدا."
      ],`;

    const replacementKuHistory = `      "money-exchange": [
        "چیا گرووپ خاوەنی بەشێکی تایبەتی ئاڵوگۆڕی دراو و سێرڤسی داراییە کە خزمەتگوزارییەکی خێرا ، پارێزراو و ڕکابەرییانە پێشکەش دەکات. بە دامەزراندنی ( نوسینگەی چیا ) لە 2021/06/14 لە بۆرسەی کۆنی شاری هەولێر دەستی پێکرد و لە 2023/08/28 لقی ( نوسینگەی چیای زێڕین ) لە سلۆپی ، شرناخ ، تورکیا دامەزرا بۆ بەهێزکردنی تۆڕە داراییەکانمان.",
        "ئەم سێکتەرە چەندین لقی چالاک لەخۆدەگرێت وەک: ( کۆمپانیای خاکی سەروەر ، نوسینگەی چیا ، نوسینگەی چیای زێڕین ، نوسینگەی لوتکەی چیا ، نوسینگەی بەرزی چیا ، نوسینگەی هەنگاو ، و مەنفەزی دیبەگە ) کە هەموویان بە پاڵپشتی ( 16 ) بریکاری بانک و کۆمپانیاکان کار دەکەن.",
        "وەک بریکاری ڕێپێدراوی دامەزراوە داراییە سەرەکییەکان ، ئێمە شانازی بە پێشکەشکردنی متمانە و وردی دەکەین لە هەموو مامەڵەیەکدا."
      ],`;

    content = content.replace(targetKuHistory, replacementKuHistory);

    // 4. Update branch locations for Sirnak, Turkey to Silopi, Şırnak, Turkey (Türkiye)
    // English
    content = content.replace(
        `{ city: "Sirnak, Turkey", address: "Silopi District, Sirnak City ( Chya Gold Exchange )" }`,
        `{ city: "Silopi , Şırnak , Türkiye", address: "Silopi District , Şırnak ( Chya Gold Exchange )" }`
    );
    // Kurdish
    content = content.replace(
        `{ city: "سیلۆپی، تورکیا", address: "قەزای سیلۆپی، شاری شرناخ ( نوسینگەی چیای زێڕین )" }`,
        `{ city: "سیلۆپی ، شرناخ ، تورکیا", address: "قەزای سیلۆپی ، شرناخ ( نوسینگەی چیای زێڕین )" }`
    );
    // Arabic
    content = content.replace(
        `{ city: "سيلوبي، تركيا", address: "قضاء سيلوبي، مدينة شرناخ ( مكتب چيا الذهبي )" }`,
        `{ city: "سيلوبي ، شرناق ، تركيا", address: "قضاء سيلوبي ، شرناق ( مكتب چيا الذهبي )" }`
    );

    fs.writeFileSync(sectorPath, content, 'utf8');
    console.log('Successfully completed sector-translations.ts modifications');
}
