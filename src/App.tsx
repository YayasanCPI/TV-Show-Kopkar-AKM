import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SlideCarousel from './components/SlideCarousel';
import { Slide, Settings } from './types';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import Marquee from './components/Marquee';
import AdminPanel from './components/AdminPanel';
import SmartNotification from './components/SmartNotification';
import AbsensiWidget from './components/AbsensiWidget';
import AdzanAlert from './components/AdzanAlert';
import { defaultSlides, defaultSettings } from './defaultData';
import { ErrorBoundary } from './ErrorBoundary';
import ReactPlayer from 'react-player';
import { formatMediaUrl } from './utils/formatMedia';

function DigitalSignage() {
 const [slides, setSlides] = useState<Slide[]>([]);
 const [settings, setSettings] = useState<Settings>(defaultSettings);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [isAdzanPlaying, setIsAdzanPlaying] = useState(false);
 const [hasInteracted, setHasInteracted] = useState(false);
 const [activeSlide, setActiveSlide] = useState<Slide | null>(null);

 // Auto-refresh slides periodically
 useEffect(() => {
 // Hard refresh every 2 hours to completely reset TV Box memory and ensure new data
    const hardReloadInterval = setInterval(() => {
      window.location.reload();
    }, 2 * 60 * 60 * 1000);

    const fetchData = async () => {
 try {
 const localSettings = localStorage.getItem('settings-fallback');
 let currentSettings = localSettings ? JSON.parse(localSettings) : defaultSettings;
 let appsScriptUrl = currentSettings?.appsScriptUrl || defaultSettings.appsScriptUrl;

 if (appsScriptUrl) {
 const resSettings = await fetch(`${appsScriptUrl}?action=getSettings`);
 if (resSettings.ok) {
 const remoteSettings = await resSettings.json();
 if (remoteSettings && Object.keys(remoteSettings).length > 0) {
 setSettings(remoteSettings);
 localStorage.setItem('settings-fallback', JSON.stringify(remoteSettings));
 }
 }
 const resSlides = await fetch(`${appsScriptUrl}?action=getSlides`);
 if (resSlides.ok) {
 const remoteSlides = await resSlides.json();
 if (remoteSlides && remoteSlides.length > 0) {
 setSlides(remoteSlides);
 localStorage.setItem('slidedata-fallback', JSON.stringify(remoteSlides));
 }
 }
 } else {
 // Fetch Slides from local API
 const slidesRes = await fetch('/api/slides');
 if (!slidesRes.ok) throw new Error('Failed to fetch slides');
 const slidesData = await slidesRes.json();
 setSlides(slidesData);
 localStorage.setItem('slidedata-fallback', JSON.stringify(slidesData));
 
 // Fetch Settings from local API
 const settingsRes = await fetch('/api/settings');
 if (settingsRes.ok) {
 const settingsData = await settingsRes.json();
 if (settingsData && Object.keys(settingsData).length > 0) {
 setSettings(settingsData);
 localStorage.setItem('settings-fallback', JSON.stringify(settingsData));
 }
 }
 }
 } catch (err: any) {
 console.log('Falling back to local storage or default data due to api error:', err);
 
 // Settings fallback
 const localSettings = localStorage.getItem('settings-fallback');
 if (localSettings) {
 setSettings(JSON.parse(localSettings));
 } else {
 setSettings(defaultSettings);
 }

 // Slides fallback
 const localData = localStorage.getItem('slidedata-fallback');
 if (localData) {
 setSlides(JSON.parse(localData));
 } else {
 setSlides(defaultSlides);
 }
 } finally {
 setLoading(false);
 }
 };

 fetchData();
 const interval = setInterval(fetchData, 30000); // Check for new slides every 30s
 return () => clearInterval(interval);
 }, []);

 // Responsive Signage Scaler
 useEffect(() => {
 const handleResize = () => {
 // Desain dasar menggunakan resolusi 1920x1080 (Landscape TV 16:9)
 const scaleX = window.innerWidth / 1920;
 const scaleY = window.innerHeight / 1080;
 // Ambil nilai terkecil agar tidak ada yang terpotong (fit to screen)
 const scale = Math.min(scaleX, scaleY);
 
 // Batasi scale minimal agar tidak terlalu kecil di layar HP (misal min 0.4)
 const finalScale = Math.max(0.4, scale);
 
 document.documentElement.style.fontSize = `${16 * finalScale}px`;
 };

 handleResize();
 window.addEventListener('resize', handleResize);
 return () => {
 window.removeEventListener('resize', handleResize);
 document.documentElement.style.fontSize = ''; // Reset on unmount
 };
 }, []);

 if (loading) {
 return (
 <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
 <Loader2 size={64} className="text-blue-500 animate-spin mb-4" />
 <p className="text-2xl text-slate-400 uppercase tracking-widest font-semibold">Memuat Layanan...</p>
 </div>
 );
 }

 if (error || slides.length === 0) {
 return (
 <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
 <p className="text-3xl text-red-500 font-bold mb-4">Gagal Memuat Konten</p>
 <p className="text-xl text-slate-400">{error || 'Tidak ada slide ditemukan'}</p>
 </div>
 );
 }

 if (!hasInteracted) {
 return (
 <div 
 className="w-full h-screen flex flex-col items-center justify-center bg-slate-900 cursor-pointer"
 onClick={() => setHasInteracted(true)}
 >
 <div className="text-center space-y-4">
 <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse text-blue-400">
 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
 </div>
 <h1 className="text-4xl text-white font-bold tracking-wide">Mulai TV Informasi</h1>
 <p className="text-xl text-slate-400">Ketuk layar di mana saja untuk mengaktifkan audio & video (kebijakan browser).</p>
 </div>
 </div>
 );
 }

 const isFullScreenSlide = activeSlide?.isFullScreen && (activeSlide?.imageUrl || activeSlide?.videoUrl);

 return (
 <div className="flex flex-col h-screen w-full bg-black overflow-hidden font-sans text-white relative">
 {/* Animated glowing orbs in the background */}
 <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(37,99,235,0.2)_0%,transparent_70%)] rounded-full pointer-events-none "></div>
 <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(14,116,144,0.2)_0%,transparent_70%)] rounded-full pointer-events-none "></div>
 <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-[radial-gradient(circle,rgba(49,46,129,0.2)_0%,transparent_70%)] rounded-full pointer-events-none "></div>
 
 {/* Background Music Player */}
 {settings.bgMusicEnabled && settings.bgMusicUrl && (
 <div className="absolute opacity-0 pointer-events-none w-10 h-10 overflow-hidden -z-50">
 <ReactPlayer
 {...({
 url: formatMediaUrl(settings.bgMusicUrl, 'audio'),
 playing: !isAdzanPlaying && hasInteracted,
 loop: true,
 volume: 0.4,
 width: "200px",
 height: "200px",
 config: { 
   youtube: { playerVars: { origin: window.location.origin } },
   file: { forceAudio: true }
 },
 onError: (e: any) => console.log('bgMusic error', e)
 } as any)}
 />
 </div>
 )}

 {!isFullScreenSlide && <Header settings={settings} isMusicPlaying={settings.bgMusicEnabled && !!settings.bgMusicUrl && !isAdzanPlaying && hasInteracted} />}
 {!isFullScreenSlide && settings.widgetEnabled && (
 <div className="h-12 bg-slate-900 border-b border-white/5 flex items-center shrink-0 px-12 z-40 overflow-hidden relative justify-between">
 <div className="flex items-center gap-3 flex-shrink-0">
 <span className="font-bold text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-md border border-blue-500/20 uppercase tracking-widest">
 {settings.widgetTitle}
 </span>
 <span className="text-slate-300 font-medium tracking-wide max-w-xl truncate">
 {settings.widgetText}
 </span>
 </div>
 <AbsensiWidget />
 </div>
 )}
 <div className="flex-1 relative w-full h-full overflow-hidden z-10">
 <SmartNotification />
 <AdzanAlert onAdzanStateChange={setIsAdzanPlaying} />
 <SlideCarousel slides={slides} onActiveSlideChange={setActiveSlide} />
 </div>
 {!isFullScreenSlide && <Marquee settings={settings} />}
 </div>
 );
}

export default function App() {
 return (
 <ErrorBoundary>
 <HashRouter>
 <Routes>
 <Route path="/" element={<DigitalSignage />} />
 <Route path="/admin" element={<AdminPanel />} />
 </Routes>
 </HashRouter>
 </ErrorBoundary>
 );
}
