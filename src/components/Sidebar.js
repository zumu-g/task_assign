import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Inbox, 
  CheckSquare, 
  Calendar, 
  MessageCircle, 
  Headphones, 
  Settings,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle, currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', path: '/dashboard', icon: Home, label: 'Dashboard' },
    { id: 'inbox', path: '/inbox', icon: Inbox, label: 'Inbox' },
    { id: 'tasks', path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'calendar', path: '/calendar', icon: Calendar, label: 'Calendar' },
    { id: 'chat', path: '/chat', icon: MessageCircle, label: 'Chat' },
    { id: 'tickets', path: '/tickets', icon: Headphones, label: 'Support' },
    { id: 'settings', path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isOpen && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">TaskAssign</h1>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {!isOpen && (
                <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-sm text-gray-900 mb-1">AI Assistant</h3>
            <p className="text-xs text-gray-600 mb-3">
              Let AI help you create and organize tasks automatically
            </p>
            <button className="btn-primary w-full text-xs py-2">
              Try AI Features
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;