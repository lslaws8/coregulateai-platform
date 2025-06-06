import type { Request, Response, NextFunction } from "express";

// Simple in-memory rate limiter
const requests = new Map<string, { count: number; resetTime: number }>();

export function databaseRateLimiter(req: Request, res: Response, next: NextFunction) {
  const clientIP = req.ip || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100; // 100 requests per minute

  // Clean up old entries
  for (const [ip, data] of requests.entries()) {
    if (now > data.resetTime) {
      requests.delete(ip);
    }
  }

  // Get or create entry for this IP
  let requestData = requests.get(clientIP);
  if (!requestData || now > requestData.resetTime) {
    requestData = { count: 0, resetTime: now + windowMs };
    requests.set(clientIP, requestData);
  }

  // Check rate limit
  if (requestData.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter: Math.ceil((requestData.resetTime - now) / 1000)
    });
  }

  // Increment counter
  requestData.count++;
  next();
}
