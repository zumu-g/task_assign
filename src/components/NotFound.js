import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Graphic */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-blue-600">404</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page not found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            to="/inbox"
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go to Inbox</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary w-full flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-sm font-medium text-gray-900 mb-4">You might be looking for:</h2>
          <div className="space-y-2">
            <Link
              to="/inbox"
              className="block text-sm text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1"
            >
              Inbox - Capture and process new tasks
            </Link>
            <Link
              to="/canvas"
              className="block text-sm text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1"
            >
              Canvas - Visual task organization
            </Link>
            <Link
              to="/tasks"
              className="block text-sm text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1"
            >
              Tasks - Task management and tracking
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Still having trouble? 
            <button className="ml-1 text-blue-600 hover:text-blue-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;