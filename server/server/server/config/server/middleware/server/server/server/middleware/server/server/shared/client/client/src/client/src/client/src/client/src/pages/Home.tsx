import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-redirect to dashboard
    setLocation('/dashboard');
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">CoRegulateAI</h1>
        <p className="text-xl text-gray-600 mb-8">
          Advanced mental health platform delivering personalized, trauma-informed therapeutic experiences
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
