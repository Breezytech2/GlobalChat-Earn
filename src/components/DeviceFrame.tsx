import React from "react";
import { useApp } from "../context/AppContext";
import { Smartphone, Monitor, ShieldCheck } from "lucide-react";

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { platformMode, setPlatformMode } = useApp();

  if (platformMode === "web") {
    return <div className="flex-1 flex flex-col h-full overflow-hidden w-full">{children}</div>;
  }

  const isIos = platformMode === "ios";

  return (
    <div className="flex-1 bg-[#030712] py-6 px-4 flex flex-col items-center justify-center overflow-auto min-h-0 relative">
      {/* Device Switcher pill above */}
      <div className="mb-4 bg-[#081121] border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-4 text-xs z-20 shadow-xl">
        <span className="text-white/40 uppercase font-bold text-[10px]">Preview Runtime:</span>
        <button 
          onClick={() => setPlatformMode("web")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${platformMode === "web" ? "bg-[#D4AF37] text-[#050B18] font-bold" : "text-white/60 hover:text-white"}`}
        >
          <Monitor className="w-3.5 h-3.5" /> Web App
        </button>
        <button 
          onClick={() => setPlatformMode("ios")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${platformMode === "ios" ? "bg-[#D4AF37] text-[#050B18] font-bold" : "text-white/60 hover:text-white"}`}
        >
          <Smartphone className="w-3.5 h-3.5" /> iOS App (Flutter Engine)
        </button>
        <button 
          onClick={() => setPlatformMode("android")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${platformMode === "android" ? "bg-[#D4AF37] text-[#050B18] font-bold" : "text-white/60 hover:text-white"}`}
        >
          <Smartphone className="w-3.5 h-3.5" /> Android App (Material 3)
        </button>
      </div>

      {/* Phone Mockup Container */}
      <div className={`relative ${isIos ? "w-[390px] h-[844px] rounded-[52px]" : "w-[412px] h-[892px] rounded-[48px]"} bg-[#050B18] border-[10px] border-[#1e293b] shadow-2xl shadow-black/80 flex flex-col overflow-hidden transition-all duration-300 flex-shrink-0`}>
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 pt-2 pointer-events-none">
          {isIos ? (
            <div className="w-32 h-7 bg-black rounded-full flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10"></div>
              <div className="w-3 h-3 rounded-full bg-blue-900/40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="w-5 h-5 bg-black rounded-full border border-white/5 mx-auto"></div>
          )}
        </div>

        {/* Mobile App Bar Header */}
        <div className="bg-[#0A1629] pt-10 pb-3 px-4 border-b border-white/10 flex items-center justify-between z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-tr from-[#D4AF37] to-[#F9E29C] rounded-lg flex items-center justify-center font-bold text-[#050B18] text-xs">
              G
            </div>
            <span className="font-bold text-sm tracking-tight">GlobalChat <span className="text-[#D4AF37]">Earn</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-mono border border-green-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> FLUTTER_RUN
            </span>
          </div>
        </div>

        {/* Mobile View Content */}
        <div className="flex-1 overflow-y-auto flex flex-col relative min-h-0 text-xs">
          {children}
        </div>

        {/* Mobile Navigation Bar (Bottom) */}
        <div className="bg-[#0A1629] border-t border-white/10 py-2.5 px-6 flex justify-around items-center z-10 flex-shrink-0">
          <MobileNavBtn label="Explore" icon="🌍" />
          <MobileNavBtn label="Map" icon="🗺️" />
          <MobileNavBtn label="Sessions" icon="💬" />
          <MobileNavBtn label="Earnings" icon="💰" />
        </div>

        {/* iOS Home Indicator */}
        {isIos && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-36 h-1 bg-white/30 rounded-full pointer-events-none z-50"></div>
        )}
      </div>
    </div>
  );
};

const MobileNavBtn: React.FC<{ label: string; icon: string }> = ({ label, icon }) => (
  <button className="flex flex-col items-center gap-1 text-white/60 hover:text-[#D4AF37] active:scale-95 transition-all">
    <span className="text-base">{icon}</span>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
