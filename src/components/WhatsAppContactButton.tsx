import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppContactProps {
  phoneNumber?: string;
  className?: string;
  label?: string;
  variant?: 'floating' | 'inline' | 'button';
}

export const WHATSAPP_CONTACT_NUMBER = '+2347033968648';
export const WHATSAPP_DISPLAY_NUMBER = '+234 703 396 8648';
export const WHATSAPP_DIRECT_URL =
  'https://wa.me/2347033968648?text=Hello%20Textocode%20Academy%2C%20I%20have%20a%20question%20about%20the%20Free%20AI%20Training.';

export const WhatsAppContactButton: React.FC<WhatsAppContactProps> = ({
  className = '',
  label = 'Chat on WhatsApp',
  variant = 'floating',
}) => {
  if (variant === 'inline') {
    return (
      <a
        href={WHATSAPP_DIRECT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors ${className}`}
      >
        <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
        </span>
        <span>{WHATSAPP_DISPLAY_NUMBER}</span>
      </a>
    );
  }

  if (variant === 'button') {
    return (
      <a
        href={WHATSAPP_DIRECT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#25D366]/20 transition-all ${className}`}
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Contact: {WHATSAPP_DISPLAY_NUMBER}</span>
      </a>
    );
  }

  // Floating variant (bottom-right fixed corner)
  return (
    <aside
      aria-label="WhatsApp Support"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
    >
      <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-semibold shadow-lg backdrop-blur-xs transition-opacity duration-200 pointer-events-none group-hover:opacity-100 opacity-90">
        Contact us: {WHATSAPP_DISPLAY_NUMBER}
      </span>
      <a
        href={WHATSAPP_DIRECT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contact us on WhatsApp at ${WHATSAPP_DISPLAY_NUMBER}`}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </aside>
  );
};
