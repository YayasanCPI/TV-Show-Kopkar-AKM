import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import { formatMediaUrl } from '../utils/formatMedia';

interface Props {
  url: string;
  className?: string;
  isFullScreenStyle?: boolean;
  onEnded?: () => void;
}

export default function VideoRenderer({ url, className = "", isFullScreenStyle = false, onEnded }: Props) {
  const isYouTube = url.includes('youtu.be') || url.includes('youtube.com');
  const videoSrc = formatMediaUrl(url);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const handleError = () => {
    if (onEnded) {
      // Prevent rapid infinite loops if a video instantly errors out
      setTimeout(onEnded, 5000);
    }
  };

  if (isYouTube) {
    const playerProps = {
      url: videoSrc,
      playing: true,
      muted: true,
      controls: false,
      width: '100%',
      height: '100%',
      onEnded: onEnded,
      onError: handleError,
      playsinline: true,
    };

    if (isFullScreenStyle) {
      return (
        <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center pointer-events-none">
          <div className="absolute w-[120vw] h-[120vh]">
            <ReactPlayer 
              {...playerProps} 
              className="react-player"
              style={{ position: 'absolute', top: 0, left: 0 }}
              config={{
                youtube: {
                  // @ts-ignore
                  playerVars: { showinfo: 0, rel: 0, modestbranding: 1, iv_load_policy: 3, disablekb: 1 }
                }
              }}
            />
          </div>
        </div>
      );
    }
    
    return (
      <div className={`relative overflow-hidden pointer-events-none ${className}`} style={{ minWidth: '100%', minHeight: '100%' }}>
        <ReactPlayer 
          {...playerProps}
          className="react-player"
          style={{ position: 'absolute', top: 0, left: 0 }}
          config={{
            youtube: {
              // @ts-ignore
              playerVars: { showinfo: 0, rel: 0, modestbranding: 1 }
            }
          }}
        />
      </div>
    );
  }

  const playResource = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      const p = ref.current.play();
      if (p !== undefined) {
        p.catch(e => console.log('Video autoplay interrupted:', e));
      }
    }
  };

  React.useEffect(() => {
    playResource(videoRef);
    playResource(videoRef2);
  }, [videoSrc]);

  // Native Video for Google Drive & MP4s
  if (isFullScreenStyle) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
        <video 
          ref={videoRef}
          src={videoSrc} 
          muted 
          playsInline 
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
      className={className}
      onEnded={onEnded}
      onError={handleError}
    />
  );
}

