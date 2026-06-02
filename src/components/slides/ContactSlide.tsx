import React from 'react';
import { Slide } from '../../types';
import { Phone, MapPin } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function ContactSlide({ slide }: Props) {
  return (
    <div className="w-full h-full flex flex-col justify-center relative">
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4 z-0">
        <Phone size={800} className="text-white" />
      </div>

      <div className="text-center mb-16 relative z-10">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-lg font-display">
          {slide.title}
        </h1>
        <div className="w-64 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
      </div>

      <div className="flex flex-col justify-center max-w-7xl mx-auto w-full gap-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-8">
          {slide.contacts?.map((contact, index) => (
            <div key={index} className="bg-slate-900/40 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:border-blue-500/40">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="bg-slate-800/80 p-8 rounded-[2rem] border border-white/10 mb-10 shadow-[0_0_30px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-shadow relative z-10">
                <Phone size={60} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
              </div>
              <p className="text-[1.8rem] leading-tight font-bold mb-6 text-cyan-200 tracking-[0.1em] uppercase font-display relative z-10">
                {contact.department}
              </p>
              <p className="text-[3.5rem] font-black tracking-widest text-white font-display relative z-10 drop-shadow-md">
                {contact.number}
              </p>
            </div>
          ))}
        </div>

        {slide.socials && (
          <div className="flex flex-row justify-center items-center gap-10 w-full flex-wrap">
            {slide.socials.map((social, idx) => (
              <div key={idx} className="flex items-center gap-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-xl px-12 py-6 rounded-full hover:bg-slate-800/60 transition-colors">
                <span className="text-cyan-400 font-bold text-3xl tracking-[0.15em] uppercase font-display">{social.department}:</span>
                <span className="text-2xl font-light tracking-widest text-slate-200 font-display">{social.number}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 flex items-center justify-center gap-8 relative z-10 bg-slate-900/40 backdrop-blur-xl mx-auto px-16 py-8 rounded-full border border-white/10 shadow-2xl">
        <MapPin size={48} className="text-cyan-400 shrink-0 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        <p className="text-2xl font-medium tracking-[0.2em] uppercase text-blue-50">
          {slide.address}
        </p>
      </div>
    </div>
  );
}
