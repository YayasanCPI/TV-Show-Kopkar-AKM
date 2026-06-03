import React, { useState, useEffect } from 'react';
import { Landmark, AudioLines } from 'lucide-react';
import { Settings } from '../types';

interface HeaderProps {
 settings: Settings;
 isMusicPlaying?: boolean;
}

export default function Header({ settings, isMusicPlaying }: HeaderProps) {
 const [time, setTime] = useState(new Date());

 useEffect(() => {
 const timer = setInterval(() => setTime(new Date()), 1000);
 return () => clearInterval(timer);
 }, []);

 const formatDate = (date: Date) => {
 return new Intl.DateTimeFormat('id-ID', {
 weekday: 'long',
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 }).format(date);
 };

 const formatTime = (date: Date) => {
 return new Intl.DateTimeFormat('id-ID', {
 hour: '2-digit',
 minute: '2-digit',
 second: '2-digit',
 hour12: false
 }).format(date);
 };

 return (
 <div className="h-36 bg-black/40 border-b border-white/5 flex items-center justify-between px-12 z-50 shrink-0">
 <div className="flex items-center gap-8">
 <div className="relative">
 <div className="absolute inset-0 bg-blue-500 opacity-40 rounded-full"></div>
 <div className="w-24 h-24 bg-white border border-blue-500/30 rounded-full flex items-center justify-center relative z-10 shadow-xl overflow-hidden p-2">
 {settings.logoUrl ? (
 <img src={settings.logoUrl} alt="Logo KOPKAR AKM" className="w-full h-full object-contain max-w-full max-h-full" />
 ) : (
 <Landmark size={48} className="text-blue-500" />
 )}
 </div>
 </div>
 <div className="flex flex-col justify-center">
 <div className="flex items-center gap-4">
 <h1 className="text-5xl font-black font-display tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
 KOPKAR AKM
 </h1>
 {isMusicPlaying && (
 <div className="flex items-center justify-center bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/30 gap-2 mb-1">
 <AudioLines size={20} className="animate-pulse" />
 <span className="text-xs uppercase tracking-widest font-bold">Audio</span>
 </div>
 )}
 </div>
 <h2 className="text-[1.4rem] font-medium tracking-[0.3em] text-cyan-400/80 mt-2 uppercase">
 Koperasi Jasa Adaro Karya Mandiri
 </h2>
 </div>
 </div>
 <div className="flex flex-col items-end justify-center">
 <h1 className="text-[4.5rem] leading-none font-black tracking-wider font-display text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
 {formatTime(time)}
 </h1>
 <h2 className="text-2xl uppercase tracking-[0.2em] text-slate-300 mt-3 font-medium">
 {formatDate(time)}
 </h2>
 </div>
 </div>
 );
}
