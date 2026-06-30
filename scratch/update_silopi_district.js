const fs = require('fs');
const path = require('path');

// 1. Update src/i18n/sector-translations.ts
const sectorPath = path.join(__dirname, '../src/i18n/sector-translations.ts');
if (fs.existsSync(sectorPath)) {
    let content = fs.readFileSync(sectorPath, 'utf8');
    
    // History text
    content = content.replace(
        `On 28/08/2023 In Silopi , Şırnak , Turkey To Strengthen Our International Network.`,
        `On 28/08/2023 In Silopi District , Şırnak , Turkey To Strengthen Our International Network.`
    );
    
    // Branch address
    content = content.replace(
        `{ city: "Silopi , Şırnak , Türkiye" , address: "Silopi , Şırnak Street , Türkiye ( Chya Gold Exchange )" }`,
        `{ city: "Silopi , Şırnak , Türkiye" , address: "Silopi District , Şırnak Street , Türkiye ( Chya Gold Exchange )" }`
    );
    
    fs.writeFileSync(sectorPath, content, 'utf8');
    console.log('Updated sector-translations.ts');
}

// 2. Update src/lib/brand-data.ts
const brandPath = path.join(__dirname, '../src/lib/brand-data.ts');
if (fs.existsSync(brandPath)) {
    let content = fs.readFileSync(brandPath, 'utf8');
    
    content = content.replace(
        `en: "Silopi , Şırnak Street , Türkiye ( Chya Gold Exchange )",`,
        `en: "Silopi District , Şırnak Street , Türkiye ( Chya Gold Exchange )",`
    );
    
    fs.writeFileSync(brandPath, content, 'utf8');
    console.log('Updated brand-data.ts');
}

// 3. Update src/components/company/SectorDetails.tsx
const detailsPath = path.join(__dirname, '../src/components/company/SectorDetails.tsx');
if (fs.existsSync(detailsPath)) {
    let content = fs.readFileSync(detailsPath, 'utf8');
    
    content = content.replace(
        `en: "Chya Gold Exchange For Currency Exchange Is The Second Branch Of The Currency Exchange And Financial Services Sector Of Chya Group. Founded On 28/08/2023 In Silopi , Şırnak , Turkey ,`,
        `en: "Chya Gold Exchange For Currency Exchange Is The Second Branch Of The Currency Exchange And Financial Services Sector Of Chya Group. Founded On 28/08/2023 In Silopi District , Şırnak , Turkey ,`
    );
    
    fs.writeFileSync(detailsPath, content, 'utf8');
    console.log('Updated SectorDetails.tsx');
}
