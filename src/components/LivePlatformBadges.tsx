import React from 'react';

export const ZoomIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Zoom"
  >
    <rect width="24" height="24" rx="5" fill="#0B5CFF" />
    <path
      d="M5.5 8.75C5.5 7.7835 6.2835 7 7.25 7H13.25C14.2165 7 15 7.7835 15 8.75V15.25C15 16.2165 14.2165 17 13.25 17H7.25C6.2835 17 5.5 16.2165 5.5 15.25V8.75Z"
      fill="white"
    />
    <path
      d="M15.5 10.25L18.75 7.8C19.15 7.5 19.7 7.78 19.7 8.28V15.72C19.7 16.22 19.15 16.5 18.75 16.2L15.5 13.75V10.25Z"
      fill="white"
    />
  </svg>
);

export const GoogleMeetIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Google Meet"
  >
    <rect x="2" y="5.5" width="13" height="13" rx="2.5" fill="#00832D" />
    <path
      d="M15 8.5L20.5 4.5V19.5L15 15.5V8.5Z"
      fill="#00AC47"
    />
    <path
      d="M15 8.5L20.5 4.5V12L15 8.5Z"
      fill="#EA4335"
    />
    <path
      d="M2 16H15V18.5H4.5C3.11929 18.5 2 17.3807 2 16Z"
      fill="#0066DA"
    />
    <path
      d="M15 12L20.5 16V19.5L15 15.5V12Z"
      fill="#FFBA00"
    />
    <path
      d="M15 8.5V15.5L11 12.5L15 8.5Z"
      fill="#2684FC"
    />
  </svg>
);

export const LivePlatformBadge: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-2xs">
        <span className="text-slate-500 font-medium text-[11px]">Online via:</span>
        <div className="flex items-center gap-1.5">
          <ZoomIcon className="w-4 h-4 rounded-xs" />
          <span className="font-bold text-slate-800">Zoom</span>
          <span className="text-slate-300">/</span>
          <GoogleMeetIcon className="w-4 h-4" />
          <span className="font-bold text-slate-800">Meet</span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white/95 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs sm:text-sm font-bold text-slate-800">
          Hosted Live Online On:
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Zoom */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/70 border border-blue-200/60">
          <ZoomIcon className="w-4 h-4 sm:w-5 sm:h-5 shadow-2xs" />
          <span className="text-xs sm:text-sm font-extrabold text-[#0B5CFF]">Zoom</span>
        </div>

        <span className="text-slate-300 font-bold">&amp;</span>

        {/* Google Meet */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200">
          <GoogleMeetIcon className="w-4 h-4 sm:w-5 sm:h-5 shadow-2xs" />
          <span className="text-xs sm:text-sm font-extrabold text-slate-800">Google Meet</span>
        </div>
      </div>
    </div>
  );
};
