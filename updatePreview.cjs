const fs = require('fs');

let c = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

if (!c.includes('import SlideCarousel')) {
  c = c.replace(
    "import { defaultSlides, defaultSettings } from '../defaultData';",
    "import { defaultSlides, defaultSettings } from '../defaultData';\nimport SlideCarousel from './SlideCarousel';\nimport { Eye } from 'lucide-react';"
  );
}

if (!c.includes('const [previewSlide, setPreviewSlide]')) {
  c = c.replace(
    "const [settings, setSettings] = useState<Settings>(defaultSettings);",
    "const [settings, setSettings] = useState<Settings>(defaultSettings);\n  const [previewSlide, setPreviewSlide] = useState<Slide | null>(null);"
  );
}

c = c.replace(
  "  </div>\n            )}\n          </div>\n        ))}\n      </div>",
  `  </div>
            )}
            
            <button 
              onClick={() => setPreviewSlide(slide)} 
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold rounded-xl border border-indigo-200 transition-colors"
            >
              <Eye size={20} /> Lihat Full Preview Slide
            </button>
          </div>
        ))}
      </div>`
);

const modalCode = `
      {previewSlide && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="w-full max-w-7xl h-[85vh] relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10 relative">
            <SlideCarousel slides={[previewSlide]} />
            <button 
              onClick={() => setPreviewSlide(null)} 
              className="absolute top-6 right-6 z-[210] bg-black/50 hover:bg-black/70 text-white px-6 py-3 rounded-xl font-bold backdrop-blur transition-colors border border-white/20 uppercase tracking-widest text-sm"
            >
              Tutup Preview
            </button>
          </div>
          <p className="text-white/50 mt-6 font-medium tracking-wide">Mode Pratinjau Slide (Preview)</p>
        </div>
      )}
      
    </div>
  );
}
`;

c = c.replace(
  "    </div>\n  );\n}",
  modalCode
);

fs.writeFileSync('src/components/AdminPanel.tsx', c);
console.log('done updating admin panel preview');
