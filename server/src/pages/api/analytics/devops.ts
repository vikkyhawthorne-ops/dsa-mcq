import { NextApiResponse } from 'next';
import { prisma as defaultPrisma } from '../../../infra/prisma/client';
import { withAuth, AuthenticatedRequest } from '../../../utils/withAuth';
import { PrismaClient } from '@prisma/client';
import { AnalyticsService } from '../../../controllers/analyticsController';
import { EngagementService } from '../../../controllers/engagementController';
import { rateLimiter } from '../../../utils/rateLimit';

const limiter = rateLimiter({ windowMs: 60 * 1000, max: 30 }); // 30 requests/minute

export async function devopsHandler(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  deps: { prisma: PrismaClient } = { prisma: defaultPrisma }
) {
  const userId = req.user?.id || 'anonymous';
  const isLimited = await limiter(userId, res);
  if (isLimited) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  const analyticsService = new AnalyticsService(deps.prisma);
  const engagementService = new EngagementService(deps.prisma);

  if (req.method === 'GET') {
    // Only admins are allowed to GET devops metrics dashboard
    const role = req.user.role;
    if (!role || role.toLowerCase() !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    const devopsMetrics = await analyticsService.getDevOpsMetrics();
    const averageUserPerformance = await engagementService.getAverageUserPerformance();

    res.status(200).json({
      ...devopsMetrics,
      summary: {
        ...devopsMetrics.summary,
        averageUserPerformance,
      }
    });
  } else if (req.method === 'POST') {
    const { type, payload } = req.body;
    const newMetric = await deps.prisma.devOpsMetric.create({
      data: {
        type,
        payload: JSON.stringify(payload),
      },
    });
    res.status(201).json(newMetric);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(devopsHandler);
