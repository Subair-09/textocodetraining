import React from 'react';
import { Calendar, Monitor, Tag, Building2, ArrowRight } from 'lucide-react';

interface TrainingDetailsProps {
  onRegisterClick: () => void;
}

export const TrainingDetails: React.FC<TrainingDetailsProps> = ({ onRegisterClick }) => {
  const details = [
    {
      label: 'Date',
      value: 'October 14, 2026',
      sub: 'Mark your calendar',
      icon: Calendar,
      accent: 'text-blue-600',
    },
    {
      label: 'Format',
      value: 'Live online training',
      sub: 'Zoom & Google Meet',
      icon: Monitor,
      accent: 'text-sky-600',
    },
    {
      label: 'Registration fee',
      value: 'Completely FREE',
      sub: '100% complimentary',
      icon: Tag,
      accent: 'text-emerald-600',
    },
    {
      label: 'Organiser',
      value: 'Textocode Academy',
      sub: 'AI & Web Education',
      icon: Building2,
      accent: 'text-indigo-600',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/50 via-sky-50/20 to-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            Event Overview
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Training Details at a Glance
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Everything you need to know about the upcoming live session.
          </p>
        </div>

        {/* 4 Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {details.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm text-center flex flex-col items-center justify-center hover:border-blue-300 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 ${item.accent}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {item.label}
                </span>
                <span className="text-lg font-extrabold text-slate-900 tracking-tight mb-0.5">
                  {item.value}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {item.sub}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-3 group"
          >
            <span>SAVE MY FREE SPOT</span>
            <ArrowRight className="w-5 h-5 text-sky-200 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-3 text-xs text-slate-500 font-medium">
            Limited live session spots • Instant confirmation
          </p>
        </div>
      </div>
    </section>
  );
};
