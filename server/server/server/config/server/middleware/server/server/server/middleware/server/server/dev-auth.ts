import type { Express } from "express";
import { isDevelopment } from "./config/production";

// Development authentication bypass
export function setupDevAuth(app: Express) {
  // Only enable in true development environment (not production)
  if (isDevelopment()) {
    // Add middleware to inject development user into all requests
    app.use('/api', (req: any, res, next) => {
      // Skip if already authenticated
      if (req.user) {
        return next();
      }
      
      // Inject development user for all API requests
      req.user = {
        id: 'dev-user-123',
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Friend',
        lastName: 'User',
        profileImageUrl: null,
        isAdmin: false,
        subscriptionStatus: null,
        subscriptionTier: 'free',
        claims: { sub: 'dev-user-123' }
      };
      
      // Mock authentication methods
      req.isAuthenticated = () => true;
      
      next();
    });

    console.log('Development authentication bypass enabled');
  }
}
