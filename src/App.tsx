import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ContentHistoryPage from './pages/dashboard/ContentHistoryPage';
import GenerateContentPage from './pages/dashboard/GenerateContentPage';
import ContentDetailPage from './pages/dashboard/ContentDetailPage';
import ProcessingPage from './pages/dashboard/ProcessingPage';
import ResultsPage from './pages/dashboard/ResultsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                }
              }}
            />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/content" element={<ContentHistoryPage />} />
              <Route path="/dashboard/content/:id" element={<ContentDetailPage />} />
              <Route path="/dashboard/generate" element={<GenerateContentPage />} />
              <Route path="/dashboard/generate/processing" element={<ProcessingPage />} />
              <Route path="/dashboard/generate/results" element={<ResultsPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
