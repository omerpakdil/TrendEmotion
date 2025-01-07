import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Dashboard } from './pages/Dashboard';
import { Watchlist } from './pages/Watchlist';
import { Analysis } from './pages/Analysis';
import { Profile } from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Wrapper component for auth pages
const AuthRoute = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { user } = useAuth();
  
  // Redirect to dashboard if user is already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
};

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <BrowserRouter>
                <div className="min-h-screen relative overflow-hidden transition-colors duration-200 bg-app">
                  {/* Background Pattern */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div 
                      className="absolute inset-0 bg-gradient-to-b transition-colors duration-200" 
                      style={{ 
                        background: 'linear-gradient(180deg, var(--background-primary) 0%, transparent 50%, var(--background-primary) 100%)'
                      }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <Layout>
                      <AnimatePresence mode="wait">
                        <Routes>
                          {/* Public Routes */}
                          <Route 
                            path="/" 
                            element={
                              <motion.div
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={pageVariants}
                                transition={{ duration: 0.3 }}
                              >
                                <Home />
                              </motion.div>
                            } 
                          />
                          
                          {/* Auth Routes */}
                          <Route
                            path="/login"
                            element={
                              <AuthRoute>
                                <motion.div
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  variants={pageVariants}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Login />
                                </motion.div>
                              </AuthRoute>
                            }
                          />
                          <Route
                            path="/register"
                            element={
                              <AuthRoute>
                                <motion.div
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  variants={pageVariants}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Register />
                                </motion.div>
                              </AuthRoute>
                            }
                          />
                          
                          {/* Protected Routes */}
                          <Route
                            path="/dashboard"
                            element={
                              <ProtectedRoute>
                                <motion.div
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  variants={pageVariants}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Dashboard />
                                </motion.div>
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/watchlist"
                            element={
                              <ProtectedRoute>
                                <motion.div
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  variants={pageVariants}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Watchlist />
                                </motion.div>
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/analysis"
                            element={
                              <ProtectedRoute>
                                <motion.div
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  variants={pageVariants}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Analysis />
                                </motion.div>
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute>
                                <motion.div
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  variants={pageVariants}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Profile />
                                </motion.div>
                              </ProtectedRoute>
                            }
                          />

                          {/* Catch all route */}
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </AnimatePresence>
                    </Layout>
                  </div>
                </div>
              </BrowserRouter>
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--card-background)',
              color: 'var(--text-primary)',
              border: '1px solid var(--card-border)',
            },
          }}
        />
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
