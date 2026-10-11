import React from 'react';
import { Sparkles, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { navigateTo } from '../navigation';
import { WHATSAPP_DIRECT_URL, WHATSAPP_DISPLAY_NUMBER } from './WhatsAppContactButton';

interface HeaderProps {
  isAlreadyRegistered?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAlreadyRegistered }) => {
  const handleCtaClick = () => {
    if (isAlreadyRegistered) {
      navigateTo('/thankyou');
    } else {
      navigateTo('/register');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => navigateTo('/')}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            T
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
              Textocode <span className="text-blue-600">Academy</span>
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase block">
              Live AI Masterclass
            </span>
          </div>
        </button>

        {/* Live Date Indicator & CTA & WhatsApp Contact */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={WHATSAPP_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
            title={`Contact us on WhatsApp: ${WHATSAPP_DISPLAY_NUMBER}`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
            <span>WhatsApp: {WHATSAPP_DISPLAY_NUMBER}</span>
          </a>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>October 14, 2026</span>
          </div>

          <button
            onClick={handleCtaClick}
            className={`inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-200 cursor-pointer ${
              isAlreadyRegistered
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30'
            }`}
          >
            {isAlreadyRegistered ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>My Registration</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-sky-200" />
                <span>Register Free</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
