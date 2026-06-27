import React from "react";
import { useApp } from "../context/AppContext";
import { Calendar, Video, Phone, MessageSquare, Clock, ArrowRight } from "lucide-react";

export const SessionsView: React.FC = () => {
  const { bookings, currentUser, setActiveTab, startCall, setActiveChatTeacher, teachers } = useApp();

  const isTeacher = currentUser.role === "teacher";

  return (
    <div className="flex-1 bg-[#050B18] text-white p-6 md:p-8 overflow-y-auto w-full h-full select-none">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">📅 My Sessions</h2>
            <p className="text-white/60 mt-1 text-sm">Manage your scheduled cultural exchanges and learning sessions.</p>
          </div>
          <button 
            onClick={() => setActiveTab("discovery")}
            className="px-5 py-2 bg-[#D4AF37] text-[#050B18] font-bold rounded-xl text-xs hover:bg-[#F9E29C] transition-colors"
          >
            Find Tutors
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-[#081121] rounded-[32px] border border-white/10 p-12 text-center">
            <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Active Sessions</h3>
            <p className="text-white/60 text-sm mb-6">You don't have any upcoming or past bookings.</p>
            <button 
              onClick={() => setActiveTab("discovery")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-xs transition-all"
            >
              Explore the World
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map(b => {
              const otherPersonName = isTeacher ? b.studentName : b.teacherName;
              const otherPersonAvatar = isTeacher ? b.studentAvatar : b.teacherAvatar;
              const isPast = b.status === "completed" || b.status === "cancelled";
              
              const getIcon = () => {
                if (b.sessionType === "video_call") return <Video className="w-5 h-5 text-purple-400" />;
                if (b.sessionType === "voice_call") return <Phone className="w-5 h-5 text-green-400" />;
                return <MessageSquare className="w-5 h-5 text-blue-400" />;
              };

              const handleJoin = () => {
                if (b.sessionType === "text_chat") {
                  const teacher = teachers.find(t => t.id === b.teacherId);
                  if (teacher) setActiveChatTeacher(teacher);
                } else {
                  const teacher = teachers.find(t => t.id === b.teacherId);
                  if (teacher) startCall(teacher, b.sessionType);
                }
              };

              return (
                <div key={b.id} className={`bg-[#0A1629] p-6 rounded-2xl border ${isPast ? "border-white/5 opacity-80" : "border-white/10 hover:border-[#D4AF37]/50 shadow-lg"} flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all`}>
                  <div className="flex items-center gap-4">
                    <img src={otherPersonAvatar} alt={otherPersonName} className="w-14 h-14 rounded-2xl object-cover border border-white/10" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getIcon()}
                        <h4 className="font-bold text-base">{b.sessionType.replace('_', ' ').toUpperCase()}</h4>
                      </div>
                      <p className="text-sm font-semibold text-white/90">with {otherPersonName}</p>
                      <p className="text-xs text-white/50 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5" /> {b.scheduledStartTime} • {b.durationMinutes} mins
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-3">
                    <div className="text-right">
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md ${b.status === "scheduled" ? "bg-blue-500/20 text-blue-400" : b.status === "active" ? "bg-green-500/20 text-green-400 animate-pulse" : "bg-white/10 text-white/60"}`}>
                        {b.status}
                      </span>
                      <p className="text-xs font-bold text-[#D4AF37] mt-2">
                        {isTeacher ? `Earns: $${b.teacherPayout}` : `Cost: $${b.totalPrice}`}
                      </p>
                    </div>

                    {!isPast && !isTeacher && (
                      <button 
                        onClick={handleJoin}
                        className="px-5 py-2 bg-[#D4AF37] text-[#050B18] font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-[#F9E29C] transition-all"
                      >
                        Join Session <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
