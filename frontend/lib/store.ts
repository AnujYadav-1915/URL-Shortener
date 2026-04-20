// In-memory data store for the URL shortener
// In production, replace with PostgreSQL/Redis

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: 'free' | 'pro' | 'business';
  createdAt: string;
}

export interface Link {
  id: string;
  userId: string;
  shortId: string;
  url: string;
  customAlias?: string;
  clickCount: number;
  createdAt: string;
  expiryDate?: string;
  expiryClicks?: number;
  password?: string;
  tags: string[];
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deleted: boolean;
  enabled: boolean;
}

export interface AnalyticsEvent {
  id: string;
  linkId: string;
  timestamp: string;
  country: string;
  device: string;
  browser: string;
  referrer: string;
}

// Global store (persists across API calls in same server instance)
const globalStore = globalThis as any;

if (!globalStore.__neonshort_init) {
  globalStore.__neonshort_init = true;
  globalStore.__neonshort_users = new Map<string, User>();
  globalStore.__neonshort_links = new Map<string, Link>();
  globalStore.__neonshort_analytics = [] as AnalyticsEvent[];
  globalStore.__neonshort_sessions = new Map<string, string>(); // token -> userId

  // Seed demo data
  const demoUserId = 'demo-user-001';
  globalStore.__neonshort_users.set(demoUserId, {
    id: demoUserId,
    name: 'Anuj Yadav',
    email: 'demo@neonshort.com',
    password: 'demo123',
    plan: 'pro' as const,
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
  });

  // Seed demo links
  const demoLinks = [
    { shortId: 'github', url: 'https://github.com', clickCount: 1427, tags: ['dev', 'social'] },
    { shortId: 'google', url: 'https://google.com', clickCount: 892, tags: ['search'] },
    { shortId: 'ytube', url: 'https://youtube.com', clickCount: 2341, tags: ['social', 'video'] },
    { shortId: 'twit', url: 'https://twitter.com', clickCount: 673, tags: ['social'] },
    { shortId: 'lnkdn', url: 'https://linkedin.com', clickCount: 458, tags: ['professional', 'social'] },
    { shortId: 'react', url: 'https://react.dev', clickCount: 312, tags: ['dev'] },
    { shortId: 'nxtjs', url: 'https://nextjs.org', clickCount: 567, tags: ['dev', 'framework'] },
    { shortId: 'figma', url: 'https://figma.com', clickCount: 234, tags: ['design'] },
  ];

  demoLinks.forEach((dl, i) => {
    globalStore.__neonshort_links.set(dl.shortId, {
      id: `link-${i}`,
      userId: demoUserId,
      shortId: dl.shortId,
      url: dl.url,
      clickCount: dl.clickCount,
      createdAt: new Date(Date.now() - (i * 3 + 1) * 86400000).toISOString(),
      tags: dl.tags,
      deleted: false,
      enabled: true,
    });
  });

  // Seed rich analytics (30 days)
  const countries = ['US', 'IN', 'UK', 'DE', 'JP', 'BR', 'CA', 'AU', 'FR', 'KR'];
  const devices = ['desktop', 'mobile', 'tablet'];
  const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
  const referrers = ['twitter.com', 'facebook.com', 'linkedin.com', 'direct', 'google.com', 'reddit.com'];

  for (let day = 0; day < 30; day++) {
    const eventsPerDay = Math.floor(Math.random() * 30) + 10;
    for (let j = 0; j < eventsPerDay; j++) {
      const link = demoLinks[Math.floor(Math.random() * demoLinks.length)];
      globalStore.__neonshort_analytics.push({
        id: `analytics-${day}-${j}`,
        linkId: link.shortId,
        timestamp: new Date(Date.now() - day * 86400000 - Math.random() * 86400000).toISOString(),
        country: countries[Math.floor(Math.random() * countries.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        referrer: referrers[Math.floor(Math.random() * referrers.length)],
      });
    }
  }

  // Create demo session
  globalStore.__neonshort_sessions.set('demo-token', demoUserId);
}

export const users: Map<string, User> = globalStore.__neonshort_users;
export const links: Map<string, Link> = globalStore.__neonshort_links;
export const analytics: AnalyticsEvent[] = globalStore.__neonshort_analytics;
export const sessions: Map<string, string> = globalStore.__neonshort_sessions;

export function generateShortId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getUserFromToken(token: string): User | null {
  const userId = sessions.get(token);
  if (!userId) return null;
  const allUsers = Array.from(users.values());
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].id === userId) return allUsers[i];
  }
  return null;
}
