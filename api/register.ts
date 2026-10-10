import crypto from 'crypto';

const WHATSAPP_GROUP_INVITE_LINK =
  process.env.WHATSAPP_GROUP_INVITE_LINK ||
  'https://chat.whatsapp.com/KOOLm8HsTeC4PFNRBPEffx?s=cl&p=a&mlu=4&ilr=4';

const META_PIXEL_ID = process.env.META_PIXEL_ID || '';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';

function hashSha256(val: string): string {
  return crypto.createHash('sha256').update(val.trim().toLowerCase()).digest('hex');
}

async function sendMetaConversionApi(
  registration: { id: string; fullName: string; email: string; phone: string },
  clientIp?: string,
  userAgent?: string
) {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) return;

  const cleanPhone = registration.phone.replace(/\D/g, '');
  const [firstName, ...lastNameParts] = registration.fullName.trim().split(/\s+/);
  const lastName = lastNameParts.join(' ');

  const userData: Record<string, unknown> = {
    em: [hashSha256(registration.email)],
    ph: cleanPhone ? [hashSha256(cleanPhone)] : undefined,
    fn: firstName ? [hashSha256(firstName)] : undefined,
    ln: lastName ? [hashSha256(lastName)] : undefined,
  };

  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;

  const payload = {
    data: [
      {
        event_name: 'CompleteRegistration',
        event_time: Math.floor(Date.now() / 1000),
        event_id: registration.id,
        action_source: 'website',
        event_source_url: 'https://textocode.academy/thankyou',
        user_data: userData,
        custom_data: {
          content_name: 'Textocode Academy Free AI Training',
          status: 'completed',
          currency: 'USD',
          value: 0.0,
        },
      },
    ],
  };

  try {
    const url = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[Meta CAPI] Error:', err);
  }
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { fullName, email, phone } = body;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your full name (at least 2 characters).',
        field: 'fullName',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
        field: 'email',
      });
    }

    const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
    const phoneDigits = cleanPhone.replace(/\D/g, '');
    if (!cleanPhone || phoneDigits.length < 7 || phoneDigits.length > 16) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid WhatsApp phone number.',
        field: 'phone',
      });
    }

    const registration = {
      id: `TC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      registeredAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // Client IP & User Agent for Meta CAPI
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket?.remoteAddress;
    const userAgent = req.headers['user-agent'] as string;

    // Fire Conversions API in background
    sendMetaConversionApi(registration, clientIp, userAgent).catch(() => {});

    return res.status(201).json({
      success: true,
      message: 'Registration confirmed successfully!',
      registration,
      whatsappGroupUrl: WHATSAPP_GROUP_INVITE_LINK,
    });
  } catch (err: any) {
    console.error('Error handling registration:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    });
  }
}
