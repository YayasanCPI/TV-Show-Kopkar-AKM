import React from 'react';
import { Slide } from '../../types';
import { HandCoins, ChevronRight } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function LoansSlide({ slide }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center flex-grow justify-center">
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10"></div>
        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-6 uppercase tracking-widest drop-shadow-lg font-display">
          {slide.title}
        </h1>
        <p className="text-2xl text-slate-300/80 font-medium tracking-[0.2em] uppercase">
          {slide.subtitle}
        </p>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[4rem] p-24 w-full max-w-7xl mx-auto shadow-2xl flex flex-col md:flex-row items-center justify-between border border-white/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 rounded-[4rem] to-transparent pointer-events-none"></div>
        
        <div className="flex-1 mb-12 md:mb-0 flex justify-center relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-30 rounded-full"></div>
            <HandCoins size={280} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)] relative z-10 transform group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-10 text-center md:text-left relative z-10 w-full pl-8">
          {slide.highlights?.map((highlight, index) => (
            <div key={index} className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 px-12 shadow-xl border border-white/10 hover:border-blue-500/50 hover:bg-slate-800/90 transition-all duration-300 flex items-center gap-6">
              <div className="bg-blue-500/20 p-3 rounded-2xl">
                <ChevronRight size={32} className="text-cyan-400" />
              </div>
              <p className="text-[2.2rem] font-bold text-white leading-snug tracking-wide font-display uppercase">
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
