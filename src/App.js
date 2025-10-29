import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import { InboxProvider } from './contexts/InboxContext';
import { ViewProvider } from './contexts/ViewContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Inbox from './components/Inbox';
import Canvas from './components/Canvas';
import TaskManager from './components/TaskManager';
import Schedule from './components/Schedule';
import StyleShowcase from './components/StyleShowcase';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">F</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">FlowAI</h1>
          <p className="text-gray-600">Intelligent Task Orchestrator</p>
          <div className="mt-6">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ViewProvider>
        <TaskProvider>
          <InboxProvider>
            <div className="min-h-screen bg-white">
              <Router>
                <Navigation />
                <main className="pt-20 pb-24">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/canvas" element={<Canvas />} />
                    <Route path="/tasks" element={<TaskManager />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/showcase" element={<StyleShowcase />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </Router>
            </div>
          </InboxProvider>
        </TaskProvider>
      </ViewProvider>
    </ErrorBoundary>
  );
}

export default App;