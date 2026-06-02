import React from 'react';
import { Slide } from '../../types';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface Props {
  slide: Slide;
}

export default function AgendaSlide({ slide }: Props) {
  return (
    <div className="w-full h-full bg-slate-50 flex flex-col md:flex-row items-stretch border-8 border-white p-4">
      {/* Left side: visual */}
      <div className="w-full md:w-5/12 bg-blue-600 rounded-2xl relative overflow-hidden flex flex-col justify-end p-12">
        <div className="absolute inset-0 z-0">
          {slide.imageUrl ? (
            <img src={slide.imageUrl} alt="Background" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-blue-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent" />
        </div>
        
        <div className="relative z-10">
          <div className="bg-white/20 backdrop-blur-md w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white mb-8 border border-white/30 shadow-lg">
            <span className="text-xl font-bold uppercase tracking-widest text-blue-200">Nov</span>
            <span className="text-4xl font-black">24</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-4 leading-tight shadow-sm">
            {slide.title || 'Agenda Penting Koperasi'}
          </h2>
          <p className="text-xl text-blue-100 font-medium">
            Jangan lewatkan acara ini.
          </p>
        </div>
      </div>

      {/* Right side: content */}
      <div className="w-full md:w-7/12 flex flex-col justify-center p-16 relative">
        <div className="absolute top-12 right-12 text-slate-200">
          <Calendar size={120} strokeWidth={1} />
        </div>
        
        <div className="relative z-10 w-full max-w-3xl">
          <h3 className="text-3xl font-bold text-blue-600 mb-2">
            {slide.subtitle || 'Rapat Anggota Tahunan (RAT) 2026'}
          </h3>
          
          <div className="w-16 h-1 bg-amber-400 mb-10 rounded-full" />
          
          <div className="space-y-8 flex flex-col">
            <div className="flex items-start gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-1">Waktu Pelaksanaan</h4>
                <p className="text-lg text-slate-600">08:00 WITA - Selesai</p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-1">Lokasi</h4>
                <p className="text-lg text-slate-600">Gedung Serbaguna, Lantai 2</p>
              </div>
            </div>
            
            {slide.description && (
              <div className="pt-6 border-t border-slate-200">
                <p className="text-xl text-slate-700 leading-relaxed">
                  {slide.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
