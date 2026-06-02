const fs = require('fs');

let c = fs.readFileSync('src/components/slides/FlyerSlide.tsx', 'utf8');

if (!c.includes("import VideoRenderer")) {
  c = c.replace(
    "import { Megaphone } from 'lucide-react';",
    "import { Megaphone } from 'lucide-react';\nimport VideoRenderer from '../VideoRenderer';"
  );
}

c = c.replace(
  /<video[\s\S]*?\/>/,
  `<VideoRenderer url={slide.videoUrl} className="max-w-full max-h-full object-contain rounded-[1rem] md:rounded-[2rem] drop-shadow-2xl relative z-10 mx-auto my-auto" />`
);

fs.writeFileSync('src/components/slides/FlyerSlide.tsx', c);
