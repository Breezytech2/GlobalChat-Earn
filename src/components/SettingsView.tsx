import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../lib/firebase";
import {
  linkWithPopup,
  linkWithCredential,
  unlink,
  EmailAuthProvider,
  AuthCredential,
} from "firebase/auth";
import { ShieldCheck, Mail, Apple, X } from "lucide-react";

export const SettingsView: React.FC = () => {
  const { currentUser } = useApp();
  const [loading, setLoading] = useState(false);

  const [emailForLinking, setEmailForLinking] = useState("");
  const [passwordForLinking, setPasswordForLinking] = useState("");

  const user = auth.currentUser;

  if (!user || currentUser.id === "u_student_1") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black">
        <p className="text-zinc-400">Please log in to view settings.</p>
      </div>
    );
  }

  // Get current linked providers
  const providerData = user.providerData;
  const isGoogleLinked = providerData.some(
    (p) => p.providerId === "google.com",
  );
  const isAppleLinked = providerData.some((p) => p.providerId === "apple.com");
  const isPasswordLinked = providerData.some(
    (p) => p.providerId === "password",
  );

  const handleLinkGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await linkWithPopup(user, provider);
      alert("Google account linked successfully!");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkApple = async () => {
    setLoading(true);
    try {
      const provider = new OAuthProvider("apple.com");
      await linkWithPopup(user, provider);
      alert("Apple account linked successfully!");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForLinking || !passwordForLinking) {
      alert("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        emailForLinking,
        passwordForLinking,
      );
      await linkWithCredential(user, credential);
      alert("Email/Password linked successfully!");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlink = async (providerId: string) => {
    if (providerData.length === 1) {
      alert("You cannot unlink your only sign-in method.");
      return;
    }
    setLoading(true);
    try {
      await unlink(user, providerId);
      alert(`Unlinked ${providerId} successfully!`);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-black p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Account Settings
          </h2>
          <p className="text-zinc-400">
            Manage your connected sign-in methods and account security.
          </p>
        </div>

        <div className="bg-zinc-950 border border-white/5 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4 text-white">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-bold">Sign-in Methods</h3>
          </div>

          <div className="space-y-4">
            {/* Google Provider */}
            <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl">
              <div className="flex items-center gap-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="w-6 h-6 bg-white rounded-full p-0.5"
                />
                <div>
                  <p className="font-bold">Google</p>
                  <p className="text-xs text-zinc-400">
                    {isGoogleLinked ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  isGoogleLinked
                    ? handleUnlink("google.com")
                    : handleLinkGoogle()
                }
                disabled={loading}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors disabled:opacity-50 ${isGoogleLinked ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : "bg-white text-black hover:bg-zinc-200"}`}
              >
                {isGoogleLinked ? "Unlink" : "Link"}
              </button>
            </div>

            {/* Apple Provider */}
            <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl">
              <div className="flex items-center gap-4">
                <Apple className="w-6 h-6 text-white" />
                <div>
                  <p className="font-bold">Apple</p>
                  <p className="text-xs text-zinc-400">
                    {isAppleLinked ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  isAppleLinked ? handleUnlink("apple.com") : handleLinkApple()
                }
                disabled={loading}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors disabled:opacity-50 ${isAppleLinked ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : "bg-white text-black hover:bg-zinc-200"}`}
              >
                {isAppleLinked ? "Unlink" : "Link"}
              </button>
            </div>

            {/* Email/Password Provider */}
            <div className="p-4 bg-black border border-white/10 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-white" />
                  <div>
                    <p className="font-bold">Email & Password</p>
                    <p className="text-xs text-zinc-400">
                      {isPasswordLinked ? "Connected" : "Not connected"}
                    </p>
                  </div>
                </div>
                {isPasswordLinked && (
                  <button
                    onClick={() => handleUnlink("password")}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-bold rounded-lg transition-colors disabled:opacity-50 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  >
                    Unlink
                  </button>
                )}
              </div>

              {!isPasswordLinked && (
                <form
                  onSubmit={handleLinkPassword}
                  className="flex gap-2 items-center mt-2 border-t border-white/5 pt-4"
                >
                  <input
                    type="email"
                    placeholder="Email"
                    value={emailForLinking}
                    onChange={(e) => setEmailForLinking(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={passwordForLinking}
                    onChange={(e) => setPasswordForLinking(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    disabled={
                      loading || !emailForLinking || !passwordForLinking
                    }
                    className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
                  >
                    Link Email
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
