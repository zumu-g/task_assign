import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TicketContext = createContext();

const initialState = {
  tickets: [],
  categories: [
    { id: 'bug', name: 'Bug Report', color: '#FF3B30' },
    { id: 'feature', name: 'Feature Request', color: '#007AFF' },
    { id: 'support', name: 'Technical Support', color: '#34C759' },
    { id: 'billing', name: 'Billing Issue', color: '#FF9500' },
    { id: 'other', name: 'Other', color: '#8E8E93' }
  ],
  priorities: [
    { id: 'low', name: 'Low', color: '#34C759' },
    { id: 'medium', name: 'Medium', color: '#FF9500' },
    { id: 'high', name: 'High', color: '#FF3B30' },
    { id: 'urgent', name: 'Urgent', color: '#FF3B30' }
  ],
  statuses: [
    { id: 'open', name: 'Open', color: '#007AFF' },
    { id: 'in_progress', name: 'In Progress', color: '#FF9500' },
    { id: 'waiting', name: 'Waiting for Customer', color: '#8E8E93' },
    { id: 'resolved', name: 'Resolved', color: '#34C759' },
    { id: 'closed', name: 'Closed', color: '#6E6E73' }
  ]
};

const mockTickets = [
  {
    id: '1',
    title: 'Login button not working on mobile',
    description: 'When I try to log in on my iPhone, the login button doesn\'t respond to taps.',
    category: 'bug',
    priority: 'high',
    status: 'open',
    customer: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      company: 'Acme Corp'
    },
    assignee: '1',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 3600000),
    comments: [
      {
        id: '1',
        content: 'Thank you for reporting this issue. We\'re looking into it.',
        author: '1',
        createdAt: new Date(Date.now() - 3600000),
        type: 'internal'
      }
    ],
    tags: ['mobile', 'login', 'ui']
  },
  {
    id: '2',
    title: 'Request for dark mode feature',
    description: 'It would be great to have a dark mode option for better usability in low-light environments.',
    category: 'feature',
    priority: 'medium',
    status: 'in_progress',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      company: 'Tech Solutions'
    },
    assignee: '2',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 1800000),
    comments: [
      {
        id: '2',
        content: 'Great suggestion! We\'re currently working on this feature.',
        author: '2',
        createdAt: new Date(Date.now() - 1800000),
        type: 'customer'
      }
    ],
    tags: ['feature', 'ui', 'accessibility']
  },
  {
    id: '3',
    title: 'Billing discrepancy in last invoice',
    description: 'The amount charged doesn\'t match our agreed pricing plan. Please review.',
    category: 'billing',
    priority: 'high',
    status: 'waiting',
    customer: {
      name: 'Mike Wilson',
      email: 'mike.wilson@business.com',
      company: 'Business Inc'
    },
    assignee: '3',
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 7200000),
    comments: [
      {
        id: '3',
        content: 'We\'ve reviewed your account and sent the corrected invoice. Please confirm receipt.',
        author: '3',
        createdAt: new Date(Date.now() - 7200000),
        type: 'customer'
      }
    ],
    tags: ['billing', 'invoice', 'pricing']
  }
];

function ticketReducer(state, action) {
  switch (action.type) {
    case 'CREATE_TICKET':
      const newTicket = {
        id: uuidv4(),
        ...action.payload,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
        tags: []
      };
      
      return {
        ...state,
        tickets: [...state.tickets, newTicket]
      };
    
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.id
            ? { ...ticket, ...action.payload.updates, updatedAt: new Date() }
            : ticket
        )
      };
    
    case 'DELETE_TICKET':
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket.id !== action.payload)
      };
    
    case 'ADD_COMMENT':
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.ticketId
            ? {
                ...ticket,
                comments: [...ticket.comments, {
                  id: uuidv4(),
                  content: action.payload.content,
                  author: action.payload.author,
                  createdAt: new Date(),
                  type: action.payload.type || 'internal'
                }],
                updatedAt: new Date()
              }
            : ticket
        )
      };
    
    case 'ADD_TAG':
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.ticketId
            ? {
                ...ticket,
                tags: [...new Set([...ticket.tags, action.payload.tag])]
              }
            : ticket
        )
      };
    
    case 'REMOVE_TAG':
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.ticketId
            ? {
                ...ticket,
                tags: ticket.tags.filter(tag => tag !== action.payload.tag)
              }
            : ticket
        )
      };
    
    case 'LOAD_TICKETS':
      return {
        ...state,
        tickets: action.payload
      };
    
    default:
      return state;
  }
}

