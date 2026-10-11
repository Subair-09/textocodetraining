import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { useCurrentPath, getStoredRegistration } from './navigation';
import { ConfirmedRegistration } from './types';
import { initMetaPixel, trackPageView, trackCompleteRegistration } from './pixel';
import { WhatsAppContactButton } from './components/WhatsAppContactButton';

export default function App() {
  const currentPath = useCurrentPath();
  const [whatsappGroupUrl, setWhatsappGroupUrl] = useState<string>(
    'https://chat.whatsapp.com/KOOLm8HsTeC4PFNRBPEffx?s=cl&p=a&mlu=4&ilr=4'
  );
  const [storedRegistration, setStoredRegistration] = useState<ConfirmedRegistration | null>(() => {
    return getStoredRegistration();
  });

  useEffect(() => {
    // Keep stored registration in sync
    setStoredRegistration(getStoredRegistration());
  }, [currentPath]);

  useEffect(() => {
    // Fetch live config from server
    fetch('/api/config')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Config endpoint offline');
      })
      .then((data) => {
        if (data.whatsappGroupUrl) {
          setWhatsappGroupUrl(data.whatsappGroupUrl);
        }
        if (data.metaPixelId) {
          initMetaPixel(data.metaPixelId);
        }
      })
      .catch(() => {
        setWhatsappGroupUrl(
          'https://chat.whatsapp.com/KOOLm8HsTeC4PFNRBPEffx?s=cl&p=a&mlu=4&ilr=4'
        );
      });
  }, []);

  useEffect(() => {
    trackPageView(currentPath);
    if (currentPath === '/thankyou' && storedRegistration) {
      trackCompleteRegistration(storedRegistration.id, {
        fullName: storedRegistration.fullName,
        email: storedRegistration.email,
      });
    }
  }, [currentPath, storedRegistration]);

  const handleRegistered = (reg: ConfirmedRegistration) => {
    setStoredRegistration(reg);
  };

  const handleCancelled = () => {
    setStoredRegistration(null);
  };

  // Determine which page to render based on URL
  const renderCurrentPage = () => {
    if (currentPath === '/thankyou') {
      return (
        <ThankYouPage
          registration={storedRegistration}
          whatsappGroupUrl={whatsappGroupUrl}
          onCancelled={handleCancelled}
        />
      );
    }

    if (currentPath === '/register') {
      return (
        <RegisterPage
          whatsappGroupUrl={whatsappGroupUrl}
          onRegistered={handleRegistered}
        />
      );
    }

    // Default: Landing Page ('/')
    return <LandingPage isAlreadyRegistered={!!storedRegistration} />;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Branded Header */}
      <Header isAlreadyRegistered={!!storedRegistration} />

      {/* Main Content Router */}
      <main className="flex-grow">{renderCurrentPage()}</main>

      {/* Floating WhatsApp Contact Button */}
      <WhatsAppContactButton variant="floating" />

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
