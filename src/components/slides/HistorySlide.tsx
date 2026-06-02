import React from 'react';
import { Slide } from '../../types';
import { Users, History } from 'lucide-react';

interface Props {
 slide: Slide;
}

export default function HistorySlide({ slide }: Props) {
 return (
 <div className="w-full h-full flex flex-col items-center justify-center">
 <div className="text-center mb-8 md:mb-12 relative">
 <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] -z-10"></div>
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-4 uppercase tracking-widest flex flex-wrap justify-center items-center gap-4 text-center drop-shadow-lg font-display">
 <History size={64} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
 {slide.title}
 </h1>
 <p className="text-2xl text-slate-300/80 font-medium uppercase tracking-[0.2em]">
 {slide.subtitle}
 </p>
 </div>

 <div className="w-full max-w-7xl w-[95%] mx-auto flex flex-col justify-center flex-grow">
 <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
 {slide.timeline?.map((event, idx) => (
 <div key={idx} className="bg-slate-900/40 border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 rounded-3xl p-8 shadow-2xl flex flex-col items-start relative overflow-hidden group">
 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-400 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
 
 <div className="flex items-center gap-3 mb-4 relative z-10 w-full">
 <div className="bg-slate-800/80 border border-white/10 p-2 rounded-full text-cyan-400">
 <Users size={24} />
 </div>
 <span className="text-xl md:text-2xl font-display font-medium text-cyan-300 tracking-wider">
 {event.year}
 </span>
 </div>
 <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight uppercase font-display relative z-10">
 <span className="text-slate-400 text-base block mb-1">Ketua:</span>
 {event.title}
 </h3>
 <p className="text-base md:text-lg text-slate-300/80 font-normal leading-relaxed relative z-10">
 {event.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}
