const fs = require('fs');

let c = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

c = c.replace(
  `<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">`,
  `<div className="mb-6">
    <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Slide</label>
    <select 
      value={slide.type} 
      onChange={(e) => updateSlideText(slide.id, 'type', e.target.value)}
      className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="flyer">Flyer / Poster Umum</option>
      <option value="laporan">Laporan Capaian (Infografis)</option>
      <option value="teladan">Karyawan Teladan</option>
      <option value="agenda">Agenda Koperasi</option>
      <option value="jadwal-sholat">Jadwal Sholat (Otomatis)</option>
      <option value="hero">Hero (Opening)</option>
      <option value="about">Tentang Koperasi</option>
      <option value="business">Bisnis & Layanan</option>
      <option value="savings">Simpanan</option>
      <option value="loans">Pinjaman</option>
    </select>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">`
);

fs.writeFileSync('src/components/AdminPanel.tsx', c);
console.log('done AdminPanel updates');
