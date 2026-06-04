import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { formatMediaUrl } from '../utils/formatMedia';
import { AlertCircle, CheckCircle2, Loader2, PlayCircle, StopCircle, RefreshCcw, Activity } from 'lucide-react';

interface AudioDiagnosticProps {
  url: string;
}

export default function AudioDiagnostic({ url }: AudioDiagnosticProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<string>('idle');
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [bufferState, setBufferState] = useState<boolean>(false);
  const [logs, setLogs] = useState<{ time: string, msg: string }[]>([]);

  const formattedUrl = formatMediaUrl(url, 'audio');

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg }].slice(-10));
  };

  useEffect(() => {
    // Reset when URL changes
    setIsPlaying(false);
    setStatus('idle');
    setErrorDetails(null);
    setLogs([]);
    addLog(`URL updated: ${url}`);
    addLog(`Formatted URL: ${formattedUrl}`);
  }, [url]);

  return (
    <div className="mt-4 bg-slate-900 border border-slate-700 rounded-xl p-5 text-slate-300">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
        <h4 className="text-white font-bold flex items-center gap-2">
          <Activity size={18} className="text-blue-400" />
          Audio Diagnostic
        </h4>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={!url}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${isPlaying ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'} disabled:opacity-50`}
          >
            {isPlaying ? <StopCircle size={16} /> : <PlayCircle size={16} />}
            {isPlaying ? 'Stop Test' : 'Test Audio'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">State Summary</div>
            <div className="flex flex-col gap-2 bg-black/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Status:</span>
                <span className="font-mono text-blue-400 capitalize">{status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Buffering:</span>
                <span className="font-mono text-blue-400">{bufferState ? 'Yes' : 'No'}</span>
              </div>
              {errorDetails && (
                <div className="mt-2 bg-red-950/50 border border-red-900/50 p-2 rounded text-red-400 text-xs font-mono break-all">
                  ERROR: {JSON.stringify(errorDetails)}
                </div>
              )}
            </div>
          </div>

          <div>
             <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Source Resolution</div>
             <div className="bg-black/40 p-3 rounded-lg border border-slate-800 text-xs font-mono break-all text-emerald-400/80">
                {formattedUrl || 'No format URL generated'}
             </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Event Logs</div>
          <div className="bg-black/40 p-3 rounded-lg border border-slate-800 h-40 overflow-y-auto font-mono text-xs flex flex-col gap-1">
             {logs.length === 0 && <div className="text-slate-600 italic text-center py-4">No events recorded</div>}
             {logs.map((log, i) => (
                <div key={i} className="flex gap-2 text-slate-400">
                  <span className="text-slate-600 shrink-0">[{log.time}]</span>
                  <span>{log.msg}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {url && (
         <div className="absolute top-0 left-0 w-[400px] h-[300px] pointer-events-none opacity-[0.001] z-0 overflow-hidden">
           <ReactPlayer
              {...({
                url: formattedUrl,
                playing: isPlaying,
                volume: 0.2,
                muted: false,
                width: "100%",
                height: "100%",
                config: { 
                  youtube: { playerVars: { origin: window.location.origin } },
                  file: { forceAudio: true }
                },
                onReady: () => { setStatus('ready'); addLog('Player Ready'); },
                onStart: () => { setStatus('started'); addLog('Playback Started'); },
                onPlay: () => { setStatus('playing'); addLog('State: Playing'); },
                onPause: () => { setStatus('paused'); addLog('State: Paused'); },
                onBuffer: () => { setBufferState(true); addLog('Buffering started'); },
                onBufferEnd: () => { setBufferState(false); addLog('Buffering ended'); },
                onError: (e: any) => { 
                  setStatus('error'); 
                  setErrorDetails(e);
                  addLog(`Error encountered: ${typeof e === 'object' ? JSON.stringify(e) : String(e)}`);
                  let causeDetails = "Possible causes: CORS policy blockage, invalid source format, unsupported codec, or origin restriction.";
                  if (formattedUrl.includes('drive.google.com')) causeDetails += " Google Drive sometimes throttles unauthenticated media proxy requests.";
                  addLog(causeDetails);
                }
              } as any)}
           />
         </div>
      )}
    </div>
  );
}
