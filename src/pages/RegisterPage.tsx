import React, { useState, useRef, useEffect } from 'react';
import { ConfirmedRegistration } from '../types';
import { saveStoredRegistration, navigateTo, getStoredRegistration } from '../navigation';
import {
  User,
  Mail,
  Phone,
  Lock,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Check,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { ZoomIcon, GoogleMeetIcon } from '../components/LivePlatformBadges';
import { WHATSAPP_DIRECT_URL, WHATSAPP_DISPLAY_NUMBER } from '../components/WhatsAppContactButton';

interface RegisterPageProps {
  whatsappGroupUrl: string;
  onRegistered: (reg: ConfirmedRegistration) => void;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meaeklln';

async function sendToFormspree(payload: {
  fullName: string;
  email: string;
  phone: string;
  id: string;
  date: string;
}) {
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        ticket_id: payload.id,
        training_topic: 'Learn How to Build a Website for Your Business Using AI',
        event_date: payload.date,
        message: `New attendee registered: ${payload.fullName} (${payload.email}, WhatsApp: ${payload.phone}) - Ticket ID: ${payload.id}`,
      }),
    });
  } catch (err) {
    console.warn('[Formspree] Dispatch error:', err);
  }
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  whatsappGroupUrl,
  onRegistered,
}) => {
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    server?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const existingRegistration = getStoredRegistration();

  useEffect(() => {
    fullNameInputRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      phone?: string;
    } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@example.com).';
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'WhatsApp Phone Number is required.';
    } else if (cleanPhone.length < 7 || cleanPhone.length > 16) {
      newErrors.phone = 'Please provide a valid WhatsApp phone number with country/area code.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      let data: any = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      }

      // If backend returned a specific field validation error
      if (data && !response.ok && data.field) {
        setErrors((prev) => ({
          ...prev,
          [data.field]: data.error || 'Validation failed.',
        }));
        setIsSubmitting(false);
        return;
      }

      // Successful registration confirmed by backend or resilient client fallback
      const confirmedReg: ConfirmedRegistration = (data && data.registration) ? data.registration : {
        id: `TC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        registeredAt: new Date().toISOString(),
      };

      // Send details to Formspree for immediate email notification
      sendToFormspree({
        fullName: confirmedReg.fullName,
        email: confirmedReg.email,
        phone: confirmedReg.phone,
        id: confirmedReg.id,
        date: 'October 14, 2026',
      }).catch(() => {});

      // Save persistently in localStorage
      saveStoredRegistration(confirmedReg);
      onRegistered(confirmedReg);

      // Navigate to /thankyou (triggers Meta Pixel tracking & WhatsApp group)
      navigateTo('/thankyou');
    } catch (err) {
      console.warn('API call encountered an issue, completing registration locally:', err);
      // Graceful fallback for static hostings (Vercel static) so visitor is NEVER blocked!
      const fallbackReg: ConfirmedRegistration = {
        id: `TC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        registeredAt: new Date().toISOString(),
      };

      // Send details to Formspree even on fallback
      sendToFormspree({
        fullName: fallbackReg.fullName,
        email: fallbackReg.email,
        phone: fallbackReg.phone,
        id: fallbackReg.id,
        date: 'October 14, 2026',
      }).catch(() => {});

      saveStoredRegistration(fallbackReg);
      onRegistered(fallbackReg);
      navigateTo('/thankyou');
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-gradient-to-b from-blue-50/70 via-sky-50/30 to-white min-h-[90vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Training Overview</span>
          </button>

          <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
            Oct 14, 2026 • 100% Free
          </span>
        </div>

        {/* Existing registration alert if already registered */}
        {existingRegistration && (
          <div className="mb-8 p-5 rounded-2xl bg-blue-100/90 border border-blue-200 text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <p className="font-bold text-sm">
                You're already registered as {existingRegistration.fullName}!
              </p>
              <p className="text-xs text-blue-800 mt-0.5">
                Your spot is confirmed for October 14, 2026.
              </p>
            </div>
            <button
              onClick={() => navigateTo('/thankyou')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap"
            >
              View WhatsApp Group &amp; Ticket →
            </button>
          </div>
        )}

        {/* Dedicated Registration Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-blue-200 shadow-2xl shadow-blue-600/10 relative overflow-hidden">
          {/* Top Royal Blue Bar */}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700" />

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              100% FREE LIVE ONLINE TRAINING
            </div>

            {/* Form Heading */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Register for the Free Training
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fill in your details below to reserve your place and receive updates about the training.
            </p>
          </div>

          {/* Date and Platform info pill */}
          <div className="mb-8 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>October 14, 2026</span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium text-xs">Live on:</span>
              <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                <ZoomIcon className="w-3.5 h-3.5" />
                <span className="font-bold text-[#0B5CFF] text-xs">Zoom</span>
              </div>
              <span className="text-slate-300 text-xs">&amp;</span>
              <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                <GoogleMeetIcon className="w-3.5 h-3.5" />
                <span className="font-bold text-slate-800 text-xs">Meet</span>
              </div>
            </div>
          </div>

          {/* Bold WhatsApp Group Notice Inside Form Box */}
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-slate-900 shadow-md shadow-emerald-500/10 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-6 h-6 fill-white" />
            </div>
            <div className="text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider mb-1">
                IMPORTANT STEP
              </span>
              <p className="text-base sm:text-lg font-black text-slate-950 leading-tight">
                MAKE SURE YOU JOIN THE WHATSAPP GROUP AFTER FILLING THIS FORM!
              </p>
              <p className="text-xs sm:text-sm text-emerald-950 font-semibold mt-1">
                All training updates, live webinar access links, and class reminders will only be communicated in the WhatsApp group.
              </p>
            </div>
          </div>

          {/* Server Error Banner */}
          {errors.server && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <div>
                <p className="font-bold">Registration Alert</p>
                <p>{errors.server}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
            {/* Field 1: Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  ref={fullNameInputRef}
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="e.g. John Doe"
                  className={`w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-xl border text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 transition-all outline-none ${
                    errors.fullName
                      ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400'
                      : 'border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-3 focus:ring-blue-100'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Field 2: Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="john@example.com"
                  className={`w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-xl border text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 transition-all outline-none ${
                    errors.email
                      ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400'
                      : 'border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-3 focus:ring-blue-100'
                  }`}
                />
              </div>
              {errors.email ? (
                <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-slate-500">
                  We'll send access links and training reminders here.
                </p>
              )}
            </div>

            {/* Field 3: WhatsApp Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs sm:text-sm font-bold text-slate-800 mb-2"
              >
                WhatsApp Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="+234 801 234 5678 or +1 (555) 000-0000"
                  className={`w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-xl border text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 transition-all outline-none ${
                    errors.phone
                      ? 'border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400'
                      : 'border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-3 focus:ring-blue-100'
                  }`}
                />
              </div>
              {errors.phone ? (
                <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.phone}</span>
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-slate-500">
                  Required to join the WhatsApp group updates and direct training Q&amp;A.
                </p>
              )}
            </div>

            {/* Bold Reminder Above Submit Button */}
            <div className="pt-2">
              <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-center">
                <p className="text-xs sm:text-sm font-black text-emerald-950 uppercase tracking-wide flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  <span>REMINDER: Make sure you join the WhatsApp group after clicking below!</span>
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/35 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>CONFIRMING YOUR SPOT...</span>
                  </>
                ) : (
                  <>
                    <span>COMPLETE MY REGISTRATION</span>
                    <CheckCircle2 className="w-5 h-5 text-sky-200" />
                  </>
                )}
              </button>
            </div>

            {/* Privacy note */}
            <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-500 font-medium text-center">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>100% Free • No Spam • We Respect Your Privacy</span>
            </div>
          </form>
        </div>

        {/* Benefits reminder */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">100% Complimentary</p>
              <p className="text-[11px] text-slate-500">Zero fees or credit card</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Zero Coding</p>
              <p className="text-[11px] text-slate-500">Beginner-friendly pace</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">WhatsApp Group</p>
              <p className="text-[11px] text-slate-500">Direct event access</p>
            </div>
          </div>
        </div>

        {/* Contact Us WhatsApp Support */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Have questions before registering?{' '}
            <a
              href={WHATSAPP_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-bold underline ml-1 inline-flex items-center gap-1"
            >
              <span>Chat with us on WhatsApp ({WHATSAPP_DISPLAY_NUMBER})</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
