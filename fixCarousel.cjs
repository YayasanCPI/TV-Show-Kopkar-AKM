const fs = require('fs');
let c = fs.readFileSync('src/components/SlideCarousel.tsx', 'utf8');

c = c.replace(
  /<AnimatePresence mode="wait">[\s\S]*?<\/AnimatePresence>/m,
  `{slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 md:p-8 mx-auto overflow-hidden transition-opacity duration-1000 ease-in-out"
          style={{ 
            opacity: index === currentIndex ? 1 : 0, 
            pointerEvents: index === currentIndex ? 'auto' : 'none',
            zIndex: index === currentIndex ? 10 : 0
          }}
        >
          {index === currentIndex && renderSlide(slide)}
        </div>
      ))}`
);

fs.writeFileSync('src/components/SlideCarousel.tsx', c);
console.log('done');
