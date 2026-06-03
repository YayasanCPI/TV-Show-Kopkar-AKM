import React, { useEffect, useState } from 'react';
import { Moon, Volume2 } from 'lucide-react';

interface Jadwal {
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  date: string;
}

export default function AdzanAlert({ onAdzanStateChange }: { onAdzanStateChange?: (isActive: boolean) => void }) {
  const [jadwal, setJadwal] = useState<Jadwal | null>(null);
  const [activeAdzan, setActiveAdzan] = useState<string | null>(null);

  // Notify parent component about adzan state changes
  useEffect(() => {
    if (onAdzanStateChange) {
      onAdzanStateChange(activeAdzan !== null);
    }
  }, [activeAdzan, onAdzanStateChange]);

  const fetchJadwal = () => {
    const cityId = '2108'; // Tabalong (was 2204)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    fetch(`https://api.myquran.com/v2/sholat/jadwal/${cityId}/${year}/${month}/${day}`)
      .then(res => res.json())
      .then(data => {
        if (data.status && data.data && data.data.jadwal) {
          setJadwal(data.data.jadwal);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchJadwal();
    
    // Refresh jadwal every day at 00:01
    const dailyTimer = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 1) {
        fetchJadwal();
      }
    }, 60000);

    return () => clearInterval(dailyTimer);
  }, []);

  useEffect(() => {
    if (!jadwal) return;
    
    const checkTimer = setInterval(() => {
      const now = new Date();
      
      const checkPrayer = (prayerTime: string) => {
        if (!prayerTime) return false;
        const [ph, pm] = prayerTime.split(':').map(Number);
        const pDate = new Date(now);
        pDate.setHours(ph, pm, 0, 0);
        
        const diffMinutes = (now.getTime() - pDate.getTime()) / 60000;
        // Show adzan alert for exactly 10 minutes starting strictly from the prayer time
        return diffMinutes >= 0 && diffMinutes < 10;
      };

      if (checkPrayer(jadwal.subuh)) setActiveAdzan('Subuh');
      else if (checkPrayer(jadwal.dzuhur)) setActiveAdzan('Dzuhur');
      else if (checkPrayer(jadwal.ashar)) setActiveAdzan('Ashar');
      else if (checkPrayer(jadwal.maghrib)) setActiveAdzan('Maghrib');
      else if (checkPrayer(jadwal.isya)) setActiveAdzan('Isya');
      else setActiveAdzan(null);
    }, 1000 * 5); // Check every 5 seconds for precision

    return () => clearInterval(checkTimer);
  }, [jadwal]);

  if (!activeAdzan) return null;

  return (
    <div className="absolute inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-8 text-center text-white overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-blue-900/50 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.15)_0%,transparent_60%)] animate-pulse pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700 slide-in-from-bottom-8">
        <div className="w-40 h-40 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-8 border-4 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
          <Moon size={80} className="animate-pulse" />
        </div>
        
        <div className="flex items-center gap-4 text-amber-400 mb-4 bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 shadow-sm">
          <Volume2 size={24} className="animate-pulse" />
          <span className="text-xl font-bold uppercase tracking-widest">Panggilan Beribadah</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-8 text-white drop-shadow-2xl">
          Waktu Sholat <span className="text-emerald-400">{activeAdzan}</span>
        </h1>
        
        <p className="text-3xl font-medium text-slate-200 drop-shadow max-w-3xl leading-relaxed mb-4">
          Telah masuk waktu sholat {activeAdzan} untuk area Tanjung, Tabalong dan sekitarnya.
        </p>

        <p className="mt-6 text-xl text-emerald-300 max-w-2xl bg-emerald-900/40 p-4 rounded-xl border border-emerald-500/20">
          Mari sejenak hentikan aktivitas, sucikan diri, dan laksanakan ibadah sholat. 
        </p>
      </div>

      <div className="absolute bottom-12 z-10">
        <p className="text-lg text-slate-400 animate-pulse">
          Layar akan otomatis kembali setelah waktu toleransi 10 menit berakhir.
        </p>
      </div>
    </div>
  );
}
