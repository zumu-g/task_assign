import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Calendar,
  Clock,
  Users,
  Filter,
  Search,
  MoreHorizontal
} from 'lucide-react';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day'); // day, week, month
  const [selectedTime, setSelectedTime] = useState(null);

  // Generate time slots for the day view
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour < 19; hour++) {
      const time = `${hour}:00`;
      const timeLabel = hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
      if (hour === 12) {
        slots.push({ time, label: '12 PM' });
      } else {
        slots.push({ time, label: timeLabel });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  // Sample events for demonstration
  const events = [
    {
      id: 1,
      title: 'Team Standup',
      time: '9:00',
      duration: 30,
      attendees: ['Alice', 'Bob', 'Carol'],
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Design Review',
      time: '14:00',
      duration: 60,
      attendees: ['Design Team'],
      type: 'review'
    }
  ];

  const ViewModeToggle = () => (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {['day', 'week', 'month'].map((mode) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            viewMode === mode
              ? 'bg-white text-gray-900 shadow-sm transform scale-105'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );

  const EventCard = ({ event }) => (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-2 hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
          <div className="flex items-center space-x-2 mt-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-600">
              {event.time} ({event.duration}min)
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Users className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-600">
              {event.attendees.join(', ')}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Schedule</h1>
            <button className="btn-primary-enhanced">
              <Plus className="w-4 h-4" />
              <span>New Event</span>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex space-x-1">
              <button
                onClick={() => navigateDate(-1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => navigateDate(1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Mini calendar grid would go here */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="h-8 flex items-center justify-center font-medium text-gray-500">
                {day}
              </div>
            ))}
            {/* Calendar days would be generated here */}
            {Array.from({ length: 35 }, (_, i) => (
              <button
                key={i}
                className={`h-8 flex items-center justify-center text-sm rounded hover:bg-gray-100 ${
                  i === 15 ? 'bg-blue-500 text-white' : 'text-gray-700'
                }`}
              >
                {i < 5 ? '' : i - 4}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="p-6 flex-1">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Filters</h3>
          <div className="space-y-2">
            {[
              { name: 'All Events', count: 12, color: 'bg-gray-500' },
              { name: 'Meetings', count: 8, color: 'bg-blue-500' },
              { name: 'Reviews', count: 3, color: 'bg-green-500' },
              { name: 'Personal', count: 1, color: 'bg-purple-500' }
            ].map((filter) => (
              <button
                key={filter.name}
                className="w-full flex items-center justify-between p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${filter.color}`} />
                  <span>{filter.name}</span>
                </div>
                <span className="text-gray-500">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{formatDate(currentDate)}</h1>
              <p className="text-gray-600 mt-1">
                {events.length} events scheduled
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <ViewModeToggle />
              <button className="btn-secondary">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Content */}
        <div className="flex-1 overflow-auto">
          {viewMode === 'day' && (
            <div className="flex">
              {/* Time column */}
              <div className="w-20 border-r border-gray-200 bg-gray-50">
                <div className="h-16"></div> {/* Header spacer */}
                {timeSlots.map((slot) => (
                  <div key={slot.time} className="h-16 border-b border-gray-200 flex items-start justify-end pr-3 pt-2">
                    <span className="text-xs text-gray-500 font-medium">{slot.label}</span>
                  </div>
                ))}
              </div>

              {/* Events column */}
              <div className="flex-1">
                <div className="h-16 border-b border-gray-200 bg-gray-50 flex items-center px-6">
                  <span className="text-sm font-medium text-gray-700">Events</span>
                </div>
                
                {timeSlots.map((slot, index) => (
                  <div 
                    key={slot.time} 
                    className={`h-16 border-b border-gray-200 p-3 hover:bg-gray-50 cursor-pointer ${
                      selectedTime === slot.time ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {/* Events for this time slot */}
                    {events
                      .filter(event => event.time.startsWith(slot.time.split(':')[0]))
                      .map(event => (
                        <EventCard key={event.id} event={event} />
                      ))
                    }
                    
                    {/* Empty slot indicator */}
                    {selectedTime === slot.time && (
                      <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 bg-blue-50">
                        <div className="flex items-center justify-center text-blue-600">
                          <Plus className="w-4 h-4 mr-2" />
                          <span className="text-sm">Add event at {slot.label}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Week and Month views would go here */}
          {viewMode === 'week' && (
            <div className="p-6">
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Week View</h3>
                <p className="text-gray-500">Week view implementation coming soon</p>
              </div>
            </div>
          )}

          {viewMode === 'month' && (
            <div className="p-6">
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Month View</h3>
                <p className="text-gray-500">Month view implementation coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;