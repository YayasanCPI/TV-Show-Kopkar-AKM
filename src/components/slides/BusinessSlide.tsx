import React from 'react';
import { Slide } from '../../types';
import { BriefcaseBusiness, Sparkles } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function BusinessSlide({ slide }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10"></div>
        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-6 uppercase tracking-widest flex justify-center items-center gap-6 drop-shadow-lg font-display">
          <BriefcaseBusiness size={80} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          {slide.title}
        </h1>
        <p className="text-3xl text-slate-300/80 font-medium uppercase tracking-[0.2em]">
          {slide.subtitle}
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full p-4">
          {slide.highlights?.map((item, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl flex items-center gap-8 transform hover:scale-[1.02] hover:bg-slate-800/60 hover:border-blue-500/40 transition-all duration-300 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="bg-slate-800/80 border border-white/10 p-5 rounded-[1.5rem] text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-shadow relative z-10">
                <Sparkles size={40} className="group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-[2.2rem] font-bold text-white leading-normal uppercase tracking-wider font-display relative z-10">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
