import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const { id } = req.query;
  const resp = await fetch(`${apiUrl}/analytics/${id}`);
  const data = await resp.json();
  res.status(resp.status).json(data);
}
