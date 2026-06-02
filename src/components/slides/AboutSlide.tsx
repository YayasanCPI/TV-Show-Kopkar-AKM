import React from 'react';
import { Slide } from '../../types';
import { Landmark, Compass } from 'lucide-react';

interface Props {
 slide: Slide;
}

export default function AboutSlide({ slide }: Props) {
 return (
 <div className="w-full h-full flex flex-col items-center justify-center">
 <div className="text-center mb-16 relative">
 <div className="absolute inset-0 bg-blue-500/20 -z-10"></div>
 <h1 className="text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-6 uppercase tracking-widest drop-shadow-lg font-display">
 Profil Koperasi
 </h1>
 <p className="text-4xl text-slate-300/80 font-medium uppercase tracking-[0.2em]">
 {slide.subtitle}
 </p>
 </div>

 <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-12 pt-8">
 {/* Visi */}
 <div className="flex-1 bg-slate-900/40 border border-white/10 rounded-[3rem] p-16 text-white shadow-2xl flex flex-col items-center text-center relative overflow-hidden group">
 <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
 <Landmark size={120} className="text-cyan-400 mb-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
 <h2 className="text-5xl font-bold mb-10 uppercase tracking-wider text-white font-display">
 Visi Utama
 </h2>
 <div className="flex flex-col gap-6 justify-center flex-grow">
 {slide.visions?.map((visi, idx) => (
 <p key={idx} className="text-4xl font-medium leading-snug drop-shadow-md text-slate-300/90 tracking-wide">
 "{visi}"
 </p>
 ))}
 </div>
 </div>

 {/* Misi */}
 <div className="flex-1 bg-slate-900/40 border border-white/10 rounded-[3rem] p-16 text-white shadow-2xl flex flex-col items-center relative overflow-hidden group">
 <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
 <Compass size={120} className="text-indigo-400 mb-10 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
 <h2 className="text-5xl font-bold mb-10 text-white uppercase tracking-wider font-display">
 Misi Strategis
 </h2>
 <ul className="flex flex-col gap-8 w-full flex-grow justify-center">
 {slide.missions?.map((misi, idx) => (
 <li key={idx} className="text-[1.8rem] text-slate-200 font-medium flex items-start text-left tracking-wide leading-relaxed">
 <span className="text-indigo-400 font-bold mr-6 text-4xl leading-none pt-1">❖</span>
 <span>{misi}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 );
}
