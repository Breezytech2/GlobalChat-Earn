import React from "react";
import { useApp } from "../context/AppContext";
import { UserRole } from "../types";
import { Globe, Shield, Sparkles, Bell, Smartphone, Monitor } from "lucide-react";

export const Header: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    activeTab, 
    setActiveTab, 
    setIsAuthModalOpen, 
    setIsPremiumModalOpen,
    platformMode,
    setPlatformMode
  } = useApp();

  const isTeacher = currentUser.role === "teacher";
  const isAdmin = currentUser.role === "admin";

  return (
    <header className="h-20 border-b border-white/10 bg-[#0A1629]/80 backdrop-blur-md flex items-center justify-between px-8 flex-shrink-0 z-30 select-none">
      {/* Brand */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("discovery")}>
        <div className="w-10 h-10 bg-gradient-to-tr from-[#D4AF37] to-[#F9E29C] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
          <Globe className="w-6 h-6 text-[#050B18]" />
        </div>
        <span className="text-2xl font-bold tracking-tight">GlobalChat <span className="text-[#D4AF37]">Earn</span></span>
        <span className="text-[10px] uppercase font-mono bg-white/10 text-white/70 px-2 py-0.5 rounded border border-white/15 ml-1 hidden sm:inline">
          Enterprise
        </span>
      </div>

      {/* Primary Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <button 
          onClick={() => setActiveTab("discovery")}
          className={`transition-all ${activeTab === "discovery" ? "text-white border-b-2 border-[#D4AF37] py-7 font-semibold" : "hover:text-white"}`}
        >
          Discovery
        </button>
        <button 
          onClick={() => setActiveTab("explorer")}
          className={`transition-all ${activeTab === "explorer" ? "text-white border-b-2 border-[#D4AF37] py-7 font-semibold" : "hover:text-white"}`}
        >
          Country Explorer
        </button>
        <button 
          onClick={() => setActiveTab("sessions")}
          className={`transition-all ${activeTab === "sessions" ? "text-white border-b-2 border-[#D4AF37] py-7 font-semibold" : "hover:text-white"}`}
        >
          My Sessions
        </button>
        <button 
          onClick={() => setActiveTab("earnings")}
          className={`transition-all ${activeTab === "earnings" ? "text-white border-b-2 border-[#D4AF37] py-7 font-semibold" : "hover:text-white"}`}
        >
          Earnings & Wallet
        </button>

        {isTeacher && (
          <button 
            onClick={() => setActiveTab("teacher_dashboard")}
            className={`transition-all ${activeTab === "teacher_dashboard" ? "text-[#D4AF37] border-b-2 border-[#D4AF37] py-7 font-bold flex items-center gap-1.5" : "text-[#D4AF37]/80 hover:text-[#D4AF37]"}`}
          >
            <Sparkles className="w-4 h-4" /> Teacher Portal
          </button>
        )}

        {isAdmin && (
          <button 
            onClick={() => setActiveTab("admin")}
            className={`transition-all ${activeTab === "admin" ? "text-red-400 border-b-2 border-red-400 py-7 font-bold flex items-center gap-1.5" : "text-red-400/80 hover:text-red-400"}`}
          >
            <Shield className="w-4 h-4" /> Admin Controls
          </button>
        )}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-5">
        {/* Device Switcher Trigger */}
        <div className="hidden lg:flex items-center bg-[#050B18] p-1 rounded-lg border border-white/10 text-xs text-white/70">
          <button 
            onClick={() => setPlatformMode("web")}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all ${platformMode === "web" ? "bg-[#D4AF37] text-[#050B18] font-bold" : "hover:text-white"}`}
            title="Desktop Web Preview"
          >
            <Monitor className="w-3.5 h-3.5" /> Web
          </button>
          <button 
            onClick={() => setPlatformMode(platformMode === "ios" ? "android" : "ios")}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all ${platformMode !== "web" ? "bg-[#D4AF37] text-[#050B18] font-bold" : "hover:text-white"}`}
            title="Mobile App Preview (Flutter iOS/Android)"
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>

        {/* Role Demo Selector */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-[11px] font-medium">
          <button 
            onClick={() => switchRole("student")}
            className={`px-2.5 py-1 rounded-full transition-all ${currentUser.role === "student" ? "bg-white text-[#050B18] font-bold" : "text-white/60 hover:text-white"}`}
          >
            Student
          </button>
          <button 
            onClick={() => switchRole("teacher")}
            className={`px-2.5 py-1 rounded-full transition-all ${currentUser.role === "teacher" ? "bg-[#D4AF37] text-[#050B18] font-bold" : "text-white/60 hover:text-[#D4AF37]"}`}
          >
            Teacher
          </button>
          <button 
            onClick={() => switchRole("admin")}
            className={`px-2.5 py-1 rounded-full transition-all ${currentUser.role === "admin" ? "bg-red-500 text-white font-bold" : "text-white/60 hover:text-red-400"}`}
          >
            Admin
          </button>
        </div>

        {/* Upgrade Premium Button */}
        {!currentUser.isPremium && (
          <button 
            onClick={() => setIsPremiumModalOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F9E29C] text-[#050B18] rounded-xl text-xs font-bold shadow-md shadow-[#D4AF37]/20 hover:opacity-95 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> Premium $9.99
          </button>
        )}

        {/* Notification bell */}
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveTab("sessions")}>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0A1629]"></div>
          <Bell className="w-5 h-5 text-white/70" />
        </div>

        {currentUser.id === "u_student_1" ? (
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 text-white text-xs font-bold hover:text-[#D4AF37] transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 bg-[#D4AF37] text-[#050B18] rounded-xl text-xs font-bold shadow-md hover:bg-[#F9E29C] transition-colors"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div 
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[11px] text-[#D4AF37] uppercase font-bold tracking-wider">
                {currentUser.role === "teacher" ? "Verified Tutor" : currentUser.role === "admin" ? "Platform Admin" : "Student Account"}
              </p>
              <p className="text-sm font-semibold text-white/90 group-hover:text-[#D4AF37] transition-colors">
                {currentUser.fullName}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-white/10 flex items-center justify-center overflow-hidden relative shadow-md">
              <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
