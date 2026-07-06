import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  plan: string;
  createdAt: string;
}

export interface Link {
  id: string;
  userId: string;
  shortId: string;
  url: string;
  clickCount: number;
  createdAt: string;
  deleted: boolean;
  enabled?: boolean;
  tags?: string[];
  password?: string;
  expiryDate?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  expiryClicks?: number;
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

// In-memory store persistent across hot-reloads in dev
const globalStore = globalThis as any;

if (!globalStore.__vynkify_init) {
  globalStore.__vynkify_init = true;
  globalStore.__vynkify_users = new Map<string, User>();
  globalStore.__vynkify_links = new Map<string, Link>();
  globalStore.__vynkify_analytics = [] as AnalyticsEvent[];
  globalStore.__vynkify_sessions = new Map<string, string>(); // token -> userId

  // Seed demo data
  const demoUserId = 'demo-user-id';
  globalStore.__vynkify_users.set(demoUserId, {
    id: demoUserId,
    name: 'Anuj Yadav',
    email: 'demo@vynkify.com',
    password: 'demo123',
    plan: 'pro',
    createdAt: new Date().toISOString(),
  });

  const demoLinks = [
    { shortId: 'vynk-1', url: 'https://github.com/AnujYadav-1915/URL-Shortener' },
    { shortId: 'twitter', url: 'https://x.com/anujyadav1915' },
    { shortId: 'linkedin', url: 'https://www.linkedin.com/in/anujyadav1915/' },
  ];

  demoLinks.forEach(dl => {
    globalStore.__vynkify_links.set(dl.shortId, {
      id: uuidv4(),
      userId: demoUserId,
      shortId: dl.shortId,
      url: dl.url,
      clickCount: Math.floor(Math.random() * 500) + 100,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      deleted: false,
      enabled: true,
      tags: ['social', 'profile'],
    });
  });

  // Seed analytics for the last 30 days
  for (let i = 0; i < 30; i++) {
    const day = new Date(Date.now() - 1000 * 60 * 60 * 24 * i);
    const count = Math.floor(Math.random() * 50) + 10;
    for (let j = 0; j < count; j++) {
      globalStore.__vynkify_analytics.push({
        id: uuidv4(),
        linkId: demoLinks[Math.floor(Math.random() * demoLinks.length)].shortId,
        timestamp: day.toISOString(),
        country: ['US', 'IN', 'UK', 'DE', 'JP', 'CA'][Math.floor(Math.random() * 6)],
        device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
        browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)],
        referrer: ['direct', 'google.com', 'twitter.com', 'linkedin.com', 'producthunt.com'][Math.floor(Math.random() * 5)],
      });
    }
  }

  globalStore.__vynkify_sessions.set('demo-token', demoUserId);
}

export const users: Map<string, User> = globalStore.__vynkify_users;
export const links: Map<string, Link> = globalStore.__vynkify_links;
export const analytics: AnalyticsEvent[] = globalStore.__vynkify_analytics;
export const sessions: Map<string, string> = globalStore.__vynkify_sessions;

export function getUserFromToken(token: string): User | null {
  const userId = sessions.get(token);
  if (!userId) return null;
  return users.get(userId) || null;
}

export function generateShortId() {
  return Math.random().toString(36).substring(2, 8);
}
