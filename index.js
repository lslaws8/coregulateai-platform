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

// Main landing page
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CoRegulateAI - AI-Powered Mental Health Platform</title>
      <meta name="description" content="Transform your mental wellness with CoRegulateAI's HIPAA-compliant platform. Experience personalized AI coaching, trauma-informed therapy, and comprehensive wellness tracking.">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      </style>
    </head>
    <body class="bg-gray-50">
      <!-- Navigation -->
      <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <h1 class="text-2xl font-bold text-indigo-600">CoRegulateAI</h1>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="gradient-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span class="block">Transform Your</span>
              <span class="block text-indigo-200">Mental Wellness</span>
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Experience personalized AI coaching with our HIPAA-compliant platform. Advanced therapeutic support, trauma-informed care, and comprehensive wellness tracking.
            </p>
            <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div class="rounded-md shadow">
                <button class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors">
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Advanced AI-Powered Mental Health Support
            </p>
          </div>

          <div class="mt-10">
            <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div class="bg-white p-6 rounded-lg shadow-md card-hover">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">AI-Powered Coaching</h3>
                    <p class="mt-2 text-base text-gray-500">
                      Personalized therapeutic support powered by advanced OpenAI GPT-4o technology, tailored to your unique mental health journey.
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-lg shadow-md card-hover">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">HIPAA Compliant</h3>
                    <p class="mt-2 text-base text-gray-500">
                      Bank-level security with end-to-end encryption ensuring your personal mental health data remains completely private and secure.
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-lg shadow-md card-hover">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Wellness Analytics</h3>
                    <p class="mt-2 text-base text-gray-500">
                      Comprehensive tracking and insights into your mental health progress with interactive visualizations and personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 rounded-lg shadow-md card-hover">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Trauma-Informed Care</h3>
                    <p class="mt-2 text-base text-gray-500">
                      Specialized therapeutic approaches designed with trauma-informed principles to provide safe, effective mental health support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-indigo-700">
        <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            <span class="block">Ready to transform your mental wellness?</span>
          </h2>
          <p class="mt-4 text-lg leading-6 text-indigo-200">
            Join thousands who have already started their journey with CoRegulateAI's advanced AI-powered mental health platform.
          </p>
          <button class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto transition-colors">
            Get Started Today
          </button>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-gray-800">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-white">CoRegulateAI</h3>
            <p class="mt-2 text-gray-300">HIPAA-Compliant AI Mental Health Platform</p>
            <p class="mt-4 text-sm text-gray-400">
              © 2024 CoRegulateAI. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>

      <script>
        console.log('CoRegulateAI Platform Loaded');
        
        document.querySelectorAll('button').forEach(button => {
          button.addEventListener('click', () => {
            console.log('Button clicked:', button.textContent);
          });
        });
      </script>
    </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('CoRegulateAI server running on port ' + port);
});

module.exports = app;
