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
      <div className="text-center p-8">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        {trend && (
          <div className="flex items-center justify-center space-x-1 text-green-600 mt-3">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );

  const QuickActionButton = ({ icon: Icon, label, onClick, color = "bg-blue-500" }) => (
    <button 
      onClick={onClick}
      className={`${color} text-white rounded-2xl p-8 flex flex-col items-center space-y-4 hover:transform hover:scale-105 transition-all duration-200 shadow-md min-h-[140px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      <Icon className="w-10 h-10" />
      <span className="text-base font-medium text-center leading-tight">{label}</span>
    </button>
  );

  return (
    <div className="container-padding-lg max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-section">
        <h1 className="text-title mb-4">Dashboard</h1>
        <p className="text-body text-lg max-w-xl mx-auto leading-relaxed">Track your productivity and team performance at a glance</p>
      </div>

      {/* Essential Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 space-section-sm">
        <StatCard
          title="Active Tasks"
          value={taskStats.inProgress}
          subtitle={`${taskStats.total} total tasks`}
          icon={Clock}
          color="bg-blue-500"
          trend={taskStats.inProgress > 0 ? "+" + Math.round((taskStats.inProgress / taskStats.total) * 100) + "%" : null}
        />
        <StatCard
          title="Completed Today"
          value={taskStats.completed}
          subtitle="Great progress!"
          icon={CheckSquare}
          color="bg-green-500"
        />
        <StatCard
          title="Due Soon"
          value={upcomingDeadlines.length}
          subtitle="Need attention"
          icon={AlertCircle}
          color={upcomingDeadlines.length > 2 ? "bg-red-500" : "bg-orange-500"}
        />
      </div>

      {/* Quick Actions */}
      <div className="apple-card space-section-sm">
        <div className="p-8">
          <h2 className="text-subtitle text-center mb-10">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <QuickActionButton
            icon={Plus}
            label="New Task"
            color="bg-blue-500"
          />
          <QuickActionButton
            icon={Calendar}
            label="Schedule"
            color="bg-purple-500"
          />
          <QuickActionButton
            icon={MessageSquare}
            label="Team Chat"
            color="bg-green-500"
          />
          </div>
        </div>
      </div>

      {/* Today's Focus Section */}
      <div className="apple-card space-section-sm">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-subtitle">Today's Focus</h2>
            <button className="btn-secondary px-6 py-3 min-h-[44px] text-sm font-medium">
              View All Tasks
            </button>
          </div>
        
        {/* Priority Items */}
        <div className="space-y-6">
          {(() => {
            const overdueItems = upcomingDeadlines.filter(task => {
              const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
              return daysUntilDue <= 0;
            });
            
            const dueSoonItems = upcomingDeadlines.filter(task => {
              const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
              return daysUntilDue > 0 && daysUntilDue <= 2;
            });
            
            const inProgressItems = recentTasks.filter(task => task.status === 'in_progress').slice(0, 3);
            
            const allPriorityItems = [...overdueItems, ...dueSoonItems, ...inProgressItems].slice(0, 5);
            
            return allPriorityItems.length > 0 ? (
              allPriorityItems.map(task => {
                const isDeadlineTask = task.dueDate;
                const daysUntilDue = isDeadlineTask ? Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;
                
                return (
                  <div key={task.id} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200 min-h-[72px]">
                    {isDeadlineTask ? (
                      <Calendar className="w-6 h-6 text-gray-500 flex-shrink-0" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 ${
                        task.status === 'done' ? 'bg-green-500' :
                        task.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
                      }`} />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base leading-6 mb-1">{task.title}</h3>
                      <p className="text-sm text-gray-500">
                        {isDeadlineTask ? (
                          daysUntilDue <= 0 ? 'Overdue' : 
                          daysUntilDue === 1 ? 'Due tomorrow' : 
                          `Due in ${daysUntilDue} days`
                        ) : (
                          task.assignee && teamMembers.find(m => m.id === task.assignee)?.name || 'In Progress'
                        )}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {task.priority && (
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' :
                          task.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 
                          'bg-green-100 text-green-700'
                        }`}>
                          {task.priority}
                        </span>
                      )}
                      {isDeadlineTask && (
                        <div className={`w-4 h-4 rounded-full ${
                          daysUntilDue <= 0 ? 'bg-red-500' :
                          daysUntilDue <= 2 ? 'bg-orange-500' : 'bg-green-500'
                        }`} />
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20">
                <CheckSquare className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">All caught up!</h3>
                <p className="text-gray-500 max-w-md mx-auto text-base leading-relaxed">No urgent tasks or deadlines. Great job staying on top of things!</p>
              </div>
            );
          })()}
        </div>
        </div>
      </div>

      {/* Inbox Preview - Only show if items exist */}
      {inboxItems.length > 0 && (
        <div className="apple-card">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-subtitle">Inbox ({inboxItems.length})</h2>
              <button className="btn-secondary px-6 py-3 min-h-[44px] text-sm font-medium">
                Process All
              </button>
            </div>
            <div className="space-y-4">
              {inboxItems.slice(0, 3).map(item => (
                <div key={item.id} className="flex items-center space-x-4 p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-200 min-h-[72px]">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 leading-6 mb-1">{item.content}</p>
                    <p className="text-sm text-gray-500">
                      Added {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="btn-primary px-6 py-3 text-sm font-medium min-h-[44px]">
                    Process
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;