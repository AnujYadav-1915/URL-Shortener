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
  deleted: boolean;
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

if (!globalStore.__neonshort_users) {
  globalStore.__neonshort_users = new Map<string, User>();
  globalStore.__neonshort_links = new Map<string, Link>();
  globalStore.__neonshort_analytics = [] as AnalyticsEvent[];
  globalStore.__neonshort_sessions = new Map<string, string>(); // token -> userId

  // Seed demo data
  const demoUserId = 'demo-user-001';
  globalStore.__neonshort_users.set(demoUserId, {
    id: demoUserId,
    name: 'Demo User',
    email: 'demo@neonshort.com',
    password: 'demo123',
    plan: 'free',
    createdAt: new Date().toISOString(),
  });

  // Seed some demo links
  const demoLinks = [
    { shortId: 'neon1a', url: 'https://github.com', clickCount: 142 },
    { shortId: 'ggl2b', url: 'https://google.com', clickCount: 89 },
    { shortId: 'yt3c', url: 'https://youtube.com', clickCount: 234 },
    { shortId: 'tw4d', url: 'https://twitter.com', clickCount: 67 },
    { shortId: 'li5e', url: 'https://linkedin.com', clickCount: 45 },
  ];

  demoLinks.forEach((dl, i) => {
    globalStore.__neonshort_links.set(dl.shortId, {
      id: `link-${i}`,
      userId: demoUserId,
      shortId: dl.shortId,
      url: dl.url,
      clickCount: dl.clickCount,
      createdAt: new Date(Date.now() - (i * 86400000)).toISOString(),
      deleted: false,
    });
  });

  // Seed analytics
  const countries = ['US', 'IN', 'UK', 'DE', 'JP', 'BR', 'CA', 'AU', 'FR', 'KR'];
  const devices = ['desktop', 'mobile', 'tablet'];
  const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
  const referrers = ['twitter.com', 'facebook.com', 'linkedin.com', 'direct', 'google.com'];

  for (let day = 0; day < 30; day++) {
    const eventsPerDay = Math.floor(Math.random() * 20) + 5;
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
