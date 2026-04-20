import type { NextApiRequest, NextApiResponse } from 'next';
import { links, analytics } from '../../../lib/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { shortId } = req.query;
  if (!shortId || typeof shortId !== 'string') {
    return res.status(400).json({ error: 'Missing shortId' });
  }

  const link = links.get(shortId);
  if (!link || link.deleted) return res.status(404).json({ error: 'Link not found' });
  if (!link.enabled) return res.status(410).json({ error: 'This link has been disabled' });

  // Check expiry
  if (link.expiryDate && new Date(link.expiryDate) < new Date()) {
    return res.status(410).json({ error: 'This link has expired' });
  }
  if (link.expiryClicks && link.clickCount >= link.expiryClicks) {
    return res.status(410).json({ error: 'This link has reached its click limit' });
  }

  // Password check
  const pw = req.query.pw;
  if (link.password && pw !== link.password) {
    return res.status(200).json({ passwordRequired: true, shortId });
  }

  // Increment click count and log analytics
  link.clickCount++;
  analytics.push({
    id: `a-${Date.now()}`,
    linkId: shortId,
    timestamp: new Date().toISOString(),
    country: ['US', 'IN', 'UK', 'DE', 'JP'][Math.floor(Math.random() * 5)],
    device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
    browser: ['Chrome', 'Safari', 'Firefox'][Math.floor(Math.random() * 3)],
    referrer: req.headers.referer || 'direct',
  });

  return res.redirect(301, link.url);
}
