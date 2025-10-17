import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  inboxItems: [],
  sopTemplates: [],
  teamMembers: [
    { id: '1', name: 'Alice Johnson', email: 'alice@company.com', role: 'Developer' },
    { id: '2', name: 'Bob Smith', email: 'bob@company.com', role: 'Designer' },
    { id: '3', name: 'Carol Wilson', email: 'carol@company.com', role: 'Project Manager' },
    { id: '4', name: 'David Brown', email: 'david@company.com', role: 'QA Engineer' }
  ],
  viewMode: 'kanban' // kanban, calendar, list
};

const mockSOPTemplates = [
  {
    id: '1',
    name: 'Bug Fix Process',
    steps: [
      'Reproduce the bug',
      'Identify root cause',
      'Create fix',
      'Test fix',
      'Code review',
      'Deploy to staging',
      'QA verification',
      'Deploy to production'
    ]
  },
  {
    id: '2',
    name: 'Feature Development',
    steps: [
      'Requirements analysis',
      'Design mockups',
      'Technical specification',
      'Development',
      'Unit testing',
      'Integration testing',
      'Code review',
      'Documentation',
      'Release'
    ]
  },
  {
    id: '3',
    name: 'Customer Support Escalation',
    steps: [
      'Gather customer information',
      'Reproduce issue',
      'Check known issues',
      'Escalate to appropriate team',
      'Monitor progress',
      'Update customer',
      'Verify resolution',
      'Close ticket'
    ]
  }
];

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_INBOX_ITEM':
      return {
        ...state,
        inboxItems: [...state.inboxItems, { ...action.payload, id: uuidv4(), createdAt: new Date() }]
      };
    
    case 'REMOVE_INBOX_ITEM':
      return {
        ...state,
        inboxItems: state.inboxItems.filter(item => item.id !== action.payload)
      };
    
    case 'CREATE_TASK_FROM_INBOX': {
      const inboxItem = state.inboxItems.find(item => item.id === action.payload.inboxId);
      const newTask = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        assignee: action.payload.assignee,
        dueDate: action.payload.dueDate,
        status: 'todo',
        sopTemplate: action.payload.sopTemplate,
        steps: action.payload.steps || [],
        createdAt: new Date(),
        updatedAt: new Date(),
        sourceInboxItem: inboxItem
      };
      
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        inboxItems: state.inboxItems.filter(item => item.id !== action.payload.inboxId)
      };
    }
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date() }
            : task
        )
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload
      };
    
    case 'LOAD_INITIAL_DATA':
      return {
        ...state,
        sopTemplates: mockSOPTemplates,
        inboxItems: action.payload.inboxItems || [],
        tasks: action.payload.tasks || []
      };
    
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    // Load initial data (would typically come from API)
    const savedTasks = localStorage.getItem('taskassign_tasks');
    const savedInbox = localStorage.getItem('taskassign_inbox');
    
    dispatch({
      type: 'LOAD_INITIAL_DATA',
      payload: {
        tasks: savedTasks ? JSON.parse(savedTasks) : [],
        inboxItems: savedInbox ? JSON.parse(savedInbox) : []
      }
    });
  }, []);

  useEffect(() => {
    // Save to localStorage whenever tasks change
    localStorage.setItem('taskassign_tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    // Save to localStorage whenever inbox changes
    localStorage.setItem('taskassign_inbox', JSON.stringify(state.inboxItems));
  }, [state.inboxItems]);

  const addInboxItem = (item) => {
    dispatch({ type: 'ADD_INBOX_ITEM', payload: item });
  };

  const removeInboxItem = (id) => {
    dispatch({ type: 'REMOVE_INBOX_ITEM', payload: id });
  };

  const createTaskFromInbox = (taskData) => {
    dispatch({ type: 'CREATE_TASK_FROM_INBOX', payload: taskData });
  };

  const updateTask = (id, updates) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const setViewMode = (mode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  };

  // AI-powered task creation (simulated)
  const generateTaskFromDescription = async (description) => {
    // This would typically call an AI service
    // For now, we'll simulate AI analysis
    const keywords = description.toLowerCase();
    
    let priority = 'medium';
    let suggestedSOP = null;
    let estimatedSteps = [];

    if (keywords.includes('urgent') || keywords.includes('critical')) {
      priority = 'high';
    } else if (keywords.includes('minor') || keywords.includes('low')) {
      priority = 'low';
    }

    if (keywords.includes('bug') || keywords.includes('error') || keywords.includes('issue')) {
      suggestedSOP = mockSOPTemplates.find(sop => sop.name === 'Bug Fix Process');
    } else if (keywords.includes('feature') || keywords.includes('new') || keywords.includes('develop')) {
      suggestedSOP = mockSOPTemplates.find(sop => sop.name === 'Feature Development');
    } else if (keywords.includes('customer') || keywords.includes('support')) {
      suggestedSOP = mockSOPTemplates.find(sop => sop.name === 'Customer Support Escalation');
    }

    if (suggestedSOP) {
      estimatedSteps = suggestedSOP.steps.map(step => ({
        id: uuidv4(),
        title: step,
        completed: false
      }));
    }

    return {
      priority,
      suggestedSOP,
      estimatedSteps,
      suggestedDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    };
  };

  const value = {
    ...state,
    addInboxItem,
    removeInboxItem,
    createTaskFromInbox,
    updateTask,
    deleteTask,
    setViewMode,
    generateTaskFromDescription
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}