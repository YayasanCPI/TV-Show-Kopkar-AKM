const fs = require('fs');
const path = require('path');

const dir = 'src/components/slides';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace max-w-[85rem] with max-w-7xl
    content = content.replace(/max-w-\[85rem\]/g, 'max-w-7xl w-[95%]');
    // Same for 5xl
    content = content.replace(/max-w-5xl/g, 'max-w-5xl w-[95%]');
    
    fs.writeFileSync(fullPath, content);
  }
});

let carousel = fs.readFileSync('src/components/SlideCarousel.tsx', 'utf8');
carousel = carousel.replace(/p-8 md:p-12 lg:p-16/g, 'p-12 md:p-16 lg:p-24');
fs.writeFileSync('src/components/SlideCarousel.tsx', carousel);
