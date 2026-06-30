const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/i18n/sector-translations.ts');
if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace co. and CO. with Co.
    content = content.replace(/\bco\./g, 'Co.');
    content = content.replace(/\bCO\./g, 'Co.');
    
    // Replace bank count 14 with 16
    content = content.replace(/\(\s*14\s*\)/g, '( 16 )');
    
    // Locate the money-exchange lines and apply formatting
    const lines = content.split('\n');
    let insideMoneyExchange = false;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        if (line.includes('"money-exchange": [')) {
            insideMoneyExchange = true;
        }
        
        if (insideMoneyExchange) {
            // Apply comma spacing to strings
            if (line.includes('"') || line.includes("'")) {
                line = line.replace(/\s*,\s*/g, ' , ');
                line = line.replace(/\s*،\s*/g, ' ، ');
                
                // Format parenthesis inside values
                line = line.replace(/\((?!\s)/g, '( ');
                line = line.replace(/(?<!\s)\)/g, ' )');
                
                // Fix double spacing
                line = line.replace(/\s+/g, ' ');
            }
        }
        
        if (insideMoneyExchange && line.includes(']')) {
            insideMoneyExchange = false;
        }
        
        lines[i] = line;
    }
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log('Successfully updated sector-translations.ts');
}
