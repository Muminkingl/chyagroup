const fs = require('fs');
const path = require('path');

const sectorPath = path.join(__dirname, '../src/i18n/sector-translations.ts');

if (fs.existsSync(sectorPath)) {
    let content = fs.readFileSync(sectorPath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // 1. English
        if (line.trim().startsWith('"Chya Group Operates A Dedicated Money Exchange')) {
            lines[i] = `        "Chya Group Operates A Dedicated Money Exchange & Financial Service Delivering Fast , Secure , And Competitive Currency Services. Founded With ( Chya Exchange ) On 14/06/2021 In Old Borsa , Erbil City , The Sector Expanded With ( Chya Gold ) On 28/08/2023 In Silopi , Şırnak , Turkey To Strengthen Our International Network." ,`;
        }
        else if (line.trim().startsWith('"Our Network Includes Key Operational Arms') && i < 100) {
            lines[i] = `        "Our Network Includes Key Operational Arms: ( Khaki Sarwar Co. , Chya Exchange , Chya Gold , Lutkay Chya , Barzy Chya , Hangaw Exchange , And Manfaz Dibaga ) Each Dedicated To Providing Unparalleled Financial Reliability Backed By ( 16 ) Bank & Company Agents." ,`;
        }
        else if (line.trim().startsWith('"We Take Pride In Our Status As Authorized Agents') && i < 100) {
            lines[i] = `        "We Take Pride In Our Status As Authorized Agents For Major Financial Institutions , Delivering Excellence And Trust In Every Transaction We Handle."`;
        }

        // 2. Arabic
        else if (line.trim().startsWith('"تدير مجموعة چيا قسماً مخصصاً لتصريف العملات')) {
            lines[i] = `        "تدير مجموعة چيا قسماً مخصصاً لتصريف العملات والخدمات المالية يقدم خدمات سريعة وآمنة وتنافسية. تأسس مع ( مكتب چيا ) في 2021/06/14 في البورصة القديمة ، أربيل ، وفي 2023/08/28 تم إطلاق ( مكتب چيا الذهبي ) في سيلوبي ، شرناق ، تركيا لتعزيز شبكتنا المالية الدولية." ,`;
        }
        else if (line.trim().startsWith('"تضم شبكتنا أذرعاً تشغيلية رئيسية تشمل') && i > 200 && i < 260) {
            lines[i] = `        "تضم شبكتنا أذرعاً تشغيلية رئيسية تشمل: ( شركة خاكي سرور ، مكتب چيا ، مكتب چيا الذهبي ، مكتب لوتكي چيا ، مكتب برزي چيا ، مكتب هانكاو ، و منفذ ديبكة ) حيث يلتزم كل منها بتوفير موثوقية مالية لا مثيل لها بدعم من ( 16 ) وكيل بنك و شركة." ,`;
        }
        else if (line.trim().startsWith('"بصفتنا وكلاء معتمدين للمؤسسات المالية الكبرى') && i > 200 && i < 260) {
            lines[i] = `        "بصفتنا وكلاء معتمدين للمؤسسات المالية الكبرى ، نحن نفخر بتقديم التميز والثقة في كل معاملة نقوم بها."`;
        }

        // 3. Kurdish
        else if (line.trim().startsWith('"چیا گرووپ خاوەنی بەشێکی تایبەتی ئاڵوگۆڕی')) {
            lines[i] = `        "چیا گرووپ خاوەنی بەشێکی ئاڵوگۆڕی دراو و سێرڤسی داراییە کە خزمەتگوزارییەکی خێرا ، پارێزراو و ڕکابەرییانە پێشکەش دەکات. بە دامەزراندنی ( نوسینگەی چیا ) لە 2021/06/14 لە بۆرسەی کۆنی شاری هەولێر دەستی پێکرد و لە 2023/08/28 لقی ( نوسینگەی چیای زێڕین ) لە سلۆپی ، شرناخ ، تورکیا دامەزرا بۆ بەهێزکردنی تۆڕە داراییەکانمان." ,`;
        }
        else if (line.trim().startsWith('"ئەم سێکتەرە چەندین لقی چالاک لەخۆدەگرێت وەک') && i > 100 && i < 160) {
            lines[i] = `        "ئەم سێکتەرە چەندین لقی چالاک لەخۆدەگرێت وەک: ( کۆمپانیای خاکی سەروەر ، نوسینگەی چیا ، نوسینگەی چیای زێڕین ، نوسینگەی لوتکەی چیا ، نوسینگەی بەرزی چیا ، نوسینگەی هەنگاو ، و مەنفەزی دیبەگە ) کە هەموویان بە پاڵپشتی ( 16 ) بریکاری بانک و کۆمپانیاکان کار دەکەن." ,`;
        }
        else if (line.trim().startsWith('"وەک بریکاری ڕێپێدراوی دامەزراوە داراییە سەرەکییەکان') && i > 100 && i < 160) {
            lines[i] = `        "وەک بریکاری ڕێپێدراوی دامەزراوە داراییە سەرەکییەکان ، ئێمە شانازی بە پێشکەشکردنی متمانە و وردی دەکەین لە هەموو مامەڵەیەکدا."`;
        }
    }

    content = lines.join('\n');

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
