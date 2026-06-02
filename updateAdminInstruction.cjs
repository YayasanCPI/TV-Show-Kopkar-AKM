const fs = require('fs');

let c = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

c = c.replace(
  "Gunakan Video URL (MP4)",
  "Gunakan Video URL (YouTube / Google Drive / MP4)"
);

c = c.replace(
  `placeholder="https://example.com/video.mp4"`,
  `placeholder="https://youtube.com/watch?v=... atau link Google Drive"`
);

c = c.replace(
  `Jika Anda memasukkan Video URL, maka gambar di atas akan diabaikan.`,
  `Bisa menggunakan link YouTube, link Google Drive (pastikan akses 'Anyone with link'), atau direct link MP4. Jika menggunakan video, gambar akan diabaikan.`
);

fs.writeFileSync('src/components/AdminPanel.tsx', c);
