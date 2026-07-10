import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const yamlPath = path.join(process.cwd(), 'docs/openapi.yaml');
    const yamlContent = fs.readFileSync(yamlPath, 'utf8');
    res.setHeader('Content-Type', 'text/yaml');
    return res.status(200).send(yamlContent);
  } catch (error) {
    console.error('Error serving openapi.yaml:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
