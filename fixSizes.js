const fs = require('fs');
const path = require('path');

const dir = 'src/components/slides';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace text sizes
    content = content.replace(/lg:text-\[5\.5rem\]/g, 'lg:text-6xl xl:text-7xl');
    content = content.replace(/text-6xl md:text-7xl/g, 'text-4xl md:text-5xl lg:text-6xl');
    content = content.replace(/lg:text-\[7rem\]/g, 'lg:text-7xl xl:text-8xl');
    content = content.replace(/lg:text-\[4\.5rem\]/g, 'lg:text-6xl');
    
    // Replace flex nowrap with wrap
    content = content.replace(/flex justify-center items-center gap-6/g, 'flex flex-wrap justify-center items-center gap-4 text-center');
    
    fs.writeFileSync(fullPath, content);
  }
});

let carousel = fs.readFileSync('src/components/SlideCarousel.tsx', 'utf8');
carousel = carousel.replace(/mode="wait"/, 'mode="sync"');
fs.writeFileSync('src/components/SlideCarousel.tsx', carousel);
