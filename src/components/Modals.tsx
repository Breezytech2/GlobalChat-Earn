import React from "react";
import { useApp } from "../context/AppContext";
import { ShieldCheck, Sparkles, X } from "lucide-react";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, OAuthProvider, signInWithPopup } from "../lib/firebase";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, currentUser, signInWithGoogle, logout } = useApp();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoginMode, setIsLoginMode] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  if (!isAuthModalOpen) return null;

  const isRealUser = currentUser.id !== "u_student_1";

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("Email and password required");
    
    setLoading(true);
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setIsAuthModalOpen(false);
    } catch (error: any) {
      console.error("Auth error:", error);
      alert(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const signInWithApple = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
      await signInWithPopup(auth, provider);
      setIsAuthModalOpen(false);
    } catch (error: any) {
      console.error("Apple Auth Error:", error);
      alert("Apple Authentication failed or was cancelled.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#09090b] rounded-[32px] border border-white/10 p-8 relative shadow-2xl">
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-[white] to-[#e4e4e7] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-[white]/20 mb-4">
            <span className="text-[black] font-bold text-2xl">G</span>
          </div>
          <h3 className="text-2xl font-bold">Welcome to GlobalChat</h3>
          <p className="text-xs text-white/50">Current Role Profile: <span className="text-[white] font-bold uppercase">{currentUser.role}</span></p>
          {isRealUser && <p className="text-sm font-bold text-green-400 mt-2">Logged in as: {currentUser.email}</p>}
        </div>

        <div className="space-y-4">
          {!isRealUser ? (
            <>
              <form onSubmit={handleEmailAuth} className="space-y-3 mb-4">
                <input 
                  type="email" 
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[black] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white]"
                />
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[black] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[white]"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[white] hover:bg-[#e4e4e7] text-[black] font-bold rounded-xl transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Please wait..." : (isLoginMode ? "Sign In" : "Create Account")}
                </button>
                <p 
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-[10px] text-center text-white/50 cursor-pointer hover:text-white uppercase font-bold tracking-widest mt-2"
                >
                  {isLoginMode ? "Need an account? Sign up" : "Already have an account? Log in"}
                </p>
              </form>
              
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">OR</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              <button 
                onClick={signInWithGoogle}
                className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-3 text-sm hover:opacity-90 transition-opacity"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              <button 
                onClick={signInWithApple}
                className="w-full py-3 bg-black border border-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-3 text-sm hover:bg-white/5 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z"/></svg>
                Continue with Apple
              </button>
            </>
          ) : (
            <button 
              onClick={() => { logout(); setIsAuthModalOpen(false); }}
              className="w-full py-3 bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-3 text-sm hover:bg-red-700 transition-opacity"
            >
              Log Out
            </button>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-400" /> Identity Verification Enforced
          </p>
        </div>
      </div>
    </div>
  );
};

export const PremiumModal: React.FC = () => {
  const { isPremiumModalOpen, setIsPremiumModalOpen, upgradeToPremium } = useApp();

  if (!isPremiumModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#112240] to-[#0A192F] rounded-[32px] border border-[white]/30 p-8 relative shadow-2xl shadow-[white]/20 text-center">
        <button 
          onClick={() => setIsPremiumModalOpen(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <Sparkles className="w-12 h-12 text-[white] mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-2 text-[white]">Global Premium</h3>
        <p className="text-white/80 text-sm mb-6">Unlock the ultimate cultural exchange experience.</p>

        <div className="text-left space-y-4 bg-black/30 p-6 rounded-2xl border border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Unlimited Real-time AI Translation</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Priority Teacher Matching</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Exclusive Cultural Group Events</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Premium Profile Badge</span>
          </div>
        </div>

        <button 
          onClick={upgradeToPremium}
          className="w-full py-4 bg-[white] hover:bg-[#e4e4e7] text-[black] font-bold rounded-xl shadow-xl transition-all"
        >
          Upgrade Now for $9.99/mo
        </button>
        <p className="text-[10px] text-white/40 mt-4 uppercase tracking-widest">Cancel anytime. Secure Stripe Checkout.</p>
      </div>
    </div>
  );
};
