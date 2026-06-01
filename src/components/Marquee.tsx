import React from 'react';

export default function Marquee() {
  const content = (
    <>
      <span className="mx-12">SELAMAT DATANG DI LAYANAN INFORMASI DIGITAL KOPERASI JASA ADARO KARYA MANDIRI</span>
      <span className="mx-12 text-cyan-400 text-3xl">✦</span>
      <span className="mx-12 text-indigo-300">MITRA FINANSIAL TERPERCAYA ANDA SEJAK 1995</span>
      <span className="mx-12 text-cyan-400 text-3xl">✦</span>
      <span className="mx-12">HOTLINE SIMPAN PINJAM: <span className="text-cyan-300 font-display font-medium tracking-wider">082152386718</span></span>
      <span className="mx-12 text-cyan-400 text-3xl">✦</span>
      <span className="mx-12">KOPKARINDO TRAVEL & UMROH: <span className="text-cyan-300 font-display font-medium tracking-wider">085248626532</span></span>
      <span className="mx-12 text-cyan-400 text-3xl">✦</span>
      <span className="mx-12">VOUCHER BELANJA MARIZA MART: <span className="text-cyan-300 font-display font-medium tracking-wider">08115510107</span></span>
      <span className="mx-12 text-cyan-400 text-3xl">✦</span>
      <span className="mx-12 text-indigo-300">DOWNLOAD APLIKASI KOPKAR AKM DI GOOGLE PLAY STORE SEKARANG!</span>
      <span className="mx-12 text-cyan-400 text-3xl">✦</span>
    </>
  );

  return (
    <div className="h-24 bg-black/60 backdrop-blur-lg flex items-center overflow-hidden relative z-50 border-t border-white/5">
      <div className="animate-marquee whitespace-nowrap flex items-center text-[2.2rem] font-medium tracking-widest text-slate-200 w-max pt-1 uppercase font-display">
        {content}
        {content}
      </div>
    </div>
  );
}
