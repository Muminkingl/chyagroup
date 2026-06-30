const fs = require('fs');
const path = require('path');

// Helper to replace CO. and co. with Co. in files
function replaceCoInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace "co." with "Co." (only in specific forms to be safe, e.g. space before co., followed by space, quote, or dot)
    // Actually, in our codebase, "co." is always a standalone word like "co." or "co.'" or "co.\""
    content = content.replace(/\bco\./g, 'Co.');
    content = content.replace(/\bCO\./g, 'Co.');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated co./CO. in ${filePath}`);
}

// 1. Update co. and CO. in files
const filesToUpdateCo = [
    path.join(__dirname, '../src/i18n/translations.ts'),
    path.join(__dirname, '../src/i18n/sector-translations.ts'),
    path.join(__dirname, '../src/components/sections/PartnersSection.tsx'),
    path.join(__dirname, '../src/components/sections/AgentLoop.tsx')
];

for (const file of filesToUpdateCo) {
    if (fs.existsSync(file)) {
        replaceCoInFile(file);
    }
}

// 2. Perform specific timeline updates inside translations.ts
const transPath = path.join(__dirname, '../src/i18n/translations.ts');
if (fs.existsSync(transPath)) {
    let content = fs.readFileSync(transPath, 'utf8');
    
    // Rename Lutkay/Barzy Chya Office to Lutkay/Barzy Chya Exchange
    content = content.replace(/Lutkay Chya Office/g, 'Lutkay Chya Exchange');
    content = content.replace(/Barzy Chya Office/g, 'Barzy Chya Exchange');
    
    // Add spacing before commas in the English and Arabic timeline sections
    // Let's find each timeline block and process it
    // English timeline starts around "en: {" and "timeline: {"
    // Arabic timeline starts around "ar: {" and "timeline: {"
    // Let's do it using a regex that targets string lines inside the timeline definitions
    
    // We can target specific strings in the timeline descriptions to avoid any syntax changes
    // Let's replace the comma style in en and ar blocks
    const lines = content.split('\n');
    let insideEnglishTimeline = false;
    let insideArabicTimeline = false;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Track boundaries
        if (line.includes('en: {')) {
            insideEnglishTimeline = false;
        }
        if (line.includes('ar: {')) {
            insideEnglishTimeline = false;
        }
        
        // Within English section, if we see timeline: {
        if (line.includes('timeline: {') && i < 500) {
            insideEnglishTimeline = true;
        }
        if (line.includes('ourCompany: {') && i < 500) {
            insideEnglishTimeline = false;
        }
        
        // Within Arabic section, if we see timeline: {
        if (line.includes('timeline: {') && i > 500 && i < 900) {
            insideArabicTimeline = true;
        }
        if (line.includes('ourCompany: {') && i > 500 && i < 900) {
            insideArabicTimeline = false;
        }
        
        // Apply comma spacing replacements to the lines
        if (insideEnglishTimeline) {
            // Replace ", " with " , " in description / content lines
            if (line.includes('desc: "') || line.includes('content: "')) {
                // Remove existing spaces around comma first to normalize, then replace
                // e.g. " , " or ", " -> " , "
                line = line.replace(/\s*,\s*/g, ' , ');
            }
        }
        
        if (insideArabicTimeline) {
            // Replace Arabic comma "،" with " ، "
            if (line.includes('desc: "') || line.includes('content: "')) {
                line = line.replace(/\s*،\s*/g, ' ، ');
                // Also handle cases of English commas if any in Arabic descriptions
                line = line.replace(/\s*,\s*/g, ' , ');
            }
        }
        
        lines[i] = line;
    }
    
    fs.writeFileSync(transPath, lines.join('\n'), 'utf8');
    console.log('Successfully completed timeline spacing and renaming in translations.ts');
}
