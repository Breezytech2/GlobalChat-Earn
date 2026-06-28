import * as fs from 'fs';
import * as path from 'path';

function replaceText(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceText(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let newContent = content;
      newContent = newContent.replace(/GlobalChat Earn/g, 'GlobalChat');
      newContent = newContent.replace(/<span className="text-white">Earn<\/span>/g, '');
      newContent = newContent.replace(/<span className="text-\[#D4AF37\]">Earn<\/span>/g, '');
      
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceText('./src');
console.log('Text replaced successfully!');

