const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/i18n/translations.ts');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

// Find all occurrences where id: 'general-trading' appears in features items blocks
// We'll look for the pattern and swap blocks directly

function findItemBlock(lines, startLine, targetId) {
  for (let i = startLine; i < lines.length; i++) {
    if (lines[i].includes(`id: '${targetId}'`)) {
      // Find opening brace (go back to find the {)
      let blockStart = i;
      while (blockStart > 0 && !lines[blockStart].trim().startsWith('{')) blockStart--;
      
      // Find closing brace by counting depth
      let depth = 0;
      let blockEnd = blockStart;
      for (let j = blockStart; j < lines.length; j++) {
        for (const ch of lines[j]) {
          if (ch === '{') depth++;
          if (ch === '}') depth--;
        }
        if (depth === 0) { blockEnd = j; break; }
      }
      return { start: blockStart, end: blockEnd, foundAt: i };
    }
  }
  return null;
}

// Find all "items: [" that precede features items (not sectors items)
// These are identified by their surrounding context - features.items has 'tag' and 'cardTitle' keys
// We'll swap in all 3 locales by finding each first pair

let swapCount = 0;
let searchFrom = 0;

for (let attempt = 0; attempt < 3; attempt++) {
  // Find the next features items block (has 'cardTitle' key)
  let featuresItemsLine = -1;
  for (let i = searchFrom; i < lines.length; i++) {
    if (lines[i].includes("id: 'general-trading'")) {
      // Check if this is a features item (has cardTitle nearby)
      let hasCardTitle = false;
      for (let j = i; j < Math.min(i + 8, lines.length); j++) {
        if (lines[j].includes('cardTitle')) { hasCardTitle = true; break; }
      }
      if (hasCardTitle) {
        featuresItemsLine = i;
        break;
      }
    }
  }
  
  if (featuresItemsLine === -1) break;
  
  const gt = findItemBlock(lines, featuresItemsLine, 'general-trading');
  if (!gt) break;
  
  const me = findItemBlock(lines, gt.end + 1, 'money-exchange');
  if (!me) break;
  
  // Extract the blocks
  const gtBlock = lines.slice(gt.start, gt.end + 1);
  const meBlock = lines.slice(me.start, me.end + 1);
  const separator = lines.slice(gt.end + 1, me.start);
  
  // Splice: replace gt block with me block, keep separator, replace me block with gt block
  lines.splice(gt.start, (me.end + 1) - gt.start, 
    ...meBlock, ...separator, ...gtBlock
  );
  
  swapCount++;
  searchFrom = gt.start + meBlock.length + separator.length + gtBlock.length;
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log(`Done! Swapped ${swapCount} locale(s).`);
