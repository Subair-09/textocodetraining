import { useState, useEffect } from 'react';
import { ConfirmedRegistration } from './types';
import { trackPageView, trackCompleteRegistration } from './pixel';

const STORAGE_KEY = 'textocode_registered_attendee';

export function getStoredRegistration(): ConfirmedRegistration | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse stored registration:', err);
    return null;
  }
}

export function saveStoredRegistration(data: ConfirmedRegistration): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save registration to storage:', err);
  }
}

export function clearStoredRegistration(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to remove stored registration:', err);
  }
}

// Navigation helper
export function navigateTo(path: string): void {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Track PageView in Meta Pixel
  trackPageView(path);

  // If navigating to /thankyou, fire conversion event with stored registration ID
  if (path === '/thankyou') {
    const reg = getStoredRegistration();
    if (reg) {
      trackCompleteRegistration(reg.id, {
        fullName: reg.fullName,
        email: reg.email,
      });
    }
  }

  // Custom event for analytics
  try {
    window.dispatchEvent(new CustomEvent('app_route_change', { detail: { path } }));
  } catch {
    // Ignore tracker errors
  }
}

export function useCurrentPath(): string {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return currentPath;
}
