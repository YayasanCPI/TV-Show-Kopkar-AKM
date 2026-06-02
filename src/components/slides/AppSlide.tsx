import React from 'react';
import { Slide } from '../../types';
import { Smartphone, QrCode } from 'lucide-react';

interface Props {
 slide: Slide;
}

export default function AppSlide({ slide }: Props) {
 return (
 <div className="w-full h-full flex flex-col items-center justify-center">
 <div className="text-center mb-8 max-w-6xl relative">
 <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] -z-10"></div>
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-4 uppercase tracking-widest drop-shadow-lg font-display">
 {slide.title}
 </h1>
 <p className="text-xl md:text-2xl text-slate-300/80 font-medium leading-relaxed tracking-[0.1em] uppercase">
 {slide.description}
 </p>
 </div>

 <div className="flex flex-row w-full max-w-7xl mx-auto gap-8 lg:gap-16 items-center flex-grow pt-4">
 
 {/* Smartphone Mockup side */}
 <div className="flex-1 flex justify-center items-center relative h-full">
 <div className="w-[18rem] md:w-[22rem] h-[36rem] md:h-[44rem] bg-slate-900/80 rounded-[3rem] border-[4px] border-white/20 shadow-[0_0_60px_rgba(34,211,238,0.3)] relative overflow-hidden flex flex-col pt-10 md:pt-12 items-center bg-gradient-to-b from-slate-800/90 to-slate-950/90 ring-4 md:ring-8 ring-slate-950">
 <Smartphone size={200} className="text-white/5 absolute top-1/4" />
 <div className="text-white z-10 text-center px-4 font-black text-xl md:text-[1.8rem] mb-8 md:mb-10 tracking-[0.2em] font-display">
 KOPKAR AKM
 </div>
 <div className="w-full bg-black/80 flex-1 rounded-t-[2.5rem] p-6 md:p-8 flex flex-col gap-4 md:gap-6 shadow-[inset_0_20px_40px_rgba(0,0,0,0.5)] border-t border-white/10 ">
 <div className="bg-slate-800/50 h-16 md:h-20 rounded-2xl w-full border border-white/5"></div>
 <div className="bg-slate-800/50 h-16 md:h-20 rounded-2xl w-full border border-white/5"></div>
 <div className="bg-slate-800/50 h-16 md:h-20 rounded-2xl w-full border border-white/5"></div>
 </div>
 </div>
 </div>

 {/* QR Code side */}
 <div className="flex-1 flex flex-col items-center justify-center">
 <div className="bg-slate-900/40 p-10 md:p-16 rounded-[4rem] shadow-[0_0_60px_rgba(0,0,0,0.3)] flex flex-col items-center border border-white/10 relative overflow-hidden group">
 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>
 
 <p className="text-2xl md:text-[2.5rem] font-bold text-white mb-10 md:mb-16 text-center uppercase tracking-[0.2em] leading-snug font-display relative z-10">
 SCAN DI SINI<br/><span className="text-cyan-400 font-medium text-xl md:text-3xl tracking-widest block mt-4">UNTUK DOWNLOAD</span>
 </p>
 <div className="bg-white/90 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-[0_0_40px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.4)] transition-shadow relative z-10">
 <QrCode size={240} className="text-slate-900 drop-shadow-md w-48 h-48 md:w-[300px] md:h-[300px]" />
 </div>
 </div>
 </div>
 
 </div>
 </div>
 );
}
