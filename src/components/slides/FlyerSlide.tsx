import React from 'react';
import { Slide } from '../../types';
import { Megaphone } from 'lucide-react';
import VideoRenderer from '../VideoRenderer';

interface Props {
 slide: Slide;
 onVideoEnded?: () => void;
}

export default function FlyerSlide({ slide, onVideoEnded }: Props) {
 return (
 <div className="w-full h-full flex flex-col items-center justify-center py-4">
 {slide.title && (
 <div className="text-center mb-4 shrink-0 relative">
 <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] -z-10"></div>
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-2 uppercase tracking-widest flex flex-wrap justify-center items-center gap-4 text-center drop-shadow-lg font-display">
 <Megaphone size={48} className="text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
 {slide.title}
 </h1>
 {slide.subtitle && (
 <p className="text-xl md:text-2xl text-slate-300/80 font-medium uppercase tracking-[0.2em]">
 {slide.subtitle}
 </p>
 )}
 </div>
 )}
 
 <div className="w-full h-full flex-1 flex items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 shadow-2xl relative p-4 md:p-8 min-h-0">
 <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
 
 {slide.videoUrl ? (
 <VideoRenderer url={slide.videoUrl} className="max-w-full max-h-full object-contain rounded-[1rem] md:rounded-[2rem] drop-shadow-2xl relative z-10 mx-auto my-auto" onEnded={onVideoEnded} />
 ) : slide.imageUrl ? (
 <img 
 src={slide.imageUrl} 
 alt={slide.title || "Flyer Informasi"} 
 className="max-w-full max-h-full object-contain rounded-[1rem] md:rounded-[2rem] drop-shadow-2xl relative z-10 mx-auto my-auto"
 />
 ) : (
 <div className="flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/10 m-8 rounded-[3rem] w-[calc(100%-4rem)] h-[calc(100%-4rem)] bg-slate-800/30">
 <span className="text-4xl mb-6 font-bold tracking-widest uppercase text-cyan-400/50 font-display">Area Flyer / Banner Promosi</span>
 <span className="text-2xl tracking-wider text-slate-400 font-light">Gunakan Admin Panel untuk mengunggah gambar atau video</span>
 </div>
 )}
 </div>
 </div>
 );
}
