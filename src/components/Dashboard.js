import React from 'react';
import { useTask } from '../contexts/TaskContext';
import { useTicket } from '../contexts/TicketContext';
import { useChat } from '../contexts/ChatContext';
import { 
  CheckSquare, 
  Clock, 
  Users, 
  MessageSquare, 
  TrendingUp,
  AlertCircle,
  Calendar,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { tasks, inboxItems, teamMembers } = useTask();
  const { getTicketStats } = useTicket();
  const { channels, messages } = useChat();

  const ticketStats = getTicketStats();
  
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done').length
  };

  const recentTasks = tasks
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  const upcomingDeadlines = tasks
    .filter(t => t.dueDate && t.status !== 'done')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="apple-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${color}`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );

  const QuickActionButton = ({ icon: Icon, label, onClick, color = "bg-blue-500" }) => (
    <button 
      onClick={onClick}
      className={`${color} text-white rounded-xl p-6 flex flex-col items-center space-y-3 hover:transform hover:scale-105 transition-all duration-200 shadow-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      <Icon className="w-8 h-8" />
      <span className="text-sm font-medium text-center leading-tight">{label}</span>
    </button>
  );

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-title">Good morning! 👋</h1>
        <p className="text-body">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        <StatCard
          title="Total Tasks"
          value={taskStats.total}
          subtitle={`${taskStats.completed} completed`}
          icon={CheckSquare}
          color="bg-blue-500"
          trend="+12%"
        />
        <StatCard
          title="In Progress"
          value={taskStats.inProgress}
          subtitle="Active tasks"
          icon={Clock}
          color="bg-orange-500"
        />
        <StatCard
          title="Support Tickets"
          value={ticketStats.open}
          subtitle={`${ticketStats.total} total`}
          icon={AlertCircle}
          color="bg-red-500"
        />
        <StatCard
          title="Team Messages"
          value={Object.values(messages).flat().length}
          subtitle={`${channels.length} channels`}
          icon={MessageSquare}
          color="bg-green-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="apple-card p-6 mb-10">
        <h2 className="text-subtitle mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <QuickActionButton
            icon={Plus}
            label="New Task"
            color="bg-blue-500"
          />
          <QuickActionButton
            icon={MessageSquare}
            label="Start Chat"
            color="bg-green-500"
          />
          <QuickActionButton
            icon={AlertCircle}
            label="Create Ticket"
            color="bg-red-500"
          />
          <QuickActionButton
            icon={Calendar}
            label="Schedule"
            color="bg-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Tasks */}
        <div className="apple-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-subtitle">Recent Tasks</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className={`w-4 h-4 rounded-full ${
                    task.status === 'done' ? 'bg-green-500' :
                    task.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm leading-5">{task.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {task.assignee && teamMembers.find(m => m.id === task.assignee)?.name}
                    </p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No tasks yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="apple-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-subtitle">Upcoming Deadlines</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
              View Calendar
            </button>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map(task => {
                const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <Calendar className="w-6 h-6 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm leading-5">{task.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {daysUntilDue <= 0 ? 'Overdue' : 
                         daysUntilDue === 1 ? 'Due tomorrow' : 
                         `Due in ${daysUntilDue} days`}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      daysUntilDue <= 0 ? 'bg-red-500' :
                      daysUntilDue <= 2 ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming deadlines</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inbox Preview */}
      {inboxItems.length > 0 && (
        <div className="apple-card p-6 mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-subtitle">Inbox ({inboxItems.length})</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
              Process All
            </button>
          </div>
          <div className="space-y-4">
            {inboxItems.slice(0, 3).map(item => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 leading-5">{item.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="text-blue-600 text-xs font-medium hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
                  Process
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;