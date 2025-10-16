import React, { useState, useMemo } from 'react';
import { useTask } from '../contexts/TaskContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus,
  Filter,
  Clock,
  User,
  Flag
} from 'lucide-react';

const Calendar = () => {
  const { tasks, teamMembers } = useTask();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [filterAssignee, setFilterAssignee] = useState('all');

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const tasksWithDates = useMemo(() => {
    return tasks.filter(task => task.dueDate && (filterAssignee === 'all' || task.assignee === filterAssignee));
  }, [tasks, filterAssignee]);

  const getTasksForDate = (date) => {
    const dateString = date.toDateString();
    return tasksWithDates.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === dateString;
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentMonth;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'review': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  const TaskCard = ({ task, isCompact = false }) => {
    const assignee = teamMembers.find(m => m.id === task.assignee);
    const isOverdue = new Date(task.dueDate) < today && task.status !== 'done';
    
    return (
      <div className={`p-2 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
        isOverdue ? 'border-red-500 bg-red-50' : 
        `border-${getPriorityColor(task.priority).replace('bg-', '')} bg-white`
      } ${isCompact ? 'mb-1' : 'mb-2'}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium text-gray-900 truncate ${isCompact ? 'text-xs' : 'text-sm'}`}>
              {task.title}
            </h4>
            {!isCompact && task.description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p>
            )}
            <div className={`flex items-center space-x-2 mt-1 ${isCompact ? 'text-xs' : 'text-sm'}`}>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                getStatusColor(task.status).replace('bg-', 'bg-') + ' text-white'
              }`}>
                {task.status}
              </span>
              {assignee && (
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {assignee.name.charAt(0)}
                    </span>
                  </div>
                  {!isCompact && <span className="text-gray-600 text-xs">{assignee.name}</span>}
                </div>
              )}
            </div>
          </div>
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityColor(task.priority)}`} />
        </div>
      </div>
    );
  };

  const MonthView = () => {
    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDate = new Date(currentYear, currentMonth, -firstDayOfMonth + i + 1);
      const dayTasks = getTasksForDate(prevMonthDate);
      
      calendarDays.push(
        <div key={`prev-${i}`} className="min-h-32 p-2 bg-gray-50 border border-gray-200">
          <div className="text-sm text-gray-400 mb-2">{prevMonthDate.getDate()}</div>
          <div className="space-y-1">
            {dayTasks.slice(0, 2).map(task => (
              <TaskCard key={task.id} task={task} isCompact />
            ))}
            {dayTasks.length > 2 && (
              <div className="text-xs text-gray-500">+{dayTasks.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayTasks = getTasksForDate(date);
      const isCurrentDay = isToday(date);
      
      calendarDays.push(
        <div key={day} className={`min-h-32 p-2 border border-gray-200 transition-colors hover:bg-gray-50 ${
          isCurrentDay ? 'bg-blue-50 border-blue-300' : 'bg-white'
        }`}>
          <div className={`text-sm font-medium mb-2 ${
            isCurrentDay ? 'text-blue-600' : 'text-gray-900'
          }`}>
            {day}
            {isCurrentDay && (
              <div className="w-2 h-2 bg-blue-500 rounded-full inline-block ml-1" />
            )}
          </div>
          <div className="space-y-1">
            {dayTasks.slice(0, 3).map(task => (
              <TaskCard key={task.id} task={task} isCompact />
            ))}
            {dayTasks.length > 3 && (
              <div className="text-xs text-gray-500 text-center py-1">
                +{dayTasks.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // Add empty cells for remaining days to complete the grid
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDayOfMonth + daysInMonth);
    
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDate = new Date(currentYear, currentMonth + 1, i);
      const dayTasks = getTasksForDate(nextMonthDate);
      
      calendarDays.push(
        <div key={`next-${i}`} className="min-h-32 p-2 bg-gray-50 border border-gray-200">
          <div className="text-sm text-gray-400 mb-2">{i}</div>
          <div className="space-y-1">
            {dayTasks.slice(0, 2).map(task => (
              <TaskCard key={task.id} task={task} isCompact />
            ))}
            {dayTasks.length > 2 && (
              <div className="text-xs text-gray-500">+{dayTasks.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-xl overflow-hidden">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-100 p-4 text-center font-semibold text-gray-700 border-b border-gray-200">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
    );
  };

  const WeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }
    
    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map(date => {
          const dayTasks = getTasksForDate(date);
          const isCurrentDay = isToday(date);
          
          return (
            <div key={date.toDateString()} className={`apple-card ${isCurrentDay ? 'ring-2 ring-blue-500' : ''}`}>
              <div className={`text-center mb-4 ${isCurrentDay ? 'text-blue-600' : 'text-gray-900'}`}>
                <div className="text-sm font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-2xl font-bold ${isCurrentDay ? 'text-blue-600' : 'text-gray-900'}`}>
                  {date.getDate()}
                </div>
              </div>
              <div className="space-y-2">
                {dayTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {dayTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const UpcomingTasks = () => {
    const upcomingTasks = tasksWithDates
      .filter(task => new Date(task.dueDate) >= today && task.status !== 'done')
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
    
    return (
      <div className="apple-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
        <div className="space-y-3">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map(task => {
              const daysUntil = Math.ceil((new Date(task.dueDate) - today) / (1000 * 60 * 60 * 24));
              const assignee = teamMembers.find(m => m.id === task.assignee);
              
              return (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {daysUntil === 0 ? 'Due today' : 
                         daysUntil === 1 ? 'Due tomorrow' : 
                         `Due in ${daysUntil} days`}
                      </span>
                      {assignee && (
                        <>
                          <span>•</span>
                          <User className="w-4 h-4" />
                          <span>{assignee.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    daysUntil <= 1 ? 'bg-red-100 text-red-700' :
                    daysUntil <= 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No upcoming deadlines</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-title">Calendar</h1>
          <p className="text-body">View tasks and deadlines in calendar format</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Event</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        {/* Date Navigation */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-semibold text-gray-900 min-w-48 text-center">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          
          <button 
            onClick={() => navigateMonth(1)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="btn-secondary text-sm"
          >
            Today
          </button>
        </div>

        {/* View Mode and Filters */}
        <div className="flex items-center space-x-3">
          <select
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            className="apple-input"
          >
            <option value="all">All Assignees</option>
            {teamMembers.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>

          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'month' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'week' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {viewMode === 'month' ? <MonthView /> : <WeekView />}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <UpcomingTasks />
          
          {/* Legend */}
          <div className="apple-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
                <span className="text-sm text-gray-600">High Priority</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full" />
                <span className="text-sm text-gray-600">Medium Priority</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">Low Priority</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-1 bg-red-500 rounded" />
                  <span className="text-sm text-gray-600">Overdue Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;