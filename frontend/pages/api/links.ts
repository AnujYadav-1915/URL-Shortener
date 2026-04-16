import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'No token' });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const resp = await fetch(`${apiUrl}/links`, {
    headers: { Authorization: token },
  });
  const data = await resp.json();
  res.status(resp.status).json(data);
}
