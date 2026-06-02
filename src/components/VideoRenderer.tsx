import React from 'react';

interface Props {
  url: string;
  className?: string;
  isFullScreenStyle?: boolean;
}

export default function VideoRenderer({ url, className = "w-full h-full object-cover", isFullScreenStyle = false }: Props) {
  // Cek apakah URL adalah YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*)/);
  if (ytMatch && ytMatch[1].length === 11) {
    const ytId = ytMatch[1];
    
    if (isFullScreenStyle) {
      return (
        <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center pointer-events-none">
          {/* Skala 120% untuk memotong branding YouTube di pinggiran / judul / kontrol */}
          <iframe 
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
            className="absolute w-[120vw] h-[120vh] border-0"
            allow="autoplay; encrypted-media"
          />
        </div>
      );
    }
    
    return (
      <iframe 
        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
        className={`${className} border-0 pointer-events-none`}
        allow="autoplay; encrypted-media"
      />
    );
  }
  
  // Cek apakah URL adalah link Google Drive, ubah jadi direct download link
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  const videoSrc = driveMatch ? `https://drive.google.com/uc?export=download&id=${driveMatch[1]}` : url;

  return (
    <video 
      src={videoSrc} 
      autoPlay 
      loop 
      muted 
      className={className}
    />
  );
}
