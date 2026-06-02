import React from 'react';
import { Slide } from '../../types';

interface Props {
  slide: Slide;
}

export function FullScreenMedia({ slide }: Props) {
  if (!slide.imageUrl && !slide.videoUrl) return null;

  return (
    <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
      {slide.videoUrl ? (
        <video 
          src={slide.videoUrl} 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
        />
      ) : (
        <img 
          src={slide.imageUrl} 
          alt={slide.title || 'Full Screen Media'} 
          className="w-full h-full object-cover" 
        />
      )}
    </div>
  );
}
