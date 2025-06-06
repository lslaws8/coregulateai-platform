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
    environment: process.env.NODE_ENV || 'production'
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

    // Background optimization (non-blocking)
    setTimeout(async () => {
      try {
        // Apply database optimizations
        const { optimizeQueries } = await import('./db-performance-optimization');
        await optimizeQueries();
        log("Database optimizations applied");
      } catch (error) {
        console.error("Background optimization error:", error);
      }
    }, 2000);

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

// Start the server with performance optimizations
async function initializeServer() {
  try {
    await startServer();
    
    // Apply database optimizations after server starts
    const { DatabaseOptimizer } = await import("./utils/database-optimizer");
    const optimizer = DatabaseOptimizer.getInstance();
    
    console.log("🔧 Optimizing database queries...");
    await optimizer.createOptimalIndexes();
    await optimizer.optimizeQueries();
    console.log("⚡ Database optimizations applied");
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

// Initialize routes and middleware for production
async function initializeForProduction() {
  try {
    if (isProduction()) {
      app.use((req, res, next) => {
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        next();
      });
      
      setupProductionAuth(app);
      blockDevFeatures(app);
    }
    
    await registerRoutes(app);
    
    // Simple static file serving for production
    app.get('*', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>CoRegulateAI</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                   margin: 0; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                   min-height: 100vh; display: flex; align-items: center; justify-content: center; }
            .container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
                        text-align: center; max-width: 600px; }
            h1 { color: #333; margin-bottom: 20px; font-size: 2.5em; }
            p { color: #666; line-height: 1.6; margin-bottom: 30px; }
            .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 30px; }
            .feature { background: #f8f9fa; padding: 20px; border-radius: 8px; }
            .feature h3 { color: #333; margin-bottom: 10px; }
            .status { background: #e8f5e8; color: #2d5a2d; padding: 10px; border-radius: 6px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="status">✅ System Operational</div>
            <h1>CoRegulateAI</h1>
            <p>Advanced mental health platform delivering personalized, trauma-informed therapeutic experiences through intelligent digital coaching technologies.</p>
            
            <div class="features">
              <div class="feature">
                <h3>🧠 AI-Powered Coaching</h3>
                <p>Context-aware therapeutic support using OpenAI GPT-4</p>
              </div>
              <div class="feature">
                <h3>📊 Wellness Analytics</h3>
                <p>Comprehensive user-centric tracking and insights</p>
              </div>
              <div class="feature">
                <h3>🔒 HIPAA Compliant</h3>
                <p>Enterprise-grade security with encryption</p>
              </div>
              <div class="feature">
                <h3>🎨 Responsive Design</h3>
                <p>Modern UI with performance optimization</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);
    });
    
  } catch (error) {
    console.error("Production initialization error:", error);
  }
}

// Initialize for production deployment
if (isProduction()) {
  initializeForProduction();
}

// Export for Vercel serverless deployment
export default app;

// Initialize server for local development
if (process.env.NODE_ENV !== 'production') {
  initializeServer();
}
});

// Start the server
startServer();
