import React from "react";
import { ShieldAlert, Cpu, Lock, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="h-12 bg-[#050B18] border-t border-white/5 flex items-center justify-between px-8 text-[10px] text-white/40 uppercase tracking-widest font-bold select-none flex-shrink-0 z-20">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-1.5 text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          Real-time AI Gemini Translation Active
        </span>
        <span className="text-[#D4AF37] flex items-center gap-1 hidden sm:flex">
          <Lock className="w-3 h-3" /> Secure E2E AES-256 Encrypted
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="hidden md:inline text-white/50">Flutter & Firebase Enterprise Architecture</span>
        <span className="hover:text-white cursor-pointer transition-colors">Terms of Trust</span>
        <span className="text-[#D4AF37]">Global Protocol v4.2</span>
      </div>
    </footer>
  );
};
