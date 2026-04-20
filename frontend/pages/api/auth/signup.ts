import type { NextApiRequest, NextApiResponse } from 'next';
import { users, sessions } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if user exists
  const allUsers = Array.from(users.values());
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email) {
      return res.status(409).json({ error: 'User already exists' });
    }
  }

  const id = uuidv4();
  const user = {
    id,
    name,
    email,
    password, // In production: hash with bcrypt
    plan: 'free' as const,
    createdAt: new Date().toISOString(),
  };

  users.set(id, user);
  const token = uuidv4();
  sessions.set(token, id);

  return res.status(201).json({
    token,
    user: { id, name, email, plan: user.plan },
  });
}
