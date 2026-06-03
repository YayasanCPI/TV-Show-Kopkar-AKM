import React, { useEffect, useState, useRef } from 'react';
import { Clock, AlertTriangle, CheckCircle, Info, Users } from 'lucide-react';

interface NotificationState {
 active: boolean;
 title: string;
 message: string;
 type: 'morning' | 'lunch' | 'evening';
}

interface AbsensiData {
 nama: string;
 waktu: string;
}

export default function SmartNotification() {
 const [notification, setNotification] = useState<NotificationState | null>(null);
 const [timeStr, setTimeStr] = useState('');
 const audioRef = useRef<HTMLAudioElement>(null);
 const [hasPlayed, setHasPlayed] = useState(false);

 const [hadirList, setHadirList] = useState<AbsensiData[]>([]);
 const [pulangList, setPulangList] = useState<AbsensiData[]>([]);
 const [isFetchingAbsen, setIsFetchingAbsen] = useState(false);

 const fetchAbsensi = async () => {
 setIsFetchingAbsen(true);
 try {
 const API_ABSEN = 'https://script.google.com/macros/s/AKfycbz6YajqskEFxko5jVtpK8RS3oI-LUHbaLCUmgCFa-xHZIWSGrxJfB66ng0O0HqR4Arf-g/exec';
 const res = await fetch(API_ABSEN);
 const data = await res.json();
 
 const targetDate = new Date();
 
 // Adapted from the provided script
 const isSameDate = (dateVal: any) => {
 if (!dateVal) return false;
 let d;
 let dateStr = String(dateVal).trim();
 if (dateStr.includes('Date')) {
 try { 
 // Handle Google Apps Script date format /Date(...)/
 const ms = parseInt(dateStr.replace(/[^0-9]/g, ''));
 d = new Date(ms); 
 } catch (e) { return false; }
 } else {
 d = new Date(dateStr);
 if (isNaN(d.getTime())) {
 const parts = dateStr.split(/[\/\-]/);
 if (parts.length === 3) {
 if (parts[0].length <= 2 && parts[2].length === 4) d = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
 else if (parts[0].length === 4) d = new Date(`${parts[0]}/${parts[1]}/${parts[2]}`);
 }
 }
 }
 if (!d || isNaN(d.getTime())) return false;
 return d.getFullYear() === targetDate.getFullYear() && 
 d.getMonth() === targetDate.getMonth() && 
 d.getDate() === targetDate.getDate();
 };

 const getColIdx = (headers: string[], keywords: string[], fallbackIdx: number) => {
 const idx = headers.findIndex(h => keywords.some(k => String(h).toLowerCase().includes(k)));
 return idx !== -1 ? idx : fallbackIdx;
 };

 const EXCLUDED_NAMES = ['yuliani'];
 const isValidName = (n: string) => {
 if (!n || n === 'Nama' || n.startsWith('a00')) return false;
 return !EXCLUDED_NAMES.includes(n.toLowerCase());
 };

 const masukData: AbsensiData[] = [];
 if (data.masuk && data.masuk.length > 1) {
 const headers = data.masuk[0];
 const nameIdx = getColIdx(headers, ['nama', 'name'], 5);
 const dateIdx = getColIdx(headers, ['tanggal', 'date'], 2);
 const timeIdx = getColIdx(headers, ['jam', 'time', 'waktu'], 3);
 const codeIdx = getColIdx(headers, ['status kehadiran', 'kode', 'code', 'status'], 14);

 data.masuk.slice(1).forEach((row: any) => {
 const name = String(row[nameIdx]).trim();
 const code = String(row[codeIdx]).trim().toLowerCase();
 if (isValidName(name) && isSameDate(row[dateIdx])) {
 if (['v', 'x', 't', 'tx', 'hadir'].includes(code) || row[timeIdx]) {
 // Only add if not already in list to avoid duplicates
 if (!masukData.some(m => m.nama === name)) {
 masukData.push({ nama: name, waktu: row[timeIdx] || '--:--' });
 }
 }
 }
 });
 }

 const pulangData: AbsensiData[] = [];
 if (data.pulang && data.pulang.length > 1) {
 const headers = data.pulang[0];
 const nameIdx = getColIdx(headers, ['nama', 'name'], 5);
 const dateIdx = getColIdx(headers, ['tanggal', 'date'], 2);
 const timeIdx = getColIdx(headers, ['jam', 'time', 'waktu'], 3);

 data.pulang.slice(1).forEach((row: any) => {
 const name = String(row[nameIdx]).trim();
 if (isValidName(name) && isSameDate(row[dateIdx]) && row[timeIdx]) {
 if (!pulangData.some(p => p.nama === name)) {
 pulangData.push({ nama: name, waktu: row[timeIdx] || '--:--' });
 }
 }
 });
 }

 setHadirList(masukData);
 setPulangList(pulangData);
 } catch (error) {
 console.error('Error fetching absensi', error);
 } finally {
 setIsFetchingAbsen(false);
 }
 };

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
 if (currentNotif && prev && currentNotif.type === prev.type) return prev;
 if (!currentNotif && !prev) return prev;

 // If type changed or it became active, reset hasPlayed to allow audio to play again
 if (currentNotif?.type !== prev?.type) {
 setHasPlayed(false);
 if (currentNotif && (currentNotif.type === 'morning' || currentNotif.type === 'evening' || currentNotif.type === 'lunch')) {
 fetchAbsensi();
 }
 }
 return currentNotif;
 });
 };

 checkTime();
 const interval = setInterval(checkTime, 1000);
 
 // Poll absensi every 30 seconds if morning or evening is active
 const absensiPolling = setInterval(() => {
 if (notification && (notification.type === 'morning' || notification.type === 'evening' || notification.type === 'lunch')) {
 fetchAbsensi();
 }
 }, 30000);

 return () => {
 clearInterval(interval);
 clearInterval(absensiPolling);
 };
 }, [notification]);

 useEffect(() => {
 if (notification?.active && !hasPlayed && audioRef.current) {
 const playPromise = audioRef.current.play();
 if (playPromise !== undefined) {
 playPromise.catch(e => console.log('Audio autoplay blocked, requires user interaction first', e));
 }
 setHasPlayed(true);
 }
 }, [notification, hasPlayed]);

 

 return (
 <>
 <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto" />
 {notification && notification.active && (
 <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-12 overflow-hidden">
 {/* background glow */}
 <div className={`absolute inset-0 opacity-20 pointer-events-none  
 ${notification.type === 'morning' ? 'bg-blue-500/50' : notification.type === 'lunch' ? 'bg-amber-500/50' : 'bg-red-500/50'}`}></div>
 
 <div className={`border-2 rounded-[3rem] p-16 max-w-7xl w-full text-center relative z-10 bg-slate-900/80 shadow-2xl flex flex-col xl:flex-row items-center gap-16
 ${notification.type === 'morning' ? 'border-blue-500/30' : notification.type === 'lunch' ? 'border-amber-500/30' : 'border-red-500/30'}
 `}>
 
 <div className="flex-1">
 {notification.type === 'morning' && <CheckCircle className="w-32 h-32 mx-auto mb-12 text-blue-400 animate-pulse" />}
 {notification.type === 'lunch' && <Info className="w-32 h-32 mx-auto mb-12 text-amber-400 animate-pulse" />}
 {notification.type === 'evening' && <AlertTriangle className="w-32 h-32 mx-auto mb-12 text-red-400 animate-pulse" />}
 
 <h1 className="text-5xl xl:text-6xl font-display font-bold tracking-widest text-white mb-8 uppercase">
 {notification.title}
 </h1>
 <p className="text-3xl xl:text-4xl text-slate-300 leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
 {notification.message}
 </p>
 
 <div className="mt-16 inline-flex items-center gap-4 bg-white/10 px-10 py-5 rounded-full border border-white/20">
 <Clock className="w-10 h-10 text-cyan-400" />
 <span className="text-4xl font-mono text-cyan-300 tracking-wider">
 {timeStr}
 </span>
 </div>
 </div>

 {/* Absensi Container */}
 {(notification.type === 'morning' || notification.type === 'evening' || notification.type === 'lunch') && (
 <div className="flex-1 w-full xl:max-w-md bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 text-left">
 <div className="flex items-center justify-between mb-8">
 <h3 className="text-2xl font-bold text-white flex items-center gap-3">
 <Users className="w-8 h-8 text-indigo-400" />
 {notification.type === 'morning' || notification.type === 'lunch' ? 'Sudah Masuk Hari Ini' : 'Sudah Absen Pulang'}
 </h3>
 <span className="bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-lg font-bold border border-indigo-500/30">
 {notification.type === 'morning' || notification.type === 'lunch' ? hadirList.length : pulangList.length} Orang
 </span>
 </div>
 
 <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
 {isFetchingAbsen && hadirList.length === 0 && pulangList.length === 0 && (
 <div className="text-center py-10 text-slate-400">
 Memuat data absensi...
 </div>
 )}

 {!isFetchingAbsen && (notification.type === 'morning' || notification.type === 'lunch') && hadirList.length === 0 && (
 <div className="text-center py-10 text-slate-400">
 Belum ada data kehadiran terekam.
 </div>
 )}

 {!isFetchingAbsen && notification.type === 'evening' && pulangList.length === 0 && (
 <div className="text-center py-10 text-slate-400">
 Belum ada yang absen pulang.
 </div>
 )}

 {(notification.type === 'morning' || notification.type === 'lunch') && hadirList.map((item, i) => (
 <div key={i} className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30 uppercase">
 {item.nama.substring(0, 2)}
 </div>
 <h4 className="font-bold text-slate-200 text-lg capitalize">{item.nama}</h4>
 </div>
 <span className="text-emerald-400 font-mono font-bold">{item.waktu}</span>
 </div>
 ))}

 {notification.type === 'evening' && pulangList.map((item, i) => (
 <div key={i} className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30 uppercase">
 {item.nama.substring(0, 2)}
 </div>
 <h4 className="font-bold text-slate-200 text-lg capitalize">{item.nama}</h4>
 </div>
 <span className="text-indigo-400 font-mono font-bold">{item.waktu}</span>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 </div>
 )}
 </>
 );
}
