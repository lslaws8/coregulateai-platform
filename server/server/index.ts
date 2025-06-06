import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { databaseRateLimiter } from "./middleware/rateLimiter";
import { PerformanceCache, withCache } from "./cache";
import { getEnvironmentConfig, isProduction } from "./config/production";
import { setupProductionAuth, blockDevFeatures } from "./middleware/productionAuth";

// Initialize express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply rate limiting to all API routes
app.use('/api', databaseRateLimiter);

// Health check endpoint (must be before other middleware)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    cache: PerformanceCache.getStats()
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Express error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

async function startServer() {
  try {
    const envConfig = getEnvironmentConfig();
    log(`Initializing CoRegulateAI server in ${envConfig.environment} mode...`);
    
    // Production security headers
    if (isProduction()) {
      app.use((req, res, next) => {
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        next();
      });
    }
    
    // Create HTTP server
    const server = createServer(app);
    
    // Setup production authentication and security
    setupProductionAuth(app);
    blockDevFeatures(app);
    
    // Register API routes
    await registerRoutes(app);
    
    // Setup Vite for frontend serving
    await setupVite(app, server);
    
    // Start server
    const port = process.env.PORT || 5000;
    server.listen(parseInt(port.toString()), '0.0.0.0', () => {
      log(`CoRegulateAI serving on port ${port}`);
      log("Server ready - Enhanced AI Coach and Crisis Resources available");
    });

    // Handle server errors
    server.on('error', (error: any) => {
      console.error('Server error:', error);
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();
