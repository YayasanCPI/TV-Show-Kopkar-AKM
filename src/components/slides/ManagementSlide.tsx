import React from 'react';
import { Slide } from '../../types';
import { UserCog } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function ManagementSlide({ slide }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-6 uppercase tracking-widest flex flex-wrap justify-center items-center gap-4 text-center drop-shadow-lg font-display">
          <UserCog size={80} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          {slide.title}
        </h1>
        <p className="text-3xl text-slate-300/80 font-medium uppercase tracking-[0.2em]">
          {slide.subtitle}
        </p>
      </div>

      <div className="w-full max-w-5xl w-[95%] mx-auto flex flex-col justify-center flex-grow">
        <div className="flex flex-col gap-6 w-full">
          {slide.timeline?.map((event, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-white/20 hover:bg-slate-800/60 transition-all rounded-[2rem] p-6 md:p-8 md:px-12 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between group overflow-hidden relative gap-4 md:gap-0">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-indigo-400"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <span className="text-xl md:text-[1.8rem] font-display font-medium text-cyan-300 tracking-[0.1em] w-full md:w-1/3 text-left relative z-10">
                {event.year}
              </span>
              <span className="text-2xl md:text-[2.2rem] font-bold font-display text-white flex-1 text-left uppercase tracking-wider relative z-10">
                {event.title}
              </span>
              {event.description && (
                <span className="text-lg md:text-2xl text-cyan-200/60 font-medium tracking-wide border border-blue-500/30 rounded-full px-6 py-2 relative z-10">
                  {event.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
