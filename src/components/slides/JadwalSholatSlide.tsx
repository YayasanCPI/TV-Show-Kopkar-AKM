import React, { useEffect, useState } from 'react';
import { Slide } from '../../types';
import { Moon, Sun, Sunrise, Sunset, Loader2 } from 'lucide-react';

interface Props {
  slide: Slide;
}

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

export default function JadwalSholatSlide({ slide }: Props) {
  const [jadwal, setJadwal] = useState<Jadwal | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // ID Kota Tabalong dari API Kemenag
    const cityId = '2204'; 
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
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jadwal sholat:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center relative p-12 text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-slate-900/90 z-10" />
        {slide.imageUrl ? (
          <img src={slide.imageUrl} alt="Background" className="w-full h-full object-cover opacity-50" />
        ) : (
          <img src="https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80" alt="Mosque" className="w-full h-full object-cover opacity-50" />
        )}
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-16">
          <Moon size={48} className="text-amber-400 mb-6" />
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            {slide.title || 'Jadwal Sholat'}
          </h2>
          <p className="text-2xl text-blue-200">
            {slide.subtitle || 'Tanjung, Tabalong & Sekitarnya'}
          </p>
          {jadwal && <p className="text-xl text-slate-400 mt-2 font-medium">{jadwal.date}</p>}
        </div>

        {loading ? (
          <div className="flex items-center gap-4 text-emerald-400 p-8">
            <Loader2 size={32} className="animate-spin" />
            <span className="text-xl">Memuat jadwal...</span>
          </div>
        ) : jadwal ? (
          <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl">
              <Sunrise size={36} className="text-indigo-300 mb-4" />
              <h4 className="text-lg text-slate-400 mb-2 uppercase tracking-wider font-bold">Subuh</h4>
              <p className="text-4xl font-black text-white">{jadwal.subuh}</p>
            </div>
            
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl">
              <Sun size={36} className="text-amber-200 mb-4" />
              <h4 className="text-lg text-slate-400 mb-2 uppercase tracking-wider font-bold">Dzuhur</h4>
              <p className="text-4xl font-black text-white">{jadwal.dzuhur}</p>
            </div>
            
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl">
              <Sun size={36} className="text-amber-500 mb-4" />
              <h4 className="text-lg text-slate-400 mb-2 uppercase tracking-wider font-bold">Ashar</h4>
              <p className="text-4xl font-black text-white">{jadwal.ashar}</p>
            </div>
            
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl border-emerald-500/30 ring-1 ring-emerald-500/20">
              <Sunset size={36} className="text-orange-400 mb-4" />
              <h4 className="text-lg text-emerald-400 mb-2 uppercase tracking-wider font-bold">Maghrib</h4>
              <p className="text-4xl font-black text-white">{jadwal.maghrib}</p>
            </div>
            
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl">
              <Moon size={36} className="text-slate-200 mb-4" />
              <h4 className="text-lg text-slate-400 mb-2 uppercase tracking-wider font-bold">Isya</h4>
              <p className="text-4xl font-black text-white">{jadwal.isya}</p>
            </div>
          </div>
        ) : (
          <div className="bg-red-500/20 text-red-300 p-6 rounded-xl border border-red-500/30">
            Gagal memuat jadwal sholat. Pastikan perangkat terkoneksi ke internet.
          </div>
        )}
        
        {slide.description && (
          <div className="mt-16 text-xl text-slate-300 border-t border-white/10 pt-8 w-full text-center max-w-4xl">
            {slide.description}
          </div>
        )}
      </div>
    </div>
  );
}
