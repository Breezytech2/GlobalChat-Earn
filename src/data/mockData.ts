import { TeacherProfile, CountryInfo, PlatformAnalytics, AbuseReport } from "../types";

export const MOCK_TEACHERS: TeacherProfile[] = [
  {
    id: "t1",
    userId: "u_teacher_1",
    fullName: "Amina Wanjiku",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    country: "Kenya",
    countryFlag: "🇰🇪",
    city: "Nairobi",
    nativeLanguage: "Swahili",
    languagesSpoken: ["Swahili", "English", "Kikuyu"],
    culturalExpertise: ["East African Business Etiquette", "Maasai Traditions", "Safari Eco-Tourism", "Kenyan Tea & Coffee Culture"],
    bio: "Habari! I am a certified language instructor and cultural historian in Nairobi. I love helping travelers and global professionals understand Kenyan customs, Swahili proverbs, and vibrant tech culture in Silicon Savannah.",
    interests: ["Afrobeats", "Wildlife Conservation", "Fintech (M-Pesa history)", "Cooking Pilau"],
    level: "Global Mentor",
    badges: ["Verified", "Native Speaker", "Master's", "Top Rated Teacher"],
    rating: 4.98,
    reviewCount: 142,
    sessionCount: 380,
    responseTimeMinutes: 4,
    hourlyRateVideo: 10,
    halfHourRateVoice: 5,
    halfHourRateChat: 2,
    isOnline: true,
    verificationStatus: {
      govtIdSubmitted: true,
      govtIdApproved: true,
      selfieSubmitted: true,
      selfieApproved: true,
      phoneVerified: true,
      emailVerified: true,
      status: "approved"
    },
    reviews: [
      {
        id: "r1",
        studentId: "s1",
        studentName: "Liam O'Connor",
        studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        studentCountry: "Ireland",
        ratingKnowledge: 5,
        ratingCommunication: 5,
        ratingFriendliness: 5,
        ratingTeachingQuality: 5,
        ratingOverall: 5,
        comment: "Amina prepared me perfectly for my NGO assignment in Mombasa. Her explanation of Swahili polite greetings and workplace etiquette was invaluable!",
        createdAt: "2 days ago",
        teacherResponse: "Asante sana Liam! You are going to do amazing work in coastal Kenya."
      }
    ],
    resources: [
      {
        id: "res1",
        teacherId: "t1",
        title: "Essential Swahili Survival Phrases for Travelers.pdf",
        description: "Comprehensive 8-page guide covering airport customs, market bargaining, and respectful slang.",
        type: "pdf",
        fileUrl: "#",
        country: "Kenya",
        downloadsCount: 340
      }
    ]
  },
  {
    id: "t2",
    userId: "u_teacher_2",
    fullName: "Kenjiro Takahashi",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    country: "Japan",
    countryFlag: "🇯🇵",
    city: "Kyoto",
    nativeLanguage: "Japanese",
    languagesSpoken: ["Japanese", "English"],
    culturalExpertise: ["Kyoto Tea Ceremony", "Business Keigo (Polite Speech)", "Anime & Manga Nuances", "Traditional Shinto Architecture"],
    bio: "Konnichiwa! I live in historic Kyoto. Whether you want to master Japanese conversational flow for a trip to Tokyo or understand business honorifics before meeting Japanese partners, I am here to mentor you.",
    interests: ["Calligraphy", "Matcha Crafting", "Studio Ghibli", "High-speed rail design"],
    level: "Cultural Ambassador",
    badges: ["Verified", "Native Speaker", "Degree", "Top Rated Teacher"],
    rating: 4.95,
    reviewCount: 98,
    sessionCount: 260,
    responseTimeMinutes: 10,
    hourlyRateVideo: 12,
    halfHourRateVoice: 6,
    halfHourRateChat: 2.5,
    isOnline: true,
    verificationStatus: {
      govtIdSubmitted: true,
      govtIdApproved: true,
      selfieSubmitted: true,
      selfieApproved: true,
      phoneVerified: true,
      emailVerified: true,
      status: "approved"
    },
    reviews: [
      {
        id: "r2",
        studentId: "s2",
        studentName: "Elena Rostova",
        studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        studentCountry: "Spain",
        ratingKnowledge: 5,
        ratingCommunication: 5,
        ratingFriendliness: 5,
        ratingTeachingQuality: 5,
        ratingOverall: 5,
        comment: "Kenjiro taught me how to order food and navigate Ryokan etiquette seamlessly. Best cultural tutor ever!",
        createdAt: "1 week ago"
      }
    ],
    resources: []
  },
  {
    id: "t3",
    userId: "u_teacher_3",
    fullName: "Mateo Silva",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    country: "Brazil",
    countryFlag: "🇧🇷",
    city: "Rio de Janeiro",
    nativeLanguage: "Portuguese",
    languagesSpoken: ["Portuguese", "Spanish", "English"],
    culturalExpertise: ["Brazilian Bossa Nova & Samba", "Carnaval Culture", "Football Slang", "Paulista vs Carioca Accents"],
    bio: "E aí! Born and raised in Rio. I teach authentic Brazilian Portuguese with energy and passion. We will chat about Brazilian literature, beach vibes, and practical tips for visiting South America.",
    interests: ["Capoeira", "Coffee roasting", "Football", "Street Photography"],
    level: "Trusted Teacher",
    badges: ["Verified", "Native Speaker", "Diploma"],
    rating: 4.91,
    reviewCount: 64,
    sessionCount: 155,
    responseTimeMinutes: 7,
    hourlyRateVideo: 10,
    halfHourRateVoice: 5,
    halfHourRateChat: 2,
    isOnline: false,
    verificationStatus: {
      govtIdSubmitted: true,
      govtIdApproved: true,
      selfieSubmitted: true,
      selfieApproved: true,
      phoneVerified: true,
      emailVerified: true,
      status: "approved"
    },
    reviews: [],
    resources: []
  },
  {
    id: "t4",
    userId: "u_teacher_4",
    fullName: "Dr. Sofia Müller",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    country: "Germany",
    countryFlag: "🇩🇪",
    city: "Munich",
    nativeLanguage: "German",
    languagesSpoken: ["German", "English", "French"],
    culturalExpertise: ["German Engineering Workplace Norms", "Bavarian Traditions", "Academic Writing in German", "European Union History"],
    bio: "Guten Tag! I hold a PhD in Linguistics from LMU Munich. I specialize in mentoring expats relocating to Germany and professionals preparing for C1 proficiency exams.",
    interests: ["Hiking the Alps", "Classical Music", "Philosophy", "Sustainable Tech"],
    level: "Global Mentor",
    badges: ["Verified", "Native Speaker", "PhD", "Top Rated Teacher"],
    rating: 5.0,
    reviewCount: 210,
    sessionCount: 520,
    responseTimeMinutes: 2,
    hourlyRateVideo: 15,
    halfHourRateVoice: 7.5,
    halfHourRateChat: 3,
    isOnline: true,
    verificationStatus: {
      govtIdSubmitted: true,
      govtIdApproved: true,
      selfieSubmitted: true,
      selfieApproved: true,
      phoneVerified: true,
      emailVerified: true,
      status: "approved"
    },
    reviews: [],
    resources: []
  },
  {
    id: "t5",
    userId: "u_teacher_5",
    fullName: "Ji-Woo Park",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    country: "South Korea",
    countryFlag: "🇰🇷",
    city: "Seoul",
    nativeLanguage: "Korean",
    languagesSpoken: ["Korean", "English", "Japanese"],
    culturalExpertise: ["K-Pop & K-Drama Idioms", "Modern Seoul Slang", "Korean Dining & Drinking Etiquette", "Hangul Rapid Mastery"],
    bio: "Annyeonghaseyo! I am a former TV broadcast journalist in Seoul. I make learning Korean fun, modern, and deeply connected to pop culture and social trends.",
    interests: ["K-Beauty", "Indie Music", "Café Hopping in Seongsu", "Street Fashion"],
    level: "Cultural Ambassador",
    badges: ["Verified", "Native Speaker", "Master's"],
    rating: 4.97,
    reviewCount: 88,
    sessionCount: 230,
    responseTimeMinutes: 5,
    hourlyRateVideo: 10,
    halfHourRateVoice: 5,
    halfHourRateChat: 2,
    isOnline: true,
    verificationStatus: {
      govtIdSubmitted: true,
      govtIdApproved: true,
      selfieSubmitted: true,
      selfieApproved: true,
      phoneVerified: true,
      emailVerified: true,
      status: "approved"
    },
    reviews: [],
    resources: []
  },
  {
    id: "t6",
    userId: "u_teacher_6",
    fullName: "Camille Laurent",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    country: "France",
    countryFlag: "🇫🇷",
    city: "Paris",
    nativeLanguage: "French",
    languagesSpoken: ["French", "English", "Italian"],
    culturalExpertise: ["French Art & Gastronomy", "Parisian Conversational Slang", "Diplomatic French", "Wine Region Traditions"],
    bio: "Bonjour! I teach authentic French with an emphasis on natural pronunciation and cultural charm. We will discuss literature, cinema, and how to live like a local in France.",
    interests: ["Baking Croissants", "Modern Art", "Literature", "Cinema"],
    level: "Trusted Teacher",
    badges: ["Verified", "Native Speaker", "Degree"],
    rating: 4.94,
    reviewCount: 72,
    sessionCount: 180,
    responseTimeMinutes: 6,
    hourlyRateVideo: 10,
    halfHourRateVoice: 5,
    halfHourRateChat: 2,
    isOnline: true,
    verificationStatus: {
      govtIdSubmitted: true,
      govtIdApproved: true,
      selfieSubmitted: true,
      selfieApproved: true,
      phoneVerified: true,
      emailVerified: true,
      status: "approved"
    },
    reviews: [],
    resources: []
  }
];

