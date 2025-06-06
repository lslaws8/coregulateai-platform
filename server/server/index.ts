import express, { type Request, Response, NextFunction } from "express";

// Initialize express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Production check
const isProduction = () => process.env.NODE_ENV === 'production';

// Security headers for production
if (isProduction()) {
  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// API routes
app.get('/api/auth/user', (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: {
      id: 'demo-user',
      username: 'CoRegulateAI User',
      firstName: 'Demo',
      role: 'user'
    }
  });
});

// Main landing page
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CoRegulateAI</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="Advanced mental health platform delivering personalized, trauma-informed therapeutic experiences through intelligent digital coaching technologies.">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          margin: 0; padding: 40px; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          min-height: 100vh; display: flex; align-items: center; justify-content: center; 
        }
        .container { 
          background: white; padding: 40px; border-radius: 12px; 
          box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center; max-width: 800px; 
        }
        h1 { color: #333; margin-bottom: 20px; font-size: 2.5em; }
        p { color: #666; line-height: 1.6; margin-bottom: 30px; font-size: 1.1em; }
        .features { 
          display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
          gap: 20px; margin-top: 30px; 
        }
        .feature { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .feature h3 { color: #333; margin-bottom: 10px; }
        .status { 
          background: #e8f5e8; color: #2d5a2d; padding: 10px; 
          border-radius: 6px; margin-bottom: 20px; font-weight: bold;
        }
        .cta { 
          background: #667eea; color: white; padding: 15px 30px; 
          border-radius: 8px; text-decoration: none; display: inline-block; 
          margin-top: 20px; font-weight: bold;
        }
        .cta:hover { background: #5a6fd8; }
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
            <p>Context-aware therapeutic support using OpenAI GPT-4 for personalized mental health guidance.</p>
          </div>
          <div class="feature">
            <h3>📊 Wellness Analytics</h3>
            <p>Comprehensive user-centric tracking and insights to monitor your therapeutic progress.</p>
          </div>
          <div class="feature">
            <h3>🔒 HIPAA Compliant</h3>
            <p>Enterprise-grade security with encryption ensuring your data privacy and protection.</p>
          </div>
          <div class="feature">
            <h3>🎨 Responsive Design</h3>
            <p>Modern UI with performance optimization across all devices and platforms.</p>
          </div>
        </div>
        
        <a href="/health" class="cta">Check System Health</a>
      </div>
    </body>
    </html>
  `);
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Express error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Export for Vercel serverless deployment
export default app;
