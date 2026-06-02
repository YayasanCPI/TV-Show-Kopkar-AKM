const fs = require('fs');
let c = fs.readFileSync('src/components/Header.tsx', 'utf8');
c = c.replace(
  '<img src={settings.logoUrl} alt="Logo KOPKAR AKM" className="w-full h-full object-contain" />',
  '<img src={settings.logoUrl} alt="Logo KOPKAR AKM" className="w-full h-full object-contain max-w-full max-h-full" referrerPolicy="no-referrer" crossOrigin="anonymous" />'
);
fs.writeFileSync('src/components/Header.tsx', c);
console.log('done header image');
