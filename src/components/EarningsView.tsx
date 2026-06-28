import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { DollarSign, ShieldCheck, Lock, Activity, ArrowUpRight } from "lucide-react";

export const EarningsView: React.FC = () => {
  const { currentUser, addFunds, bookings } = useApp();
  const [addAmount, setAddAmount] = useState<number>(50);

  const isTeacher = currentUser.role === "teacher";
  
  return (
    <div className="flex-1 bg-[black] text-white p-6 md:p-8 overflow-y-auto w-full h-full select-none">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <h2 className="text-3xl font-bold tracking-tight mb-1">💰 Earnings & Wallet</h2>
          <p className="text-white/60 text-sm">Secure transactions powered by Stripe. Enterprise grade E2E encryption.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-[#112240] to-[#0A192F] p-8 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[white]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <h4 className="text-xs uppercase tracking-widest text-[white] font-bold mb-4">Available Balance</h4>
            <div className="flex items-end gap-4 mb-8">
              <span className="text-6xl font-bold tracking-tighter">${currentUser.walletBalance.toFixed(2)}</span>
              <span className="text-sm text-white/50 mb-2 font-mono">USD</span>
            </div>

            {!isTeacher && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={addAmount} 
                    onChange={(e) => setAddAmount(Number(e.target.value))}
                    className="bg-[black] border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white] w-32"
                    min="10"
                  />
                  <button 
                    onClick={() => addFunds(addAmount)}
                    className="flex-1 px-6 py-3 bg-[white] hover:bg-[#e4e4e7] text-[black] font-bold rounded-xl shadow-lg transition-all"
                  >
                    Add Funds (Stripe Checkout)
                  </button>
                </div>
                <div className="flex items-center justify-center gap-4 text-[10px] text-white/40 uppercase tracking-widest pt-2 opacity-50 grayscale">
                  <span className="font-bold text-sm">STRIPE</span>
                  <span className="font-bold text-sm">VISA</span>
                  <span className="font-bold text-sm">MASTERCARD</span>
                </div>
              </div>
            )}
          </div>

          {/* Security & Info */}
          <div className="space-y-4">
            <div className="bg-[#09090b] p-6 rounded-[24px] border border-white/5 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-green-500/10 rounded-xl text-green-400 border border-green-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-sm mb-1">Global Escrow Protocol</h5>
                  <p className="text-xs text-white/60 leading-relaxed">Funds are held securely until the session is completed successfully. AI dispute resolution available.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#09090b] p-6 rounded-[24px] border border-white/5 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-sm mb-1">Bank-Grade Encryption</h5>
                  <p className="text-xs text-white/60 leading-relaxed">We do not store your raw card details. All data is tokenized via PCI-DSS compliant providers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#18181b] rounded-[32px] border border-white/5 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-[white]" /> Transaction History
            </h3>
          </div>

          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-xs text-white/40">No transactions recorded yet.</p>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[white]/10 flex items-center justify-center text-[white] border border-[white]/20">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{b.sessionType.replace('_', ' ').toUpperCase()} Session</p>
                      <p className="text-[10px] text-white/40">{b.createdAt} • ID: {b.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold font-mono ${isTeacher ? 'text-green-400' : 'text-red-400'}`}>
                      {isTeacher ? '+' : '-'}${isTeacher ? b.teacherPayout.toFixed(2) : b.totalPrice.toFixed(2)}
                    </p>
                    <span className="text-[10px] text-white/50 uppercase">{b.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
