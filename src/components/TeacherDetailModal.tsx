import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { TeacherProfile } from "../types";
import { X, Star, ShieldCheck, Award, BookOpen, Download, MessageSquare, Phone, Video, Calendar as CalIcon, Clock, Globe, CheckCircle } from "lucide-react";

export const TeacherDetailModal: React.FC = () => {
  const { selectedTeacherForDetail, setSelectedTeacherForDetail, bookSession, setActiveChatTeacher, startCall } = useApp();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingType, setBookingType] = useState<"text_chat" | "voice_call" | "video_call">("video_call");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  if (!selectedTeacherForDetail) return null;

  const t = selectedTeacherForDetail;

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time to book.");
      return;
    }
    bookSession(t, bookingType);
    setSelectedTeacherForDetail(null);
  };

  const timeSlots = ["09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "03:30 PM", "06:00 PM"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto select-none">
      <div className="relative w-full max-w-4xl bg-[#081121] text-white rounded-[32px] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 bg-[#0A1629] border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold">Government Verified Identity</span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <button 
            onClick={() => setSelectedTeacherForDetail(null)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 text-xs md:text-sm">
          {/* Header Info Banner */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img src={t.avatarUrl} alt={t.fullName} className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover border-2 border-[#D4AF37]/50 shadow-2xl flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold flex items-center gap-3">
                    {t.fullName} {t.countryFlag}
                  </h3>
                  <p className="text-white/70 italic mt-0.5 font-light">
                    {t.city}, {t.country} • Native Language: <span className="text-[#D4AF37] font-semibold">{t.nativeLanguage}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] rounded-full text-xs font-bold">
                    {t.level}
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {t.badges.map((b, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-medium text-white/90">
                    🛡️ {b}
                  </span>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-4 bg-[#0A1629] p-4 rounded-2xl border border-white/5 mt-4 text-center">
                <div>
                  <span className="text-[10px] text-white/40 uppercase block font-bold">Rating</span>
                  <span className="text-sm font-bold text-yellow-400">★ {t.rating}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase block font-bold">Reviews</span>
                  <span className="text-sm font-bold">{t.reviewCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase block font-bold">Sessions</span>
                  <span className="text-sm font-bold text-green-400">{t.sessionCount}+</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase block font-bold">Response</span>
                  <span className="text-sm font-bold text-blue-300">~{t.responseTimeMinutes}m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biography & Booking UI Switcher */}
          {!isBooking ? (
            <>
              {/* Biography */}
              <div className="bg-[#0A1629]/50 p-6 rounded-2xl border border-white/5 space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37]">📖 Biography & Vision</h4>
                <p className="text-white/80 leading-relaxed font-light">{t.bio}</p>
              </div>

              {/* Cultural Expertise & Interests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A1629] p-5 rounded-2xl border border-white/5 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37]">🏺 Cultural Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {t.culturalExpertise.map((ex, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-xl text-xs">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0A1629] p-5 rounded-2xl border border-white/5 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37]">💡 Personal Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {t.interests.map((int, i) => (
                      <span key={i} className="px-3 py-1.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-xl text-xs">
                        {int}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Uploaded Learning Resources */}
              {t.resources && t.resources.length > 0 && (
                <div className="bg-[#0A1629] p-6 rounded-2xl border border-white/10 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Cultural Survival Guides & PDF Handouts
                  </h4>
                  <div className="space-y-3">
                    {t.resources.map(res => (
                      <div key={res.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-sm text-white">{res.title}</h5>
                          <p className="text-xs text-white/60 mt-0.5">{res.description}</p>
                        </div>
                        <button 
                          onClick={() => alert(`Downloading ${res.title} via Firebase Storage CDN...`)}
                          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#F9E29C] text-[#050B18] font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all flex-shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF ({res.downloadsCount})
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Student Reviews */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37]">💬 Student Feedback & Ratings</h4>
                {t.reviews.length === 0 ? (
                  <p className="text-white/50 italic text-xs">No public reviews indexed for this profile yet.</p>
                ) : (
                  t.reviews.map(rev => (
                    <div key={rev.id} className="bg-[#0A1629] p-5 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img src={rev.studentAvatar} alt={rev.studentName} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-xs">{rev.studentName}</span>
                            <span className="text-[10px] text-white/40 ml-1">({rev.studentCountry})</span>
                          </div>
                        </div>
                        <span className="text-yellow-400 font-bold text-xs">{"★".repeat(rev.ratingOverall)}</span>
                      </div>
                      <p className="text-white/80 text-xs italic">"{rev.comment}"</p>
                      {rev.teacherResponse && (
                        <div className="pl-4 border-l-2 border-[#D4AF37] bg-white/[0.02] py-2 px-3 rounded-r-lg text-xs mt-2">
                          <span className="text-[10px] text-[#D4AF37] font-bold block mb-0.5">Tutor Response:</span>
                          <p className="text-white/70 italic">{rev.teacherResponse}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            /* Booking Interface */
            <div className="bg-[#0A1629] p-8 rounded-[32px] border border-[#D4AF37]/30 shadow-2xl space-y-8">
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
                  <CalIcon className="w-6 h-6 text-[#D4AF37]" /> Schedule Session
                </h3>
                <p className="text-white/50 text-xs">Select your preferred date and time. Times are shown in your local timezone.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-white/60">1. Select Date</h4>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#050B18] border border-white/10 p-4 rounded-xl focus:border-[#D4AF37] outline-none text-sm"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-white/60">2. Select Time</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl border text-xs font-bold transition-all ${selectedTime === time ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "bg-white/5 border-white/10 hover:border-[#D4AF37]/50"}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 text-blue-300 text-xs">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <p>This session is covered by the <strong>Global Escrow Protocol</strong>. Funds are fully refundable if the tutor doesn't show up.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="p-6 bg-[#0A1629] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="text-xs">
              <span className="text-white/40 block">Commission Free for Students</span>
              <span className="font-bold text-[#D4AF37]">85% Direct Teacher Allocation</span>
            </div>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            {!isBooking ? (
              <>
                <button 
                  onClick={() => { setSelectedTeacherForDetail(null); setActiveChatTeacher(t); }}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold flex items-center gap-2 transition-all text-xs"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400" /> Text Chat ($2/30m)
                </button>
                <button 
                  onClick={() => { setSelectedTeacherForDetail(null); startCall(t, "voice_call"); }}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold flex items-center gap-2 transition-all text-xs"
                >
                  <Phone className="w-4 h-4 text-green-400" /> Voice ($5/30m)
                </button>
                <button 
                  onClick={() => { setIsBooking(true); setBookingType("video_call"); }}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#F9E29C] text-[#050B18] font-bold rounded-xl shadow-xl flex items-center gap-2 transition-all text-xs"
                >
                  <CalIcon className="w-4 h-4" /> Schedule HD Video ($10/hr)
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsBooking(false)}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all text-xs"
                >
                  Back
                </button>
                <button 
                  onClick={handleBook}
                  className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl shadow-xl flex items-center gap-2 transition-all text-xs"
                >
                  <CheckCircle className="w-4 h-4" /> Confirm & Pay ${t.hourlyRateVideo}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
