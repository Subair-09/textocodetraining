import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
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

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-500">
          <p>© 2026 Textocode Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
