const fs = require('fs');
let c = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

c = c.replace(
  "{slide.type === 'flyer' && (",
  "{['flyer', 'teladan', 'laporan', 'agenda', 'jadwal-sholat', 'hero', 'business'].includes(slide.type) && ("
);

c = c.replace(
  "<h4 className=\"font-bold text-slate-800 mb-4\">Gambar / Video Promosi (Flyer)</h4>",
  "<h4 className=\"font-bold text-slate-800 mb-4\">Gambar / Media Visual</h4>"
);

c = c.replace(
  "<p className=\"text-sm text-slate-500 mb-4\">Anda dapat menampilkan satu gambar poster atau memutar sebuah video.</p>",
  "<p className=\"text-sm text-slate-500 mb-4\">Unggah gambar yang sesuai untuk konten slide ini.</p>"
);

fs.writeFileSync('src/components/AdminPanel.tsx', c);
console.log('done AdminPanel flyer condition updates');
