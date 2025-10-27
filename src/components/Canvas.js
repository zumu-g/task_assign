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
      <div className="apple-card p-6 min-h-[600px]">
        <div className={`rounded-xl p-4 ${column.color} mb-6 border border-opacity-20`}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-lg">{column.title}</h2>
            <span className="bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-700 shadow-sm min-w-[2rem] text-center">
              {columnTasks.length}
            </span>
          </div>
        </div>
        
        <SortableContext 
          items={columnTasks.map(task => task.id)} 
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4 min-h-64">
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
              <div className="text-center py-12 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8" />
                </div>
                <p className="text-base">No tasks</p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    );
  };

  const ListView = () => (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <div key={task.id} className="apple-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className={`w-4 h-4 rounded-full ${
                task.status === 'done' ? 'bg-green-500' :
                task.status === 'in_progress' ? 'bg-blue-500' :
                task.status === 'in_review' ? 'bg-yellow-500' :
                'bg-gray-400'
              }`} />
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-base mb-1">{task.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>
                
                {task.assignee && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {teamMembers.find(m => m.id === task.assignee)?.name}
                    </span>
                  </div>
                )}
                
                {task.dueDate && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setSelectedTask(task)}
                className="text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Edit task: ${task.title}`}
              >
                <Edit3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Delete task: ${task.title}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {filteredTasks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500 text-lg">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="container-padding-lg max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-section">
        <h1 className="text-title mb-4">Canvas</h1>
        <p className="text-body text-lg max-w-xl mx-auto leading-relaxed">Organize and track your tasks visually with drag & drop</p>
      </div>

      {/* Controls */}
      <div className="apple-card p-8 space-section-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="apple-input pl-12 text-base py-4"
              aria-label="Search tasks"
            />
          </div>
          
          {/* Filters and View Toggle */}
          <div className="flex items-center space-x-4">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="apple-input px-4 py-3 min-h-[44px]"
              aria-label="Filter by priority"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="apple-input px-4 py-3 min-h-[44px]"
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
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] ${
                  viewMode === 'kanban' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-pressed={viewMode === 'kanban'}
              >
                Kanban
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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