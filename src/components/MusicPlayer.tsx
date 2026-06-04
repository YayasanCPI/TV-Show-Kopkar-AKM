import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Settings } from '../types';
import { defaultSettings } from '../defaultData';
import { formatMediaUrl } from '../utils/formatMedia';

export function MusicPlayer() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const localSettings = localStorage.getItem('settings-fallback');
      let currentSettings = localSettings ? JSON.parse(localSettings) : defaultSettings;
      let appsScriptUrl = currentSettings?.appsScriptUrl || defaultSettings.appsScriptUrl;

      if (appsScriptUrl) {
        try {
          const resSettings = await fetch(`${appsScriptUrl}?action=getSettings`);
          if (resSettings.ok) {
            const remoteSettings = await resSettings.json();
            if (remoteSettings && Object.keys(remoteSettings).length > 0) {
              setSettings(remoteSettings);
            }
          }
        } catch (e) {
          console.warn('Could not fetch settings', e);
        }
      } else {
        setSettings(currentSettings);
      }
    };
    fetchSettings();
  }, []);

  const bgMusicUrl = settings.bgMusicUrl || defaultSettings.bgMusicUrl;
  const isYoutube = bgMusicUrl?.includes('youtube.com') || bgMusicUrl?.includes('youtu.be');

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="p-8 text-center">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Signage Radio Player</h1>
          <p className="text-slate-400 mb-8">
            Buka halaman ini di tab baru dan tekan tombol Play untuk memutar musik latar secara terpisah jika Web Signage utama tidak bisa mengeluarkan suara.
          </p>
          
          <button
            onClick={() => setPlaying(!playing)}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors ${
              playing 
                ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {playing ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hentikan Musik
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Putar Musik Sekarang
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-900 p-6 border-t border-slate-700">
          <div className="text-xs text-slate-500 font-mono break-all line-clamp-2">
            URL: {bgMusicUrl}
          </div>
          <div className="mt-4">
            {bgMusicUrl && (
              isYoutube ? (
                 <div style={{ position: 'relative', width: '100%', height: '250px', borderRadius: '0.5rem', overflow: 'hidden', pointerEvents: 'auto' }}>
                  <ReactPlayer
                    {...({
                      url: bgMusicUrl,
                      playing: playing,
                      loop: true,
                      volume: 1.0,
                      controls: true,
                      width: "100%",
                      height: "100%",
                      config: { youtube: { playerVars: { origin: window.location.origin } } } as any,
                      onError: (e: any) => console.log('Player Error:', e)
                    } as any)}
                  />
                  {/* Overlay to block iframe capturing clicks if needed, but controls=true means user should click iframe */}
                  {!playing && (
                    <div 
                      className="absolute inset-0 bg-transparent cursor-pointer" 
                      onClick={() => setPlaying(true)}
                    />
                  )}
                </div>
              ) : (
                <audio
                  src={formatMediaUrl(bgMusicUrl, 'audio')}
                  controls={true}
                  className="w-full"
                  style={{ borderRadius: '0.5rem' }}
                  ref={(el) => {
                    if (el) {
                      if (playing) {
                         const playPromise = el.play();
                         if (playPromise !== undefined) {
                            playPromise.catch(e => console.log('play error', e));
                         }
                      } else {
                         el.pause();
                      }
                    }
                  }}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
