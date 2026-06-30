const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/i18n/translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// For each locale's features.items array, swap general-trading and money-exchange
// We do this by finding the first occurrence of id: 'general-trading' in items
// and the immediately following id: 'money-exchange', then swapping them

function swapFirstTwoItems(text, startSearch) {
  // Find the features items array
  const idx = text.indexOf(startSearch);
  if (idx === -1) return text;
  
  // Within that block, find first id: 'general-trading'
  const gtStart = text.indexOf("id: 'general-trading'", idx);
  if (gtStart === -1) return text;
  
  // Find the opening brace of general-trading item (search backward from gtStart)
  let gtBraceStart = gtStart;
  while (gtBraceStart > 0 && text[gtBraceStart] !== '{') gtBraceStart--;
  
  // Find the id: 'money-exchange' item that comes after
  const meIdIdx = text.indexOf("id: 'money-exchange'", gtStart);
  if (meIdIdx === -1) return text;
  
  // Find the opening brace of money-exchange item
  let meBraceStart = meIdIdx;
  while (meBraceStart > 0 && text[meBraceStart] !== '{') meBraceStart--;
  
  // Find the closing brace of general-trading item (which is meBraceStart - whitespace)
  // The GT item ends just before the ME item starts
  // Find the closing brace: count braces from gtBraceStart
  let depth = 0;
  let gtBraceEnd = gtBraceStart;
  for (let i = gtBraceStart; i < meBraceStart; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') {
      depth--;
      if (depth === 0) { gtBraceEnd = i; break; }
    }
  }
  
  // Find the closing brace of money-exchange item
  depth = 0;
  let meBraceEnd = meBraceStart;
  for (let i = meBraceStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') {
      depth--;
      if (depth === 0) { meBraceEnd = i; break; }
    }
  }
  
  // Extract the two items and the separator between them
  const gtItem = text.slice(gtBraceStart, gtBraceEnd + 1);
  const separator = text.slice(gtBraceEnd + 1, meBraceStart);
  const meItem = text.slice(meBraceStart, meBraceEnd + 1);
  
  // Swap: put ME first, then separator, then GT
  const before = text.slice(0, gtBraceStart);
  const after = text.slice(meBraceEnd + 1);
  
  return before + meItem + separator + gtItem + after;
}

// Swap in English locale features.items
content = swapFirstTwoItems(content, "items: [\n        {\n          id: 'general-trading',\n          tag: 'General Trading'");

// Swap in Arabic locale features.items  
content = swapFirstTwoItems(content, "items: [\n        {\n          id: 'general-trading',\n          tag: '\u062a\u062c\u0627\u0631\u0629 \u0639\u0627\u0645\u0629'");

// Swap in Kurdish locale features.items
content = swapFirstTwoItems(content, "items: [\n        {\n          id: 'general-trading',\n          tag: '\u0628\u0627\u0632\u0631\u06af\u0627\u0646\u06cc \u06af\u0634\u062a\u06cc'");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Swapped general-trading and money-exchange positions in all 3 locales.');
