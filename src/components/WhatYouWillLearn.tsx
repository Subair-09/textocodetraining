import React from 'react';
import { Layout, Bot, Cpu, CheckCircle } from 'lucide-react';

export const WhatYouWillLearn: React.FC = () => {
  const cards = [
    {
      title: 'Build a Website with AI',
      description:
        'Discover how to turn your ideas into a professional website for your business using AI.',
      icon: Layout,
      badge: 'Step-by-Step',
      highlights: [
        'Turn plain text ideas into live web pages',
        'Generate business-grade layouts and copy',
        'Launch quickly without paying high agency fees',
      ],
    },
    {
      title: 'Discover AI Agents',
      description:
        'See how AI agents work and how they can help businesses respond to customer questions.',
      icon: Bot,
      badge: 'Live Demo',
      highlights: [
        'Understand what AI agents really do',
        '24/7 automated customer inquiries response',
        'Intelligent lead capture that never sleeps',
      ],
    },
    {
      title: 'Automate Business Tasks',
      description:
        'Explore how AI can help you save time, improve customer service, and handle repetitive tasks.',
      icon: Cpu,
      badge: 'Productivity',
      highlights: [
        'Eliminate repetitive everyday admin work',
        'Streamline customer follow-ups and notifications',
        'Free up hours every week to focus on growth',
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/60 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            What You'll Learn
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            High-Impact AI Skills for Your Business
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Practical demonstrations you can watch live and implement straight away.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wide text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {card.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Prominent Short Note */}
        <div className="mt-12 sm:mt-14 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 text-center">
            <span className="text-lg">💡</span>
            <p className="text-sm sm:text-base font-bold tracking-wide">
              No coding experience required. This training is beginner-friendly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
