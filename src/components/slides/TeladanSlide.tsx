import React from 'react';
import { Slide } from '../../types';
import { Award, Star } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function TeladanSlide({ slide }: Props) {
  return (
    <div className="w-full h-full bg-blue-900 text-white flex flex-col items-center justify-center relative p-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-slate-900 to-amber-900 opacity-80" />
        {slide.imageUrl && (
          <img src={slide.imageUrl} alt="Background" className="w-full h-full object-cover mix-blend-overlay opacity-30" />
        )}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-6 py-2 rounded-full font-bold tracking-widest text-sm uppercase mb-8 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Star size={16} className="fill-amber-400" />
            {slide.subtitle || 'Karyawan Teladan Bulan Ini'}
            <Star size={16} className="fill-amber-400" />
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-6 text-white leading-tight">
            {slide.title || 'M. Fulan Akbar'}
          </h2>
          
          {slide.description && (
            <p className="text-2xl text-slate-300 leading-relaxed border-l-4 border-amber-500 pl-6 my-8">
              "{slide.description}"
            </p>
          )}

          <div className="flex items-center gap-4 mt-4 bg-white/10 px-6 py-3 rounded-xl border border-white/20 backdrop-blur-md">
            <Award size={24} className="text-amber-400" />
            <span className="text-lg font-medium text-slate-200">Terima kasih atas dedikasi dan kinerja luar biasa Anda.</span>
          </div>
        </div>

        {slide.imageUrl && (
          <div className="w-96 h-96 md:w-[500px] md:h-[500px] shrink-0 relative">
            <div className="absolute inset-0 bg-amber-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <img 
              src={slide.imageUrl} 
              alt="Karyawan Teladan" 
              className="w-full h-full object-cover rounded-3xl border-8 border-white/10 shadow-2xl relative z-10" 
            />
          </div>
        )}
      </div>
    </div>
  );
}