export function TicketProvider({ children }) {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  useEffect(() => {
    // Load initial tickets (would typically come from API)
    const savedTickets = localStorage.getItem('taskassign_tickets');
    if (savedTickets) {
      dispatch({ type: 'LOAD_TICKETS', payload: JSON.parse(savedTickets) });
    } else {
      dispatch({ type: 'LOAD_TICKETS', payload: mockTickets });
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever tickets change
    localStorage.setItem('taskassign_tickets', JSON.stringify(state.tickets));
  }, [state.tickets]);

  const createTicket = (ticketData) => {
    dispatch({ type: 'CREATE_TICKET', payload: ticketData });
  };

  const updateTicket = (id, updates) => {
    dispatch({ type: 'UPDATE_TICKET', payload: { id, updates } });
  };

  const deleteTicket = (id) => {
    dispatch({ type: 'DELETE_TICKET', payload: id });
  };

  const addComment = (ticketId, content, author, type = 'internal') => {
    dispatch({
      type: 'ADD_COMMENT',
      payload: { ticketId, content, author, type }
    });
  };

  const addTag = (ticketId, tag) => {
    dispatch({ type: 'ADD_TAG', payload: { ticketId, tag } });
  };

  const removeTag = (ticketId, tag) => {
    dispatch({ type: 'REMOVE_TAG', payload: { ticketId, tag } });
  };

  const getTicketsByStatus = (status) => {
    return state.tickets.filter(ticket => ticket.status === status);
  };

  const getTicketsByPriority = (priority) => {
    return state.tickets.filter(ticket => ticket.priority === priority);
  };

  const getTicketsByAssignee = (assigneeId) => {
    return state.tickets.filter(ticket => ticket.assignee === assigneeId);
  };

  const getTicketStats = () => {
    const total = state.tickets.length;
    const open = state.tickets.filter(t => ['open', 'in_progress'].includes(t.status)).length;
    const resolved = state.tickets.filter(t => t.status === 'resolved').length;
    const highPriority = state.tickets.filter(t => ['high', 'urgent'].includes(t.priority)).length;
    
    return { total, open, resolved, highPriority };
  };

  // Simulate AI-powered ticket categorization and priority assignment
  const analyzeTicket = async (title, description) => {
    const content = (title + ' ' + description).toLowerCase();
    
    let suggestedCategory = 'other';
    let suggestedPriority = 'medium';
    let suggestedTags = [];

    // Category detection
    if (content.includes('bug') || content.includes('error') || content.includes('broken') || content.includes('not working')) {
      suggestedCategory = 'bug';
    } else if (content.includes('feature') || content.includes('request') || content.includes('enhancement')) {
      suggestedCategory = 'feature';
    } else if (content.includes('billing') || content.includes('payment') || content.includes('invoice')) {
      suggestedCategory = 'billing';
    } else if (content.includes('help') || content.includes('support') || content.includes('how to')) {
      suggestedCategory = 'support';
    }

    // Priority detection
    if (content.includes('urgent') || content.includes('critical') || content.includes('down') || content.includes('broken')) {
      suggestedPriority = 'urgent';
    } else if (content.includes('important') || content.includes('high') || content.includes('asap')) {
      suggestedPriority = 'high';
    } else if (content.includes('minor') || content.includes('low') || content.includes('when possible')) {
      suggestedPriority = 'low';
    }

    // Tag suggestions
    if (content.includes('mobile') || content.includes('phone') || content.includes('android') || content.includes('ios')) {
      suggestedTags.push('mobile');
    }
    if (content.includes('login') || content.includes('authentication') || content.includes('password')) {
      suggestedTags.push('authentication');
    }
    if (content.includes('ui') || content.includes('interface') || content.includes('design')) {
      suggestedTags.push('ui');
    }
    if (content.includes('performance') || content.includes('slow') || content.includes('speed')) {
      suggestedTags.push('performance');
    }

    return {
      category: suggestedCategory,
      priority: suggestedPriority,
      tags: suggestedTags
    };
  };

  const value = {
    ...state,
    createTicket,
    updateTicket,
    deleteTicket,
    addComment,
    addTag,
    removeTag,
    getTicketsByStatus,
    getTicketsByPriority,
    getTicketsByAssignee,
    getTicketStats,
    analyzeTicket
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicket must be used within a TicketProvider');
  }
  return context;
}