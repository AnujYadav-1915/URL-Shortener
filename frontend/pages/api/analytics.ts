import type { NextApiRequest, NextApiResponse } from 'next';
import { analytics, links, getUserFromToken } from '../../lib/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  const user = getUserFromToken(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  // Get user's link IDs
  const userLinkIds = new Set(
    Array.from(links.values())
      .filter(l => l.userId === user.id)
      .map(l => l.shortId)
  );

  // Filter analytics for user's links
  const userAnalytics = analytics.filter(a => userLinkIds.has(a.linkId));

  // Aggregate by date (last 30 days)
  const dailyClicks: Record<string, number> = {};
  const countryBreakdown: Record<string, number> = {};
  const deviceBreakdown: Record<string, number> = {};
  const browserBreakdown: Record<string, number> = {};
  const referrerBreakdown: Record<string, number> = {};

  userAnalytics.forEach(event => {
    const date = new Date(event.timestamp).toISOString().split('T')[0];
    dailyClicks[date] = (dailyClicks[date] || 0) + 1;
    countryBreakdown[event.country] = (countryBreakdown[event.country] || 0) + 1;
    deviceBreakdown[event.device] = (deviceBreakdown[event.device] || 0) + 1;
    browserBreakdown[event.browser] = (browserBreakdown[event.browser] || 0) + 1;
    referrerBreakdown[event.referrer] = (referrerBreakdown[event.referrer] || 0) + 1;
  });

  // Sort daily clicks
  const sortedDailyClicks = Object.entries(dailyClicks)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, clicks]) => ({ date, clicks }));

  // Top links by clicks
  const linkClickCounts: Record<string, number> = {};
  userAnalytics.forEach(event => {
    linkClickCounts[event.linkId] = (linkClickCounts[event.linkId] || 0) + 1;
  });
  const topLinks = Object.entries(linkClickCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([shortId, clicks]) => {
      const link = links.get(shortId);
      return { shortId, clicks, url: link?.url || '' };
    });

  return res.status(200).json({
    totalClicks: userAnalytics.length,
    dailyClicks: sortedDailyClicks,
    countryBreakdown: Object.entries(countryBreakdown).map(([name, value]) => ({ name, value })),
    deviceBreakdown: Object.entries(deviceBreakdown).map(([name, value]) => ({ name, value })),
    browserBreakdown: Object.entries(browserBreakdown).map(([name, value]) => ({ name, value })),
    referrerBreakdown: Object.entries(referrerBreakdown).map(([name, value]) => ({ name, value })),
    topLinks,
  });
}
