import React from 'react';
import { Slide } from '../../types';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function LaporanSlide({ slide }: Props) {
  return (
    <div className="w-full h-full bg-slate-900 text-white flex flex-col items-center justify-center relative p-12">
      <div className="absolute inset-0 z-0 opacity-20">
        {slide.imageUrl ? (
          <img src={slide.imageUrl} alt="Background" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-emerald-400">
          {slide.title || 'Laporan Pencapaian'}
        </h2>
        
        {slide.subtitle && (
          <p className="text-2xl md:text-3xl font-medium text-slate-300 mb-12">
            {slide.subtitle}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
          <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-6">
              <TrendingUp size={40} />
            </div>
            <h3 className="text-slate-400 text-xl mb-2">Total Aset (Bulan Lalu)</h3>
            <p className="text-4xl font-bold text-white">Rp 2.45 Milyar</p>
          </div>

          <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-6">
              <BarChart3 size={40} />
            </div>
            <h3 className="text-slate-400 text-xl mb-2">SHU Berjalan</h3>
            <p className="text-4xl font-bold text-white">Rp 120 Juta</p>
          </div>

          <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 mb-6">
              <Users size={40} />
            </div>
            <h3 className="text-slate-400 text-xl mb-2">Anggota Baru</h3>
            <p className="text-4xl font-bold text-white">+15 Orang</p>
          </div>
        </div>

        {slide.description && (
          <p className="mt-12 text-xl text-slate-300 max-w-4xl text-center leading-relaxed">
            {slide.description}
          </p>
        )}
      </div>
    </div>
  );
}
