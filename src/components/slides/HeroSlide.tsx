import React from 'react';
import { Slide } from '../../types';
import { Landmark } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function HeroSlide({ slide }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-10 md:space-y-16 relative z-10 py-8">
      <div className="flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] rounded-full"></div>
        <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 backdrop-blur-xl text-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.3)] border border-white/20 mb-6 md:mb-8 relative z-10 overflow-hidden p-4 md:p-6">
          {slide.visual === 'logo' || slide.imageUrl ? (
            <img 
              src={slide.imageUrl || "https://i.ibb.co.com/WvTwLMn5/image-1.png"} 
              alt="Logo KOPKAR" 
              className="w-full h-full object-contain"
            />
          ) : (
            <Landmark size={120} className="w-20 h-20 md:w-32 md:h-32" />
          )}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-[0.3em] font-display text-cyan-300 uppercase mb-4 opacity-90">Kopkar AKM</h2>
        <div className="w-32 md:w-40 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-cyan-400 leading-tight max-w-7xl mx-auto drop-shadow-2xl uppercase tracking-widest px-4">
        {slide.title}
      </h1>
      
      <p className="text-2xl md:text-4xl text-cyan-200/80 font-medium tracking-[0.2em] uppercase max-w-5xl w-[95%] mx-auto leading-normal">
        {slide.subtitle}
      </p>
    </div>
  );
}
