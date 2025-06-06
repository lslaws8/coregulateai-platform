import type { Express } from "express";
import { setupDevAuth } from "./dev-auth";

export async function registerRoutes(app: Express) {
  // Setup development authentication
  setupDevAuth(app);
  
  // Basic API routes
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // User authentication endpoint
  app.get('/api/auth/user', (req: any, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  });

  // Basic login redirect
  app.get('/api/login', (req, res) => {
    res.redirect('/dashboard');
  });

  // Basic logout
  app.get('/api/logout', (req, res) => {
    res.redirect('/');
  });
}
