import type { NextApiRequest, NextApiResponse } from 'next';
import { links, analytics } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shortId } = req.query;

  if (typeof shortId !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  const link = links.get(shortId);

  if (!link || link.deleted) {
    return res.status(404).json({ error: 'Link not found' });
  }

  if (link.enabled === false) {
    return res.status(403).json({ error: 'This link is disabled' });
  }

  // Handle password check
  if (link.password) {
    if (req.method === 'POST') {
      const { password } = req.body;
      if (password !== link.password) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      // Password correct, proceed to redirect
    } else {
      // For GET requests, redirect to the password entry page
      return res.status(200).json({ requiresPassword: true });
    }
  }

  if (link.expiryDate && new Date(link.expiryDate) < new Date()) {
    return res.status(410).json({ error: 'This link has expired' });
  }
  
  if (link.expiryClicks && link.clickCount >= link.expiryClicks) {
    return res.status(410).json({ error: 'This link has reached its click limit' });
  }

  // Update stats
  link.clickCount++;

  // Log analytics event
  const userAgent = req.headers['user-agent'] || '';
  const country = (req.headers['x-vercel-ip-country'] as string) || 'Unknown';
  
  analytics.push({
    id: uuidv4(),
    linkId: link.id,
    timestamp: new Date().toISOString(),
    country,
    device: /mobile/i.test(userAgent) ? 'mobile' : 'desktop',
    browser: /chrome/i.test(userAgent) ? 'Chrome' : /safari/i.test(userAgent) ? 'Safari' : 'Other',
    referrer: req.headers.referer || 'direct',
  });

  if (link.password && req.method === 'POST') {
    return res.status(200).json({ url: link.url });
  }

  return res.redirect(link.url);
}
