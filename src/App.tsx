import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SlideCarousel from './components/SlideCarousel';
import { Slide, Settings } from './types';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import Marquee from './components/Marquee';
import AdminPanel from './components/AdminPanel';
import { defaultSlides, defaultSettings } from './defaultData';
import { ErrorBoundary } from './ErrorBoundary';

function DigitalSignage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-refresh slides periodically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const localSettings = localStorage.getItem('settings-fallback');
        let currentSettings = localSettings ? JSON.parse(localSettings) : null;
        let appsScriptUrl = currentSettings?.appsScriptUrl;

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

  return (
    <div className="flex flex-col h-screen w-full bg-black overflow-hidden font-sans text-white relative">
      {/* Animated glowing orbs in the background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-700/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      
      <Header />
      {settings.widgetEnabled && (
        <div className="h-12 bg-slate-900 border-b border-white/5 flex items-center shrink-0 px-12 z-40 overflow-hidden relative">
          <div className="flex items-center gap-3">
             <span className="font-bold text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-md border border-blue-500/20 uppercase tracking-widest">
                {settings.widgetTitle}
             </span>
             <span className="text-slate-300 font-medium tracking-wide">
                {settings.widgetText}
             </span>
          </div>
        </div>
      )}
      <div className="flex-1 relative w-full h-full overflow-hidden z-10">
        <SlideCarousel slides={slides} />
      </div>
      <Marquee settings={settings} />
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
