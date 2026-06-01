import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SlideCarousel from './components/SlideCarousel';
import { Slide } from './types';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import Marquee from './components/Marquee';
import AdminPanel from './components/AdminPanel';
import { defaultSlides } from './defaultData';
import { ErrorBoundary } from './ErrorBoundary';

function DigitalSignage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-refresh slides periodically
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/slides');
        if (!response.ok) {
          throw new Error('Failed to fetch slides');
        }
        const data = await response.json();
        setSlides(data);
        localStorage.setItem('slidedata-fallback', JSON.stringify(data));
      } catch (err: any) {
        console.log('Falling back to local storage or default data due to api error:', err);
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

    fetchSlides();
    const interval = setInterval(fetchSlides, 30000); // Check for new slides every 30s
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
      <div className="flex-1 relative w-full h-full overflow-hidden z-10">
        <SlideCarousel slides={slides} />
      </div>
      <Marquee />
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
