import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Settings, 
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import StatusFlow from './StatusFlow';
import LoadingSkeleton from './LoadingSkeleton';

const StyleShowcase = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('todo');
  const [progressValue, setProgressValue] = useState(45);

  const statuses = ['todo', 'in_progress', 'in_review', 'done'];

  const cycleStatus = () => {
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    setCurrentStatus(statuses[nextIndex]);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-title">Enhanced Design System Showcase</h1>
        <p className="text-body">Explore the new Pinterest-inspired design patterns and micro-interactions</p>
      </div>

      {/* Enhanced Buttons */}
      <section className="space-y-6">
        <h2 className="text-subtitle">Enhanced Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary-enhanced">
            <Sparkles className="w-4 h-4" />
            <span>Enhanced Primary</span>
          </button>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            <span>Secondary Button</span>
          </button>
          <button className="btn-ghost">
            <Settings className="w-4 h-4" />
            <span>Ghost Button</span>
          </button>
          <button 
            className={`btn-primary-enhanced ${showLoading ? 'loading-shimmer' : ''}`}
            onClick={() => setShowLoading(!showLoading)}
          >
            {showLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{showLoading ? 'Loading...' : 'Toggle Loading'}</span>
          </button>
        </div>
      </section>

      {/* Task Cards */}
      <section className="space-y-6">
        <h2 className="text-subtitle">Enhanced Task Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Normal Priority Card */}
          <div className="task-card-enhanced priority-indicator">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Design System Updates</h3>
                <p className="text-sm text-gray-600 mb-3">Implement new Pinterest-inspired color palette and micro-interactions</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="priority-medium">Medium</span>
                <span className="status-in-progress">In Progress</span>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span className="font-medium">3 / 7</span>
                </div>
                <div className="progress-bar-enhanced">
                  <div className="progress-fill-enhanced" style={{ width: '43%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* High Priority Card */}
          <div className="task-card-enhanced priority-indicator priority-high">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Critical Bug Fix</h3>
                <p className="text-sm text-gray-600 mb-3">Fix authentication flow breaking in production</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="priority-high">High</span>
                <span className="status-todo">To Do</span>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span className="font-medium">0 / 4</span>
                </div>
                <div className="progress-bar-enhanced">
                  <div className="progress-fill-enhanced" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Completed Card */}
          <div className="task-card-enhanced priority-indicator">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">User Testing</h3>
                <p className="text-sm text-gray-600 mb-3">Conduct usability testing with 10 participants</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="priority-low">Low</span>
                <span className="status-done">Done</span>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span className="font-medium">5 / 5</span>
                </div>
                <div className="progress-bar-enhanced">
                  <div className="progress-fill-enhanced" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Flow */}
      <section className="space-y-6">
        <h2 className="text-subtitle">Status Flow Visualization</h2>
        <div className="flow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-gray-900">Current Status: {currentStatus.replace('_', ' ')}</h3>
              <p className="text-sm text-gray-600">Click the button to cycle through statuses</p>
            </div>
            <button onClick={cycleStatus} className="btn-primary-enhanced">
              <Play className="w-4 h-4" />
              <span>Next Status</span>
            </button>
          </div>
          <StatusFlow currentStatus={currentStatus} />
        </div>
      </section>

      {/* Progress Bars */}
      <section className="space-y-6">
        <h2 className="text-subtitle">Enhanced Progress Bars</h2>
        <div className="flow-card space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Project Completion</span>
              <span className="text-sm font-medium text-gray-700">{progressValue}%</span>
            </div>
            <div className="progress-bar-enhanced">
              <div 
                className="progress-fill-enhanced" 
                style={{ width: `${progressValue}%` }} 
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
              className="btn-secondary"
            >
              -10%
            </button>
            <button 
              onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
              className="btn-secondary"
            >
              +10%
            </button>
            <button 
              onClick={() => setProgressValue(100)}
              className="btn-primary-enhanced"
            >
              Complete
            </button>
          </div>
        </div>
      </section>

      {/* Loading Skeletons */}
      <section className="space-y-6">
        <h2 className="text-subtitle">Loading States</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-heading">Card Loading</h3>
            <LoadingSkeleton type="card" count={2} />
          </div>
          <div>
            <h3 className="text-heading">List Loading</h3>
            <LoadingSkeleton type="list" count={3} />
          </div>
          <div className="flex gap-4">
            <div>
              <h3 className="text-heading mb-2">Button Loading</h3>
              <LoadingSkeleton type="button" />
            </div>
            <div>
              <h3 className="text-heading mb-2">Text Loading</h3>
              <LoadingSkeleton type="text" />
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Showcases */}
      <section className="space-y-6">
        <h2 className="text-subtitle">Gradient Combinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="gradient-primary text-white p-6 rounded-xl text-center">
            <h3 className="font-semibold mb-2">Primary Gradient</h3>
            <p className="text-sm opacity-90">Pink to Purple</p>
          </div>
          <div className="gradient-warm text-white p-6 rounded-xl text-center">
            <h3 className="font-semibold mb-2">Warm Gradient</h3>
            <p className="text-sm opacity-90">Orange to Pink</p>
          </div>
          <div className="gradient-cool text-white p-6 rounded-xl text-center">
            <h3 className="font-semibold mb-2">Cool Gradient</h3>
            <p className="text-sm opacity-90">Cyan to Purple</p>
          </div>
        </div>
      </section>

      {/* Calendar Integration Colors */}
      <section className="space-y-6">
        <h2 className="text-subtitle">Calendar Integration</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="calendar-today p-4 rounded-xl text-center">
            <h3 className="font-semibold mb-1">Today</h3>
            <p className="text-sm opacity-90">Current day</p>
          </div>
          <div className="calendar-upcoming p-4 rounded-xl text-center">
            <h3 className="font-semibold mb-1">Upcoming</h3>
            <p className="text-sm opacity-90">Future tasks</p>
          </div>
          <div className="calendar-past-due p-4 rounded-xl text-center">
            <h3 className="font-semibold mb-1">Past Due</h3>
            <p className="text-sm opacity-90">Overdue items</p>
          </div>
          <div className="calendar-completed p-4 rounded-xl text-center">
            <h3 className="font-semibold mb-1">Completed</h3>
            <p className="text-sm opacity-90">Finished tasks</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleShowcase;