const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: 'production'
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

// Main landing page with full CoRegulateAI design
app.get('*', (req, res) => {
  res.send(`[Full HTML content as shown above]`);
});

module.exports = app;
