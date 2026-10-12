import React, { useState } from 'react';
import { ConfirmedRegistration } from '../types';
import { clearStoredRegistration, navigateTo } from '../navigation';
import {
  Calendar,
  CheckCircle2,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  Info,
  ArrowLeft,
  Mail,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { WHATSAPP_DIRECT_URL, WHATSAPP_DISPLAY_NUMBER } from '../components/WhatsAppContactButton';

interface ThankYouPageProps {
  registration: ConfirmedRegistration | null;
  whatsappGroupUrl: string;
  onCancelled: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  registration,
  whatsappGroupUrl,
  onCancelled,
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [showConfigNotice, setShowConfigNotice] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const isPlaceholder =
    !whatsappGroupUrl ||
    whatsappGroupUrl === 'YOUR_WHATSAPP_GROUP_INVITE_LINK' ||
    whatsappGroupUrl.includes('YOUR_WHATSAPP');

  const handleCopyId = () => {
    if (registration) {
      navigator.clipboard.writeText(registration.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (isPlaceholder) {
      e.preventDefault();
      setShowConfigNotice(true);
    }
  };

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    try {
      if (registration) {
        await fetch('/api/register/cancel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: registration.id, email: registration.email }),
        });
      }
    } catch (err) {
      console.error('Cancel request error:', err);
    } finally {
      clearStoredRegistration();
      setIsCancelling(false);
      setShowCancelModal(false);
      onCancelled();
      navigateTo('/register');
    }
  };

  // Google Calendar URL generator for October 14, 2026
  const gcalTitle = encodeURIComponent(
    'Textocode Academy: Build a Website for Your Business Using AI (Free Training)'
  );
  const gcalDetails = encodeURIComponent(
    'Free live training by Textocode Academy.\nAll information about the training will be communicated in the WhatsApp group.\nRegistration ID: ' +
      (registration?.id || 'CONFIRMED') +
      '\nWhatsApp Group Link: ' +
      whatsappGroupUrl
  );
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&dates=20261014T170000Z/20261014T190000Z&details=${gcalDetails}&location=Live+Online`;

  // If no registration exists in memory/storage
  if (!registration) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
            <Info className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
            No Active Registration Found
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            It looks like you haven't completed the free registration form yet, or your previous session was cancelled.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigateTo('/register')}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 cursor-pointer"
            >
              Go to Free Registration Form
            </button>
            <button
              onClick={() => navigateTo('/')}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer py-1"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-gradient-to-b from-blue-50/60 via-sky-50/20 to-white min-h-[90vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Training Overview</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Spot Confirmed</span>
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-2xl shadow-blue-600/10 text-center relative overflow-hidden">
          {/* Top accent border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-blue-600 to-emerald-500" />

          {/* Success Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/15">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            You're Registered! 🎉
          </h1>

          {/* Core Message */}
          <div className="max-w-xl mx-auto space-y-3 text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            <p className="font-semibold text-slate-800">
              Thank you for registering for the Textocode Academy FREE AI training.
            </p>
            <p>
              The next step is to join our WhatsApp group so you can receive important announcements and updates before the training.
            </p>
          </div>

          {/* Prominent Green Button: JOIN THE WHATSAPP GROUP */}
          <div className="max-w-md mx-auto mb-6">
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

            {/* Placeholder guidance note */}
            {showConfigNotice && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-left text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold mb-1">WhatsApp Group Link Placeholder Active:</p>
                    <code className="bg-amber-100 px-2 py-0.5 rounded text-xs font-mono font-bold block mb-1">
                      YOUR_WHATSAPP_GROUP_INVITE_LINK
                    </code>
                    <p className="text-amber-800 text-xs">
                      The official invitation link will be injected via environment variable <span className="font-mono">WHATSAPP_GROUP_INVITE_LINK</span>. Once set, this button immediately redirects participants into your WhatsApp group.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Crucial WhatsApp Instructions */}
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/90 border border-blue-200 text-slate-800 max-w-xl mx-auto mb-8 text-center sm:text-left">
            <div className="flex items-center sm:items-start gap-3 justify-center sm:justify-start">
              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base font-bold leading-relaxed text-blue-950">
                All information about the training will be communicated in the WhatsApp group.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200/60 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-xs text-blue-900">
              <span className="text-slate-600">Have questions or need assistance?</span>
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:text-emerald-800 underline inline-flex items-center gap-1"
              >
                <span>WhatsApp us at {WHATSAPP_DISPLAY_NUMBER}</span>
              </a>
            </div>
          </div>

          {/* Prominent Training Date Reminder */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white max-w-xl mx-auto mb-8 shadow-lg">
            <div className="flex items-center justify-center gap-2 font-black text-lg sm:text-xl text-sky-400">
              <Calendar className="w-5 h-5 text-sky-400" />
              <span>We'll see you on October 14, 2026!</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Live Online on Zoom &amp; Google Meet • 100% Free
            </p>
          </div>

          {/* Ticket Information */}
          <div className="max-w-xl mx-auto bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left mb-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Registration Receipt
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-xs">Name</span>
                <span className="font-bold text-slate-900">{registration.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Confirmation ID</span>
                <span className="font-mono font-bold text-blue-600">{registration.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Registered Email</span>
                <span className="font-medium text-slate-700">{registration.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">WhatsApp Number</span>
                <span className="font-medium text-slate-700">{registration.phone}</span>
              </div>
            </div>
          </div>

          {/* Secondary Actions & Cancellation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 border-t border-slate-100 text-xs sm:text-sm">
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 font-bold hover:text-blue-600 transition-colors shadow-xs"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Add to Google Calendar</span>
            </a>

            <button
              onClick={() => setShowCancelModal(true)}
              className="text-red-500 hover:text-red-700 font-semibold underline underline-offset-4 cursor-pointer py-2 px-3"
            >
              Cancel registration
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Cancel Your Registration?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Are you sure you want to cancel your free spot for October 14, 2026? You will no longer receive WhatsApp updates and webinar access links.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={isCancelling}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-sm"
              >
                Keep My Spot
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Cancelling...</span>
                  </>
                ) : (
                  <span>Yes, Cancel</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
