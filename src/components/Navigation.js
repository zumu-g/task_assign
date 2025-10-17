import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useView } from '../contexts/ViewContext';
import { 
  Inbox, 
  Layers,
  CheckSquare2,
  Calendar,
  Settings,
  Menu,
  X
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const { currentView, setCurrentView } = useView();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    {
      id: 'inbox',
      name: 'Inbox',
      path: '/inbox',
      icon: Inbox,
      description: 'Capture and process new tasks'
    },
    {
      id: 'canvas',
      name: 'Canvas',
      path: '/canvas',
      icon: Layers,
      description: 'Visual task organization'
    },
    {
      id: 'schedule',
      name: 'Schedule',
      path: '/schedule',
      icon: Calendar,
      description: 'Calendar and event management'
    },
    {
      id: 'tasks',
      name: 'Tasks',
      path: '/tasks',
      icon: CheckSquare2,
      description: 'Task management and tracking'
    },
    {
      id: 'showcase',
      name: 'Showcase',
      path: '/showcase',
      icon: Settings,
      description: 'Design system showcase'
    }
  ];

  const NavItem = ({ item, isMobile = false }) => {
    const isActive = location.pathname === item.path;
    const baseClasses = `
      group flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg 
      transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-offset-2 focus-visible:ring-blue-500
    `;
    
    const activeClasses = isActive 
      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';

    return (
      <Link
        to={item.path}
        className={`${baseClasses} ${activeClasses}`}
        onClick={() => {
          setCurrentView(item.id);
          if (isMobile) setIsMobileMenuOpen(false);
        }}
        aria-current={isActive ? 'page' : undefined}
        aria-describedby={`${item.id}-description`}
      >
        <item.icon 
          className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}
          aria-hidden="true"
        />
        <span>{item.name}</span>
        <span id={`${item.id}-description`} className="sr-only">
          {item.description}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white border-b border-gray-200" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="flex items-center space-x-3 text-xl font-bold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1"
                aria-label="FlowAI Home"
              >
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span>FlowAI</span>
              </Link>

              {/* Navigation Items */}
              <div className="flex space-x-1" role="menubar">
                {navigationItems.map((item) => (
                  <div key={item.id} role="none">
                    <NavItem item={item} />
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="flex items-center">
              <button
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b border-gray-200" role="navigation" aria-label="Mobile navigation">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-lg font-bold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1"
              aria-label="FlowAI Home"
            >
              <div className="w-7 h-7 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">F</span>
              </div>
              <span>FlowAI</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu" 
            className="px-4 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200"
            role="menu"
          >
            {navigationItems.map((item) => (
              <div key={item.id} role="none">
                <NavItem item={item} isMobile={true} />
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <button
                className="group flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 w-full"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-600" aria-hidden="true" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;