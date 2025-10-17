import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Calendar, 
  User, 
  Flag, 
  MoreHorizontal,
  Edit3,
  Trash2,
  GripVertical
} from 'lucide-react';

const TaskCard = ({ task, teamMembers, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const assignedMember = teamMembers.find(member => member.id === task.assignee);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card-enhanced cursor-pointer group priority-indicator ${
        task.priority === 'high' ? 'priority-high' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
      {...attributes}
    >
      {/* Drag Handle */}
      <div 
        className="flex items-start justify-between mb-3"
        {...listeners}
      >
        <div className="flex items-start space-x-2 flex-1">
          <GripVertical className="w-4 h-4 text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{task.description}</p>
            )}
          </div>
        </div>
        
        {/* Actions Menu */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle menu toggle
              }}
              className="text-gray-400 hover:text-gray-600 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={`Task options for ${task.title}`}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Task Meta */}
      <div className="space-y-2">
        {/* Priority */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
            task.priority === 'high' ? 'bg-red-100 text-red-700' :
            task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
            'bg-green-100 text-green-700'
          }`}>
            {task.priority}
          </span>
          
          {task.status && (
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
              task.status === 'done' ? 'bg-green-100 text-green-700' :
              task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
              task.status === 'in_review' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {task.status.replace('_', ' ')}
            </span>
          )}
        </div>

        {/* Assignee and Due Date */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          {assignedMember && (
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span className="truncate">{assignedMember.name}</span>
            </div>
          )}
          
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Enhanced Steps Progress */}
        {task.steps && task.steps.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Progress</span>
              <span className="font-medium">
                {task.steps.filter(step => step.completed).length} / {task.steps.length}
              </span>
            </div>
            <div className="progress-bar-enhanced">
              <div
                className="progress-fill-enhanced"
                style={{
                  width: `${(task.steps.filter(step => step.completed).length / task.steps.length) * 100}%`
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions (on hover) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity pt-3 border-t border-gray-100 mt-3">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-gray-400 hover:text-blue-600 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={`Edit task: ${task.title}`}
          >
            <Edit3 className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-600 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label={`Delete task: ${task.title}`}
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;