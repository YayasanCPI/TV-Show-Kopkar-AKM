import React from 'react';
import { Slide } from '../../types';
import { Landmark } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function HeroSlide({ slide }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-16 relative z-10">
      <div className="flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
        <div className="w-64 h-64 bg-slate-900/50 backdrop-blur-2xl text-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.3)] border border-white/10 mb-8 relative z-10">
          <Landmark size={120} />
        </div>
        <h2 className="text-5xl font-bold tracking-[0.3em] font-display text-cyan-300 uppercase mb-4 opacity-90">Kopkar AKM</h2>
        <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-cyan-400 leading-tight max-w-7xl mx-auto drop-shadow-2xl uppercase tracking-widest">
        {slide.title}
      </h1>
      
      <p className="text-4xl md:text-5xl text-cyan-200/80 font-medium tracking-[0.2em] uppercase max-w-5xl w-[95%] mx-auto leading-normal">
        {slide.subtitle}
      </p>
    </div>
  );
}
