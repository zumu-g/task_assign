import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import { ChatProvider } from './contexts/ChatContext';
import { TicketProvider } from './contexts/TicketContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inbox from './components/Inbox';
import TaskManager from './components/TaskManager';
import Calendar from './components/Calendar';
import Chat from './components/Chat';
import Tickets from './components/Tickets';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <TaskProvider>
        <ChatProvider>
          <TicketProvider>
            <Router>
              <Sidebar 
                isOpen={sidebarOpen} 
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                currentView={currentView}
                onViewChange={setCurrentView}
              />
              <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/tasks" element={<TaskManager />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </Router>
          </TicketProvider>
        </ChatProvider>
      </TaskProvider>
    </div>
  );
}

export default App;