import fs from 'fs';
import path from 'path';

const translationsPath = path.resolve('src/i18n/translations.ts');
let fileContent = fs.readFileSync(translationsPath, 'utf8');

// Replace unescaped quotes in the Arabic translations
fileContent = fileContent.replace(/"البالة"/g, '\\"البالة\\"');

fs.writeFileSync(translationsPath, fileContent, 'utf8');
console.log('Fixed unescaped quotes');
