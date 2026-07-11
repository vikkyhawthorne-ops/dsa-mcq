import { NextApiRequest, NextApiResponse } from 'next';
import { prisma as defaultPrisma } from "../../../infra/prisma/client";
import { verifySignature } from '../../../utils/signature';

/**
 * Endpoint to verify that a password reset token (verification code) is valid and not expired.
 * Mapped to /api/auth/verify-reset-token
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify client signature for security
  if (!verifySignature(req, process.env.JWT_SECRET || 'secret')) {
    return res.status(403).json({ message: 'Invalid signature' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // TODO: Verify the provided reset token against the VerificationToken table in database.
    // Ensure that:
    // 1. The token exists.
    // 2. The token is not expired (token.expires > current date).
    const verificationToken = await defaultPrisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || verificationToken.expires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    return res.status(200).json({ success: true, token });
  } catch (error: any) {
    console.error('[verify-reset-token] Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
