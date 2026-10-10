import React from 'react';
import { ArrowRight, Sparkles, Calendar, ShieldCheck } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

interface FinalCTAProps {
  onRegisterClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-blue-50/40 to-blue-100/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Complimentary Masterclass</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
          Ready to Discover What You Can Build with AI?
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Join our free live training and learn how AI can help you create a website and explore AI agents for your business.
        </p>

        {/* Countdown Timer */}
        <div className="mb-10">
          <CountdownTimer label="Seats Filling Fast • Event Starts In:" />
        </div>

        {/* Button */}
        <div className="max-w-md mx-auto mb-8">
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-lg tracking-wide shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-3 group"
          >
            <span>REGISTER FOR FREE</span>
            <ArrowRight className="w-5 h-5 text-sky-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Reminders */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>October 14, 2026</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Free • Beginner Friendly</span>
          </div>
        </div>
      </div>
    </section>
  );
};
