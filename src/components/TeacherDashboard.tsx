import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Users, DollarSign, Clock, BookOpen, Download, AlertTriangle, CheckCircle, Upload } from "lucide-react";

export const TeacherDashboard: React.FC = () => {
  const { currentUser, withdrawals, requestWithdrawal, bookings, teachers } = useApp();
  const [withdrawAmount, setWithdrawAmount] = useState<number>(100);
  const [withdrawMethod, setWithdrawMethod] = useState<"M-Pesa" | "Airtel Money" | "Bank Transfer">("M-Pesa");
  const [isVerificationMode, setIsVerificationMode] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<number>(1);
  
  // Mock teacher stats based on the mock data (for the demo, use static or computed if possible)
  const myProfile = teachers.find(t => t.userId === currentUser.id) || teachers[0];

  const handleVerifySubmit = () => {
    alert("Verification submitted successfully to Admin Portal! Please wait for approval.");
    setIsVerificationMode(false);
  };

  return (
    <div className="flex-1 bg-[#050B18] text-white p-6 md:p-8 overflow-y-auto w-full h-full select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">Sparkles Teacher Portal</h2>
            <p className="text-white/60 text-sm">Manage your global sessions, track your 85% payouts, and view analytics.</p>
          </div>
          <div className="flex items-center gap-4">
            {!currentUser.isVerified && !isVerificationMode && (
              <button onClick={() => setIsVerificationMode(true)} className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-red-500/30">
                <AlertTriangle className="w-4 h-4" /> Action Required: Verify Identity
              </button>
            )}
            {currentUser.isVerified && (
              <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-xl text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Verified Educator
              </div>
            )}
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-2 rounded-xl text-[#D4AF37] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              Level: {myProfile.level}
            </div>
          </div>
        </div>

        {isVerificationMode && !currentUser.isVerified && (
          <div className="bg-[#0A1629] p-8 rounded-[32px] border border-[#D4AF37]/30 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold">Identity Verification Wizard</h3>
            <p className="text-xs text-white/50">To teach on GlobalChat Earn, we must verify your identity to ensure a safe community.</p>
            
            <div className="flex gap-4 mb-6">
              {[1, 2, 3].map(step => (
                <div key={step} className={`flex-1 h-1 rounded-full ${verificationStep >= step ? "bg-[#D4AF37]" : "bg-white/10"}`} />
              ))}
            </div>

            {verificationStep === 1 && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm">Step 1: Government ID</h4>
                <div className="bg-white/5 p-8 border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 text-white/50 hover:text-white transition-all">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold uppercase">Upload Passport or National ID</span>
                </div>
                <button onClick={() => setVerificationStep(2)} className="bg-white text-black px-6 py-2 rounded-lg font-bold text-xs mt-4">Next Step</button>
              </div>
            )}

            {verificationStep === 2 && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm">Step 2: Selfie Verification</h4>
                <div className="bg-white/5 p-8 border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 text-white/50 hover:text-white transition-all">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold uppercase">Take a Live Selfie</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setVerificationStep(1)} className="bg-white/10 text-white px-6 py-2 rounded-lg font-bold text-xs mt-4">Back</button>
                  <button onClick={() => setVerificationStep(3)} className="bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold text-xs mt-4">Next Step</button>
                </div>
              </div>
            )}

            {verificationStep === 3 && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm">Step 3: Contact Verification</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Phone Number for OTP" className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37] outline-none" />
                  <button className="bg-white/10 text-white font-bold text-xs rounded-lg hover:bg-white/20">Send OTP</button>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setVerificationStep(2)} className="bg-white/10 text-white px-6 py-2 rounded-lg font-bold text-xs mt-4">Back</button>
                  <button onClick={handleVerifySubmit} className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold text-xs mt-4">Submit for Review</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total Sessions" value={myProfile.sessionCount.toString()} icon={<Users />} />
          <KPICard title="Average Rating" value={myProfile.rating.toFixed(2)} icon={<span className="text-yellow-400">★</span>} />
          <KPICard title="Wallet Balance" value={`$${currentUser.walletBalance.toFixed(2)}`} icon={<DollarSign />} isGold />
          <KPICard title="Response Time" value={`~${myProfile.responseTimeMinutes}m`} icon={<Clock />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area (Simulated) */}
          <div className="lg:col-span-2 bg-[#0A1629] p-8 rounded-[32px] border border-white/10 shadow-xl space-y-6">
            <h3 className="text-lg font-bold">Earnings Overview</h3>
            <div className="h-64 flex items-end justify-between gap-2 opacity-80 border-b border-white/10 pb-4">
              {[40, 60, 45, 80, 50, 95, 70].map((h, i) => (
                <div key={i} className="w-full bg-gradient-to-t from-[#D4AF37] to-[#F9E29C] rounded-t-lg relative group transition-all hover:opacity-100 cursor-pointer" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${(h * 2.5).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest font-bold">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Withdrawal Panel */}
          <div className="bg-[#081121] p-8 rounded-[32px] border border-white/5 space-y-6 shadow-xl flex flex-col">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Download className="w-5 h-5 text-[#D4AF37]" /> Request Withdrawal
            </h3>
            <p className="text-xs text-white/50">Withdraw your 85% earnings to local mobile money or bank accounts instantly.</p>
            
            <div className="space-y-4 flex-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-white/40 font-bold">Amount (USD)</label>
                <input 
                  type="number" 
                  value={withdrawAmount} 
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-white/40 font-bold">Method</label>
                <select 
                  value={withdrawMethod}
                  onChange={(e: any) => setWithdrawMethod(e.target.value)}
                  className="bg-[#0A1629] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="M-Pesa">M-Pesa (Kenya)</option>
                  <option value="Airtel Money">Airtel Money (Africa)</option>
                  <option value="Bank Transfer">Global Bank Transfer (SWIFT)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-white/40 font-bold">Account Details</label>
                <input 
                  type="text" 
                  placeholder="Phone number or IBAN"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <button 
              onClick={() => requestWithdrawal(withdrawAmount, withdrawMethod, "+254 712 345678")}
              className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#F9E29C] text-[#050B18] font-bold rounded-xl shadow-lg transition-all text-xs"
            >
              Submit Withdrawal
            </button>
          </div>
        </div>

        {/* Resources & Upcoming */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0A1629] rounded-[32px] border border-white/5 p-6 md:p-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /> Upcoming Sessions</h3>
            <div className="space-y-3">
              {bookings.filter(b => b.status === "scheduled").map((b) => (
                <div key={b.id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm">Session with {b.studentName}</h5>
                    <p className="text-[10px] text-white/50">{b.scheduledStartTime} • {b.durationMinutes} mins • {b.sessionType.replace('_', ' ')}</p>
                  </div>
                  <span className="text-green-400 font-bold text-xs">+${b.teacherPayout.toFixed(2)}</span>
                </div>
              ))}
              {bookings.filter(b => b.status === "scheduled").length === 0 && <p className="text-xs text-white/40">No upcoming sessions.</p>}
            </div>
          </div>

          <div className="bg-[#0A1629] rounded-[32px] border border-white/5 p-6 md:p-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-purple-400" /> My Cultural Resources</h3>
            <div className="space-y-3">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 border-dashed flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all text-xs text-white/60">
                + Upload New PDF Guide or Document
              </div>
              {myProfile.resources.map(r => (
                <div key={r.id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm">{r.title}</h5>
                    <p className="text-[10px] text-white/50">{r.downloadsCount} student downloads</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const KPICard: React.FC<{ title: string; value: string; icon: React.ReactNode; isGold?: boolean }> = ({ title, value, icon, isGold }) => (
  <div className={`p-6 rounded-[24px] border ${isGold ? "bg-gradient-to-br from-[#112240] to-[#0A192F] border-[#D4AF37]/30 shadow-[#D4AF37]/10" : "bg-[#0A1629] border-white/5"} shadow-xl relative overflow-hidden`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{title}</span>
      <div className={`p-2 rounded-xl ${isGold ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-white/5 text-white/60"}`}>
        {icon}
      </div>
    </div>
    <h3 className={`text-3xl font-bold tracking-tight ${isGold ? "text-[#D4AF37]" : "text-white"}`}>{value}</h3>
  </div>
);
