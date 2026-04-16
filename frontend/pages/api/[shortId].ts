import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Proxy all requests to backend for /:shortId
  const { shortId } = req.query;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const resp = await fetch(`${apiUrl}/${shortId}`);
  const data = await resp.json();
  res.status(resp.status).json(data);
}
