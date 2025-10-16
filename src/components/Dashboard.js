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
    <div className="apple-card">
      <div className="flex items-start justify-between">
        <div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );

  const QuickActionButton = ({ icon: Icon, label, onClick, color = "bg-blue-500" }) => (
    <button 
      onClick={onClick}
      className={`${color} text-white rounded-xl p-4 flex flex-col items-center space-y-2 hover:transform hover:scale-105 transition-all duration-200 shadow-lg`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-title">Good morning! 👋</h1>
        <p className="text-body">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      <div className="apple-card mb-8">
        <h2 className="text-subtitle mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="apple-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-subtitle">Recent Tasks</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'done' ? 'bg-green-500' :
                    task.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                    <p className="text-xs text-gray-500">
                      {task.assignee && teamMembers.find(m => m.id === task.assignee)?.name}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No tasks yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="apple-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-subtitle">Upcoming Deadlines</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View Calendar
            </button>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map(task => {
                const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                      <p className="text-xs text-gray-500">
                        {daysUntilDue <= 0 ? 'Overdue' : 
                         daysUntilDue === 1 ? 'Due tomorrow' : 
                         `Due in ${daysUntilDue} days`}
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      daysUntilDue <= 0 ? 'bg-red-500' :
                      daysUntilDue <= 2 ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming deadlines</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inbox Preview */}
      {inboxItems.length > 0 && (
        <div className="apple-card mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-subtitle">Inbox ({inboxItems.length})</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              Process All
            </button>
          </div>
          <div className="space-y-2">
            {inboxItems.slice(0, 3).map(item => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{item.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="text-blue-600 text-xs font-medium">
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