import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Implement edit, delete, recover endpoints for links
  res.status(501).json({ error: 'Not implemented' });
}
