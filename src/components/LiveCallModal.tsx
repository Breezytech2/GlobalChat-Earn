import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Mic, MicOff, Video, VideoOff, Monitor, Minimize2, PhoneOff, Sparkles, ShieldCheck, DollarSign, Globe } from "lucide-react";

export const LiveCallModal: React.FC = () => {
  const { activeCall, endCall, currentUser } = useApp();
  const [elapsedSecs, setElapsedSecs] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [isPiP, setIsPiP] = useState<boolean>(false);
  const [subtitles, setSubtitles] = useState<string>("¡Hola Julian! Welcome to our live cultural discussion.");

  useEffect(() => {
    if (!activeCall) return;
    const interval = setInterval(() => {
      setElapsedSecs(Math.floor((Date.now() - activeCall.startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeCall]);

  // Rotate AI subtitles
  useEffect(() => {
    if (!activeCall) return;
    const sampleSubs = [
      "In Nairobi, M-Pesa transformed daily life. Everyone pays via mobile phone.",
      "Let me explain the polite business greeting: 'Konnichiwa, yoroshiku onegaishimasu'.",
      "Notice the cultural tone when asking for directions in European cities.",
      "Excellent question! Cultural exchange builds empathy across borders."
    ];
    const subInterval = setInterval(() => {
      const next = sampleSubs[Math.floor(Math.random() * sampleSubs.length)];
      setSubtitles(next);
    }, 4500);
    return () => clearInterval(subInterval);
  }, [activeCall]);

  if (!activeCall) return null;

  const t = activeCall.teacher;
  const isVideo = activeCall.type === "video_call";

  const ratePerSec = isVideo ? t.hourlyRateVideo / 3600 : t.halfHourRateVoice / 1800;
  const currentEarnings = (elapsedSecs * ratePerSec).toFixed(3);
  const teacherPayout = (Number(currentEarnings) * 0.85).toFixed(3);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isPiP ? "pointer-events-none justify-end items-end p-8" : "bg-black/90 backdrop-blur-xl p-4"} select-none`}>
      <div className={`relative ${isPiP ? "w-80 h-48 pointer-events-auto shadow-2xl border-2 border-[white]" : "w-full max-w-5xl h-[720px] max-h-[92vh]"} bg-[black] text-white rounded-[32px] border border-white/10 overflow-hidden flex flex-col transition-all duration-300`}>
        
        {/* Call Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-mono text-sm font-bold tracking-wider">
              {isVideo ? "HD VIDEO CALL" : "HD OPUS VOICE CALL"} • {formatTime(elapsedSecs)}
            </span>
            <span className="bg-white/10 text-xs px-2.5 py-0.5 rounded-full border border-white/10 hidden sm:inline">
              Agora WebRTC E2E
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Earnings Timer Pill */}
            <div className="bg-[#09090b]/90 backdrop-blur-md border border-[white]/40 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono shadow-lg">
              <DollarSign className="w-3.5 h-3.5 text-[white]" />
              <span className="text-white/60">Session Value:</span>
              <span className="text-[white] font-bold">${currentEarnings}</span>
              <span className="text-[10px] text-green-400">({teacherPayout} Tutor)</span>
            </div>

            <button 
              onClick={() => setIsPiP(!isPiP)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
              title="Toggle Picture-in-Picture"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Canvas / Voice Backdrop Stage */}
        <div className="flex-1 relative overflow-hidden bg-[#030712] flex items-center justify-center">
          {isVideo && !isVideoOff && !isScreenSharing ? (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${t.avatarUrl}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[black] via-transparent to-black/30"></div>
            </div>
          ) : isScreenSharing ? (
            <div className="text-center space-y-3 p-8">
              <Monitor className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
              <h3 className="text-xl font-bold">Screen Sharing Simulation</h3>
              <p className="text-xs text-white/60">Displaying cultural slides and interactive PDFs over 60fps WebRTC stream.</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 rounded-full border-4 border-[white] mx-auto overflow-hidden shadow-2xl relative animate-pulse">
                <img src={t.avatarUrl} alt={t.fullName} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-3xl font-bold">{t.fullName} {t.countryFlag}</h3>
              <p className="text-sm text-white/60">Voice call active • High Fidelity Audio Stream</p>
            </div>
          )}

          {/* Student Self-View Mini Cam */}
          {isVideo && !isPiP && (
            <div className="absolute bottom-6 right-6 w-44 h-28 bg-[#09090b] rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl z-30">
              <img src={currentUser.avatarUrl} alt="Self" className="w-full h-full object-cover opacity-80" />
              <div className="absolute bottom-1 left-2 text-[10px] bg-black/60 px-1.5 py-0.5 rounded">You</div>
            </div>
          )}

          {/* Live AI Automatic Subtitles Stream */}
          {!isPiP && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 max-w-2xl w-[90%] bg-black/80 backdrop-blur-md border border-[white]/30 px-6 py-3 rounded-2xl text-center shadow-2xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[white] block mb-1 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> Live AI Speech-to-Text Subtitles Stream
              </span>
              <p className="text-sm md:text-base font-light italic text-white/95">
                "{subtitles}"
              </p>
            </div>
          )}
        </div>

        {/* Call Controls Footer */}
        {!isPiP && (
          <div className="p-6 bg-[#09090b] border-t border-white/10 flex items-center justify-center gap-6 z-20">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-2xl transition-all ${isMuted ? "bg-red-500 text-white shadow-lg shadow-red-500/30" : "bg-white/10 hover:bg-white/20 text-white"}`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {isVideo && (
              <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-2xl transition-all ${isVideoOff ? "bg-red-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}
                title={isVideoOff ? "Start Video" : "Stop Video"}
              >
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </button>
            )}

            <button 
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-4 rounded-2xl transition-all ${isScreenSharing ? "bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30" : "bg-white/10 hover:bg-white/20 text-white"}`}
              title="Screen Share"
            >
              <Monitor className="w-6 h-6" />
            </button>

            <button 
              onClick={endCall}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-600/40 active:scale-95 transition-all flex items-center gap-2 text-sm"
            >
              <PhoneOff className="w-5 h-5" /> End Call & Settle Payout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
