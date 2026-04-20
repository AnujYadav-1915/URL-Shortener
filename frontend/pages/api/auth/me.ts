import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromToken } from '../../../lib/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  const user = getUserFromToken(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  return res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email, plan: user.plan },
  });
}
