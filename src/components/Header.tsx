import React from "react";
import { useApp } from "../context/AppContext";
import { UserRole } from "../types";
import {
  Globe,
  Shield,
  Sparkles,
  Bell,
  Smartphone,
  Monitor,
} from "lucide-react";

export const Header: React.FC = () => {
  const {
    currentUser,
    switchRole,
    activeTab,
    setActiveTab,
    setIsAuthModalOpen,
    setIsPremiumModalOpen,
    platformMode,
    setPlatformMode,
  } = useApp();

  const isTeacher = currentUser.role === "teacher";
  const isAdmin = currentUser.role === "admin";

  return (
    <header className="h-20 border-b border-white/5 bg-black/80 backdrop-blur-md flex items-center justify-between px-8 flex-shrink-0 z-30 select-none">
      {/* Brand deleted as requested */}

      {/* Primary Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <button
          onClick={() => setActiveTab("discovery")}
          className={`transition-all ${activeTab === "discovery" ? "text-white border-b-2 border-white py-7 font-semibold" : "hover:text-white"}`}
        >
          Discovery
        </button>
        <button
          onClick={() => setActiveTab("explorer")}
          className={`transition-all ${activeTab === "explorer" ? "text-white border-b-2 border-white py-7 font-semibold" : "hover:text-white"}`}
        >
          Country Explorer
        </button>
        <button
          onClick={() => setActiveTab("sessions")}
          className={`transition-all ${activeTab === "sessions" ? "text-white border-b-2 border-white py-7 font-semibold" : "hover:text-white"}`}
        >
          My Sessions
        </button>
        <button
          onClick={() => setActiveTab("earnings")}
          className={`transition-all ${activeTab === "earnings" ? "text-white border-b-2 border-white py-7 font-semibold" : "hover:text-white"}`}
        >
          Earnings & Wallet
        </button>

        {isTeacher && (
          <button
            onClick={() => setActiveTab("teacher_dashboard")}
            className={`transition-all ${activeTab === "teacher_dashboard" ? "text-zinc-100 border-b-2 border-zinc-100 py-7 font-bold flex items-center gap-1.5" : "text-zinc-500 hover:text-zinc-300"}`}
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
        <div className="hidden lg:flex items-center bg-zinc-950 p-1 rounded-lg border border-white/5 text-xs text-zinc-500">
          <button
            onClick={() => setPlatformMode("web")}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all ${platformMode === "web" ? "bg-white text-black font-bold" : "hover:text-white"}`}
            title="Desktop Web Preview"
          >
            <Monitor className="w-3.5 h-3.5" /> Web
          </button>
          <button
            onClick={() =>
              setPlatformMode(platformMode === "ios" ? "android" : "ios")
            }
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all ${platformMode !== "web" ? "bg-white text-black font-bold" : "hover:text-white"}`}
            title="Mobile App Preview (Flutter iOS/Android)"
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>

        {/* Role Demo Selector */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-[11px] font-medium">
          <button
            onClick={() => switchRole("student")}
            className={`px-2.5 py-1 rounded-full transition-all ${currentUser.role === "student" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"}`}
          >
            Student
          </button>
          <button
            onClick={() => switchRole("teacher")}
            className={`px-2.5 py-1 rounded-full transition-all ${currentUser.role === "teacher" ? "bg-zinc-200 text-black font-bold" : "text-zinc-400 hover:text-white"}`}
          >
            Teacher
          </button>
          <button
            onClick={() => switchRole("admin")}
            className={`px-2.5 py-1 rounded-full transition-all ${currentUser.role === "admin" ? "bg-red-500 text-white font-bold" : "text-zinc-400 hover:text-red-400"}`}
          >
            Admin
          </button>
        </div>

        {/* Upgrade Premium Button */}
        {!currentUser.isPremium && (
          <button
            onClick={() => setIsPremiumModalOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-xl text-xs font-bold shadow-md shadow-white/10 hover:opacity-95 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> Premium $9.99
          </button>
        )}

        {/* Notification bell */}
        <div
          className="relative cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setActiveTab("sessions")}
        >
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-black"></div>
          <Bell className="w-5 h-5 text-zinc-300" />
        </div>

        {currentUser.id === "u_student_1" ? (
          <div className="flex items-center gap-3 pl-4 border-l border-white/5">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 text-zinc-300 text-xs font-bold hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 bg-white text-black rounded-xl text-xs font-bold shadow-md hover:bg-zinc-200 transition-colors"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-3 pl-4 border-l border-white/5 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">
                {currentUser.role === "teacher"
                  ? "Verified Tutor"
                  : currentUser.role === "admin"
                    ? "Platform Admin"
                    : "Student Account"}
              </p>
              <p className="text-sm font-semibold text-white group-hover:text-zinc-300 transition-colors">
                {currentUser.fullName}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center overflow-hidden relative shadow-md">
              <img
                src={currentUser.avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
