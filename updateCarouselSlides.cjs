const fs = require('fs');

let c = fs.readFileSync('src/components/SlideCarousel.tsx', 'utf8');

c = c.replace(
  "import FlyerSlide from './slides/FlyerSlide';",
  `import FlyerSlide from './slides/FlyerSlide';
import LaporanSlide from './slides/LaporanSlide';
import TeladanSlide from './slides/TeladanSlide';
import AgendaSlide from './slides/AgendaSlide';
import JadwalSholatSlide from './slides/JadwalSholatSlide';`
);

c = c.replace(
  "case 'flyer':\n        return <FlyerSlide slide={slide} />;",
  `case 'flyer':
        return <FlyerSlide slide={slide} />;
      case 'laporan':
        return <LaporanSlide slide={slide} />;
      case 'teladan':
        return <TeladanSlide slide={slide} />;
      case 'agenda':
        return <AgendaSlide slide={slide} />;
      case 'jadwal-sholat':
        return <JadwalSholatSlide slide={slide} />;`
);

fs.writeFileSync('src/components/SlideCarousel.tsx', c);
console.log('done carousel slide types updates');
