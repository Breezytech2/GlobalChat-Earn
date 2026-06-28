import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  UserRole,
  TeacherProfile,
  CountryInfo,
  ChatMessage,
  SessionBooking,
  AbuseReport,
  PlatformAnalytics,
  WithdrawalRequest,
  AdminSettings,
} from "../types";
import {
  MOCK_TEACHERS,
  MOCK_COUNTRIES,
  MOCK_ANALYTICS,
  MOCK_REPORTS,
} from "../data/mockData";
import {
  auth,
  db,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "../lib/firebase";

interface AppContextType {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  switchRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  teachers: TeacherProfile[];
  setTeachers: React.Dispatch<React.SetStateAction<TeacherProfile[]>>;
  countries: CountryInfo[];
  selectedCountry: CountryInfo | null;
  setSelectedCountry: (country: CountryInfo | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterLanguage: string;
  setFilterLanguage: (lang: string) => void;
  minTrustScore: number;
  setMinTrustScore: (score: number) => void;
  favourites: string[];
  toggleFavourite: (teacherId: string) => void;
  activeChatTeacher: TeacherProfile | null;
  setActiveChatTeacher: (teacher: TeacherProfile | null) => void;
  chatMessages: ChatMessage[];
  sendMessage: (
    content: string,
    type?: "text" | "voice" | "image" | "pdf",
    fileUrl?: string,
    fileName?: string,
  ) => Promise<void>;
  activeCall: {
    teacher: TeacherProfile;
    type: "voice_call" | "video_call";
    startTime: number;
  } | null;
  startCall: (
    teacher: TeacherProfile,
    type: "voice_call" | "video_call",
  ) => void;
  endCall: () => void;
  bookings: SessionBooking[];
  bookSession: (
    teacher: TeacherProfile,
    type: "text_chat" | "voice_call" | "video_call",
  ) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isPremiumModalOpen: boolean;
  setIsPremiumModalOpen: (open: boolean) => void;
  upgradeToPremium: () => void;
  addFunds: (amount: number) => void;
  reports: AbuseReport[];
  submitReport: (
    reportedUserId: string,
    reportedUserName: string,
    reason: AbuseReport["reason"],
    details: string,
  ) => void;
  analytics: PlatformAnalytics;
  withdrawals: WithdrawalRequest[];
  requestWithdrawal: (
    amount: number,
    method: "M-Pesa" | "Airtel Money" | "Bank Transfer",
    accountDetails: string,
  ) => void;
  approveTeacher: (teacherId: string) => void;
  approveWithdrawal: (id: string) => void;
  rejectWithdrawal: (id: string) => void;
  adminSettings: AdminSettings;
  updateAdminSettings: (settings: AdminSettings) => Promise<void>;
  platformMode: "web" | "ios" | "android";
  setPlatformMode: (mode: "web" | "ios" | "android") => void;
  selectedTeacherForDetail: TeacherProfile | null;
  setSelectedTeacherForDetail: (t: TeacherProfile | null) => void;
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const DEFAULT_USER: User = {
  id: "u_student_1",
  email: "julian.mercer@oxford.ac.uk",
  fullName: "Julian Mercer",
  role: "student",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  country: "United Kingdom",
  city: "Oxford",
  phone: "+44 7911 123456",
  isVerified: true,
  isPremium: false,
  walletBalance: 142.5,
  trustScore: 98,
  createdAt: "2025-01-15",
  twoFactorEnabled: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_USER);
  const [activeTab, setActiveTab] = useState<string>("landing"); // discovery, explorer, sessions, earnings, admin, teacher_dashboard, landing
  const [teachers, setTeachers] = useState<TeacherProfile[]>(MOCK_TEACHERS);
  const [countries] = useState<CountryInfo[]>(MOCK_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterLanguage, setFilterLanguage] = useState<string>("All");
  const [minTrustScore, setMinTrustScore] = useState<number>(80);
  const [favourites, setFavourites] = useState<string[]>(["t1", "t4"]);
  const [activeChatTeacher, setActiveChatTeacher] =
    useState<TeacherProfile | null>(null);
  const [activeCall, setActiveCall] = useState<{
    teacher: TeacherProfile;
    type: "voice_call" | "video_call";
    startTime: number;
  } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState<boolean>(false);
  const [reports, setReports] = useState<AbuseReport[]>(MOCK_REPORTS);
  const [analytics, setAnalytics] = useState<PlatformAnalytics>(MOCK_ANALYTICS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([
    {
      id: "wd_1",
      teacherId: "t1",
      teacherName: "Amina Wanjiku",
      amount: 450,
      method: "M-Pesa",
      accountDetails: "+254 712 345678",
      status: "processed",
      requestedAt: "3 days ago",
    },
  ]);
  const [platformMode, setPlatformMode] = useState<"web" | "ios" | "android">(
    "web",
  );
  const [selectedTeacherForDetail, setSelectedTeacherForDetail] =
    useState<TeacherProfile | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<string>("Spanish");
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    commissionPercentage: 15,
    mpesaPaybill: "",
    mpesaTill: "",
    mpesaPhone: "",
    airtelMoney: "",
    stripeAccount: "",
    paypalEmail: "",
    bankDetails: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user from firestore
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        let userRole = "student";
        if (userSnap.exists()) {
          const u = userSnap.data() as User;
          setCurrentUser(u);
          userRole = u.role;
        } else {
          // Create new user profile if it doesn't exist
          const newUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            fullName: firebaseUser.displayName || "New Student",
            role: "student",
            avatarUrl: firebaseUser.photoURL || DEFAULT_USER.avatarUrl,
            country: "Unknown",
            city: "Unknown",
            phone: firebaseUser.phoneNumber || "",
            isVerified: false,
            isPremium: false,
            walletBalance: 0,
            trustScore: 100,
            createdAt: new Date().toISOString(),
            twoFactorEnabled: false,
          };
          await setDoc(userRef, newUser);
          setCurrentUser(newUser);
        }

        if (userRole === "admin") {
          try {
            const settingsRef = doc(db, "settings", "global");
            const settingsSnap = await getDoc(settingsRef);
            if (settingsSnap.exists()) {
              const data = settingsSnap.data() as any;
              setAdminSettings({
                ...data,
                stripeAccount: data.stripeAccount
                  ? atob(data.stripeAccount)
                  : "",
                paypalEmail: data.paypalEmail ? atob(data.paypalEmail) : "",
                bankDetails: data.bankDetails ? atob(data.bankDetails) : "",
              });
            } else {
              await setDoc(settingsRef, adminSettings);
            }
          } catch (e) {
            console.error("Failed to load admin settings", e);
          }
        }
      } else {
        setCurrentUser(DEFAULT_USER);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error("Google Auth Error:", error);
      alert("Authentication failed.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(DEFAULT_USER);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const [bookings, setBookings] = useState<SessionBooking[]>([
    {
      id: "b_101",
      studentId: "u_student_1",
      studentName: "Julian Mercer",
      studentAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      teacherId: "t1",
      teacherName: "Amina Wanjiku",
      teacherAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      sessionType: "video_call",
      durationMinutes: 60,
      totalPrice: 10.0,
      platformFee: 1.5,
      teacherPayout: 8.5,
      status: "completed",
      scheduledStartTime: "Yesterday, 4:00 PM",
      createdAt: "Yesterday",
      rating: 5,
    },
    {
      id: "b_102",
      studentId: "u_student_1",
      studentName: "Julian Mercer",
      studentAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      teacherId: "t2",
      teacherName: "Kenjiro Takahashi",
      teacherAvatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
      sessionType: "text_chat",
      durationMinutes: 30,
      totalPrice: 2.0,
      platformFee: 0.3,
      teacherPayout: 1.7,
      status: "scheduled",
      scheduledStartTime: "Today, 6:00 PM",
      createdAt: "Today",
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Listen to real-time messages for the current user
    if (!currentUser.id || currentUser.id === "u_student_1") {
      // Load mock messages for preview
      setChatMessages([
        {
          id: "m_1",
          senderId: "t1",
          senderName: "Amina Wanjiku",
          senderRole: "teacher",
          recipientId: "u_student_1",
          type: "text",
          content:
            "Habari Julian! Welcome to GlobalChat. Are you ready to explore Swahili traditions today?",
          translatedContent: {
            Spanish:
              "¡Hola Julian! Bienvenido a GlobalChat. ¿Estás listo para explorar las tradiciones suajilis hoy?",
          },
          timestamp: "10:14 AM",
          isRead: true,
        },
        {
          id: "m_2",
          senderId: "u_student_1",
          senderName: "Julian Mercer",
          senderRole: "student",
          recipientId: "t1",
          type: "text",
          content:
            "Hi Amina! Yes, absolutely. I'm visiting Nairobi next month and would love to learn local greetings.",
          timestamp: "10:15 AM",
          isRead: true,
        },
      ]);
      return;
    }

    // Subscribe to Firestore messages where either sender or recipient is the current user
    const msgsRef = collection(db, "messages");
    const q1 = query(msgsRef, where("senderId", "==", currentUser.id));
    const q2 = query(msgsRef, where("recipientId", "==", currentUser.id));

    // For simplicity without complex composite indexes in the preview,
    // we'll fetch all and filter client side or use a single query if possible.
    // A better approach is subscribing to a subcollection or using two listeners.
    const unsubscribe1 = onSnapshot(
      q1,
      (snap) => {
        const msgs1 = snap.docs.map((d) => d.data() as ChatMessage);
        setChatMessages((prev) => {
          const others = prev.filter((m) => m.senderId !== currentUser.id);
          const combined = [...others, ...msgs1].sort((a, b) =>
            a.id.localeCompare(b.id),
          ); // sort by ID (timestamp based)
          return combined;
        });
      },
      (error) => {
        console.error(
          "Firestore Error on messages (q1):",
          JSON.stringify(error),
        );
      },
    );

    const unsubscribe2 = onSnapshot(
      q2,
      (snap) => {
        const msgs2 = snap.docs.map((d) => d.data() as ChatMessage);
        setChatMessages((prev) => {
          const others = prev.filter((m) => m.recipientId !== currentUser.id);
          const combined = [...others, ...msgs2].sort((a, b) =>
            a.id.localeCompare(b.id),
          );
          return combined;
        });
      },
      (error) => {
        console.error(
          "Firestore Error on messages (q2):",
          JSON.stringify(error),
        );
      },
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [currentUser.id]);

  const switchRole = async (newRole: UserRole) => {
    const updatedUser = {
      ...currentUser,
      role: newRole,
      fullName:
        newRole === "teacher"
          ? "Dr. Sofia Müller"
          : newRole === "admin"
            ? "Platform Executive Admin"
            : "Julian Mercer",
      avatarUrl:
        newRole === "teacher"
          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
          : currentUser.avatarUrl,
    };

    setCurrentUser(updatedUser);

    if (currentUser.id !== "u_student_1") {
      try {
        const userRef = doc(db, "users", currentUser.id);
        await setDoc(userRef, updatedUser, { merge: true });

        if (newRole === "admin") {
          // Re-fetch admin settings after role change so we have latest
          const settingsRef = doc(db, "settings", "global");
          const settingsSnap = await getDoc(settingsRef);
          if (settingsSnap.exists()) {
            const data = settingsSnap.data() as any;
            setAdminSettings({
              ...data,
              stripeAccount: data.stripeAccount ? atob(data.stripeAccount) : "",
              paypalEmail: data.paypalEmail ? atob(data.paypalEmail) : "",
              bankDetails: data.bankDetails ? atob(data.bankDetails) : "",
            });
          }
        }
      } catch (error) {
        console.error("Error updating user role in Firestore", error);
      }
    }

    if (newRole === "teacher") setActiveTab("teacher_dashboard");
    else if (newRole === "admin") setActiveTab("admin");
    else setActiveTab("discovery");
  };

  const toggleFavourite = (teacherId: string) => {
    setFavourites((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId],
    );
  };

  const sendMessage = async (
    content: string,
    type: "text" | "voice" | "image" | "pdf" = "text",
    fileUrl?: string,
    fileName?: string,
  ) => {
    if (!activeChatTeacher) return;

    // AI Moderation check
    let isFlagged = false;
    try {
      const res = await fetch("/api/ai/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });
      const data = await res.json();
      if (data && !data.safe) {
        isFlagged = true;
      }
    } catch (e) {
      console.error("Moderation err:", e);
    }

    // AI Translation
    let translated: Record<string, string> = {};
    try {
      const transRes = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content, targetLanguage }),
      });
      const transData = await transRes.json();
      if (transData && transData.translation) {
        translated[targetLanguage] = transData.translation;
      }
    } catch (e) {
      console.error("Translation err:", e);
    }

    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderRole: currentUser.role,
      recipientId: activeChatTeacher.id,
      type,
      content,
      fileUrl,
      fileName,
      translatedContent: translated,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: false,
      isFlaggedByAI: isFlagged,
    };

    if (currentUser.id === "u_student_1") {
      setChatMessages((prev) => [...prev, newMsg]);
    } else {
      // Write to Firestore
      try {
        await setDoc(doc(db, "messages", newMsg.id), newMsg);
      } catch (err) {
        console.error("Failed to send message to firestore", err);
      }
    }

    // If flagged, submit auto report
    if (isFlagged) {
      submitReport(
        currentUser.id,
        currentUser.fullName,
        "scam_attempt",
        `AI detected prohibited off-platform solicitation: "${content}"`,
      );
    } else if (type === "text") {
      // Simulate tutor response after 1.5s
      setTimeout(() => {
        const responses = [
          `That is a wonderful question about ${activeChatTeacher.country}! In local culture, trust is everything.`,
          `Great pronunciation! Let me share a quick proverb: 'Haraka haraka haina baraka' (Hurry hurry has no blessing).`,
          `I have availability this Thursday if you want to practice speaking over a live HD call.`,
        ];
        const replyText =
          responses[Math.floor(Math.random() * responses.length)];
        const tutorMsg: ChatMessage = {
          id: `m_${Date.now() + 1}`,
          senderId: activeChatTeacher.id,
          senderName: activeChatTeacher.fullName,
          senderRole: "teacher",
          recipientId: currentUser.id,
          type: "text",
          content: replyText,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isRead: true,
        };

        if (currentUser.id === "u_student_1") {
          setChatMessages((prev) => [...prev, tutorMsg]);
        } else {
          setDoc(doc(db, "messages", tutorMsg.id), tutorMsg).catch(
            console.error,
          );
        }
      }, 1500);
    }
  };

  const startCall = (
    teacher: TeacherProfile,
    type: "voice_call" | "video_call",
  ) => {
    setActiveCall({ teacher, type, startTime: Date.now() });
  };

  const endCall = () => {
    if (!activeCall) return;
    const durationMinutes = Math.max(
      1,
      Math.round((Date.now() - activeCall.startTime) / 60000),
    );
    const rate =
      activeCall.type === "video_call"
        ? activeCall.teacher.hourlyRateVideo / 60
        : activeCall.teacher.halfHourRateVoice / 30;
    const price = Number((durationMinutes * rate).toFixed(2));
    const fee = Number(
      (price * (adminSettings.commissionPercentage / 100)).toFixed(2),
    );

    setCurrentUser((prev) => ({
      ...prev,
      walletBalance: Number((prev.walletBalance - price).toFixed(2)),
    }));
    setAnalytics((prev) => ({
      ...prev,
      totalRevenueUSD: prev.totalRevenueUSD + price,
      platformEarningsUSD: prev.platformEarningsUSD + fee,
      teacherPayoutsUSD: prev.teacherPayoutsUSD + (price - fee),
      totalBookings: prev.totalBookings + 1,
    }));

    setActiveCall(null);
  };

  const bookSession = (
    teacher: TeacherProfile,
    type: "text_chat" | "voice_call" | "video_call",
  ) => {
    const prices = {
      text_chat: teacher.halfHourRateChat,
      voice_call: teacher.halfHourRateVoice,
      video_call: teacher.hourlyRateVideo,
    };
    const dur = type === "video_call" ? 60 : 30;
    const total = prices[type];
    const fee = Number(
      (total * (adminSettings.commissionPercentage / 100)).toFixed(2),
    );
    const payout = Number((total - fee).toFixed(2));

    if (currentUser.walletBalance < total) {
      alert("Insufficient funds in wallet. Please add funds.");
      return;
    }

    setCurrentUser((prev) => ({
      ...prev,
      walletBalance: Number((prev.walletBalance - total).toFixed(2)),
    }));

    const newBooking: SessionBooking = {
      id: `b_${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.fullName,
      studentAvatar: currentUser.avatarUrl,
      teacherId: teacher.id,
      teacherName: teacher.fullName,
      teacherAvatar: teacher.avatarUrl,
      sessionType: type,
      durationMinutes: dur,
      totalPrice: total,
      platformFee: fee,
      teacherPayout: payout,
      status: "scheduled",
      scheduledStartTime: "Tomorrow, 3:00 PM",
      createdAt: "Just now",
    };

    setBookings((prev) => [newBooking, ...prev]);
    alert(
      `Successfully booked ${dur} mins ${type.replace("_", " ")} with ${teacher.fullName} for $${total}!`,
    );
    setActiveTab("sessions");
  };

  const upgradeToPremium = () => {
    setCurrentUser((prev) => ({ ...prev, isPremium: true }));
    setIsPremiumModalOpen(false);
    alert(
      "Welcome to GlobalChat Premium! Unlimited AI translation and priority matching activated.",
    );
  };

  const addFunds = (amount: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      walletBalance: Number((prev.walletBalance + amount).toFixed(2)),
    }));
    alert(`Successfully added $${amount} via Stripe Encrypted Checkout!`);
  };

  const submitReport = (
    reportedUserId: string,
    reportedUserName: string,
    reason: AbuseReport["reason"],
    details: string,
  ) => {
    const newReport: AbuseReport = {
      id: `rep_${Date.now()}`,
      reporterId: currentUser.id,
      reporterName: currentUser.fullName,
      reportedUserId,
      reportedUserName,
      reason,
      details,
      status: "open",
      timestamp: "Just now",
      aiFraudConfidence: reason === "scam_attempt" ? 0.95 : 0.82,
    };
    setReports((prev) => [newReport, ...prev]);
    alert("Abuse report submitted to AI Moderation & Trust Protocol.");
  };

  const requestWithdrawal = (
    amount: number,
    method: "M-Pesa" | "Airtel Money" | "Bank Transfer",
    accountDetails: string,
  ) => {
    const newWd: WithdrawalRequest = {
      id: `wd_${Date.now()}`,
      teacherId: currentUser.id,
      teacherName: currentUser.fullName,
      amount,
      method,
      accountDetails,
      status: "pending",
      requestedAt: "Just now",
    };
    setWithdrawals((prev) => [newWd, ...prev]);
    alert(
      `Withdrawal request of $${amount} to ${method} submitted for processing!`,
    );
  };

  const approveTeacher = (teacherId: string) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId
          ? {
              ...t,
              verificationStatus: {
                ...t.verificationStatus,
                status: "approved",
              },
              badges: Array.from(new Set([...t.badges, "Verified"])),
            }
          : t,
      ),
    );
    alert("Teacher approved and 'Verified' badge assigned!");
  };

  const approveWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "processed" } : w)),
    );
    alert("Withdrawal marked as processed.");
  };

  const rejectWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "rejected" } : w)),
    );
    alert("Withdrawal rejected.");
  };

  const updateAdminSettings = async (settings: AdminSettings) => {
    try {
      const settingsRef = doc(db, "settings", "global");

      // Pseudo-encryption for sensitive fields before saving
      const encryptedSettings = {
        ...settings,
        stripeAccount: settings.stripeAccount
          ? btoa(settings.stripeAccount)
          : "",
        paypalEmail: settings.paypalEmail ? btoa(settings.paypalEmail) : "",
        bankDetails: settings.bankDetails ? btoa(settings.bankDetails) : "",
      };

      // Add audit log
      const auditLog = {
        changedBy: currentUser.fullName,
        changedById: currentUser.id,
        timestamp: new Date().toISOString(),
        action: "Updated Payment Settings",
      };

      await setDoc(settingsRef, {
        ...encryptedSettings,
        lastAuditLog: auditLog,
      });

      setAdminSettings(settings); // update local state with unencrypted values for viewing
      alert("Admin settings updated securely in Firestore.");
    } catch (e) {
      console.error("Failed to update settings", e);
      alert("Failed to update settings. Make sure you have admin rights.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        activeTab,
        setActiveTab,
        teachers,
        setTeachers,
        countries,
        selectedCountry,
        setSelectedCountry,
        searchQuery,
        setSearchQuery,
        filterLanguage,
        setFilterLanguage,
        minTrustScore,
        setMinTrustScore,
        favourites,
        toggleFavourite,
        activeChatTeacher,
        setActiveChatTeacher,
        chatMessages,
        sendMessage,
        activeCall,
        startCall,
        endCall,
        bookings,
        bookSession,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isPremiumModalOpen,
        setIsPremiumModalOpen,
        upgradeToPremium,
        addFunds,
        reports,
        submitReport,
        analytics,
        withdrawals,
        requestWithdrawal,
        approveTeacher,
        approveWithdrawal,
        rejectWithdrawal,
        adminSettings,
        updateAdminSettings,
        platformMode,
        setPlatformMode,
        selectedTeacherForDetail,
        setSelectedTeacherForDetail,
        targetLanguage,
        setTargetLanguage,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
