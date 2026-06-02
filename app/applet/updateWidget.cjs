const fs = require('fs');
let c = fs.readFileSync('src/components/AbsensiWidget.tsx', 'utf8');

c = c.replace(
  'const [hadirList, setHadirList] = useState<AbsensiData[]>([]);',
  `const [hadirList, setHadirList] = useState<AbsensiData[]>([]);
  const [pulangList, setPulangList] = useState<AbsensiData[]>([]);
  const [isEvening, setIsEvening] = useState(false);`
);

c = c.replace(
  'const EXCLUDED_NAMES = [\\'yuliani\\'];',
  `const updateTimeStatus = () => {
      const hours = new Date().getHours();
      setIsEvening(hours >= 17);
    };
    updateTimeStatus();
    
    const EXCLUDED_NAMES = ['yuliani'];`
);

c = c.replace(
  'setHadirList(masukData);',
  `setHadirList(masukData);

      const pulangData: AbsensiData[] = [];
      if (data.pulang && data.pulang.length > 1) {
        const headers = data.pulang[0];
        const nameIdx = getColIdx(headers, ['nama', 'name'], 5);
        const dateIdx = getColIdx(headers, ['tanggal', 'date'], 2);
        const timeIdx = getColIdx(headers, ['jam', 'time', 'waktu'], 3);
        const codeIdx = getColIdx(headers, ['status kehadiran', 'kode', 'code', 'status'], 14);

        data.pulang.slice(1).forEach((row: any) => {
          const name = String(row[nameIdx]).trim();
          const code = String(row[codeIdx]).trim().toLowerCase();
          if (isValidName(name) && isSameDate(row[dateIdx])) {
            if (['v', 'x', 't', 'tx', 'hadir'].includes(code) || row[timeIdx]) {
              if (!pulangData.some((m: any) => m.nama === name)) {
                pulangData.push({ nama: name, waktu: row[timeIdx] || '--:--' });
              }
            }
          }
        });
      }
      setPulangList(pulangData);`
);

c = c.replace(
  'if (hadirList.length === 0) {',
  `const displayList = isEvening ? pulangList : hadirList;
  const listLabel = isEvening ? 'Pulang' : 'Hadir';
  const colorClass = isEvening ? 'text-amber-400' : 'text-emerald-400';
  const badgeClass = isEvening ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500';
  const pingClass = isEvening ? 'bg-amber-400' : 'bg-emerald-400';
  const dotClass = isEvening ? 'bg-amber-500' : 'bg-emerald-500';

  if (displayList.length === 0) {`
);

c = c.replace(
  '<span className="font-bold text-sm text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">',
  '<span className={`font-bold text-sm uppercase tracking-widest flex items-center gap-1.5 ${colorClass}`}>'
);

c = c.replace(
  '<Users size={16} /> Hadir ({hadirList.length})',
  '<Users size={16} /> {listLabel} ({displayList.length})'
);

c = c.replace(
  '<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>',
  '<span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingClass}`}></span>'
);

c = c.replace(
  '<span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>',
  '<span className={`relative inline-flex rounded-full h-3 w-3 ${dotClass}`}></span>'
);

c = c.replace(
  '{hadirList.map((item, i) => (',
  '{displayList.map((item, i) => ('
);

c = c.replace(
  '}))}',
  '}))}'
);

let dupReplaceCount = 0;
c = c.replace(/{hadirList\.map\(\(item, i\) => \(/g, (match) => {
  return '{displayList.map((item, i) => (';
});

// Use global replace instead of individual lines for text-emerald-500 font-mono...
c = c.replace(/text-emerald-500 font-mono text-\[10px\] bg-emerald-500\/10 px-1\.5 py-0\.5 rounded border border-emerald-500\/20/g, 'font-mono text-[10px] px-1.5 py-0.5 rounded border ${badgeClass}');

// Update the span to use template literal for class names
c = c.replace(
  /className="font-mono text-\[10px\] px-1\.5 py-0\.5 rounded border \$\{badgeClass\}"/g,
  'className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${badgeClass}`}'
);

// Check interval effect to also update time
c = c.replace(
  'const interval = setInterval(fetchAbsensi, 60000 * 5); // Check every 5 minutes',
  `const interval = setInterval(() => { fetchAbsensi(); updateTimeStatus(); }, 60000 * 5); // Check every 5 minutes`
);

fs.writeFileSync('src/components/AbsensiWidget.tsx', c);
console.log('done AbsensiWidget');
