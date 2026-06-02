const fs = require('fs');
const dir = 'src/components/slides';
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const p = dir + '/' + file;
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/lg:text-6xl lg:text-6xl/g, 'lg:text-6xl');
    fs.writeFileSync(p, c);
  }
});
