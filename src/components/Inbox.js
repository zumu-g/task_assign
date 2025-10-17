import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import { 
  Plus, 
  Inbox as InboxIcon, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  User,
  Flag,
  FileText,
  X,
  Check
} from 'lucide-react';

const Inbox = () => {
  const { 
    inboxItems, 
    addInboxItem, 
    removeInboxItem, 
    createTaskFromInbox, 
    generateTaskFromDescription,
    sopTemplates,
    teamMembers
  } = useTask();
  
  const [newItem, setNewItem] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    sopTemplate: ''
  });
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddItem = () => {
    if (newItem.trim()) {
      addInboxItem({ content: newItem.trim() });
      setNewItem('');
    }
  };

  const handleProcessItem = async (item) => {
    setSelectedItem(item);
    setIsProcessing(true);
    
    try {
      const suggestions = await generateTaskFromDescription(item.content);
      setAiSuggestions(suggestions);
      
      setTaskForm({
        title: item.content.split('.')[0].trim(),
        description: item.content,
        priority: suggestions.priority,
        assignee: '',
        dueDate: suggestions.suggestedDueDate.toISOString().split('T')[0],
        sopTemplate: suggestions.suggestedSOP?.id || ''
      });
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateTask = () => {
    createTaskFromInbox({
      inboxId: selectedItem.id,
      ...taskForm,
      steps: aiSuggestions?.estimatedSteps || []
    });
    
    setSelectedItem(null);
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      sopTemplate: ''
    });
    setAiSuggestions(null);
  };

  const TaskCreationModal = () => {
    if (!selectedItem) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Create Task with AI</h2>
                  <p className="text-sm text-gray-500">AI-powered task creation and optimization</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Original Item */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium text-gray-900 mb-2">Original Item</h3>
              <p className="text-gray-700">{selectedItem.content}</p>
            </div>

            {/* AI Suggestions */}
            {aiSuggestions && (
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium text-gray-900">AI Suggestions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Suggested Priority</label>
                    <div className={`mt-1 px-3 py-1 rounded-lg text-sm font-medium w-fit ${
                      aiSuggestions.priority === 'high' ? 'bg-red-100 text-red-700' :
                      aiSuggestions.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {aiSuggestions.priority}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Suggested Due Date</label>
                    <p className="mt-1 text-sm text-gray-600">
                      {aiSuggestions.suggestedDueDate.toLocaleDateString()}
                    </p>
                  </div>
                  {aiSuggestions.suggestedSOP && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Suggested SOP</label>
                      <p className="mt-1 text-sm text-blue-600">{aiSuggestions.suggestedSOP.name}</p>
                    </div>
                  )}
                </div>
                {aiSuggestions.estimatedSteps && aiSuggestions.estimatedSteps.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Suggested Steps</label>
                    <div className="space-y-2">
                      {aiSuggestions.estimatedSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-medium text-xs">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Task Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="apple-input"
                  placeholder="Enter task title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="apple-input min-h-20"
                  placeholder="Enter task description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="apple-input"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                  <select
                    value={taskForm.assignee}
                    onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
                    className="apple-input"
                  >
                    <option value="">Select assignee...</option>
                    {teamMembers.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    className="apple-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SOP Template</label>
                <select
                  value={taskForm.sopTemplate}
                  onChange={(e) => setTaskForm({ ...taskForm, sopTemplate: e.target.value })}
                  className="apple-input"
                >
                  <option value="">No template</option>
                  {sopTemplates.map(template => (
                    <option key={template.id} value={template.id}>{template.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button 
              onClick={() => setSelectedItem(null)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateTask}
              className="btn-primary flex items-center space-x-2"
              disabled={!taskForm.title.trim()}
            >
              <Check className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-title">Inbox</h1>
        <p className="text-body">Capture ideas and quickly turn them into organized tasks with AI assistance</p>
      </div>

      {/* Add New Item */}
      <div className="apple-card mb-6">
        <div className="flex space-x-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            placeholder="What's on your mind? Add anything that comes up..."
            className="apple-input flex-1"
          />
          <button 
            onClick={handleAddItem}
            className="btn-primary flex items-center space-x-2"
            disabled={!newItem.trim()}
          >
            <Plus className="w-5 h-5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Inbox Items */}
      <div className="space-y-4">
        {inboxItems.length > 0 ? (
          inboxItems.map(item => (
            <div key={item.id} className="apple-card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 mb-2">{item.content}</p>
                  <p className="text-sm text-gray-500">
                    Added {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleProcessItem(item)}
                    className="btn-primary flex items-center space-x-2"
                    disabled={isProcessing}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Process with AI</span>
                  </button>
                  <button
                    onClick={() => removeInboxItem(item.id)}
                    className="text-gray-400 hover:text-red-600 p-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <InboxIcon className="w-10 h-10 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your inbox is empty</h3>
            <p className="text-gray-500 mb-6">Start by adding ideas, notes, or tasks that come to mind</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                </div>
                <span>AI-powered task creation</span>
              </div>
              <ArrowRight className="w-4 h-4" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-cyan-600" />
                </div>
                <span>Automatic SOP templates</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Task Creation Modal */}
      <TaskCreationModal />
    </div>
  );
};

export default Inbox;