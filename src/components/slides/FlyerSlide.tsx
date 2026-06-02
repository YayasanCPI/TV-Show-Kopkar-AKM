import React from 'react';
import { Slide } from '../../types';
import { Megaphone } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function FlyerSlide({ slide }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-6">
      {slide.title && (
        <div className="text-center mb-8 shrink-0 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-[80px] -z-10"></div>
          <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-4 uppercase tracking-widest flex flex-wrap justify-center items-center gap-4 text-center drop-shadow-lg font-display">
            <Megaphone size={64} className="text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-[1.8rem] text-slate-300/80 font-medium uppercase tracking-[0.2em]">
              {slide.subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className="w-full flex-grow flex items-center justify-center overflow-hidden rounded-[4rem] border border-white/10 bg-slate-900/40 backdrop-blur-2xl shadow-2xl relative p-8">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        
        {slide.videoUrl ? (
          <video 
            src={slide.videoUrl} 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-contain rounded-[2rem] drop-shadow-2xl relative z-10"
          />
        ) : slide.imageUrl ? (
          <img 
            src={slide.imageUrl} 
            alt={slide.title || "Flyer Informasi"} 
            className="w-full h-full object-contain rounded-[2rem] drop-shadow-2xl relative z-10"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/10 m-8 rounded-[3rem] w-[calc(100%-4rem)] h-[calc(100%-4rem)] bg-slate-800/30">
            <span className="text-4xl mb-6 font-bold tracking-widest uppercase text-cyan-400/50 font-display">Area Flyer / Banner Promosi</span>
            <span className="text-2xl tracking-wider text-slate-400 font-light">Gunakan Admin Panel untuk mengunggah gambar atau video</span>
          </div>
        )}
      </div>
    </div>
  );
}
