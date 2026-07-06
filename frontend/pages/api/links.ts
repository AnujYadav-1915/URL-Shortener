import type { NextApiRequest, NextApiResponse } from 'next';
import { links, analytics, getUserFromToken, generateShortId } from '../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (req.method === 'GET') {
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    const user = getUserFromToken(token);
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    const userLinks = Array.from(links.values())
      .filter(l => l.userId === user.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return res.status(200).json({ links: userLinks });
  }

  if (req.method === 'POST') {
    const { url, customAlias, expiryDate, expiryClicks, password: linkPassword, tags, utmSource, utmMedium, utmCampaign } = req.body;

    // Handle bulk creation
    if (req.body.urls && Array.isArray(req.body.urls)) {
      const results: any[] = [];
      const urls: string[] = req.body.urls;
      for (const u of urls) {
        try { new URL(u); } catch { results.push({ url: u, error: 'Invalid URL' }); continue; }
        const shortId = generateShortId();
        const user = token ? getUserFromToken(token) : null;
        const link = {
          id: uuidv4(),
          userId: user?.id || 'anonymous',
          shortId,
          url: u,
          clickCount: 0,
          createdAt: new Date().toISOString(),
          tags: [] as string[],
          deleted: false,
          enabled: true,
        };
        links.set(shortId, link);
        results.push({ url: u, shortId, link });
      }
      return res.status(201).json({ results });
    }

    if (!url) return res.status(400).json({ error: 'URL is required' });

    // Validate URL
    try { new URL(url); } catch { return res.status(400).json({ error: 'Invalid URL' }); }

    // Check custom alias collision
    const shortId = customAlias || generateShortId();
    if (links.has(shortId)) {
      return res.status(409).json({ error: 'Alias already taken' });
    }

    const user = token ? getUserFromToken(token) : null;

    // Build final URL with UTM params if provided
    let finalUrl = url;
    if (utmSource || utmMedium || utmCampaign) {
      const urlObj = new URL(url);
      if (utmSource) urlObj.searchParams.set('utm_source', utmSource);
      if (utmMedium) urlObj.searchParams.set('utm_medium', utmMedium);
      if (utmCampaign) urlObj.searchParams.set('utm_campaign', utmCampaign);
      finalUrl = urlObj.toString();
    }

    const link = {
      id: uuidv4(),
      userId: user?.id || 'anonymous',
      shortId,
      url: finalUrl,
      customAlias: customAlias || undefined,
      clickCount: 0,
      createdAt: new Date().toISOString(),
      expiryDate,
      expiryClicks,
      password: linkPassword,
      tags: tags || [],
      utmSource,
      utmMedium,
      utmCampaign,
      deleted: false,
      enabled: true,
    };

    links.set(shortId, link);
    return res.status(201).json({ shortId, link });
  }

  if (req.method === 'PUT') {
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    const user = getUserFromToken(token);
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    const { shortId, url: newUrl, tags: newTags, enabled, expiryDate, password: newPassword } = req.body;
    const link = links.get(shortId);
    if (!link || link.userId !== user.id) {
      return res.status(404).json({ error: 'Link not found' });
    }

    if (newUrl !== undefined) {
      try { new URL(newUrl); link.url = newUrl; } catch { return res.status(400).json({ error: 'Invalid URL' }); }
    }
    if (newTags !== undefined) link.tags = newTags;
    if (enabled !== undefined) link.enabled = enabled;
    if (expiryDate !== undefined) link.expiryDate = expiryDate;
    if (newPassword !== undefined) link.password = newPassword;

    return res.status(200).json({ link });
  }

  if (req.method === 'DELETE') {
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    const user = getUserFromToken(token);
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    const { shortId } = req.body;
    const link = links.get(shortId);
    if (!link || link.userId !== user.id) {
      return res.status(404).json({ error: 'Link not found' });
    }

    link.deleted = true;
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
