import React, { useState } from 'react';
import { ConfirmedRegistration } from '../types';
import { Calendar, CheckCircle2, MessageSquare, ExternalLink, Copy, Check, Info } from 'lucide-react';

interface SuccessViewProps {
  registration: ConfirmedRegistration;
  whatsappGroupUrl: string;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  registration,
  whatsappGroupUrl,
  onReset,
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [showConfigNotice, setShowConfigNotice] = useState(false);

  const isPlaceholder =
    !whatsappGroupUrl ||
    whatsappGroupUrl === 'YOUR_WHATSAPP_GROUP_INVITE_LINK' ||
    whatsappGroupUrl.includes('YOUR_WHATSAPP');

  const handleCopyId = () => {
    navigator.clipboard.writeText(registration.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (isPlaceholder) {
      e.preventDefault();
      setShowConfigNotice(true);
    }
  };

  // Google Calendar URL generator for October 14, 2026
  // Training date: 2026-10-14 18:00:00 to 20:00:00 (WAT / UTC+1 -> 17:00:00Z to 19:00:00Z)
  const gcalTitle = encodeURIComponent('Textocode Academy: Build a Website for Your Business Using AI (Free Training)');
  const gcalDetails = encodeURIComponent(
    'Free live training by Textocode Academy.\nLearn how to use AI to build websites without coding and automate tasks with AI agents.\nRegistration ID: ' +
      registration.id +
      '\nJoin the WhatsApp group for access links: ' +
      whatsappGroupUrl
  );
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&dates=20261014T170000Z/20261014T190000Z&details=${gcalDetails}&location=Live+Online`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-blue-600/5 text-center animate-in fade-in zoom-in-95 duration-300">
      {/* Success Badge */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/10">
        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
        You're Registered! 🎉
      </h2>

      {/* Messages */}
      <div className="max-w-xl mx-auto space-y-3 text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
        <p className="font-semibold text-slate-800">
          Thank you for registering for the Textocode Academy FREE AI training.
        </p>
        <p>
          The next step is to join our WhatsApp group so you can receive important announcements and updates before the training.
        </p>
      </div>

      {/* Prominent Green WhatsApp CTA Button */}
      <div className="max-w-md mx-auto mb-8">
        <a
          href={isPlaceholder ? '#' : whatsappGroupUrl}
          target={isPlaceholder ? '_self' : '_blank'}
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          <MessageSquare className="w-6 h-6 fill-white" />
          <span>CLICK ME TO JOIN THE WHATSAPP GROUP</span>
          <ExternalLink className="w-5 h-5 text-emerald-100" />
        </a>

        {/* Notice if placeholder link */}
        {showConfigNotice && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-left text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">WhatsApp Group Link Configured as Placeholder:</p>
                <code className="bg-amber-100 px-2 py-0.5 rounded text-xs font-mono font-bold block mb-1">
                  YOUR_WHATSAPP_GROUP_INVITE_LINK
                </code>
                <p className="text-amber-800 text-xs">
                  The organizer will provide the official link shortly. When set via <span className="font-mono">WHATSAPP_GROUP_INVITE_LINK</span>, this button immediately takes participants to your WhatsApp group.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prominent Training Date Reminder */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200/80 max-w-lg mx-auto mb-8">
        <div className="flex items-center justify-center gap-2 text-blue-950 font-extrabold text-lg sm:text-xl">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>We'll see you on October 14, 2026!</span>
        </div>
        <p className="text-xs sm:text-sm text-blue-700 mt-1 font-semibold">
          All information about the training will be communicated in the WhatsApp group.
        </p>
      </div>

      {/* Confirmation Summary Card */}
      <div className="max-w-lg mx-auto bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Registration Ticket
          </span>
          <button
            onClick={handleCopyId}
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
          >
            {copiedId ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-slate-400 block text-xs">Name</span>
            <span className="font-bold text-slate-800 truncate block">
              {registration.fullName}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Confirmation ID</span>
            <span className="font-mono font-bold text-blue-600 truncate block">
              {registration.id}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Email</span>
            <span className="font-medium text-slate-700 truncate block">
              {registration.email}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">WhatsApp</span>
            <span className="font-medium text-slate-700 truncate block">
              {registration.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Action Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm">
        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 font-bold hover:text-blue-600 transition-colors shadow-xs"
        >
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Add to Google Calendar</span>
        </a>

        <button
          onClick={onReset}
          className="text-slate-500 hover:text-slate-800 font-semibold underline underline-offset-4 cursor-pointer"
        >
          Register another attendee
        </button>
      </div>
    </div>
  );
};
