import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Plus, 
  Filter, 
  Search, 
  MoreHorizontal, 
  Calendar,
  User,
  Flag,
  List,
  Grid,
  Clock
} from 'lucide-react';

const TaskManager = () => {
  const { tasks, updateTask, viewMode, setViewMode, teamMembers } = useTask();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const statuses = [
    { id: 'todo', name: 'To Do', color: 'bg-gray-100 text-gray-700' },
    { id: 'in_progress', name: 'In Progress', color: 'bg-blue-100 text-blue-700' },
    { id: 'review', name: 'Review', color: 'bg-orange-100 text-orange-700' },
    { id: 'done', name: 'Done', color: 'bg-green-100 text-green-700' }
  ];

  const priorities = [
    { id: 'low', name: 'Low', color: 'bg-green-500' },
    { id: 'medium', name: 'Medium', color: 'bg-orange-500' },
    { id: 'high', name: 'High', color: 'bg-red-500' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId !== destination.droppableId) {
      updateTask(draggableId, { status: destination.droppableId });
    }
  };

  const TaskCard = ({ task, index }) => {
    const assignee = teamMembers.find(member => member.id === task.assignee);
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
    
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`apple-card mb-3 cursor-pointer transition-all duration-200 ${
              snapshot.isDragging ? 'transform rotate-3 shadow-2xl' : 'hover:shadow-lg'
            } ${isOverdue ? 'border-l-4 border-red-500' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-sm flex-1">{task.title}</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            
            {task.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  priorities.find(p => p.id === task.priority)?.color || 'bg-gray-500'
                } text-white`}>
                  {task.priority}
                </span>
                
                {task.dueDate && (
                  <div className={`flex items-center space-x-1 text-xs ${
                    isOverdue ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              {assignee && (
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {assignee.name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {task.steps && task.steps.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(task.steps.filter(s => s.completed).length / task.steps.length) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {task.steps.filter(s => s.completed).length}/{task.steps.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </Draggable>
    );
  };

  const KanbanView = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statuses.map(status => {
          const statusTasks = filteredTasks.filter(task => task.status === status.id);
          
          return (
            <div key={status.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{status.name}</h3>
                  <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {statusTasks.length}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <Droppable droppableId={status.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-32 transition-colors duration-200 ${
                      snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''
                    }`}
                  >
                    {statusTasks.map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );

  const ListView = () => (
    <div className="apple-card">
      <div className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => {
            const assignee = teamMembers.find(member => member.id === task.assignee);
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
            
            return (
              <div key={task.id} className={`flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors ${
                isOverdue ? 'border-l-4 border-red-500' : ''
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'done' ? 'bg-green-500' :
                  task.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'
                }`} />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  {task.description && (
                    <p className="text-gray-600 text-sm mt-1 line-clamp-1">{task.description}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    priorities.find(p => p.id === task.priority)?.color || 'bg-gray-500'
                  } text-white`}>
                    {task.priority}
                  </span>
                  
                  {task.dueDate && (
                    <div className={`flex items-center space-x-1 text-sm ${
                      isOverdue ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {assignee && (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {assignee.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{assignee.name}</span>
                    </div>
                  )}
                  
                  <select 
                    value={task.status}
                    onChange={(e) => updateTask(task.id, { status: e.target.value })}
                    className="apple-input text-sm py-1 px-2"
                  >
                    {statuses.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <List className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new task</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-title">Tasks</h1>
          <p className="text-body">Manage your team's work and track progress</p>
        </div>
        <button 
          onClick={() => setShowNewTaskModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="apple-input pl-10"
          />
        </div>

        {/* Filters and View Mode */}
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

          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'kanban' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tasks View */}
      {viewMode === 'kanban' ? <KanbanView /> : <ListView />}
    </div>
  );
};

export default TaskManager;