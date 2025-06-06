// Production environment configuration for CoRegulateAI
export const PRODUCTION_CONFIG = {
  // Remove development features in production
  enableDevAuth: false,
  enableTestUsers: false,
  enableDebugLogs: false,
  
  // Production-specific settings
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  rateLimitStrict: true,
  requireHTTPS: true,
  
  // Database settings for production
  connectionPoolSize: 20,
  queryTimeout: 30000,
  
  // Security settings
  enforceCSP: true,
  enableHSTS: true,
  cookieSecure: true
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development' || 
         process.env.REPLIT_DOMAINS?.includes('replit.dev') ||
         process.env.REPLIT_ENV === 'development';
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production' && 
         !process.env.REPLIT_DOMAINS?.includes('replit.dev');
};

// Disable development features in production
export const getEnvironmentConfig = () => {
  if (isProduction()) {
    return {
      ...PRODUCTION_CONFIG,
      environment: 'production'
    };
  }
  
  return {
    enableDevAuth: true,
    enableTestUsers: true,
    enableDebugLogs: true,
    environment: 'development'
  };
};
