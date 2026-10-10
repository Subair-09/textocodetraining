import React from 'react';
import { Calendar, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Clock, MonitorPlay } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-white">
      {/* Background radial accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/60 via-sky-50/40 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs mb-6 sm:mb-8 transition-transform hover:scale-105">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
          </span>
          <span className="text-xs sm:text-sm font-extrabold tracking-wide text-blue-800 uppercase">
            100% FREE LIVE TRAINING
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] sm:leading-[1.12] mb-6 sm:mb-8 max-w-4xl mx-auto">
          Learn How to Build a Website for Your Business Using AI —{' '}
          <span className="text-blue-600 relative inline-block">
            For FREE!
            <svg
              className="absolute -bottom-1.5 left-0 w-full h-3 text-sky-400/50"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,15 Q50,0 100,15 L100,20 Q50,5 0,20 Z" />
            </svg>
          </span>
        </h1>

        {/* Supporting Text */}
        <div className="text-base sm:text-lg lg:text-xl text-slate-600 space-y-4 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 text-balance">
          <p className="font-medium text-slate-800">
            Have you ever wanted to build a professional website for your business but didn't know where to start?
          </p>
          <p>
            Join <strong className="text-slate-900 font-semibold">Textocode Academy</strong> for a free live training where you'll discover how to use AI to create a website, even if you have no coding experience.
          </p>
          <p className="text-slate-600">
            I'll also demonstrate how AI agents work and how you can use them in your own business to answer customer questions, automate tasks, and improve customer service.
          </p>
        </div>

        {/* Date Highlight Card */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 border border-blue-200/80 rounded-2xl p-4 sm:px-8 sm:py-4 shadow-sm mb-8 sm:mb-10">
          <div className="flex items-center gap-3 text-blue-900">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                Training Date
              </span>
              <span className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                OCTOBER 14, 2026
              </span>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-blue-200"></div>

          <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1.5">
              <MonitorPlay className="w-4 h-4 text-blue-600" />
              Live Online
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              Interactive Q&A
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-700 font-bold bg-blue-100/70 px-2 py-0.5 rounded-md">
              $0 Registration
            </span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <button
            onClick={onRegisterClick}
            id="hero-register-btn"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 group"
          >
            <span>LEARN MORE &amp; REGISTER FOR FREE</span>
            <ArrowRight className="w-5 h-5 text-sky-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust & Reassurance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs sm:text-sm font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>100% Free Access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>No Coding Skills Needed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Real-World Business AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};
