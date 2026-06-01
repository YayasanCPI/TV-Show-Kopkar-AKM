import React, { useState, useEffect, useRef } from 'react';
import { Slide, Settings } from '../types';
import { Loader2, Save, Image as ImageIcon, Settings as SettingsIcon, CheckCircle, Video as VideoIcon, Bell } from 'lucide-react';
import { defaultSlides, defaultSettings } from '../defaultData';

export default function AdminPanel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const localSettings = localStorage.getItem('settings-fallback');
      let currentSettings = localSettings ? JSON.parse(localSettings) : defaultSettings;
      let appsScriptUrl = currentSettings?.appsScriptUrl || defaultSettings.appsScriptUrl;

      if (appsScriptUrl) {
        // Fetch from Google Apps Script
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
        // Fetch from Local API
        const resSlides = await fetch('/api/slides');
        if (resSlides.ok) {
          setSlides(await resSlides.json());
        } else {
          throw new Error('Slides API failed');
        }

        const resSettings = await fetch('/api/settings');
        if (resSettings.ok) {
          const data = await resSettings.json();
          if (data && Object.keys(data).length > 0) setSettings(data);
        }
      }
    } catch (err) {
      console.log('API failed, falling back to local storage', err);
      
      const localSlides = localStorage.getItem('slidedata-fallback');
      if (localSlides) setSlides(JSON.parse(localSlides));
      else setSlides(defaultSlides);

      const localSettings = localStorage.getItem('settings-fallback');
      if (localSettings) setSettings(JSON.parse(localSettings));
      else setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    // Always save to localStorage as a fallback
    localStorage.setItem('slidedata-fallback', JSON.stringify(slides));
    localStorage.setItem('settings-fallback', JSON.stringify(settings));
    
    try {
      if (settings.appsScriptUrl) {
         const p1 = fetch(`${settings.appsScriptUrl}?action=saveSlides`, {
           method: 'POST',
           body: JSON.stringify(slides),
           mode: 'no-cors'
         });
         const p2 = fetch(`${settings.appsScriptUrl}?action=saveSettings`, {
           method: 'POST',
           body: JSON.stringify(settings),
           mode: 'no-cors'
         });
         await Promise.all([p1, p2]);
         setMessage('Perubahan berhasil disimpan! Tersimpan di Google Drive.');
         setTimeout(() => setMessage(''), 3000);
      } else {
        const p1 = fetch('/api/slides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slides)
        });
        const p2 = fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings)
        });

        const [res1, res2] = await Promise.all([p1, p2]);
        
        if (res1.ok && res2.ok) {
          setMessage('Perubahan berhasil disimpan! Tersimpan di Server Lokal.');
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage('Gagal menyimpan ke server lokal. Tersimpan di memori browser (Local Storage).');
        }
      }
    } catch (err) {
      console.error(err);
      setMessage('Layanan Offline: Perubahan berhasil disimpan di memori browser Anda.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, slideId: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setSlides(slides.map(s => 
        s.id === slideId ? { ...s, imageUrl: base64String, videoUrl: '' } : s
      ));
    };
    reader.readAsDataURL(file);
  };

  const updateSlideImageUrl = (id: number, url: string) => {
    setSlides(slides.map(s => s.id === id ? { ...s, imageUrl: url, videoUrl: '' } : s));
  };

  const updateSlideVideoUrl = (id: number, url: string) => {
    setSlides(slides.map(s => s.id === id ? { ...s, videoUrl: url, imageUrl: '' } : s));
  };

  const updateSlideText = (id: number, field: keyof Slide, value: string) => {
    setSlides(slides.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const updateSettings = (field: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateMarqueeText = (index: number, value: string) => {
    const newMarquee = [...settings.marqueeText];
    newMarquee[index] = value;
    updateSettings('marqueeText', newMarquee);
  };

  const addMarqueeText = () => {
    updateSettings('marqueeText', [...settings.marqueeText, 'TEKS BARU']);
  };

  const removeMarqueeText = (index: number) => {
    const newMarquee = settings.marqueeText.filter((_, i) => i !== index);
    updateSettings('marqueeText', newMarquee);
  };

  const addSlide = () => {
    const newId = slides.length > 0 ? Math.max(...slides.map(s => s.id)) + 1 : 1;
    const newSlide: Slide = {
      id: newId,
      type: "flyer",
      title: "Slide Baru",
      subtitle: "Deskripsi Singkat",
      duration: 10000
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = (id: number) => {
    setSlides(slides.filter(s => s.id !== id));
  };

  const simulateNotification = (type: string) => {
    localStorage.setItem('test-notification', type);
    setTimeout(() => {
      localStorage.removeItem('test-notification');
    }, 15000); // clear after 15 seconds
    alert(`Simulasi Alarm ${type.toUpperCase()} diaktifkan. Silakan lihat layar Signage utama dalam tab/perangkat lain, Simulasi aktif selama 15 detik.`);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-100">
        <Loader2 size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 p-8 md:p-16 text-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Admin Panel Koperasi</h1>
            <p className="text-slate-500 mt-2">Kelola konten dan informasi slide signage digital</p>
          </div>
          <div className="flex items-center gap-4">
            {message && (
              <span className="text-blue-600 font-medium flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-cyan-200">
                <CheckCircle size={18} /> {message}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50 shadow-md"
            >
              {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* Global Settings Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <SettingsIcon className="text-slate-400" />
              Pengaturan Umum (Widget & Running Text)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Widget Block */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-slate-800">Widget Informasi</h3>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={settings.widgetEnabled} onChange={(e) => updateSettings('widgetEnabled', e.target.checked)} />
                      <div className={`block w-14 h-8 rounded-full transition-colors ${settings.widgetEnabled ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.widgetEnabled ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                  </label>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Judul Widget</label>
                    <input
                      type="text"
                      value={settings.widgetTitle}
                      onChange={(e) => updateSettings('widgetTitle', e.target.value)}
                      disabled={!settings.widgetEnabled}
                      className="w-full border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-200 disabled:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Teks Utama Widget</label>
                    <textarea
                      value={settings.widgetText}
                      onChange={(e) => updateSettings('widgetText', e.target.value)}
                      disabled={!settings.widgetEnabled}
                      rows={2}
                      className="w-full border border-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-200 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Marquee Block */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-slate-800">Running Text (Marquee)</h3>
                  <button onClick={addMarqueeText} className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-100 px-3 py-1 rounded-lg">
                    + Tambah Teks
                  </button>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {settings.marqueeText.map((text, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => updateMarqueeText(i, e.target.value)}
                        className="flex-1 border border-slate-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button onClick={() => removeMarqueeText(i)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 text-sm font-medium">Hapus</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Drive Backend Link */}
            <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-lg text-slate-800 mb-2">Google Drive Backend (Opsional)</h3>
              <p className="text-sm text-slate-500 mb-4">Jika Anda sudah mendeploy Google Apps Script, masukkan URL Web App di bawah ini. Aplikasi akan beralih menggunakan Google Drive sebagai database.</p>
              <input
                type="text"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={settings.appsScriptUrl || ''}
                onChange={(e) => updateSettings('appsScriptUrl', e.target.value)}
                className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Smart Notifications Simulation */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Bell className="text-slate-400" />
              Simulasi Alarm & Notifikasi Pintar
            </h2>
            <p className="text-sm text-slate-500 mb-6">Alarm ini akan berjalan otomatis sesuai jam yang ditetapkan sehari-hari (08:00, 12:00, 16:45). Gunakan tombol di bawah ini untuk melihat tampilan pratinjaunya. Pastikan Signage terbuka dan telah mendapatkan izin untuk memainkan suara kliping audio (anda mungkin harus mengklik 1 kali ke dalam papan signage untuk mengizinkan audionya diputar).</p>
            <div className="flex gap-4">
               <button onClick={() => simulateNotification('morning')} className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-3 rounded-lg font-bold">
                 Test Masuk Kerja (08:00)
               </button>
               <button onClick={() => simulateNotification('lunch')} className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-6 py-3 rounded-lg font-bold">
                 Test Istirahat (12:00)
               </button>
               <button onClick={() => simulateNotification('evening')} className="bg-red-100 text-red-700 hover:bg-red-200 px-6 py-3 rounded-lg font-bold">
                 Test Pulang & Laporan (16:45)
               </button>
            </div>
          </div>
        </div>

        {/* Content Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <ImageIcon className="text-slate-400" />
                Kelola Konten Slide
              </h2>
              <button onClick={addSlide} className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-100 px-4 py-2 rounded-lg">
                + Tambah Slide
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {slides.map(slide => (
                <div key={slide.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-slate-300 text-blue-800 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                      Slide {slide.id} - {slide.type}
                    </span>
                    <button onClick={() => removeSlide(slide.id)} className="text-sm font-medium text-red-600 hover:text-red-800 bg-red-100 px-3 py-1 rounded-lg">
                      Hapus
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {slide.title !== undefined && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Judul (Title)
                        </label>
                        <input
                          type="text"
                          value={slide.title || ''}
                          onChange={(e) => updateSlideText(slide.id, 'title', e.target.value)}
                          className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                    
                    {slide.subtitle !== undefined && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Sub-Judul (Subtitle)
                        </label>
                        <input
                          type="text"
                          value={slide.subtitle || ''}
                          onChange={(e) => updateSlideText(slide.id, 'subtitle', e.target.value)}
                          className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>

                  {slide.description !== undefined && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        value={slide.description || ''}
                        onChange={(e) => updateSlideText(slide.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {/* Specific fields based on slide type */}
                  {slide.type === 'flyer' && (
                    <div className="pt-6 border-t border-slate-200">
                      <h4 className="font-bold text-slate-800 mb-4">Gambar / Video Promosi (Flyer)</h4>
                      <p className="text-sm text-slate-500 mb-4">Anda dapat menampilkan satu gambar poster atau memutar sebuah video.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                            <ImageIcon size={16}/> Upload Gambar Poster
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, slide.id)}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-slate-300 transition-colors border border-slate-300 rounded-lg bg-white"
                          />
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Atau Gunakan URL Gambar Secara Online
                            </label>
                            <input
                              type="text"
                              value={slide.imageUrl || ''}
                              onChange={(e) => updateSlideImageUrl(slide.id, e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="mt-6 pt-6 border-t border-slate-200">
                            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2 text-blue-700">
                              <VideoIcon size={16}/> Gunakan Video URL (MP4)
                            </label>
                            <input
                              type="text"
                              value={slide.videoUrl || ''}
                              onChange={(e) => updateSlideVideoUrl(slide.id, e.target.value)}
                              placeholder="https://example.com/video.mp4"
                              className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-slate-500 mt-2">Jika Anda memasukkan Video URL, maka gambar di atas akan diabaikan.</p>
                          </div>
                        </div>

                        <div className="bg-slate-200 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-2 min-h-[300px]">
                          {slide.videoUrl ? (
                            <div className="text-center">
                              <VideoIcon size={48} className="text-blue-500 mx-auto mb-2" />
                              <span className="text-slate-600 font-medium">Video Akan Diputar</span>
                              <p className="text-xs text-slate-500 truncate max-w-xs mt-2 px-4">{slide.videoUrl}</p>
                            </div>
                          ) : slide.imageUrl ? (
                            <img src={slide.imageUrl} alt="Preview" className="max-h-64 object-contain rounded-lg" />
                          ) : (
                            <span className="text-slate-500 font-medium">Belum ada preview.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
