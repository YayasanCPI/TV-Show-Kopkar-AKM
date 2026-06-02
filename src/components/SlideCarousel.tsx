import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Slide } from '../types';
import HeroSlide from './slides/HeroSlide';
import AboutSlide from './slides/AboutSlide';
import HistorySlide from './slides/HistorySlide';
import ManagementSlide from './slides/ManagementSlide';
import BusinessSlide from './slides/BusinessSlide';
import FlyerSlide from './slides/FlyerSlide';
import SavingsSlide from './slides/SavingsSlide';
import LoansSlide from './slides/LoansSlide';
import ExtraSlide from './slides/ExtraSlide';
import AppSlide from './slides/AppSlide';
import ContactSlide from './slides/ContactSlide';

interface SlideCarouselProps {
 slides: Slide[];
}

const AUTOPLAY_INTERVAL = 10000; // 10 seconds

export default function SlideCarousel({ slides }: SlideCarouselProps) {
 const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
 if (slides.length <= 1) return;

 const timer = setInterval(() => {
 setCurrentIndex((prev) => (prev + 1) % slides.length);
 }, AUTOPLAY_INTERVAL);

 return () => clearInterval(timer);
 }, [slides.length]);

 if (!slides.length) return null;

 const currentSlide = slides[currentIndex];

 const renderSlide = (slide: Slide) => {
 switch (slide.type) {
 case 'hero':
 return <HeroSlide slide={slide} />;
 case 'about':
 return <AboutSlide slide={slide} />;
 case 'history':
 return <HistorySlide slide={slide} />;
 case 'management':
 return <ManagementSlide slide={slide} />;
 case 'business':
 return <BusinessSlide slide={slide} />;
 case 'savings':
 return <SavingsSlide slide={slide} />;
 case 'loans':
 return <LoansSlide slide={slide} />;
 case 'extra':
 return <ExtraSlide slide={slide} />;
 case 'app':
 return <AppSlide slide={slide} />;
 case 'contact':
 return <ContactSlide slide={slide} />;
 case 'flyer':
 return <FlyerSlide slide={slide} />;
 default:
 return <div>Unknown slide type: {slide.type}</div>;
 }
 };

 return (
 <div className="relative w-full h-full overflow-hidden bg-transparent text-white">
 <AnimatePresence mode="wait">
 <motion.div
 key={currentSlide.id}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.5, ease: "easeInOut" }}
 className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 md:p-8 mx-auto overflow-hidden" style={{ willChange: "opacity, transform", transform: "translateZ(0)", backfaceVisibility: "hidden", perspective: 1000 }}
 >
 {renderSlide(currentSlide)}
 </motion.div>
 </AnimatePresence>
 </div>
 );
}
