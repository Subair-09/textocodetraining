import React from 'react';
import { Briefcase, GraduationCap, Code2, Sparkles, Check } from 'lucide-react';

export const WhoShouldAttend: React.FC = () => {
  const audiences = [
    {
      title: 'Business owners and entrepreneurs',
      description:
        'Save money by building your own business web pages and using AI assistants to manage customer queries.',
      icon: Briefcase,
    },
    {
      title: 'Students and beginners',
      description:
        'Learn practical, career-boosting AI tools without needing prior technical background or coding skills.',
      icon: GraduationCap,
    },
    {
      title: 'Freelancers and aspiring web developers',
      description:
        'Speed up project delivery, launch client websites faster, and add AI services to your service offerings.',
      icon: Code2,
    },
    {
      title: 'Anyone interested in using AI for business',
      description:
        'Cut through the AI hype and understand real, practical applications that automate tasks and boost productivity.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            Target Audience
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Who Should Attend?
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            This live training is crafted specifically for anyone ready to leverage AI in the real world:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {audiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 flex items-start gap-4 shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
