const fs = require('fs');
const path = require('path');

// Helper to replace text in file if it exists
function replaceInFile(relativePath, replacements) {
    const filePath = path.join(__dirname, '..', relativePath);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let initialContent = content;
        for (const [target, replacement] of replacements) {
            content = content.split(target).join(replacement);
        }
        if (content !== initialContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${relativePath}`);
        } else {
            console.log(`No changes needed/made for ${relativePath}`);
        }
    } else {
        console.log(`File not found: ${relativePath}`);
    }
}

// 1. Update translations.ts
replaceInFile('src/i18n/translations.ts', [
    ['Lamaat Al Marjan CO.', 'Lamat Al Marjan Co.'],
    ['Lamaat Al Marjan Co.', 'Lamat Al Marjan Co.'],
    ['منفذ دیبەگە ', 'منفذ ديبكة ى هەنگاو '],
    ["'منفذ دیبەگە'", "'منفذ ديبكة ى هەنگاو'"],
    ['"منفذ دیبەگە"', '"منفذ ديبكة ى هەنگاو"'],
]);

// 2. Update sector-translations.ts
replaceInFile('src/i18n/sector-translations.ts', [
    ['Lamaat Al Marjan Co.', 'Lamat Al Marjan Co.'],
    ['مەنفەزی دیبەگە', 'منفذ ديبكة ى هەنگاو'],
    ['منفذ دیبەگە', 'منفذ ديبكة ى هەنگاو'],
]);

// 3. Update brand-data.ts
replaceInFile('src/lib/brand-data.ts', [
    ['ku: "منفذ دیبەگە"', 'ku: "منفذ ديبكة ى هەنگاو"'],
    ['مەنفەزی دیبەگە', 'منفذ ديبكة ى هەنگاو'],
]);

// 4. Update SectorDetails.tsx
replaceInFile('src/components/company/SectorDetails.tsx', [
    ['ku: "منفذ دیبەگە"', 'ku: "منفذ ديبكة ى هەنگاو"'],
    ['ku: "منفذ دیبەگە"', 'ku: "منفذ ديبكة ى هەنگاو"'],
]);

// 5. Update CompanySectors.tsx
replaceInFile('src/components/company/CompanySectors.tsx', [
    ['ku: "منفذ دیبەگە"', 'ku: "منفذ ديبكة ى هەنگاو"'],
]);

// 6. Update BrandQRs.tsx
replaceInFile('src/components/sections/BrandQRs.tsx', [
    ['ku: "منفذ دیبەگە"', 'ku: "منفذ ديبكة ى هەنگاو"'],
]);
