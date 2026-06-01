import React from 'react';
import { Slide } from '../../types';
import { Plane, ShoppingCart } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function ExtraSlide({ slide }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative mb-24">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10"></div>
        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 text-center uppercase tracking-widest drop-shadow-lg font-display">
          {slide.title}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-12 md:gap-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        {slide.services?.map((service, index) => {
          const Icon = index === 0 ? Plane : ShoppingCart;
          const iconColor = index === 0 ? "text-indigo-400" : "text-cyan-400";
          const glowColor = index === 0 ? "rgba(99,102,241,0.5)" : "rgba(34,211,238,0.5)";
          
          return (
            <div key={index} className="flex-1 bg-slate-900/40 backdrop-blur-2xl border border-white/10 hover:border-white/20 rounded-[3.5rem] p-16 shadow-2xl flex flex-col items-center text-center transform hover:-translate-y-4 transition-all duration-500 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="bg-slate-800/80 p-12 rounded-[2.5rem] shadow-xl border border-white/10 mb-12 relative z-10 group-hover:scale-105 transition-transform duration-500" style={{ boxShadow: `0 0 40px ${glowColor.replace('0.5', '0.15')}` }}>
                <Icon size={100} className={`${iconColor}`} style={{ filter: `drop-shadow(0 0 15px ${glowColor})` }} />
              </div>
              <h2 className="text-[3rem] font-black tracking-wider text-white mb-8 leading-tight uppercase font-display relative z-10">
                {service.name}
              </h2>
              <p className="text-[1.8rem] text-slate-300 font-light leading-relaxed tracking-wide relative z-10">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
