import React from 'react';
import { Settings } from '../types';

export default function Marquee({ settings }: { settings: Settings }) {
 const elements: React.ReactNode[] = [];
 
 settings.marqueeText.forEach((text, i) => {
 elements.push(<span key={`text-${i}`} className="mx-12">{text}</span>);
 if (i < settings.marqueeText.length) {
 elements.push(<span key={`star-${i}`} className="mx-12 text-cyan-400 text-3xl">✦</span>);
 }
 });

 const content = <>{elements}</>;

 return (
 <div className="h-24 bg-black/95 flex items-center overflow-hidden relative z-50 border-t-4 border-indigo-900 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
 <div className="animate-marquee whitespace-nowrap flex items-center text-[2.2rem] font-medium tracking-widest text-slate-200 w-max pt-1 uppercase font-display" style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden', perspective: 1000 }}>
 {content}
 {content}
 {content}
 </div>
 </div>
 );
}
