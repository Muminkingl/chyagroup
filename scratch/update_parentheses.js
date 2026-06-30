const fs = require('fs');
const path = require('path');

const transPath = path.join(__dirname, '../src/i18n/translations.ts');
if (fs.existsSync(transPath)) {
    let content = fs.readFileSync(transPath, 'utf8');
    const lines = content.split('\n');
    let insideTimeline = false;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Track timeline sections (there are three timeline blocks in English, Arabic, and Kurdish)
        if (line.includes('timeline: {')) {
            insideTimeline = true;
        }
        
        // Also check if we are in the main history: { block itself, since the summary string contains parentheses
        let isSummaryLine = line.includes('summary: "');
        
        // Timeline block ends when we hit "ourCompany: {"
        if (line.includes('ourCompany: {')) {
            insideTimeline = false;
        }
        
        if (insideTimeline || isSummaryLine) {
            // Target only lines that contain string values (desc, content, summary)
            if (line.includes('desc: "') || line.includes('content: "') || isSummaryLine) {
                // Replace "(" with "( " if it's not already followed by a space
                line = line.replace(/\((?!\s)/g, '( ');
                // Replace ")" with " )" if it's not already preceded by a space
                line = line.replace(/(?<!\s)\)/g, ' )');
                
                // Keep the spaces around commas consistent and clean
                // E.g. make sure we don't double space
                line = line.replace(/\s+/g, ' ');
            }
        }
        
        lines[i] = line;
    }
    
    fs.writeFileSync(transPath, lines.join('\n'), 'utf8');
    console.log('Successfully formatted parentheses in translations.ts history sections');
}
