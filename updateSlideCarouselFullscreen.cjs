const fs = require('fs');

let c = fs.readFileSync('src/components/SlideCarousel.tsx', 'utf8');

if (!c.includes('FullScreenMedia')) {
  c = c.replace(
    "import JadwalSholatSlide from './slides/JadwalSholatSlide';",
    "import JadwalSholatSlide from './slides/JadwalSholatSlide';\nimport { FullScreenMedia } from './slides/FullScreenMedia';"
  );
}

c = c.replace(
  "const renderSlide = (slide: Slide) => {",
  `const renderSlide = (slide: Slide) => {
    if (slide.isFullScreen && (slide.imageUrl || slide.videoUrl)) {
      return <FullScreenMedia slide={slide} />;
    }`
);

// We should also remove the p-6 md:p-8 padding from the wrapper if it's fullscreen to make it truly fullscreen
const divWrapperTarget = `className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 md:p-8 mx-auto overflow-hidden transition-opacity duration-1000 ease-in-out"`;
const divWrapperReplacement = `className={\`absolute inset-0 w-full h-full flex flex-col justify-center items-center \${slide.isFullScreen ? 'p-0' : 'p-6 md:p-8'} mx-auto overflow-hidden transition-opacity duration-1000 ease-in-out\`}`;

c = c.replace(divWrapperTarget, divWrapperReplacement);

fs.writeFileSync('src/components/SlideCarousel.tsx', c);
