import React from "react";
import { useApp } from "../context/AppContext";
import { TeacherProfile } from "../types";
import { Search, Filter, Star, ShieldCheck, Sparkles, MessageSquare, Phone, Video, Bookmark, ChevronRight, ChevronLeft, ArrowUpRight, DollarSign, Award } from "lucide-react";

export const DiscoveryFeed: React.FC = () => {
  const { 
    teachers, 
    countries, 
    searchQuery, 
    setSearchQuery, 
    filterLanguage, 
    setFilterLanguage, 
    minTrustScore, 
    setMinTrustScore,
    favourites,
    toggleFavourite,
    setActiveChatTeacher,
    startCall,
    bookSession,
    currentUser,
    setIsPremiumModalOpen,
    setActiveTab,
    setSelectedTeacherForDetail
  } = useApp();

  const [selectedCountryFilter, setSelectedCountryFilter] = React.useState<string>("All");
  const [maxPriceFilter, setMaxPriceFilter] = React.useState<number>(25);

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.languagesSpoken.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLang = filterLanguage === "All" || t.languagesSpoken.includes(filterLanguage);
    const matchesCountry = selectedCountryFilter === "All" || t.country === selectedCountryFilter;
    const matchesPrice = t.hourlyRateVideo <= maxPriceFilter;
    const matchesScore = (t.rating * 20) >= minTrustScore;
    return matchesSearch && matchesLang && matchesCountry && matchesPrice && matchesScore;
  });

  const featuredTeacher = teachers[0];

  const languagesList = ["All", "English", "Spanish", "Japanese", "French", "Swahili", "German", "Korean", "Portuguese"];
  const countryList = ["All", "Kenya", "Japan", "Brazil", "Germany", "South Korea", "France"];

  return (
    <div className="flex-1 flex overflow-hidden w-full h-full text-white bg-[black]">
      {/* Left Panel: Discovery Sidebar */}
      <aside className="w-72 bg-[#09090b] p-6 border-r border-white/5 flex flex-col gap-6 overflow-y-auto hidden md:flex flex-shrink-0 select-none">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-[white] font-bold mb-4 flex items-center gap-1.5">
            🌍 Country Explorer
          </h3>
          <div className="space-y-2.5">
            {countries.slice(0, 4).map(c => (
              <div 
                key={c.code}
                onClick={() => { setSelectedCountryFilter(c.name); }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${selectedCountryFilter === c.name ? "bg-[white]/20 border-[white]" : "bg-white/5 border-white/10 hover:bg-[white]/10 hover:border-[white]/30"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flagEmoji}</span>
                  <span className="text-sm font-medium">{c.name}</span>
                </div>
                <span className="text-[10px] text-white/40 uppercase font-bold">{c.activeTeachersCount} Tutors</span>
              </div>
            ))}
            <button 
              onClick={() => setActiveTab("explorer")}
              className="w-full text-center text-xs text-[white] hover:underline pt-1 block font-semibold"
            >
              Open Interactive World Map &rarr;
            </button>
          </div>
        </div>

        {/* Filters */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-[white] font-bold mb-4">🔍 Precision Filters</h3>
          <div className="space-y-4 text-xs">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search tutor, culture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[white]"
              />
            </div>

            {/* Language */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-white/40 uppercase font-bold">Target Language</label>
              <select 
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="bg-[#18181b] border border-white/10 rounded-lg p-2 text-sm text-white/80 focus:outline-none focus:border-[white]"
              >
                {languagesList.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-white/40 uppercase font-bold">Country of Origin</label>
              <select 
                value={selectedCountryFilter}
                onChange={(e) => setSelectedCountryFilter(e.target.value)}
                className="bg-[#18181b] border border-white/10 rounded-lg p-2 text-sm text-white/80 focus:outline-none focus:border-[white]"
              >
                {countryList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Max Hourly rate */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] text-white/40 uppercase font-bold">
                <span>Max Video Rate</span>
                <span className="text-[white]">${maxPriceFilter}/hr</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="accent-[white] w-full" 
              />
            </div>

            {/* Min Trust score */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] text-white/40 uppercase font-bold">
                <span>Min Trust Score</span>
                <span className="text-[white]">{minTrustScore}%</span>
              </div>
              <input 
                type="range" 
                min="60" 
                max="100" 
                value={minTrustScore}
                onChange={(e) => setMinTrustScore(Number(e.target.value))}
                className="accent-[white] w-full" 
              />
            </div>
          </div>
        </div>

        {/* Premium Promo */}
        <div className="mt-auto bg-gradient-to-br from-[white]/20 to-[#18181b] p-4 rounded-2xl border border-[white]/30">
          <p className="text-xs font-bold text-[white] uppercase mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Earning Guarantee
          </p>
          <p className="text-xs mb-3 text-white/90 leading-relaxed">
            Teachers earn 85% payout. Students learn verified culture with zero dating noise.
          </p>
          <button 
            onClick={() => setIsPremiumModalOpen(true)}
            className="w-full py-2 bg-[white] text-[black] rounded-lg text-xs font-bold shadow-lg shadow-[white]/20 hover:opacity-90 active:scale-95 transition-all"
          >
            Explore Premium
          </button>
        </div>
      </aside>

      {/* Central Panel: Featured Teacher & Feed */}
      <section className="flex-1 bg-[#18181b] p-6 md:p-8 overflow-y-auto h-full min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">
              <span className="font-bold italic">Cultural Ambassadors</span> for you
            </h2>
            <p className="text-xs text-white/60 mt-1">
              Connect with government-verified native speakers. Text chat ($2/30m), Voice call ($5/30m), Video call ($10/hr).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => { setFilterLanguage("All"); setSelectedCountryFilter("All"); setSearchQuery(""); }}
              className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-[white] font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Main Featured Hero Profile Card */}
        {featuredTeacher && (
          <div className="relative bg-gradient-to-br from-[#112240] to-[#0A192F] rounded-[32px] border border-white/10 overflow-hidden h-[420px] md:h-[460px] group mb-8 shadow-2xl select-none">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('${featuredTeacher.avatarUrl}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[black] via-[black]/60 to-transparent"></div>
            
            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              <span className="bg-[white] text-[black] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-[white]/30">
                <Award className="w-3 h-3" /> {featuredTeacher.level}
              </span>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20 text-green-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Govt ID Verified
              </span>
              <span className="bg-blue-600/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-400/30 text-white">
                🗣️ Native {featuredTeacher.nativeLanguage}
              </span>
            </div>

            <div className="absolute top-6 right-6">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavourite(featuredTeacher.id); }}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all"
              >
                <Star className={`w-5 h-5 ${favourites.includes(featuredTeacher.id) ? "fill-[white] text-[white]" : "text-white"}`} />
              </button>
            </div>

            {/* Hero Card Bottom Info */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-xl">
                  <h3 className="text-3xl md:text-5xl font-bold mb-2 flex items-center gap-3">
                    {featuredTeacher.fullName} {featuredTeacher.countryFlag}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 mb-3 font-light italic">
                    {featuredTeacher.city}, {featuredTeacher.country} • Spoken: {featuredTeacher.languagesSpoken.join(", ")}
                  </p>
                  <p className="text-xs text-white/70 line-clamp-2 mb-4 bg-black/30 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                    "{featuredTeacher.bio}"
                  </p>

                  <div className="flex flex-wrap gap-6 items-center text-xs md:text-sm">
                    <div className="flex flex-col">
                      <span className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Sessions</span>
                      <span className="font-semibold">{featuredTeacher.sessionCount}+</span>
                    </div>
                    <div className="w-px h-7 bg-white/15"></div>
                    <div className="flex flex-col">
                      <span className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Trust Score</span>
                      <span className="font-bold text-[white]">99.8%</span>
                    </div>
                    <div className="w-px h-7 bg-white/15"></div>
                    <div className="flex flex-col">
                      <span className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Rating</span>
                      <span className="font-semibold text-yellow-400 flex items-center gap-1">
                        ★ {featuredTeacher.rating} ({featuredTeacher.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hero Action Buttons */}
                <div className="flex lg:flex-col gap-3 flex-wrap">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 rounded-2xl flex items-center justify-between gap-4">
                    <span className="text-[11px] text-white/60 uppercase font-bold tracking-tight">Video Rate</span>
                    <span className="text-xl font-bold text-[white]">${featuredTeacher.hourlyRateVideo}.00 <span className="text-[10px] text-white/40">/hr</span></span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedTeacherForDetail(featuredTeacher)}
                      className="flex-1 px-5 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-2"
                    >
                      Full Profile
                    </button>
                    <button 
                      onClick={() => bookSession(featuredTeacher, "video_call")}
                      className="flex-1 px-6 py-3.5 bg-[white] hover:bg-[#e4e4e7] text-[black] font-bold rounded-2xl shadow-xl active:scale-95 transition-all text-xs flex items-center justify-center gap-1.5"
                    >
                      <Video className="w-4 h-4" /> Book Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tutors Grid */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight">Available Teachers ({filteredTeachers.length})</h3>
          <span className="text-xs text-white/50">85% Earnings pass directly to teachers</span>
        </div>

        {filteredTeachers.length === 0 ? (
          <div className="text-center py-16 bg-[#09090b] rounded-2xl border border-white/5">
            <p className="text-lg text-white/60 mb-2">No teachers matched your exact criteria.</p>
            <button 
              onClick={() => { setFilterLanguage("All"); setSelectedCountryFilter("All"); setSearchQuery(""); }}
              className="text-xs px-4 py-2 bg-[white] text-[black] font-bold rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeachers.map(t => (
              <TeacherCard 
                key={t.id} 
                teacher={t} 
                isFav={favourites.includes(t.id)}
                onFav={() => toggleFavourite(t.id)}
                onChat={() => setActiveChatTeacher(t)}
                onCall={() => startCall(t, "video_call")}
                onBook={() => bookSession(t, "video_call")}
                onDetail={() => setSelectedTeacherForDetail(t)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Right Panel: Status & Activity */}
      <aside className="w-80 bg-[#09090b] p-6 border-l border-white/5 flex flex-col gap-6 overflow-y-auto hidden lg:flex flex-shrink-0 select-none">
        {/* Wallet Balance */}
        <div className="bg-[#18181b] p-6 rounded-[24px] border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[11px] font-bold text-[white] uppercase tracking-widest">Student Wallet</h4>
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-mono border border-green-500/30">
              ● ACTIVE
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold tracking-tight">${currentUser.walletBalance.toFixed(2)}</span>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-[white]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <button 
            onClick={() => setActiveTab("earnings")}
            className="w-full py-2.5 bg-[white] hover:bg-[#e4e4e7] text-[black] rounded-xl text-xs font-bold transition-all shadow-md"
          >
            + Add Funds via Stripe
          </button>
        </div>

        {/* Quick Pricing Protocol Box */}
        <div className="bg-white/[0.03] p-4 rounded-[20px] border border-white/10 text-xs space-y-2.5">
          <p className="text-[10px] uppercase tracking-wider text-[white] font-bold">Standard Platform Rates</p>
          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-white/70 flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-blue-400" /> Text Chat</span>
            <span className="font-semibold">$2 / 30 mins</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-white/70 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-green-400" /> Voice Call</span>
            <span className="font-semibold">$5 / 30 mins</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-white/70 flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-purple-400" /> Video Call</span>
            <span className="font-semibold">$10 / hour</span>
          </div>
          <p className="text-[10px] text-white/40 italic pt-1">
            * 15% Platform commission. Teachers receive 85% directly to M-Pesa or Bank.
          </p>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[11px] font-bold text-white/80 uppercase tracking-widest">Recent Sessions</h4>
            <span onClick={() => setActiveTab("sessions")} className="text-[10px] text-[white] font-bold cursor-pointer hover:underline">
              View All
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">Swahili Chat: Amina</p>
                <p className="text-[10px] text-white/40">Yesterday • 30 mins</p>
              </div>
              <span className="text-xs font-mono text-white/70">-$2.00</span>
            </div>
            <div className="flex gap-3 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
              <div className="w-9 h-9 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">Video Session: Kenjiro</p>
                <p className="text-[10px] text-white/40">Aug 12 • 1 Hour</p>
              </div>
              <span className="text-xs font-mono text-white/70">-$10.00</span>
            </div>
          </div>
        </div>

        {/* Trust Badges Footer */}
        <div className="mt-auto p-5 border border-dashed border-white/10 rounded-[24px] bg-white/[0.01] text-center">
          <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-3">
            Enterprise Payment Security
          </p>
          <div className="flex justify-center items-center gap-6 opacity-40 grayscale">
            <span className="font-bold tracking-wider text-sm">STRIPE</span>
            <span className="font-bold tracking-wider text-sm">VISA</span>
            <span className="font-bold tracking-wider text-sm">M-PESA</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

interface TeacherCardProps {
  teacher: TeacherProfile;
  isFav: boolean;
  onFav: () => void;
  onChat: () => void;
  onCall: () => void;
  onBook: () => void;
  onDetail: () => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, isFav, onFav, onChat, onCall, onBook, onDetail }) => {
  return (
    <div 
      onClick={onDetail}
      className="bg-[#09090b] rounded-[24px] border border-white/10 p-5 hover:border-[white]/50 hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group select-none"
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative">
            <img src={teacher.avatarUrl} alt={teacher.fullName} className="w-14 h-14 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform" />
            {teacher.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#09090b]" title="Online Now"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-base truncate text-white group-hover:text-[white] transition-colors">{teacher.fullName}</h4>
              <span className="text-base">{teacher.countryFlag}</span>
            </div>
            <p className="text-xs text-white/60 truncate">{teacher.city}, {teacher.country}</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-yellow-400 font-medium">
              ★ {teacher.rating.toFixed(2)} <span className="text-white/40">({teacher.reviewCount} reviews)</span>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onFav(); }}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <Star className={`w-4 h-4 ${isFav ? "fill-[white] text-[white]" : "text-white/40"}`} />
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] bg-[white]/15 text-[white] px-2 py-0.5 rounded-md font-semibold border border-[white]/30">
            {teacher.level}
          </span>
          <span className="text-[10px] bg-green-500/15 text-green-300 px-2 py-0.5 rounded-md font-medium border border-green-500/20">
            ✓ ID Verified
          </span>
          <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-md font-medium">
            Native {teacher.nativeLanguage}
          </span>
        </div>

        {/* Bio */}
        <p className="text-xs text-white/70 line-clamp-3 mb-4 leading-relaxed">
          {teacher.bio}
        </p>
      </div>

      {/* Rates & Actions */}
      <div className="pt-3 border-t border-white/5 space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Text Chat / Video Rate:</span>
          <span className="font-bold text-[white]">${teacher.halfHourRateChat}/30m • ${teacher.hourlyRateVideo}/hr</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={onChat}
            className="py-2 px-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-white/90"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> Chat
          </button>
          <button 
            onClick={onCall}
            className="py-2 px-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-white/90"
          >
            <Video className="w-3.5 h-3.5 text-purple-400" /> Call
          </button>
          <button 
            onClick={onBook}
            className="py-2 px-2 bg-[white] hover:bg-[#e4e4e7] text-[black] rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};
