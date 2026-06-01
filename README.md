# Koperasi Jasa Adaro Karya Mandiri - Digital Signage

Aplikasi web modern untuk Koperasi Jasa Adaro Karya Mandiri yang berfungsi sebagai **Digital Signage** dan **Company Profile**, dibangun menggunakan React, TypeScript, Tailwind CSS, dan Express (untuk backend file storage / lokal setup fallback).

## Fitur Utama

- **Real-Time Clock & Marquee:** Tampilan jam waktu nyata dan teks berjalan untuk pengumuman atau info kontak.
- **Auto-Playback Slideshow:** Transisi layar secara otomatis untuk menampilkan portofolio bisnis, sejarah, dan kontak.
- **Admin Panel:** Halaman khusus (`/admin`) untuk mengedit teks dan mengubah gambar promosi (Flyer) secara langsung dengan dukungan penyimpanan lokal saat offline.
- **Responsive & Modern UI:** Dibangun dengan Tailwind CSS untuk tampilan yang bersih, canggih, dan profesional, menggunakan skema warna yang elegan.
- **Single File Build:** Mendukung kompilasi menjadi satu file HTML menggunakan konfigurasi Vite khusus (`vite-plugin-singlefile`) untuk kemudahan distribusi *offline*, serta backend Express untuk persistensi data API.

## Struktur Folder

- `src/components/` - Komponen React (Header, Marquee, Slides, AdminPanel).
- `src/App.tsx` - Entry point antarmuka pengguna & Router logika slideshow.
- `server.ts` - Backend Express.js untuk API (Penyimpanan JSON untuk admin panel).
- `slideData.json` - Basis data file lokal yang menyimpan konfigurasi slide (diupdate via admin).

## Cara Menjalankan di Komputer Lokal

1. **Pastikan telah menginstal Node.js** terbaru.
2. **Clone repositori ini**:
   ```bash
   git clone <URL_GITHUB_ANDA>
   cd <NAMA_FOLDER>
   ```
3. **Instal dependensi**:
   ```bash
   npm install
   ```
4. **Jalankan server pengembangan (Dev Mode)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan (secara default di port 3000 atau sesuai port yang aktif). Buka browser di `http://localhost:3000`.

## Cara Build untuk Produksi (Deploy)

Jika Anda ingin men-deploy aplikasi ke layanan hosting (seperti Vercel, Railway, Render, atau VPS) atau mendapatkan file statis HTML-nya.

1. Jalankan perintah kompilasi:
   ```bash
   npm run build
   ```
2. Aplikasi akan di-build dan keluarannya terdapat di folder `dist/`.
   - File statis (HTML/JS/CSS) di folder `dist/` bisa Anda buka langsung di browser.
   - Karena ada `vite-plugin-singlefile`, isi dari `dist/index.html` dapat langsung dijalankan layaknya file terpadu (single page offline mode).
3. Untuk menjalankan backend untuk environment production:
   ```bash
   npm start
   ```

## Integrasi & Pengelolaan Konten (Admin)

- Buka `http://localhost:3000/admin`.
- Pada halaman admin, Anda bisa mengedit Judul, Deskripsi, hingga Upload / Input URL Gambar untuk Flyer.
- Semua data yang di-submit akan tersimpan di backend melalui API dan jatuh ke `slideData.json` (ataupun tersimpan lokal di browser melalui 'Local Storage' sebagai fallback jika server mati).

## Kontribusi

Anda dapat memulai *fork* pengaturan repositori web ini untuk pengembangan komponen Slide baru di direktori `src/components/slides/`.
