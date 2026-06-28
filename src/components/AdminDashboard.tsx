import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Shield, TrendingUp, AlertTriangle, Users, DollarSign, Activity, Settings, Save, CheckCircle, XCircle } from "lucide-react";
import { AdminSettings } from "../types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Jan", revenue: 4000, commission: 600 },
  { name: "Feb", revenue: 3000, commission: 450 },
  { name: "Mar", revenue: 5000, commission: 750 },
  { name: "Apr", revenue: 8780, commission: 1317 },
  { name: "May", revenue: 11200, commission: 1680 },
  { name: "Jun", revenue: 14500, commission: 2175 },
];

export const AdminDashboard: React.FC = () => {
  const { analytics, reports, withdrawals, teachers, approveTeacher, approveWithdrawal, rejectWithdrawal, adminSettings, updateAdminSettings } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<"overview" | "settings">("overview");

  const pendingVerification = teachers.filter(t => t.verificationStatus.status === "pending" || !t.badges.includes("Verified"));

  const [formSettings, setFormSettings] = useState<AdminSettings>(adminSettings);
  const [isSaving, setIsSaving] = useState(false);

  // Update form settings when context settings change
  React.useEffect(() => {
    setFormSettings(adminSettings);
  }, [adminSettings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateAdminSettings(formSettings);
    setIsSaving(false);
  };

  return (
    <div className="flex-1 bg-[black] text-white p-6 md:p-8 overflow-y-auto w-full h-full select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1 text-red-400 flex items-center gap-3">
              <Shield className="w-8 h-8" /> Enterprise Admin Control Center
            </h2>
            <p className="text-white/60 text-sm">Monitor revenue, enforce AI moderation policies, and verify global teacher identities.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveAdminTab("overview")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeAdminTab === 'overview' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-white/5 hover:bg-white/10 text-white/70'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveAdminTab("settings")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeAdminTab === 'settings' ? 'bg-[white] text-[black] shadow-lg shadow-[white]/20' : 'bg-white/5 hover:bg-white/10 text-white/70'}`}
            >
              <Settings className="w-4 h-4" /> Payment Settings
            </button>
          </div>
        </div>

        {activeAdminTab === "overview" ? (
          <>
            {/* Global Analytics */}
            <div>
              <h3 className="text-sm uppercase tracking-widest font-bold text-[white] mb-4">Platform Analytics (Last 30 Days)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Platform Revenue" value={`$${analytics.totalRevenueUSD.toLocaleString()}`} icon={<DollarSign />} highlight />
                <StatCard title={`Company Commission (${adminSettings.commissionPercentage}%)`} value={`$${analytics.platformEarningsUSD.toLocaleString()}`} icon={<TrendingUp />} />
                <StatCard title={`Teacher Payouts (${100 - adminSettings.commissionPercentage}%)`} value={`$${analytics.teacherPayoutsUSD.toLocaleString()}`} icon={<Users />} />
                <StatCard title="Monthly Active Users" value={analytics.monthlyActiveUsers.toLocaleString()} icon={<Activity />} />
              </div>

              <div className="mt-8 bg-[#18181b] rounded-[32px] border border-white/10 p-6 md:p-8 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[white]" /> Monthly Revenue & Commission
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="name" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} />
                      <YAxis stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'black', borderColor: '#ffffff10', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Line type="monotone" dataKey="revenue" name="Total Revenue" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                      <Line type="monotone" dataKey="commission" name="Commission" stroke="white" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Identity Verification Queue */}
              <div className="bg-[#18181b] rounded-[32px] border border-white/10 p-6 md:p-8 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" /> Identity Verification Queue
                </h3>
                {pendingVerification.length === 0 ? (
                  <p className="text-xs text-white/50">All teacher KYC applications have been processed.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingVerification.map(t => (
                      <div key={t.id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={t.avatarUrl} alt={t.fullName} className="w-10 h-10 rounded-full object-cover grayscale" />
                          <div>
                            <h5 className="font-bold text-sm">{t.fullName}</h5>
                            <p className="text-[10px] text-white/50">{t.country} • ID Submitted & Selfie Check Pending</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => approveTeacher(t.id)}
                            className="px-4 py-2 bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/30 font-bold rounded-lg text-xs transition-all"
                          >
                            Approve KYC
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* AI Moderation Reports */}
              <div className="bg-[#18181b] rounded-[32px] border border-white/10 p-6 md:p-8 shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" /> AI Moderation & Abuse Reports
                </h3>
                <div className="space-y-4">
                  {reports.map(r => (
                    <div key={r.id} className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex flex-col gap-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-red-600/20 text-red-400 px-3 py-1 rounded-bl-xl text-[9px] font-bold uppercase tracking-wider">
                        {r.reason.replace('_', ' ')}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm">Reported: {r.reportedUserName}</h5>
                        <p className="text-[10px] text-white/40">By {r.reporterName} • {r.timestamp}</p>
                      </div>
                      <p className="text-xs text-white/80 bg-black/30 p-3 rounded-lg border border-white/5 font-mono">
                        "{r.details}"
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-red-400 font-bold">AI Fraud Confidence: {(r.aiFraudConfidence! * 100).toFixed(0)}%</span>
                        <button className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition-all">
                          Ban User
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payout Requests */}
              <div className="bg-[#18181b] rounded-[32px] border border-white/10 p-6 md:p-8 shadow-xl lg:col-span-2">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" /> Pending Withdrawal Requests
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/10">
                        <th className="pb-3 px-2">Teacher</th>
                        <th className="pb-3 px-2">Amount</th>
                        <th className="pb-3 px-2">Method</th>
                        <th className="pb-3 px-2">Account</th>
                        <th className="pb-3 px-2">Status</th>
                        <th className="pb-3 px-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {withdrawals.map(w => (
                        <tr key={w.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-2 font-bold">{w.teacherName}</td>
                          <td className="py-4 px-2 text-[white] font-mono">${w.amount.toFixed(2)}</td>
                          <td className="py-4 px-2">{w.method}</td>
                          <td className="py-4 px-2 font-mono text-white/60">{w.accountDetails}</td>
                          <td className="py-4 px-2">
                            <span className={`px-2 py-1 rounded text-[9px] uppercase font-bold ${w.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : w.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                              {w.status}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-right">
                            {w.status === 'pending' && (
                              <div className="flex gap-2 justify-end">
                                <button 
                                  onClick={() => approveWithdrawal(w.id)}
                                  className="p-1.5 bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/30 rounded transition-all"
                                  title="Approve & Mark Paid"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => rejectWithdrawal(w.id)}
                                  className="p-1.5 bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 rounded transition-all"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[#18181b] rounded-[32px] border border-white/10 p-6 md:p-8 shadow-xl max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Settings className="w-6 h-6 text-[white]" />
              <h3 className="text-2xl font-bold">Payment & Commission Settings</h3>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest border-b border-white/5 pb-2">Platform Economics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">Platform Commission (%)</label>
                    <input 
                      type="number"
                      value={formSettings.commissionPercentage}
                      onChange={e => setFormSettings({...formSettings, commissionPercentage: Number(e.target.value)})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white] transition-colors"
                      min="0"
                      max="100"
                      required
                    />
                    <p className="text-[10px] text-white/40 mt-1">Platform takes {formSettings.commissionPercentage}% and teachers take {100 - formSettings.commissionPercentage}%.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest border-b border-white/5 pb-2">Admin Payment Accounts (Payout Source)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">M-Pesa Paybill Number</label>
                    <input 
                      type="text"
                      value={formSettings.mpesaPaybill}
                      onChange={e => setFormSettings({...formSettings, mpesaPaybill: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white] transition-colors"
                      placeholder="e.g. 123456"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">M-Pesa Till Number</label>
                    <input 
                      type="text"
                      value={formSettings.mpesaTill}
                      onChange={e => setFormSettings({...formSettings, mpesaTill: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white] transition-colors"
                      placeholder="e.g. 987654"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">M-Pesa Phone Number</label>
                    <input 
                      type="text"
                      value={formSettings.mpesaPhone}
                      onChange={e => setFormSettings({...formSettings, mpesaPhone: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white] transition-colors"
                      placeholder="+254..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">Airtel Money Number</label>
                    <input 
                      type="text"
                      value={formSettings.airtelMoney}
                      onChange={e => setFormSettings({...formSettings, airtelMoney: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white] transition-colors"
                      placeholder="+254..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">Stripe Account ID</label>
                    <input 
                      type="text"
                      value={formSettings.stripeAccount}
                      onChange={e => setFormSettings({...formSettings, stripeAccount: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white] transition-colors"
                      placeholder="acct_..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">PayPal Email</label>
                    <input 
                      type="email"
                      value={formSettings.paypalEmail}
                      onChange={e => setFormSettings({...formSettings, paypalEmail: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white] transition-colors"
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-white/60 mb-2">Bank Account Details (Optional)</label>
                    <textarea 
                      value={formSettings.bankDetails}
                      onChange={e => setFormSettings({...formSettings, bankDetails: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white] transition-colors min-h-[80px]"
                      placeholder="Bank Name, Account Number, SWIFT, etc."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-[white] hover:bg-[#e4e4e7] text-[black] font-bold rounded-xl transition-all text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Settings Securely</>}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; highlight?: boolean }> = ({ title, value, icon, highlight }) => (
  <div className={`p-6 rounded-[24px] border ${highlight ? "bg-gradient-to-br from-[#112240] to-[#0A192F] border-[white]/50 shadow-[white]/20" : "bg-[#18181b] border-white/5"} shadow-xl relative overflow-hidden`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{title}</span>
      <div className={`p-2 rounded-xl ${highlight ? "bg-[white]/20 text-[white]" : "bg-white/5 text-white/60"}`}>
        {icon}
      </div>
    </div>
    <h3 className={`text-2xl lg:text-3xl font-bold tracking-tight ${highlight ? "text-[white]" : "text-white"}`}>{value}</h3>
  </div>
);
