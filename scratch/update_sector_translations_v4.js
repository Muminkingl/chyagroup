const fs = require('fs');
const path = require('path');

const sectorPath = path.join(__dirname, '../src/i18n/sector-translations.ts');

if (fs.existsSync(sectorPath)) {
    let content = fs.readFileSync(sectorPath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // 1. English: Replace the long paragraph with simplified 16 banks text
        if (line.trim().startsWith('"Our Network Includes Key Operational Arms') && i < 100) {
            lines[i] = `        "Our network is backed by ( 16 ) bank & company agents to provide unparalleled financial reliability." ,`;
        }

        // 2. Arabic: Replace the long paragraph with simplified 16 banks text
        else if (line.trim().startsWith('"تضم شبكتنا أذرعاً تشغيلية رئيسية تشمل') && i > 200 && i < 260) {
            lines[i] = `        "تضم شبكتنا ( 16 ) وكيل بنك و شركة لتقديم موثوقية مالية لا مثيل لها." ,`;
        }

        // 3. Kurdish: Replace the long paragraph with simplified 16 banks text
        else if (line.trim().startsWith('"ئەم سێکتەرە چەندین لقی چالاک لەخۆدەگرێت وەک') && i > 100 && i < 160) {
            lines[i] = `        "تۆڕەکەمان بە پاڵپشتی ( 16 ) بریکاری بانک و کۆمپانیاکان کار دەکات بۆ پێشکەشکردنی متمانەی دارایی بێوێنە." ,`;
        }
    }

    content = lines.join('\n');
    fs.writeFileSync(sectorPath, content, 'utf8');
    console.log('Successfully simplified paragraph 2 in sector-translations.ts');
}
