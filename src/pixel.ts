// Meta (Facebook) Pixel Client Helper

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let isPixelInitialized = false;

/**
 * Initializes the Meta Pixel script dynamically if a Pixel ID is provided.
 */
export function initMetaPixel(pixelId?: string): void {
  if (!pixelId || typeof window === 'undefined' || isPixelInitialized) {
    return;
  }

  const cleanPixelId = pixelId.trim();
  if (!cleanPixelId || cleanPixelId === 'YOUR_PIXEL_ID') {
    return;
  }

  // Inject Meta Pixel Base Code
  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );
  /* eslint-enable */

  if (window.fbq) {
    window.fbq('init', cleanPixelId);
    window.fbq('track', 'PageView');
    isPixelInitialized = true;
    console.log(`[Meta Pixel] Initialized successfully with ID: ${cleanPixelId}`);
  }
}

/**
 * Tracks a PageView event in Meta Pixel
 */
export function trackPageView(path?: string): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
    if (path) {
      console.log(`[Meta Pixel] PageView tracked for path: ${path}`);
    }
  }
}

/**
 * Tracks a CompleteRegistration / Lead conversion event
 * @param eventId Unique ID shared between client and server for Meta CAPI deduplication
 * @param details Registration attributes
 */
export function trackCompleteRegistration(
  eventId: string,
  details?: { fullName?: string; email?: string }
): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    // Fire CompleteRegistration with eventID for deduplication
    window.fbq(
      'track',
      'CompleteRegistration',
      {
        content_name: 'Textocode Academy Free AI Training',
        status: 'completed',
        currency: 'USD',
        value: 0.0,
      },
      { eventID: eventId }
    );

    // Also fire Lead event (commonly used for training registrations)
    window.fbq(
      'track',
      'Lead',
      {
        content_name: 'Free Live Training October 14, 2026',
        category: 'Webinar Registration',
      },
      { eventID: eventId }
    );

    console.log(`[Meta Pixel] CompleteRegistration & Lead tracked (eventID: ${eventId})`);
  }
}
