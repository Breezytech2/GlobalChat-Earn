import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { CountryInfo } from "../types";
import { Globe, Users, Utensils, MapPin, Sparkles, ChevronRight, ArrowLeft } from "lucide-react";

export const CountryExplorer: React.FC = () => {
  const { countries, teachers, setActiveTab, setFilterLanguage, setSelectedTeacherForDetail } = useApp();
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("KE");

  const activeCountry = countries.find(c => c.code === selectedCountryCode) || countries[0];
  const countryTeachers = teachers.filter(t => t.country.toLowerCase() === activeCountry.name.toLowerCase());

  return (
    <div className="flex-1 bg-[black] text-white p-6 md:p-8 overflow-y-auto w-full h-full select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab("discovery")}
              className="p-2 bg-[#09090b] hover:bg-white/10 rounded-xl border border-white/10 text-white/70 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
                🗺️ Interactive Country Explorer
              </h2>
              <p className="text-xs md:text-sm text-white/60 mt-1">
                Click any region on the world map to discover authentic traditions, signature gastronomy, and local tutors.
              </p>
            </div>
          </div>
        </div>

        {/* World Map Continent Pills Selector (Interactive Map Simulator) */}
        <div className="bg-[#09090b] p-6 rounded-[32px] border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-widest text-[white]">Select Region on Globe</span>
            <span className="text-xs font-mono text-white/40">GEO_SYNC: ACTIVE</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {countries.map(c => (
              <button
                key={c.code}
                onClick={() => setSelectedCountryCode(c.code)}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${selectedCountryCode === c.code ? "bg-gradient-to-br from-[white] to-[#B8860B] text-[black] font-bold border-white shadow-lg scale-105" : "bg-[#18181b] border-white/10 text-white/80 hover:bg-white/10"}`}
              >
                <span className="text-4xl">{c.flagEmoji}</span>
                <span className="text-sm font-semibold">{c.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${selectedCountryCode === c.code ? "bg-black/20 text-[black]" : "bg-white/5 text-[white]"}`}>
                  {c.activeTeachersCount} Tutors
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Country Detail Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 cols: Cultural Dossier */}
          <div className="lg:col-span-2 space-y-8">
            {/* Country Banner Info */}
            <div className="bg-gradient-to-br from-[#18181b] to-[#09090b] p-8 rounded-[32px] border border-white/10 relative overflow-hidden shadow-xl space-y-6">
              <div className="absolute -right-10 -top-10 text-[180px] opacity-10 pointer-events-none select-none">
                {activeCountry.flagEmoji}
              </div>

              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-[white]">Cultural Profile</span>
                  <h3 className="text-4xl font-bold mt-1 flex items-center gap-3">
                    {activeCountry.name} {activeCountry.flagEmoji}
                  </h3>
                  <p className="text-sm text-white/60 mt-1">
                    Continent: {activeCountry.continent} • Capital: {activeCountry.capital} • Population: {activeCountry.population}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-right">
                  <span className="text-[10px] text-white/40 block uppercase">Spoken Languages</span>
                  <span className="text-sm font-bold text-[white]">{activeCountry.primaryLanguages.join(", ")}</span>
                </div>
              </div>

              <p className="text-sm text-white/90 leading-relaxed font-light">
                {activeCountry.culturalSummary}
              </p>

              {/* Traditions */}
              <div>
                <h4 className="text-sm uppercase tracking-widest font-bold text-[white] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Popular Traditions & Ceremonies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCountry.popularTraditions.map((trad, idx) => (
                    <div key={idx} className="bg-black/30 p-4 rounded-2xl border border-white/5 flex gap-4 items-start">
                      <img src={trad.imageUrl} alt={trad.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div>
                        <h5 className="font-bold text-sm text-white">{trad.title}</h5>
                        <p className="text-xs text-white/60 mt-1 line-clamp-3">{trad.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Gastronomy */}
              <div>
                <h4 className="text-sm uppercase tracking-widest font-bold text-[white] mb-4 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Signature Gastronomy
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCountry.signatureFood.map((food, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                      <span className="text-3xl p-2 bg-black/40 rounded-xl">{food.icon}</span>
                      <div>
                        <h5 className="font-bold text-sm">{food.name}</h5>
                        <p className="text-xs text-white/60 mt-0.5">{food.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tourist Landmarks */}
              <div>
                <h4 className="text-sm uppercase tracking-widest font-bold text-[white] mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Iconic Landmarks & Attractions
                </h4>
                <div className="space-y-3">
                  {activeCountry.touristAttractions.map((attr, idx) => (
                    <div key={idx} className="bg-white/[0.03] p-3.5 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">{attr.name}</span>
                        <span className="text-white/40 ml-2">({attr.city})</span>
                      </div>
                      <span className="text-white/70 italic">{attr.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Available Teachers in this Country */}
          <div className="space-y-6">
            <div className="bg-[#09090b] p-6 rounded-[32px] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h4 className="font-bold text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-[white]" /> {activeCountry.name} Tutors
                </h4>
                <span className="text-xs text-[white] font-mono">{countryTeachers.length} Available</span>
              </div>

              {countryTeachers.length === 0 ? (
                <div className="text-center py-12 text-white/50 text-xs">
                  No registered tutors in this specific test set. Search general global tutors.
                </div>
              ) : (
                <div className="space-y-4">
                  {countryTeachers.map(t => (
                    <div 
                      key={t.id}
                      onClick={() => setSelectedTeacherForDetail(t)}
                      className="bg-[#18181b] p-4 rounded-2xl border border-white/10 hover:border-[white] transition-all cursor-pointer group flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={t.avatarUrl} alt={t.fullName} className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0" />
                        <div className="min-w-0">
                          <h5 className="font-bold text-sm text-white group-hover:text-[white] truncate">{t.fullName}</h5>
                          <p className="text-[11px] text-white/60 truncate">{t.city} • ★ {t.rating}</p>
                          <span className="text-[10px] text-green-400 block mt-0.5">Verified Govt ID</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-bold text-[white]">${t.halfHourRateChat}/30m</span>
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[white] ml-auto mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button 
                onClick={() => { setFilterLanguage(activeCountry.primaryLanguages[0]); setActiveTab("discovery"); }}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all text-[white]"
              >
                Browse All {activeCountry.primaryLanguages[0]} Teachers &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
