import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  registeredAt: string;
  status: 'confirmed';
}

const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'registrations.json');

// Meta (Facebook) Tracking Configurations:
// - META_PIXEL_ID: Your Meta Pixel ID (e.g. 1234567890123456)
// - META_ACCESS_TOKEN: (Optional) System User Access Token for Conversions API (server-side tracking)
const META_PIXEL_ID = process.env.META_PIXEL_ID || '';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';

function hashSha256(val: string): string {
  return crypto.createHash('sha256').update(val.trim().toLowerCase()).digest('hex');
}

/**
 * Meta Conversions API (CAPI): Sends server-side conversion event to Meta
 * Matches the client-side pixel event via event_id for automatic deduplication.
 */
async function sendMetaConversionApiEvent(
  registration: Registration,
  clientIp?: string,
  userAgent?: string
) {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
    return;
  }

  const cleanPhone = registration.phone.replace(/\D/g, '');
  const [firstName, ...lastNameParts] = registration.fullName.trim().split(/\s+/);
  const lastName = lastNameParts.join(' ');

  const userData: Record<string, unknown> = {
    em: [hashSha256(registration.email)],
    ph: cleanPhone ? [hashSha256(cleanPhone)] : undefined,
    fn: firstName ? [hashSha256(firstName)] : undefined,
    ln: lastName ? [hashSha256(lastName)] : undefined,
  };

  if (clientIp) {
    userData.client_ip_address = clientIp;
  }
  if (userAgent) {
    userData.client_user_agent = userAgent;
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'CompleteRegistration',
        event_time: Math.floor(Date.now() / 1000),
        event_id: registration.id, // Shared event_id for browser + server deduplication
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
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    console.log(`[Meta CAPI] Server conversion event sent for ${registration.email}:`, result);
  } catch (err) {
    console.error('[Meta CAPI] Error dispatching server event:', err);
  }
}

// Ensure data directory and file exist
function getRegistrations(): Registration[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading registrations:', err);
    return [];
  }
}

function saveRegistrations(registrations: Registration[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(registrations, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving registrations:', err);
    return false;
  }
}

// WhatsApp invite link for Textocode Academy training:
const WHATSAPP_GROUP_INVITE_LINK =
  process.env.WHATSAPP_GROUP_INVITE_LINK ||
  'https://chat.whatsapp.com/KOOLm8HsTeC4PFNRBPEffx?s=cl&p=a&mlu=4&ilr=4';

// Public config endpoint
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    whatsappGroupUrl: WHATSAPP_GROUP_INVITE_LINK,
    trainingDate: 'October 14, 2026',
    trainingTime: '6:00 PM (WAT / GMT+1)',
    organizer: 'Textocode Academy',
    topic: 'Learn How to Build a Website for Your Business Using AI',
    metaPixelId: META_PIXEL_ID,
  });
});

// Registration endpoint
app.post('/api/register', (req: Request, res: Response) => {
  const { fullName, email, phone } = req.body;

  // Validation
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    res.status(400).json({
      success: false,
      error: 'Please enter your full name (at least 2 characters).',
      field: 'fullName',
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    res.status(400).json({
      success: false,
      error: 'Please enter a valid email address (e.g. name@example.com).',
      field: 'email',
    });
    return;
  }

  // Clean and validate phone number
  const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
  const phoneDigits = cleanPhone.replace(/\D/g, '');
  if (!cleanPhone || phoneDigits.length < 7 || phoneDigits.length > 16) {
    res.status(400).json({
      success: false,
      error: 'Please enter a valid WhatsApp phone number with country/area code.',
      field: 'phone',
    });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const registrations = getRegistrations();

  // Duplicate email check
  const existing = registrations.find(
    (r) => r.email.toLowerCase() === normalizedEmail
  );

  if (existing) {
    // Return friendly message that they are already registered
    res.status(200).json({
      success: true,
      alreadyRegistered: true,
      message: 'You are already registered! See your confirmation details below.',
      registration: {
        id: existing.id,
        fullName: existing.fullName,
        email: existing.email,
        phone: existing.phone,
        registeredAt: existing.registeredAt,
      },
      whatsappGroupUrl: WHATSAPP_GROUP_INVITE_LINK,
    });
    return;
  }

  const newRegistration: Registration = {
    id: `TC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    fullName: fullName.trim(),
    email: normalizedEmail,
    phone: cleanPhone,
    registeredAt: new Date().toISOString(),
    status: 'confirmed',
  };

  registrations.push(newRegistration);
  saveRegistrations(registrations);

  // Dispatch Meta Conversions API (server-side) event asynchronously
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] as string;
  sendMetaConversionApiEvent(newRegistration, clientIp, userAgent).catch((err) => {
    console.error('[Meta CAPI] Dispatch error:', err);
  });

  console.log(
    `[Textocode Academy] New registrant confirmed: ${newRegistration.fullName} (${newRegistration.email}, ${newRegistration.phone}) - ID: ${newRegistration.id}`
  );

  res.status(201).json({
    success: true,
    message: 'Registration confirmed successfully!',
    registration: {
      id: newRegistration.id,
      fullName: newRegistration.fullName,
      email: newRegistration.email,
      phone: newRegistration.phone,
      registeredAt: newRegistration.registeredAt,
    },
    whatsappGroupUrl: WHATSAPP_GROUP_INVITE_LINK,
  });
});

// Cancel registration endpoint
app.post('/api/register/cancel', (req: Request, res: Response) => {
  const { id, email } = req.body;
  const registrations = getRegistrations();
  const index = registrations.findIndex(
    (r) =>
      (id && r.id === id) ||
      (email && r.email.toLowerCase() === String(email).trim().toLowerCase())
  );

  if (index !== -1) {
    const [removed] = registrations.splice(index, 1);
    saveRegistrations(registrations);
    console.log(
      `[Textocode Academy] Registration cancelled: ${removed.fullName} (${removed.email})`
    );
    res.json({ success: true, message: 'Registration cancelled successfully.' });
    return;
  }

  res.json({ success: true, message: 'Registration was already removed or not found.' });
});

// Registrations count endpoint
app.get('/api/registrations/count', (_req: Request, res: Response) => {
  const registrations = getRegistrations();
  res.json({
    total: registrations.length,
  });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Textocode Academy server running on http://localhost:${PORT}`);
  });
}

startServer();