export const MOCK_COUNTRIES: CountryInfo[] = [
  {
    code: "KE",
    name: "Kenya",
    flagEmoji: "🇰🇪",
    continent: "Africa",
    capital: "Nairobi",
    population: "55.1 Million",
    primaryLanguages: ["Swahili", "English"],
    popularTraditions: [
      {
        title: "Maasai Adumu (Jumping Dance)",
        description: "A ceremonial warriors dance showcasing agility, strength, and community celebration.",
        imageUrl: "https://images.unsplash.com/photo-1516026974298-53154ec17c16?w=400&auto=format&fit=crop&q=80"
      },
      {
        title: "Harambee Spirit",
        description: "The national ethos of pulling together to support communal projects, education, and neighbors.",
        imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&auto=format&fit=crop&q=80"
      }
    ],
    signatureFood: [
      { name: "Nyama Choma", desc: "Roasted spiced meat served with Kachumbari salad.", icon: "🥩" },
      { name: "Ugali & Sukuma Wiki", desc: "Staple maize flour cake paired with sautéed collard greens.", icon: "🍲" }
    ],
    touristAttractions: [
      { name: "Maasai Mara National Reserve", city: "Narok", desc: "Home of the Great Wildebeest Migration." },
      { name: "Giraffe Centre & Karura Forest", city: "Nairobi", desc: "Urban wildlife sanctuaries and green lungs." }
    ],
    culturalSummary: "Kenya is the cradle of humanity and a powerhouse of East African technology. Known for warmth, hospitality, and breathtaking savannahs.",
    activeTeachersCount: 84
  },
  {
    code: "JP",
    name: "Japan",
    flagEmoji: "🇯🇵",
    continent: "Asia",
    capital: "Tokyo",
    population: "125.1 Million",
    primaryLanguages: ["Japanese"],
    popularTraditions: [
      {
        title: "Sadō (Tea Ceremony)",
        description: "A ritualized preparation and presentation of matcha promoting mindfulness and harmony.",
        imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&auto=format&fit=crop&q=80"
      },
      {
        title: "Hanami (Cherry Blossom Viewing)",
        description: "Spring gatherings under blooming sakura trees reflecting on the beauty and transience of life.",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&auto=format&fit=crop&q=80"
      }
    ],
    signatureFood: [
      { name: "Authentic Ramen & Tonkotsu", desc: "Rich simmered bone broth noodle bowls.", icon: "🍜" },
      { name: "Edomae Sushi", desc: "Fresh seasonal seafood prepared with seasoned vinegar rice.", icon: "🍣" }
    ],
    touristAttractions: [
      { name: "Fushimi Inari Shrine", city: "Kyoto", desc: "Thousands of vermilion torii gates winding up the mountain." },
      { name: "Shibuya Crossing", city: "Tokyo", desc: "The world's busiest and most iconic pedestrian intersection." }
    ],
    culturalSummary: "Japan seamlessly harmonizes ancient Shinto traditions with futuristic cyberpunk cities, impeccable craftsmanship, and mutual respect.",
    activeTeachersCount: 112
  },
  {
    code: "BR",
    name: "Brazil",
    flagEmoji: "🇧🇷",
    continent: "South America",
    capital: "Brasília",
    population: "216.4 Million",
    primaryLanguages: ["Portuguese"],
    popularTraditions: [
      {
        title: "Carnaval no Rio",
        description: "The world's largest festival featuring dazzling samba school parades and vibrant street blocos.",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80"
      }
    ],
    signatureFood: [
      { name: "Feijoada", desc: "Black bean stew with slow-cooked pork served with farofa and orange slices.", icon: "🍛" },
      { name: "Pão de Queijo", desc: "Crispy baked cheese rolls made from cassava flour.", icon: "🧀" }
    ],
    touristAttractions: [
      { name: "Christ the Redeemer", city: "Rio de Janeiro", desc: "Art Deco statue atop Mount Corcovado overlooking the bay." },
      { name: "Iguazu Falls", city: "Paraná", desc: "Majestic waterfall system spanning the border with Argentina." }
    ],
    culturalSummary: "Brazil is a vibrant tapestry of music, football, Amazonian biodiversity, and joyful warmth known as 'alegria de viver'.",
    activeTeachersCount: 95
  },
  {
    code: "DE",
    name: "Germany",
    flagEmoji: "🇩🇪",
    continent: "Europe",
    capital: "Berlin",
    population: "84.4 Million",
    primaryLanguages: ["German"],
    popularTraditions: [
      {
        title: "Weihnachtsmärkte (Christmas Markets)",
        description: "Festive winter town squares with Glühwein, handcrafted wooden toys, and Lebkuchen.",
        imageUrl: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=400&auto=format&fit=crop&q=80"
      }
    ],
    signatureFood: [
      { name: "Brezel & Currywurst", desc: "Iconic salted pretzels and spiced street sausage.", icon: "🥨" }
    ],
    touristAttractions: [
      { name: "Neuschwanstein Castle", city: "Bavaria", desc: "19th-century Romanesque Revival palace on a rugged hill." }
    ],
    culturalSummary: "Germany is the land of poets, thinkers, world-class environmental engineering, and vibrant creative freedom in Berlin.",
    activeTeachersCount: 76
  },
  {
    code: "KR",
    name: "South Korea",
    flagEmoji: "🇰🇷",
    continent: "Asia",
    capital: "Seoul",
    population: "51.7 Million",
    primaryLanguages: ["Korean"],
    popularTraditions: [
      {
        title: "Chuseok (Harvest Festival)",
        description: "Three-day thanksgiving holiday honoring ancestors with songpyeon rice cakes.",
        imageUrl: "https://images.unsplash.com/photo-1583200926410-63914a5113d8?w=400&auto=format&fit=crop&q=80"
      }
    ],
    signatureFood: [
      { name: "Kimchi & Bibimbap", desc: "Fermented napa cabbage and mixed rice bowls with gochujang.", icon: "🥬" }
    ],
    touristAttractions: [
      { name: "Gyeongbokgung Palace", city: "Seoul", desc: "Main royal palace of the Joseon dynasty." }
    ],
    culturalSummary: "South Korea is a global cultural trendsetter driving innovation in technology, cinema, music, and cuisine.",
    activeTeachersCount: 89
  }
];

