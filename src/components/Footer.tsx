import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_DIRECT_URL, WHATSAPP_DISPLAY_NUMBER } from './WhatsAppContactButton';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-base">
            T
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            Textocode Academy
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm sm:text-base font-medium text-slate-300">
          Learn. Build. Grow with AI.
        </p>

        {/* Contact Us on WhatsApp */}
        <div className="pt-2 pb-2">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-3 sm:px-6 sm:py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm">
            <span className="text-slate-300 font-medium">Have questions or need assistance?</span>
            <a
              href={WHATSAPP_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white font-extrabold shadow-sm transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: {WHATSAPP_DISPLAY_NUMBER}</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-500">
          <p>© 2026 Textocode Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
