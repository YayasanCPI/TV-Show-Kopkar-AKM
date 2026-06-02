import React from 'react';
import ReactPlayer from 'react-player';

interface Props {
  url: string;
  className?: string;
  isFullScreenStyle?: boolean;
  onEnded?: () => void;
}

export default function VideoRenderer({ url, className = "", isFullScreenStyle = false, onEnded }: Props) {
  // Check if URL is Google Drive, change to direct download link for better parsing if possible
  let videoSrc = url;
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    videoSrc = `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
  }

  // Common config
  const playerProps = {
    url: videoSrc,
    playing: true,
    muted: true, // Needs to be muted for autoplay in most browsers
    controls: false,
    width: '100%',
    height: '100%',
    onEnded: onEnded,
    playsinline: true,
  };

  if (isFullScreenStyle) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center pointer-events-none">
        {/* Scale 120% to hide YouTube branding if it's YouTube. react-player handles normal videos without scale */}
        <div className={url.includes('youtu') ? "absolute w-[120vw] h-[120vh]" : "absolute w-full h-full"}>
          <ReactPlayer 
            {...playerProps} 
            className="react-player"
            style={{ position: 'absolute', top: 0, left: 0 }}
            config={{
              youtube: {
                playerVars: { 
                  showinfo: 0, 
                  rel: 0, 
                  modestbranding: 1, 
                  iv_load_policy: 3, 
                  disablekb: 1 
                }
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
            playerVars: { showinfo: 0, rel: 0, modestbranding: 1 }
          }
        }}
      />
    </div>
  );
}

