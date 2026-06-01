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

const map = {
  '52,211,153': '34,211,238',
  '16,185,129': '59,130,246',
  '45,212,191': '129,140,248'
};

const files = walk('./src/components');
files.push('./src/App.tsx');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  for (const [oldVal, newVal] of Object.entries(map)) {
    newContent = newContent.split(oldVal).join(newVal);
  }
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated RGB in ${file}`);
  }
});
