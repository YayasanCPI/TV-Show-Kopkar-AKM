import React, { useState, useEffect, useRef } from 'react';
import { Slide } from '../types';
import { Loader2, Save, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { defaultSlides } from '../defaultData';

export default function AdminPanel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/slides');
      if (response.ok) {
        const data = await response.json();
        setSlides(data);
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      console.log('API failed, falling back to local storage', err);
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

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    // Always save to localStorage as a fallback
    localStorage.setItem('slidedata-fallback', JSON.stringify(slides));
    
    try {
      const response = await fetch('/api/slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slides)
      });
      if (response.ok) {
        setMessage('Perubahan berhasil disimpan! Tersimpan di Server.');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Gagal menyimpan ke server. Tersimpan di memori browser (Local Storage).');
      }
    } catch (err) {
      console.error(err);
      setMessage('Mode Offline aktif: Perubahan berhasil disimpan di memori browser Anda.');
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
        s.id === slideId ? { ...s, imageUrl: base64String } : s
      ));
    };
    reader.readAsDataURL(file);
  };

  const updateSlideImageUrl = (id: number, url: string) => {
    setSlides(slides.map(s => s.id === id ? { ...s, imageUrl: url } : s));
  };

  const updateSlideText = (id: number, field: keyof Slide, value: string) => {
    setSlides(slides.map(s => s.id === id ? { ...s, [field]: value } : s));
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

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <ImageIcon className="text-slate-400" />
              Kelola Konten Slide
            </h2>
            
            <div className="flex flex-col gap-6">
              {slides.map(slide => (
                <div key={slide.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-slate-300 text-blue-800 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                      Slide {slide.id} - {slide.type}
                    </span>
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
                      <h4 className="font-bold text-slate-800 mb-4">Gambar Promosi / Flyer</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Upload Gambar Baru
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, slide.id)}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-slate-300 transition-colors border border-slate-300 rounded-lg bg-white"
                          />
                          
                          <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Atau Gunakan URL Gambar
                            </label>
                            <input
                              type="text"
                              value={slide.imageUrl || ''}
                              onChange={(e) => updateSlideImageUrl(slide.id, e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-2 min-h-[200px]">
                          {slide.imageUrl ? (
                            <img src={slide.imageUrl} alt="Preview" className="max-h-64 object-contain rounded-lg" />
                          ) : (
                            <span className="text-slate-400 font-medium">Belum ada gambar</span>
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
