import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '../../../lib/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  // Check if user exists
  const allUsers = Array.from(users.values());
  let found = false;
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email) {
      found = true;
      break;
    }
  }

  // In a real app, you'd send an email with a reset token
  // Here we'll just mock success to show the flow is working
  return res.status(200).json({ 
    message: 'If an account exists with this email, you will receive a password reset link shortly.',
    success: true 
  });
}
