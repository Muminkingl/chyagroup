const fs = require('fs');
const path = require('path');

const sectorPath = path.join(__dirname, '../src/i18n/sector-translations.ts');

if (fs.existsSync(sectorPath)) {
    let content = fs.readFileSync(sectorPath, 'utf8');

    // Update English Turkey branch entry to full address
    content = content.replace(
        /\{\s*city:\s*"Silopi\s*,\s*Şırnak\s*,\s*Türkiye"\s*,\s*address:\s*"Silopi\s*District\s*,\s*Şırnak\s*\(\s*Chya\s*Gold\s*Exchange\s*\)"\s*\}/g,
        `{ city: "Silopi , Şırnak , Türkiye" , address: "1. Cadde , Silopi , Şırnak , Türkiye ( Chya Gold Exchange )" }`
    );

    // Update Kurdish Turkey branch entry to full address
    content = content.replace(
        /\{\s*city:\s*"سیلۆپی\s*،\s*شرناخ\s*،\s*تورکیا"\s*,\s*address:\s*"قەزای\s*سیلۆپی\s*،\s*شرناخ\s*\(\s*نوسینگەی\s*چیای\s*زێڕین\s*\)"\s*\}/g,
        `{ city: "سیلۆپی ، شرناخ ، تورکیا" , address: "شەقامی یەکەم ، سیلۆپی ، شرناخ ، تورکیا ( نوسینگەی چیای زێڕین )" }`
    );

    // Update Arabic Turkey branch entry to full address
    content = content.replace(
        /\{\s*city:\s*"سيلوبي\s*،\s*شرناق\s*،\s*تركيا"\s*,\s*address:\s*"قضاء\s*سيلوبي\s*،\s*شرناق\s*\(\s*مكتب\s*چيا\s*الذهبي\s*\)"\s*\}/g,
        `{ city: "سيلوبي ، شرناق ، تركيا" , address: "الشارع الأول ، سيلوبي ، شرناق ، تركيا ( مكتب چيا الذهبي )" }`
    );

    fs.writeFileSync(sectorPath, content, 'utf8');
    console.log('Successfully updated branch addresses in sector-translations.ts');
}
