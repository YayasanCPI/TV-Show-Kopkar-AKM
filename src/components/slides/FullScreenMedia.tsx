import React from 'react';
import { Slide } from '../../types';
import VideoRenderer from '../VideoRenderer';

interface Props {
  slide: Slide;
  onVideoEnded?: () => void;
}

export function FullScreenMedia({ slide, onVideoEnded }: Props) {
  if (!slide.imageUrl && !slide.videoUrl) return null;

  return (
    <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
      {slide.videoUrl ? (
        <VideoRenderer url={slide.videoUrl} isFullScreenStyle={true} onEnded={onVideoEnded} />
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
