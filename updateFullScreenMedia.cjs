const fs = require('fs');

let c = fs.readFileSync('src/components/slides/FullScreenMedia.tsx', 'utf8');

c = c.replace(
  "import { Slide } from '../../types';",
  "import { Slide } from '../../types';\nimport VideoRenderer from '../VideoRenderer';"
);

c = c.replace(
  /<video[\s\S]*?\/>/,
  `<VideoRenderer url={slide.videoUrl} isFullScreenStyle={true} />`
);

fs.writeFileSync('src/components/slides/FullScreenMedia.tsx', c);
