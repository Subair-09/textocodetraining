const WHATSAPP_GROUP_INVITE_LINK =
  process.env.WHATSAPP_GROUP_INVITE_LINK ||
  'https://chat.whatsapp.com/KOOLm8HsTeC4PFNRBPEffx?s=cl&p=a&mlu=4&ilr=4';

const META_PIXEL_ID = process.env.META_PIXEL_ID || '';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    whatsappGroupUrl: WHATSAPP_GROUP_INVITE_LINK,
    trainingDate: 'October 14, 2026',
    trainingTime: '6:00 PM (WAT / GMT+1)',
    organizer: 'Textocode Academy',
    topic: 'Learn How to Build a Website for Your Business Using AI',
    metaPixelId: META_PIXEL_ID,
  });
}
