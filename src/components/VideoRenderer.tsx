import React from 'react';
import ReactPlayer from 'react-player';

interface Props {
  url: string;
  className?: string;
  isFullScreenStyle?: boolean;
  onEnded?: () => void;
}

export default function VideoRenderer({ url, className = "", isFullScreenStyle = false, onEnded }: Props) {
  const isYouTube = url.includes('youtu.be') || url.includes('youtube.com');
  let videoSrc = url;
  
  // Check if URL is Google Drive, change to direct download link
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    videoSrc = `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
  }

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

  // Native Video for Google Drive & MP4s
  if (isFullScreenStyle) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
        <video 
          src={videoSrc} 
          autoPlay 
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
      src={videoSrc} 
      autoPlay 
      muted 
      playsInline 
      className={className}
      onEnded={onEnded}
      onError={handleError}
    />
  );
}

