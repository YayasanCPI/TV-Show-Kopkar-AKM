const fs = require('fs');
let c1 = fs.readFileSync('src/components/slides/HistorySlide.tsx', 'utf8');
c1 = c1.replace(/grid-cols-3 xl:grid-cols-4/g, 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4');
fs.writeFileSync('src/components/slides/HistorySlide.tsx', c1);

let c2 = fs.readFileSync('src/components/SlideCarousel.tsx', 'utf8');
c2 = c2.replace(/p-12 md:p-16 lg:p-24/g, 'p-8 sm:p-12 md:p-16 w-[95%] mx-auto');
fs.writeFileSync('src/components/SlideCarousel.tsx', c2);
