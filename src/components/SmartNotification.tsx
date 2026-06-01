import React, { useEffect, useState, useRef } from 'react';
import { Clock, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface NotificationState {
  active: boolean;
  title: string;
  message: string;
  type: 'morning' | 'lunch' | 'evening';
}

export default function SmartNotification() {
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [timeStr, setTimeStr] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('id-ID'));
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = hours * 60 + minutes;

      let currentNotif: NotificationState | null = null;

      // Check localStorage for testing via Admin Panel override
      const testMode = localStorage.getItem('test-notification');
      
      if (testMode === 'morning') {
        currentNotif = { active: true, title: "WAKTU MASUK KERJA", message: "Perhatian kepada seluruh pengelola: Mohon segera melakukan absensi pagi.", type: 'morning' };
      } else if (testMode === 'lunch') {
        currentNotif = { active: true, title: "WAKTU ISTIRAHAT", message: "Layanan dihentikan sementara. Selamat beristirahat kepada seluruh pengelola.", type: 'lunch' };
      } else if (testMode === 'evening') {
        currentNotif = { active: true, title: "PERSIAPAN PULANG", message: "Perhatian pengelola: Mohon persiapkan laporan kas opname, perapihan area kerja, dan jangan lupa melakukan absensi pulang.", type: 'evening' };
      } 
      // Real Schedule Checking
      else if (time >= 480 && time < 495) { // 08:00 - 08:15 (480-495)
        currentNotif = {
          active: true,
          title: "WAKTU MASUK KERJA",
          message: "Perhatian kepada seluruh pengelola: Mohon segera melakukan absensi pagi.",
          type: 'morning'
        };
      } else if (time >= 720 && time < 780) { // 12:00 - 13:00 (720-780)
        currentNotif = {
          active: true,
          title: "WAKTU ISTIRAHAT",
          message: "Layanan dihentikan sementara. Selamat beristirahat kepada seluruh pengelola.",
          type: 'lunch'
        };
      } else if (time >= 1005 && time < 1020) { // 16:45 - 17:00 (1005-1020)
        currentNotif = {
          active: true,
          title: "PERSIAPAN PULANG",
          message: "Perhatian pengelola: Mohon persiapkan laporan kas opname, perapihan area kerja, dan jangan lupa absensi pulang.",
          type: 'evening'
        };
      } else {
        currentNotif = null;
      }

      setNotification(prev => {
        // If type changed or it became active, reset hasPlayed to allow audio to play again
        if (currentNotif?.type !== prev?.type) {
            setHasPlayed(false);
        }
        return currentNotif;
      });
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notification?.active && !hasPlayed && audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio autoplay blocked, requires user interaction first', e));
        setHasPlayed(true);
    }
  }, [notification, hasPlayed]);

  if (!notification || !notification.active) return null;

  return (
    <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-12 overflow-hidden">
      {/* background glow */}
      <div className={`absolute inset-0 opacity-20 blur-[100px] pointer-events-none mix-blend-screen 
        ${notification.type === 'morning' ? 'bg-blue-500/50' : notification.type === 'lunch' ? 'bg-amber-500/50' : 'bg-red-500/50'}`}></div>
      
      <div className={`border-2 rounded-[3rem] p-16 max-w-5xl w-full text-center relative z-10 bg-slate-900/80 backdrop-blur-3xl shadow-2xl
        ${notification.type === 'morning' ? 'border-blue-500/30' : notification.type === 'lunch' ? 'border-amber-500/30' : 'border-red-500/30'}
      `}>
         {notification.type === 'morning' && <CheckCircle className="w-32 h-32 mx-auto mb-12 text-blue-400 animate-pulse" />}
         {notification.type === 'lunch' && <Info className="w-32 h-32 mx-auto mb-12 text-amber-400 animate-pulse" />}
         {notification.type === 'evening' && <AlertTriangle className="w-32 h-32 mx-auto mb-12 text-red-400 animate-pulse" />}
         
         <h1 className="text-6xl font-display font-bold tracking-widest text-white mb-8 uppercase">
           {notification.title}
         </h1>
         <p className="text-4xl text-slate-300 leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
           {notification.message}
         </p>
         
         <div className="mt-16 inline-flex items-center gap-4 bg-white/10 px-10 py-5 rounded-full border border-white/20">
           <Clock className="w-10 h-10 text-cyan-400" />
           <span className="text-4xl font-mono text-cyan-300 tracking-wider">
             {timeStr}
           </span>
         </div>
      </div>
      
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto" />
    </div>
  );
}
