import React from 'react';
import { Hero } from '../components/Hero';
import { WhatYouWillLearn } from '../components/WhatYouWillLearn';
import { WhoShouldAttend } from '../components/WhoShouldAttend';
import { TrainingDetails } from '../components/TrainingDetails';
import { FinalCTA } from '../components/FinalCTA';
import { navigateTo } from '../navigation';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface LandingPageProps {
  isAlreadyRegistered: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ isAlreadyRegistered }) => {
  const handleRegisterClick = () => {
    if (isAlreadyRegistered) {
      navigateTo('/thankyou');
    } else {
      navigateTo('/register');
    }
  };

  return (
    <>
      {/* If visitor is already registered, show top reminder bar */}
      {isAlreadyRegistered && (
        <div className="bg-emerald-600 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <span>🎉 You have registered for the October 14 training!</span>
            <button
              onClick={() => navigateTo('/thankyou')}
              className="underline font-bold text-white hover:text-emerald-100 cursor-pointer ml-1"
            >
              Access WhatsApp Group &amp; Details →
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero onRegisterClick={handleRegisterClick} />

      {/* What You'll Learn Section */}
      <WhatYouWillLearn />

      {/* Who Should Attend Section */}
      <WhoShouldAttend />

      {/* Training Details Section with "SAVE MY FREE SPOT" */}
      <TrainingDetails onRegisterClick={handleRegisterClick} />

      {/* Final CTA Section with "REGISTER FOR FREE" */}
      <FinalCTA onRegisterClick={handleRegisterClick} />

      {/* Sticky Mobile Floating Button */}
      <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden">
        <button
          onClick={handleRegisterClick}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 active:bg-blue-700 text-white font-extrabold text-sm tracking-wide shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-2 cursor-pointer border border-blue-500"
        >
          <Sparkles className="w-4 h-4 text-sky-200" />
          <span>
            {isAlreadyRegistered ? 'VIEW WHATSAPP GROUP' : 'SAVE MY FREE SPOT — OCT 14'}
          </span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
