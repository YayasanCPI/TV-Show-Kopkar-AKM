const fs = require('fs');
let c = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

c = c.replace(
  "const updateSlideText = (id: number, field: keyof Slide, value: string) => {",
  `const updateSlideFullScreen = (id: number, value: boolean) => {
    setSlides(slides.map(s => s.id === id ? { ...s, isFullScreen: value } : s));
  };

  const updateSlideText = (id: number, field: keyof Slide, value: string) => {`
);

c = c.replace(
  `<p className="text-xs text-slate-500 mt-2">Jika Anda memasukkan Video URL, maka gambar di atas akan diabaikan.</p>`,
  `<p className="text-xs text-slate-500 mt-2">Jika Anda memasukkan Video URL, maka gambar di atas akan diabaikan.</p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={!!slide.isFullScreen}
                  onChange={(e) => updateSlideFullScreen(slide.id, e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 bg-slate-100 border-slate-300"
                />
                <div>
                  <span className="block text-sm font-medium text-slate-800">Tampilkan Full Penuh Layar</span>
                  <span className="block text-xs text-slate-500">Abaikan bingkai margin template, biarkan media ini memenuhi seluruh layar (cocok untuk poster flyer).</span>
                </div>
              </label>`
);

fs.writeFileSync('src/components/AdminPanel.tsx', c);
