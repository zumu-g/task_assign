'use client';

import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('Daily');

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col backdrop-blur-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-sm font-semibold">F</span>
            </div>
            <span className="text-headline font-medium">FlowAI</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <div className="px-3 py-1 text-caption-1 font-medium text-gray-400 uppercase tracking-wider">Main</div>
            <a href="#" className="apple-hover flex items-center px-4 py-3 text-body font-medium text-white bg-gray-800/60 rounded-xl border border-gray-700/50">
              <span className="mr-3 text-lg">📅</span>
              Schedule
            </a>
            <a href="#" className="apple-hover flex items-center px-4 py-3 text-body font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all duration-200">
              <span className="mr-3 text-lg">💡</span>
              Spotlight
            </a>
            <a href="#" className="apple-hover flex items-center px-4 py-3 text-body font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all duration-200">
              <span className="mr-3 text-lg">✓</span>
              My Tasks
            </a>
            <a href="#" className="apple-hover flex items-center px-4 py-3 text-body font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all duration-200">
              <span className="mr-3 text-lg">📊</span>
              Reports
            </a>
            <a href="#" className="apple-hover flex items-center px-4 py-3 text-body font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all duration-200">
              <span className="mr-3 text-lg">💬</span>
              Chat
            </a>
          </div>

          <div className="pt-4 space-y-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-400">Bookmarks</div>
            <a href="#" className="flex items-center px-4 py-2 ml-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-lg transition-all duration-200">
              <span className="mr-3">📂</span>
              Add Bookmark
            </a>
          </div>

          <div className="pt-4 space-y-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-400">Lists</div>
            <a href="#" className="flex items-center px-4 py-2 ml-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-lg transition-all duration-200">
              <span className="mr-3 w-2 h-2 bg-orange-500 rounded-full"></span>
              Get started with Upbase
            </a>
            <a href="#" className="flex items-center px-4 py-2 ml-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-lg transition-all duration-200">
              <span className="mr-3">📋</span>
              SQ work
            </a>
            <a href="#" className="flex items-center px-4 py-2 ml-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-lg transition-all duration-200">
              <span className="mr-3">🏠</span>
              SQ home
            </a>
          </div>

          <div className="pt-4 space-y-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-400">Filters</div>
            <a href="#" className="flex items-center px-4 py-2 ml-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-lg transition-all duration-200">
              <span className="mr-3">🔍</span>
              Add filter
            </a>
          </div>

          <div className="pt-4 space-y-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-400">Tags</div>
            <a href="#" className="flex items-center px-4 py-2 ml-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-lg transition-all duration-200">
              <span className="mr-3">🏷️</span>
              Add tag
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-title-2 font-medium text-gray-900">Schedule</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 text-callout text-gray-600">
                <span className="text-lg">📅</span>
                <span className="font-medium">15 Oct, 2025</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-caption-1 font-medium">Today</span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="apple-hover p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200">
                  <span className="text-lg">🔍</span>
                </button>
                <button className="apple-hover p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200">
                  <span className="text-lg">⚙️</span>
                </button>
                <button className="apple-hover p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200">
                  <span className="text-lg">🔔</span>
                </button>
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-callout font-medium shadow-md ml-2">
                  U
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-xl border-b border-gray-200/60 px-8">
          <nav className="flex space-x-8">
            {['Inbox', 'Weekly', 'Daily', 'Notepad', 'Timer', 'Recent'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-callout transition-all duration-200 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {children}
        </div>
      </div>
    </div>
  );
}