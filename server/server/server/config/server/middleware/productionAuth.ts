import type { Express, Request, Response, NextFunction } from "express";
import { isProduction } from "../config/production";

// Production authentication middleware
export function setupProductionAuth(app: Express) {
  if (isProduction()) {
    // Require proper authentication for all protected routes
    app.use('/api', (req: any, res: Response, next: NextFunction) => {
      // Allow health checks without authentication
      if (req.path === '/health' || req.path.startsWith('/api/health')) {
        return next();
      }
      
      // Allow public endpoints
      const publicEndpoints = [
        '/api/auth/user',
        '/api/login',
        '/api/logout',
        '/api/auth/google',
        '/api/auth/callback'
      ];
      
      if (publicEndpoints.some(endpoint => req.path.startsWith(endpoint))) {
        return next();
      }
      
      // Check for valid authentication
      if (!req.user && !req.isAuthenticated?.()) {
        return res.status(401).json({ 
          error: 'Authentication required',
          loginUrl: '/api/login'
        });
      }
      
      next();
    });

    console.log('Production authentication enabled - development features disabled');
  }
}

// Middleware to block development features in production
export function blockDevFeatures(app: Express) {
  if (isProduction()) {
    // Block access to development-only endpoints
    const devOnlyEndpoints = [
      '/api/dev',
      '/api/test',
      '/api/debug',
      '/api/seed'
    ];

    devOnlyEndpoints.forEach(endpoint => {
      app.use(endpoint, (req: Request, res: Response) => {
        res.status(404).json({ error: 'Not found' });
      });
    });
  }
}
