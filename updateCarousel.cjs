const fs = require('fs');
let c = fs.readFileSync('src/components/SlideCarousel.tsx', 'utf8');
c = c.replace(
  'className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 md:p-8 mx-auto overflow-hidden"',
  'className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 md:p-8 mx-auto overflow-hidden" style={{ willChange: "opacity, transform", transform: "translateZ(0)", backfaceVisibility: "hidden", perspective: 1000 }}'
);
fs.writeFileSync('src/components/SlideCarousel.tsx', c);
console.log("updated");
