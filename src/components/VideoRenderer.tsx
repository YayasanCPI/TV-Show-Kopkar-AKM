import React, { useRef } from 'react';
import { formatMediaUrl } from '../utils/formatMedia';

interface Props {
  url: string;
  className?: string;
  isFullScreenStyle?: boolean;
  onEnded?: () => void;
}

export default function VideoRenderer({ url, className = "", isFullScreenStyle = false, onEnded }: Props) {
  const videoSrc = formatMediaUrl(url);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const handleError = () => {
    if (onEnded) {
      // Prevent rapid infinite loops if a video instantly errors out
      setTimeout(onEnded, 5000);
    }
  };

  // Native Video for Google Drive & MP4s
  if (isFullScreenStyle) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
        <video 
          ref={videoRef}
          src={videoSrc} 
          muted 
          playsInline
          autoPlay
          className="absolute w-full h-full object-cover"
          onEnded={onEnded}
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <video 
      ref={videoRef2}
      src={videoSrc} 
      muted 
      playsInline
      autoPlay
      className={className}
      onEnded={onEnded}
      onError={handleError}
    />
  );
}

