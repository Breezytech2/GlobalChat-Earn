export type UserRole = "student" | "teacher" | "admin";

export type TeacherLevel = "New Teacher" | "Trusted Teacher" | "Cultural Ambassador" | "Global Mentor";

export type TeacherBadge = 
  | "Verified" 
  | "Native Speaker" 
  | "Diploma" 
  | "Degree" 
  | "Master's" 
  | "PhD" 
  | "Top Rated Teacher"
  | "Premium";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl: string;
  country: string;
  city: string;
  phone: string;
  isVerified: boolean;
  isPremium: boolean;
  walletBalance: number; // in USD
  totalEarnings?: number;
  trustScore: number; // 0 to 100
  createdAt: string;
  twoFactorEnabled: boolean;
}

export interface TeacherVerificationStatus {
  govtIdSubmitted: boolean;
  govtIdApproved: boolean;
  selfieSubmitted: boolean;
  selfieApproved: boolean;
  phoneVerified: boolean;
  emailVerified: boolean;
  status: "unverified" | "pending" | "approved" | "rejected";
  submittedAt?: string;
  rejectionReason?: string;
}

export interface TeacherReview {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentCountry: string;
  ratingKnowledge: number;
  ratingCommunication: number;
  ratingFriendliness: number;
  ratingTeachingQuality: number;
  ratingOverall: number;
  comment: string;
  createdAt: string;
  teacherResponse?: string;
}

export interface CulturalResource {
  id: string;
  teacherId: string;
  title: string;
  description: string;
  type: "pdf" | "image" | "guide";
  fileUrl: string;
  country: string;
  downloadsCount: number;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl: string;
  country: string;
  countryFlag: string;
  city: string;
  nativeLanguage: string;
  languagesSpoken: string[];
  culturalExpertise: string[];
  bio: string;
  interests: string[];
  level: TeacherLevel;
  badges: TeacherBadge[];
  rating: number;
  reviewCount: number;
  sessionCount: number;
  responseTimeMinutes: number;
  hourlyRateVideo: number; // default $10
  halfHourRateVoice: number; // default $5
  halfHourRateChat: number; // default $2
  isOnline: boolean;
  verificationStatus: TeacherVerificationStatus;
  reviews: TeacherReview[];
  resources: CulturalResource[];
}

export interface CountryTradition {
  title: string;
  description: string;
  imageUrl: string;
}

export interface CountryInfo {
  code: string;
  name: string;
  flagEmoji: string;
  continent: string;
  capital: string;
  population: string;
  primaryLanguages: string[];
  popularTraditions: CountryTradition[];
  signatureFood: { name: string; desc: string; icon: string }[];
  touristAttractions: { name: string; city: string; desc: string }[];
  culturalSummary: string;
  activeTeachersCount: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  type: "text" | "voice" | "image" | "pdf" | "system";
  content: string;
  fileUrl?: string;
  fileName?: string;
  translatedContent?: Record<string, string>; // language -> string
  timestamp: string;
  isRead: boolean;
  isFlaggedByAI?: boolean;
}

export interface SessionBooking {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  sessionType: "text_chat" | "voice_call" | "video_call";
  durationMinutes: number;
  totalPrice: number; // student pays
  platformFee: number; // 15%
  teacherPayout: number; // 85%
  status: "scheduled" | "active" | "completed" | "cancelled" | "disputed";
  scheduledStartTime: string;
  createdAt: string;
  rating?: number;
}

export interface ActiveCallState {
  bookingId: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  studentId: string;
  studentName: string;
  sessionType: "voice_call" | "video_call";
  elapsedSeconds: number;
  currentEarnings: number;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  isPiPMode: boolean;
  subtitles: string[];
}

export interface WithdrawalRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  amount: number;
  method: "M-Pesa" | "Airtel Money" | "Bank Transfer";
  accountDetails: string;
  status: "pending" | "processed" | "rejected";
  requestedAt: string;
}

export interface AbuseReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  reason: "toxic_language" | "scam_attempt" | "harassment" | "fake_identity" | "other";
  details: string;
  status: "open" | "resolved" | "dismissed";
  timestamp: string;
  aiFraudConfidence?: number;
}

export interface AdminSettings {
  commissionPercentage: number;
  mpesaPaybill: string;
  mpesaTill: string;
  mpesaPhone: string;
  airtelMoney: string;
  stripeAccount: string;
  paypalEmail: string;
  bankDetails: string;
}

export interface PlatformAnalytics {
  totalRevenueUSD: number;
  platformEarningsUSD: number;
  teacherPayoutsUSD: number;
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  totalBookings: number;
  activeCountriesCount: number;
  topLanguages: { language: string; sessions: number }[];
  retentionRate: string;
}
