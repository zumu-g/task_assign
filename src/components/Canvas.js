import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { 
  Plus, 
  Filter, 
  Search,
  Calendar,
  User,
  Flag,
  MoreHorizontal,
  Edit3,
  Trash2
} from 'lucide-react';
import TaskCard from './TaskCard';

const Canvas = () => {
  const { tasks, updateTask, deleteTask, viewMode, setViewMode, teamMembers } = useTask();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in_progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'in_review', title: 'In Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ];

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'all' || task.assignee === filterAssignee;
    
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;
    
    updateTask(taskId, { status: newStatus });
  };

  const KanbanColumn = ({ column }) => {
    const columnTasks = filteredTasks.filter(task => task.status === column.id);
    
    return (
      <div className="flex-1 min-w-80">
        <div className={`rounded-xl p-4 ${column.color} mb-4`}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">{column.title}</h2>
            <span className="bg-white px-2 py-1 rounded-lg text-sm font-medium text-gray-600">
              {columnTasks.length}
            </span>
          </div>
        </div>
        
        <SortableContext 
          items={columnTasks.map(task => task.id)} 
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 min-h-64">
            {columnTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                teamMembers={teamMembers}
                onEdit={() => setSelectedTask(task)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
            
            {columnTasks.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-sm">No tasks</p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    );
  };

  const ListView = () => (
    <div className="space-y-3">
      {filteredTasks.map(task => (
        <div key={task.id} className="flow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className={`w-3 h-3 rounded-full ${
                task.status === 'done' ? 'bg-green-500' :
                task.status === 'in_progress' ? 'bg-blue-500' :
                task.status === 'in_review' ? 'bg-yellow-500' :
                'bg-gray-400'
              }`} />
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>
                
                {task.assignee && (
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {teamMembers.find(m => m.id === task.assignee)?.name}
                    </span>
                  </div>
                )}
                
                {task.dueDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedTask(task)}
                className="text-gray-400 hover:text-blue-600 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={`Edit task: ${task.title}`}
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-600 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label={`Delete task: ${task.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-title">Canvas</h1>
        <p className="text-body">Organize and track your tasks visually</p>
      </div>

      {/* Controls */}
      <div className="flow-card mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flow-input pl-10"
              aria-label="Search tasks"
            />
          </div>
          
          {/* Filters and View Toggle */}
          <div className="flex items-center space-x-4">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="flow-input-compact"
              aria-label="Filter by priority"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="flow-input-compact"
              aria-label="Filter by assignee"
            >
              <option value="all">All Assignees</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'kanban' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-pressed={viewMode === 'kanban'}
              >
                Kanban
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-pressed={viewMode === 'list'}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task Views */}
      {viewMode === 'kanban' ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {columns.map(column => (
              <KanbanColumn key={column.id} column={column} />
            ))}
          </div>
        </DndContext>
      ) : (
        <ListView />
      )}
    </div>
  );
};

export default Canvas;