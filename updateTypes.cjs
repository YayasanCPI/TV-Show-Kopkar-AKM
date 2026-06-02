const fs = require('fs');
let c = fs.readFileSync('src/types.ts', 'utf8');
c = c.replace(
  /type: 'hero' \| 'about' \| 'history' \| 'management' \| 'business' \| 'savings' \| 'loans' \| 'extra' \| 'app' \| 'contact' \| 'flyer';/,
  "type: 'hero' | 'about' | 'history' | 'management' | 'business' | 'savings' | 'loans' | 'extra' | 'app' | 'contact' | 'flyer' | 'laporan' | 'teladan' | 'agenda' | 'jadwal-sholat';"
);
fs.writeFileSync('src/types.ts', c);
console.log('done types');
