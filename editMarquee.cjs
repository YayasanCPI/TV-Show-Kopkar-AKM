const fs = require('fs');
let content = fs.readFileSync('src/components/Marquee.tsx', 'utf8');
content = content.replace(
  "style={{ willChange: 'transform' }}",
  "style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden', perspective: 1000 }}"
);
fs.writeFileSync('src/components/Marquee.tsx', content);
