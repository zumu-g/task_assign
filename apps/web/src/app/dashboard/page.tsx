'use client';

import { useState } from 'react';

export default function DashboardPage() {
  const [inputValue, setInputValue] = useState('');

  const timeSlots = [
    '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', 
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log('New task:', inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex-1 flex">
      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Date Header */}
        <div className="mb-8">
          <h2 className="text-title-1 font-medium text-gray-900 mb-4">Wed, Oct 15, 2025</h2>
          
          {/* Task Input */}
          <form onSubmit={handleSubmit} className="mt-8">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type '/' to insert"
              className="w-full p-4 text-body border-none outline-none bg-transparent text-gray-600 placeholder-gray-400 focus:bg-gray-50/50 rounded-xl transition-all duration-200"
            />
          </form>
        </div>

        {/* Time Slots */}
        <div className="space-y-8">
          {timeSlots.map((time) => (
            <div key={time} className="flex items-start space-x-6 apple-hover rounded-xl p-3 -mx-3 transition-all duration-200">
              <div className="w-20 text-subheadline font-medium text-gray-500 pt-2">
                {time}
              </div>
              <div className="flex-1 min-h-[48px] border-l-2 border-gray-200/60 pl-6 hover:border-gray-300 transition-colors duration-200">
                {/* Task items would go here */}
                <div className="min-h-[24px]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Calendar */}
      <div className="w-96 bg-white/95 backdrop-blur-xl border-l border-gray-200/60 p-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-title-3 font-medium text-gray-900">Calendar</h3>
          <div className="flex items-center space-x-3 text-callout">
            <span className="text-gray-500 font-medium">Wed</span>
            <span className="font-semibold text-gray-900">15</span>
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="mb-8">
          <div className="grid grid-cols-7 gap-2 text-caption-1 text-gray-500 mb-3">
            <div className="text-center py-2 font-medium">S</div>
            <div className="text-center py-2 font-medium">M</div>
            <div className="text-center py-2 font-medium">T</div>
            <div className="text-center py-2 font-medium">W</div>
            <div className="text-center py-2 font-medium">T</div>
            <div className="text-center py-2 font-medium">F</div>
            <div className="text-center py-2 font-medium">S</div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {/* Calendar days */}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 5; // Offset for the month start
              const isToday = day === 15;
              const isCurrentMonth = day > 0 && day <= 31;
              
              return (
                <div
                  key={i}
                  className={`
                    text-center py-3 text-callout cursor-pointer transition-all duration-200 font-medium
                    ${isToday 
                      ? 'bg-blue-500 text-white rounded-full shadow-md' 
                      : isCurrentMonth 
                        ? 'text-gray-900 hover:bg-gray-100 rounded-lg apple-hover'
                        : 'text-gray-300'
                    }
                  `}
                >
                  {isCurrentMonth ? day : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks/Events */}
        <div className="space-y-4">
          <div className="bg-red-50/80 border-l-4 border-red-400 p-4 rounded-xl apple-hover transition-all duration-200">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-red-400 rounded-full mt-2 mr-4"></div>
              <div className="flex-1">
                <h4 className="text-callout font-medium text-gray-900 leading-tight">Welcome to FlowAI. Check out our getting started guide</h4>
                <p className="text-caption-1 text-gray-500 mt-2 font-medium">6m, 0m</p>
              </div>
            </div>
          </div>

          <button className="apple-hover w-full text-left text-callout text-gray-500 hover:text-gray-700 p-3 rounded-xl transition-all duration-200">
            + Add New
          </button>
        </div>

        {/* All Lists Button */}
        <div className="mt-8">
          <button className="apple-hover w-full flex items-center text-left text-callout text-blue-600 hover:text-blue-700 p-3 rounded-xl transition-all duration-200">
            <span className="mr-3 text-lg">📋</span>
            All lists
          </button>
        </div>
      </div>
    </div>
  );
}