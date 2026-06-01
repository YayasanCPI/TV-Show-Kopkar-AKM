const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
};

const map = [
  [/emerald-50\b/g, 'blue-50'],
  [/emerald-100\b/g, 'slate-300'],
  [/emerald-200\b/g, 'cyan-200'],
  [/emerald-300\b/g, 'cyan-300'],
  [/emerald-400\b/g, 'cyan-400'],
  [/emerald-500\b/g, 'blue-500'],
  [/emerald-600\b/g, 'blue-600'],
  [/emerald-700\b/g, 'blue-700'],
  [/emerald-800\b/g, 'blue-800'],
  [/emerald-900\b/g, 'blue-900'],
  [/emerald-950\b/g, 'blue-950'],
  [/teal-/g, 'indigo-'],
  [/amber-/g, 'violet-'],
  [/bg-slate-950/g, 'bg-black'],
];

const files = walk('./src/components/slides');
files.push('./src/components/AdminPanel.tsx');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  map.forEach(([regex, replacement]) => {
    newContent = newContent.replace(regex, replacement);
  });
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
