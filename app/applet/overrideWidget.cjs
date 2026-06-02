const fs = require('fs');

const code = `import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

interface AbsensiData {
  nama: string;
  waktu: string;
}

export default function AbsensiWidget() {
  const [hadirList, setHadirList] = useState<AbsensiData[]>([]);
  const [pulangList, setPulangList] = useState<AbsensiData[]>([]);
  const [isEvening, setIsEvening] = useState(false);

  const checkTimeStatus = () => {
    const hours = new Date().getHours();
    setIsEvening(hours >= 17);
  };

  const fetchAbsensi = async () => {
    try {
      const API_ABSEN = 'https://script.google.com/macros/s/AKfycbz6YajqskEFxko5jVtpK8RS3oI-LUHbaLCUmgCFa-xHZIWSGrxJfB66ng0O0HqR4Arf-g/exec';
      const res = await fetch(API_ABSEN);
      const data = await res.json();
      
      const targetDate = new Date();
      
      const isSameDate = (dateVal: any) => {
        if (!dateVal) return false;
        let d;
        let dateStr = String(dateVal).trim();
        if (dateStr.includes('Date')) {
          try { 
            const ms = parseInt(dateStr.replace(/[^0-9]/g, ''));
            d = new Date(ms); 
          } catch (e) { return false; }
        } else {
          d = new Date(dateStr);
          if (isNaN(d.getTime())) {
            const parts = dateStr.split(/[\\/\\-]/);
            if (parts.length === 3) {
              if (parts[0].length <= 2 && parts[2].length === 4) d = new Date(\`\${parts[2]}/\${parts[1]}/\${parts[0]}\`);
              else if (parts[0].length === 4) d = new Date(\`\${parts[0]}/\${parts[1]}/\${parts[2]}\`);
            }
          }
        }
        if (!d || isNaN(d.getTime())) return false;
        return d.getFullYear() === targetDate.getFullYear() && 
               d.getMonth() === targetDate.getMonth() && 
               d.getDate() === targetDate.getDate();
      };

      const getColIdx = (headers: string[], keywords: string[], fallbackIdx: number) => {
        const idx = headers.findIndex(h => keywords.some(k => String(h).toLowerCase().includes(k)));
        return idx !== -1 ? idx : fallbackIdx;
      };

      const EXCLUDED_NAMES = ['yuliani'];
      const isValidName = (n: string) => {
        if (!n || n === 'Nama' || n.startsWith('a00')) return false;
        return !EXCLUDED_NAMES.includes(n.toLowerCase());
      };

      const masukData: AbsensiData[] = [];
      if (data.masuk && data.masuk.length > 1) {
        const headers = data.masuk[0];
        const nameIdx = getColIdx(headers, ['nama', 'name'], 5);
        const dateIdx = getColIdx(headers, ['tanggal', 'date'], 2);
        const timeIdx = getColIdx(headers, ['jam', 'time', 'waktu'], 3);
        const codeIdx = getColIdx(headers, ['status kehadiran', 'kode', 'code', 'status'], 14);

        data.masuk.slice(1).forEach((row: any) => {
          const name = String(row[nameIdx]).trim();
          const code = String(row[codeIdx]).trim().toLowerCase();
          if (isValidName(name) && isSameDate(row[dateIdx])) {
            if (['v', 'x', 't', 'tx', 'hadir'].includes(code) || row[timeIdx]) {
              if (!masukData.some(m => m.nama === name)) {
                masukData.push({ nama: name, waktu: row[timeIdx] || '--:--' });
              }
            }
          }
        });
      }
      setHadirList(masukData);

      const pData: AbsensiData[] = [];
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
              if (!pData.some(m => m.nama === name)) {
                pData.push({ nama: name, waktu: row[timeIdx] || '--:--' });
              }
            }
          }
        });
      }
      setPulangList(pData);

    } catch (error) {
      console.error('Error fetching absensi for widget', error);
    }
  };

  useEffect(() => {
    checkTimeStatus();
    fetchAbsensi();
    const interval = setInterval(() => {
      checkTimeStatus();
      fetchAbsensi();
    }, 60000 * 5); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const displayList = isEvening ? pulangList : hadirList;
  const listLabel = isEvening ? 'Pulang' : 'Hadir';
  const colorClass = isEvening ? 'text-amber-400' : 'text-emerald-400';
  const badgeClass = isEvening ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500';
  const pingClass = isEvening ? 'bg-amber-400' : 'bg-emerald-400';
  const dotClass = isEvening ? 'bg-amber-500' : 'bg-emerald-500';

  if (displayList.length === 0) {
    return (
      <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-6 h-8 opacity-50">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-slate-400" />
          <span className="font-bold text-sm text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            Belum Ada {listLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-6 h-8">
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className={\`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 \${pingClass}\`}></span>
          <span className={\`relative inline-flex rounded-full h-3 w-3 \${dotClass}\`}></span>
        </span>
        <span className={\`font-bold text-sm uppercase tracking-widest flex items-center gap-1.5 \${colorClass}\`}>
          <Users size={16} /> {listLabel} ({displayList.length})
        </span>
      </div>
      <div className="flex bg-slate-900/50 rounded-lg overflow-hidden h-full max-w-xl">
        <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap items-center px-4">
          {displayList.map((item, i) => (
            <div key={i} className="flex items-center gap-2 mx-4">
              <span className="text-slate-200 font-semibold capitalize">{item.nama}</span>
              <span className={\`font-mono text-[10px] px-1.5 py-0.5 rounded border \${badgeClass}\`}>{item.waktu}</span>
            </div>
          ))}
          {/* Duplicate for seamless scrolling */}
          {displayList.map((item, i) => (
            <div key={i + 'dup'} className="flex items-center gap-2 mx-4">
              <span className="text-slate-200 font-semibold capitalize">{item.nama}</span>
              <span className={\`font-mono text-[10px] px-1.5 py-0.5 rounded border \${badgeClass}\`}>{item.waktu}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/AbsensiWidget.tsx', code);
console.log('done AbsensiWidget override');
