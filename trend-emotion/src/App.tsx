import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <div className="text-center p-8">Dashboard (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <div className="text-center p-8">Watchlist (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analysis"
                element={
                  <ProtectedRoute>
                    <div className="text-center p-8">Analysis (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