export const MOCK_ANALYTICS: PlatformAnalytics = {
  totalRevenueUSD: 148920.50,
  platformEarningsUSD: 22338.07, // 15%
  teacherPayoutsUSD: 126582.43, // 85%
  dailyActiveUsers: 14250,
  monthlyActiveUsers: 342900,
  totalBookings: 28410,
  activeCountriesCount: 142,
  topLanguages: [
    { language: "English", sessions: 8420 },
    { language: "Spanish", sessions: 6120 },
    { language: "Japanese", sessions: 4890 },
    { language: "French", sessions: 3950 },
    { language: "Swahili", sessions: 2810 },
    { language: "Korean", sessions: 2220 },
  ],
  retentionRate: "78.4%"
};

export const MOCK_REPORTS: AbuseReport[] = [
  {
    id: "rep_1",
    reporterId: "s_99",
    reporterName: "David Chen",
    reportedUserId: "u_scam_88",
    reportedUserName: "Alex Crypto",
    reason: "scam_attempt",
    details: "Teacher asked me to wire money to his personal crypto wallet outside Stripe to avoid platform fees.",
    status: "open",
    timestamp: "10 mins ago",
    aiFraudConfidence: 0.96
  },
  {
    id: "rep_2",
    reporterId: "t_4",
    reporterName: "Dr. Sofia Müller",
    reportedUserId: "s_45",
    reportedUserName: "TrollUser22",
    reason: "toxic_language",
    details: "User sent rude insults during the first 5 minutes of text chat.",
    status: "open",
    timestamp: "2 hours ago",
    aiFraudConfidence: 0.88
  }
];
