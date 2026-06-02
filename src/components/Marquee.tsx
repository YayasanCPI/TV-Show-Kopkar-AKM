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
    <div className="h-24 bg-black/60 backdrop-blur-lg flex items-center overflow-hidden relative z-50 border-t border-white/5">
      <div className="animate-marquee whitespace-nowrap flex items-center text-[2.2rem] font-medium tracking-widest text-slate-200 w-max pt-1 uppercase font-display" style={{ willChange: 'transform' }}>
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
