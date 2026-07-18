import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// High-performance Edge-compatible in-memory Rate Limiter
// Maps client IPs or authorization tokens to request timestamp arrays
const ipRequestCache = new Map<string, number[]>();

export function middleware(request: NextRequest) {
  // Only apply rate limiting to pages and API endpoints, skipping next static files
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.wasm')
  ) {
    return NextResponse.next();
  }

  const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 100; // Max 100 requests per minute

  let timestamps = ipRequestCache.get(ip) || [];
  // Filter out timestamps older than the window
  timestamps = timestamps.filter(time => now - time < windowMs);

  timestamps.push(now);
  ipRequestCache.set(ip, timestamps);

  if (timestamps.length > maxRequests) {
    return new NextResponse(
      JSON.stringify({ message: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil(windowMs / 1000).toString(),
        },
      }
    );
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', Math.max(0, maxRequests - timestamps.length).toString());
  return response;
}

// Config to match all routes
export const config = {
  matcher: [
    '/api/:path*',
    '/:path*',
  ],
};
