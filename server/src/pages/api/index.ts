import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

/**
 * Server API index route/endpoint serving the web client build asset.
 * Mapped to /api/ or /api
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    let distPath = path.join(process.cwd(), '../client/web/dist/index.html');
    if (!fs.existsSync(distPath)) {
      distPath = path.join(process.cwd(), 'client/web/dist/index.html');
    }

    if (!fs.existsSync(distPath)) {
      return res.status(404).json({ message: 'Web client build asset not found' });
    }

    const fileContents = fs.readFileSync(distPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(fileContents);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error reading build asset', error: error.message });
  }
}
