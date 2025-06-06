import { Router, Route, Switch } from 'wouter';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
                <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">
                  Return Home
                </a>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
