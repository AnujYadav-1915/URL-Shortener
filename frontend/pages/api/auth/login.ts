import type { NextApiRequest, NextApiResponse } from 'next';
import { users, sessions } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  let foundUser: any = null;
  const allUsers = Array.from(users.values());
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email && allUsers[i].password === password) {
      foundUser = allUsers[i];
      break;
    }
  }

  if (!foundUser) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = uuidv4();
  sessions.set(token, foundUser.id);

  return res.status(200).json({
    token,
    user: { id: foundUser.id, name: foundUser.name, email: foundUser.email, plan: foundUser.plan },
  });
}
