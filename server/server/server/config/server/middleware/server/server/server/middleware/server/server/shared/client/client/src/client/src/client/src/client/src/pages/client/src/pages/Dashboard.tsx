import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/auth/user'],
    queryFn: async () => {
      const response = await fetch('/api/auth/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },
  });

  const { data: health } = useQuery({
    queryKey: ['/api/health'],
    queryFn: async () => {
      const response = await fetch('/api/health');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">CoRegulateAI</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-gray-700">
                  Welcome, {user.firstName || user.username || 'User'}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Welcome Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">AI</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Welcome to CoRegulateAI
                    </h3>
                    <p className="text-sm text-gray-500">
                      Your mental health and wellness platform
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      System Status
                    </h3>
                    <p className="text-sm text-gray-500">
                      {health?.status === 'ok' ? 'All systems operational' : 'Checking status...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Environment Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">⚙</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Environment
                    </h3>
                    <p className="text-sm text-gray-500">
                      {health?.environment || 'Loading...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Main Content Area */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Getting Started
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    Welcome to CoRegulateAI, your personalized mental health and wellness platform. 
                    This platform provides trauma-informed therapeutic experiences through intelligent 
                    digital coaching technologies.
                  </p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">🧠 AI Coaching</h4>
                      <p className="text-sm text-gray-600">
                        Access personalized AI-powered coaching sessions tailored to your needs.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">📊 Wellness Tracking</h4>
                      <p className="text-sm text-gray-600">
                        Monitor your progress with comprehensive analytics and insights.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">🔒 HIPAA Compliant</h4>
                      <p className="text-sm text-gray-600">
                        Your data is protected with enterprise-grade security and encryption.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">🌟 Personalized</h4>
                      <p className="text-sm text-gray-600">
                        Every experience is customized to your unique therapeutic journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
