import type { NextApiRequest, NextApiResponse } from 'next';
import { users, sessions } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // In a real app, you'd verify the Google JWT here
  // We'll simulate a successful Google Auth for Anuj Yadav
  const googleEmail = 'anuj11112003@gmail.com';
  const googleName = 'Anuj Yadav (Google)';

  let user = Array.from(users.values()).find(u => u.email === googleEmail);

  if (!user) {
    user = {
      id: uuidv4(),
      name: googleName,
      email: googleEmail,
      password: 'google-auth-no-password',
      plan: 'pro',
      createdAt: new Date().toISOString(),
    };
    users.set(user.id, user);
  }

  const token = uuidv4();
  sessions.set(token, user.id);

  return res.status(200).json({ token, user: { name: user.name, email: user.email, plan: user.plan } });
}
