import React, { useState } from 'react';
import { useTicket } from '../contexts/TicketContext';
import { useTask } from '../contexts/TaskContext';
import { 
  Plus, 
  Search, 
  Filter, 
  MessageCircle, 
  Clock, 
  User,
  Tag,
  MoreHorizontal,
  Sparkles,
  Send,
  X,
  AlertCircle,
  CheckCircle,
  Eye
} from 'lucide-react';

const Tickets = () => {
  const { 
    tickets, 
    categories, 
    priorities, 
    statuses,
    createTicket, 
    updateTicket, 
    addComment,
    addTag,
    removeTag,
    getTicketStats,
    analyzeTicket
  } = useTicket();
  
  const { teamMembers } = useTask();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newTicketForm, setNewTicketForm] = useState({
    title: '',
    description: '',
    category: 'support',
    priority: 'medium',
    customerName: '',
    customerEmail: '',
    customerCompany: ''
  });

  const stats = getTicketStats();

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTicket = async () => {
    try {
      const analysis = await analyzeTicket(newTicketForm.title, newTicketForm.description);
      
      createTicket({
        ...newTicketForm,
        customer: {
          name: newTicketForm.customerName,
          email: newTicketForm.customerEmail,
          company: newTicketForm.customerCompany
        },
        assignee: teamMembers[0]?.id,
        category: analysis.category,
        priority: analysis.priority,
        status: 'open',
        tags: analysis.tags
      });
      
      setNewTicketForm({
        title: '',
        description: '',
        category: 'support',
        priority: 'medium',
        customerName: '',
        customerEmail: '',
        customerCompany: ''
      });
      setShowNewTicketModal(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedTicket) {
      addComment(selectedTicket.id, newComment.trim(), '1', 'customer');
      setNewComment('');
    }
  };

  const getStatusColor = (status) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : '#8E8E93';
  };

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.id === priority);
    return priorityObj ? priorityObj.color : '#8E8E93';
  };

  const getCategoryColor = (category) => {
    const categoryObj = categories.find(c => c.id === category);
    return categoryObj ? categoryObj.color : '#8E8E93';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const StatCard = ({ title, value, color, icon: Icon }) => (
    <div className="apple-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: color + '20' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const TicketModal = ({ ticket, onClose }) => {
    if (!ticket) return null;
    
    const assignee = teamMembers.find(m => m.id === ticket.assignee);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: getCategoryColor(ticket.category) + '20' }}
                  >
                    <AlertCircle className="w-5 h-5" style={{ color: getCategoryColor(ticket.category) }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{ticket.title}</h2>
                    <p className="text-sm text-gray-500">#{ticket.id}</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <span 
                  className="px-3 py-1 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: getStatusColor(ticket.status) }}
                >
                  {statuses.find(s => s.id === ticket.status)?.name}
                </span>
                <span 
                  className="px-3 py-1 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: getPriorityColor(ticket.priority) }}
                >
                  {priorities.find(p => p.id === ticket.priority)?.name}
                </span>
                <span 
                  className="px-3 py-1 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: getCategoryColor(ticket.category) }}
                >
                  {categories.find(c => c.id === ticket.category)?.name}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{ticket.description}</p>
            </div>
            
            {/* Comments */}
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="font-medium text-gray-900 mb-4">Comments ({ticket.comments.length})</h3>
              <div className="space-y-4">
                {ticket.comments.map(comment => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {teamMembers.find(m => m.id === comment.author)?.name.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {teamMembers.find(m => m.id === comment.author)?.name || 'Unknown'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          comment.type === 'customer' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {comment.type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Comment Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="Add a comment..."
                  className="apple-input flex-1"
                />
                <button 
                  onClick={handleAddComment}
                  className="btn-primary flex items-center space-x-2"
                  disabled={!newComment.trim()}
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Ticket Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Customer</label>
                <div className="mt-1 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-900">{ticket.customer.name}</p>
                  <p className="text-sm text-gray-600">{ticket.customer.email}</p>
                  <p className="text-sm text-gray-600">{ticket.customer.company}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Assignee</label>
                <div className="mt-1">
                  <select
                    value={ticket.assignee || ''}
                    onChange={(e) => updateTicket(ticket.id, { assignee: e.target.value })}
                    className="apple-input"
                  >
                    <option value="">Unassigned</option>
                    {teamMembers.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <select
                    value={ticket.status}
                    onChange={(e) => updateTicket(ticket.id, { status: e.target.value })}
                    className="apple-input"
                  >
                    {statuses.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <div className="mt-1">
                  <select
                    value={ticket.priority}
                    onChange={(e) => updateTicket(ticket.id, { priority: e.target.value })}
                    className="apple-input"
                  >
                    {priorities.map(priority => (
                      <option key={priority.id} value={priority.id}>{priority.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {ticket.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                      {tag}
                      <button 
                        onClick={() => removeTag(ticket.id, tag)}
                        className="ml-1 text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Created</label>
                <p className="mt-1 text-sm text-gray-600">
                  {new Date(ticket.createdAt).toLocaleDateString()} at {new Date(ticket.createdAt).toLocaleTimeString()}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Last Updated</label>
                <p className="mt-1 text-sm text-gray-600">
                  {formatTimeAgo(ticket.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NewTicketModal = () => {
    if (!showNewTicketModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Create New Ticket</h2>
                  <p className="text-sm text-gray-500">AI will help categorize and prioritize</p>
                </div>
              </div>
              <button 
                onClick={() => setShowNewTicketModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newTicketForm.title}
                onChange={(e) => setNewTicketForm({ ...newTicketForm, title: e.target.value })}
                className="apple-input"
                placeholder="Brief description of the issue..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newTicketForm.description}
                onChange={(e) => setNewTicketForm({ ...newTicketForm, description: e.target.value })}
                className="apple-input min-h-24"
                placeholder="Detailed description of the issue..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  value={newTicketForm.customerName}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, customerName: e.target.value })}
                  className="apple-input"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
                <input
                  type="email"
                  value={newTicketForm.customerEmail}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, customerEmail: e.target.value })}
                  className="apple-input"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={newTicketForm.customerCompany}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, customerCompany: e.target.value })}
                  className="apple-input"
                  placeholder="Acme Corp"
                />
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button 
              onClick={() => setShowNewTicketModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateTicket}
              className="btn-primary flex items-center space-x-2"
              disabled={!newTicketForm.title.trim() || !newTicketForm.customerName.trim()}
            >
              <Plus className="w-4 h-4" />
              <span>Create Ticket</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-title">Support Tickets</h1>
          <p className="text-body">Manage customer support requests and track resolutions</p>
        </div>
        <button 
          onClick={() => setShowNewTicketModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Ticket</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Tickets" value={stats.total} color="#007AFF" icon={AlertCircle} />
        <StatCard title="Open Tickets" value={stats.open} color="#FF9500" icon={Clock} />
        <StatCard title="Resolved" value={stats.resolved} color="#34C759" icon={CheckCircle} />
        <StatCard title="High Priority" value={stats.highPriority} color="#FF3B30" icon={AlertCircle} />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="apple-input pl-10"
          />
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="apple-input"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status.id} value={status.id}>{status.name}</option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="apple-input"
          >
            <option value="all">All Priority</option>
            {priorities.map(priority => (
              <option key={priority.id} value={priority.id}>{priority.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="apple-card">
        <div className="space-y-3">
          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => {
              const assignee = teamMembers.find(m => m.id === ticket.assignee);
              
              return (
                <div key={ticket.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                     onClick={() => setSelectedTicket(ticket)}>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getStatusColor(ticket.status) }}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                      <span className="text-xs text-gray-500">#{ticket.id}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{ticket.customer.name}</span>
                      <span>•</span>
                      <span>{ticket.customer.company}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(ticket.updatedAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span 
                      className="px-2 py-1 rounded-md text-xs font-medium text-white"
                      style={{ backgroundColor: getPriorityColor(ticket.priority) }}
                    >
                      {priorities.find(p => p.id === ticket.priority)?.name}
                    </span>
                    
                    <span 
                      className="px-2 py-1 rounded-md text-xs font-medium text-white"
                      style={{ backgroundColor: getCategoryColor(ticket.category) }}
                    >
                      {categories.find(c => c.id === ticket.category)?.name}
                    </span>
                    
                    {assignee && (
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            {assignee.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {ticket.comments.length > 0 && (
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{ticket.comments.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-500">Try adjusting your filters or create a new ticket</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      <NewTicketModal />
    </div>
  );
};

export default Tickets;