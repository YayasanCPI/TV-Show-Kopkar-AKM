import React from 'react';
import { Slide } from '../../types';
import { TrendingUp, Lock } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function SavingsSlide({ slide }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative mb-24">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10"></div>
        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 text-center uppercase tracking-widest drop-shadow-lg font-display">
          {slide.title}
        </h1>
      </div>

      <div className="flex flex-row w-full max-w-7xl mx-auto gap-12 md:gap-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        {slide.services?.map((service, index) => (
          <div key={index} className="flex-1 bg-slate-900/40 backdrop-blur-2xl border border-white/10 hover:border-blue-500/50 rounded-[3rem] p-16 shadow-2xl flex flex-col items-center text-center transform hover:-translate-y-4 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="bg-slate-800/80 p-12 border border-white/10 rounded-[2.5rem] shadow-[0_0_40px_rgba(34,211,238,0.15)] mb-12 relative z-10 group-hover:scale-105 transition-transform duration-500">
              {index === 0 ? (
                <TrendingUp size={100} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
              ) : (
                <Lock size={100} className="text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
              )}
            </div>
            
            <h2 className="text-[3rem] font-black text-white mb-8 leading-tight tracking-[0.1em] uppercase font-display relative z-10">
              {service.name}
            </h2>
            <p className="text-[1.8rem] text-slate-300/90 font-light leading-relaxed tracking-wide relative z-10">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
