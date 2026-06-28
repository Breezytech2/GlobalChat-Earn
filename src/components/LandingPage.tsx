import React from "react";
import { useApp } from "../context/AppContext";
import {
  Globe,
  Video,
  MessageSquare,
  Globe2,
  Sparkles,
  Shield,
  ChevronRight,
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const { setActiveTab, setIsAuthModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-zinc-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="/favicon.png"
                alt="GlobalChat"
                className="w-8 h-8 rounded-lg object-contain bg-white"
              />
              <span className="text-xl font-bold tracking-tight">
                GlobalChat
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
              <a href="#" className="hover:text-white transition-colors">
                Tutors
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Students
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Business
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Learn
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors hidden sm:block"
            >
              Log in
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Start now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black -z-10" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]">
              Connect without <br />
              <span className="text-zinc-500">limits</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
              Generate high-quality language sessions from simple chats or
              custom video calls, tailored to your learning goals and built to
              scale across cultures, languages, and use cases.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Start now
              </button>
              <button className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-lg border border-white/10 hover:bg-zinc-800 transition-all">
                Learn more
              </button>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-white/5 bg-zinc-950 flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <div className="relative z-10 p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Instant AI Translation
              </h3>
              <p className="text-zinc-400 text-sm">
                Speak any language seamlessly with real-time translation and
                native tutors around the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section Copy */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black -z-10" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]">
              Connect without <br />
              <span className="text-zinc-500">limits</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
              Generate high-quality language sessions from simple chats or
              custom video calls, tailored to your learning goals and built to
              scale across cultures, languages, and use cases.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab("discovery")}
                className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Start now
              </button>
              <button className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-lg border border-white/10 hover:bg-zinc-800 transition-all">
                Learn more
              </button>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-white/5 bg-zinc-950 flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <div className="relative z-10 p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Instant AI Translation
              </h3>
              <p className="text-zinc-400 text-sm">
                Speak any language seamlessly with real-time translation and
                native tutors around the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-medium tracking-tight mb-4">
              The GlobalChat platform built for scale
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              See how language learners and cultural enthusiasts use
              GlobalChat's real-time tools to scale communication and reduce
              barriers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group rounded-2xl bg-black border border-white/5 overflow-hidden hover:border-white/20 transition-all cursor-pointer flex flex-col">
              <div className="h-48 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Bring conversations into motion
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 flex-1">
                  Turn static text ideas into dynamic video content with
                  high-quality tutors designed for storytelling and cultural
                  experiences.
                </p>
                <div className="flex items-center text-sm font-bold hover:text-zinc-300">
                  See case study <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl bg-black border border-white/5 overflow-hidden hover:border-white/20 transition-all cursor-pointer flex flex-col">
              <div className="h-48 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Learn with precision</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 flex-1">
                  Edit and refine your language skills while preserving the
                  elements that matter. Improve pronunciation, grammar, and
                  intent without starting over.
                </p>
                <div className="flex items-center text-sm font-bold hover:text-zinc-300">
                  See case study <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl bg-black border border-white/5 overflow-hidden hover:border-white/20 transition-all cursor-pointer flex flex-col">
              <div className="h-48 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Elevate fluency at any scale
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 flex-1">
                  Boost confidence and clarity without sacrificing detail,
                  preparing yourself for international business, travel, and
                  professional delivery.
                </p>
                <div className="flex items-center text-sm font-bold hover:text-zinc-300">
                  See case study <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid 2 */}
      <section className="py-24 px-6 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-medium tracking-tight mb-4">
              Expand your horizons globally
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Discover how connecting with global tutors can transform your
              understanding of different cultures and perspectives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 4 */}
            <div className="group rounded-2xl bg-black border border-white/5 overflow-hidden hover:border-white/20 transition-all cursor-pointer flex flex-col">
              <div className="h-48 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Immersive Experiences</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 flex-1">
                  Dive deep into the culture with immersive sessions that bring
                  you closer to native speakers.
                </p>
                <div className="flex items-center text-sm font-bold hover:text-zinc-300">
                  See case study <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-2xl bg-black border border-white/5 overflow-hidden hover:border-white/20 transition-all cursor-pointer flex flex-col">
              <div className="h-48 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Safe and Secure</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 flex-1">
                  Connect confidently with verified tutors in a moderated and
                  secure platform designed for your safety.
                </p>
                <div className="flex items-center text-sm font-bold hover:text-zinc-300">
                  See case study <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-2xl bg-black border border-white/5 overflow-hidden hover:border-white/20 transition-all cursor-pointer flex flex-col">
              <div className="h-48 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Community Driven</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-6 flex-1">
                  Join a vibrant community of language learners to practice,
                  share insights, and grow together.
                </p>
                <div className="flex items-center text-sm font-bold hover:text-zinc-300">
                  See case study <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-32 px-6 text-center border-t border-white/5 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            Trusted by leading learners
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Millions of creators and the world's most innovative minds trust
            GlobalChat's language tools to connect with speed, polish, and
            control.
          </p>
          <button
            onClick={() => setActiveTab("discovery")}
            className="px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Start connecting
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <Globe className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold">GlobalChat</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>

          <div className="text-sm text-zinc-600">
            © 2026 All Rights Reserved, GlobalChat Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};
