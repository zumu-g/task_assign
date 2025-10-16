import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ChatContext = createContext();

const initialState = {
  channels: [
    { id: 'general', name: 'General', type: 'channel', members: ['1', '2', '3', '4'] },
    { id: 'dev-team', name: 'Development Team', type: 'channel', members: ['1', '4'] },
    { id: 'design', name: 'Design Team', type: 'channel', members: ['2', '3'] }
  ],
  messages: {},
  activeChannel: 'general',
  onlineUsers: ['1', '2', '3', '4'],
  typingUsers: {}
};

const mockMessages = {
  'general': [
    {
      id: '1',
      content: 'Welcome to the team chat! 👋',
      sender: '1',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text'
    },
    {
      id: '2',
      content: 'Thanks Alice! Excited to be here.',
      sender: '2',
      timestamp: new Date(Date.now() - 3300000),
      type: 'text'
    },
    {
      id: '3',
      content: 'Don\'t forget about the standup meeting at 10 AM',
      sender: '3',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text'
    }
  ],
  'dev-team': [
    {
      id: '4',
      content: 'The new API endpoints are ready for testing',
      sender: '1',
      timestamp: new Date(Date.now() - 900000),
      type: 'text'
    },
    {
      id: '5',
      content: 'Great! I\'ll start QA testing this afternoon',
      sender: '4',
      timestamp: new Date(Date.now() - 600000),
      type: 'text'
    }
  ],
  'design': [
    {
      id: '6',
      content: 'Updated the mockups with the new color scheme',
      sender: '2',
      timestamp: new Date(Date.now() - 7200000),
      type: 'text'
    },
    {
      id: '7',
      content: 'Looks perfect! The contrast is much better now.',
      sender: '3',
      timestamp: new Date(Date.now() - 7000000),
      type: 'text'
    }
  ]
};

function chatReducer(state, action) {
  switch (action.type) {
    case 'SEND_MESSAGE':
      const channelId = action.payload.channelId || state.activeChannel;
      const newMessage = {
        id: uuidv4(),
        content: action.payload.content,
        sender: action.payload.sender,
        timestamp: new Date(),
        type: action.payload.type || 'text'
      };
      
      return {
        ...state,
        messages: {
          ...state.messages,
          [channelId]: [...(state.messages[channelId] || []), newMessage]
        }
      };
    
    case 'SET_ACTIVE_CHANNEL':
      return {
        ...state,
        activeChannel: action.payload
      };
    
    case 'ADD_CHANNEL':
      const channel = {
        id: uuidv4(),
        name: action.payload.name,
        type: action.payload.type || 'channel',
        members: action.payload.members || []
      };
      
      return {
        ...state,
        channels: [...state.channels, channel],
        messages: {
          ...state.messages,
          [channel.id]: []
        }
      };
    
    case 'UPDATE_TYPING_USERS':
      return {
        ...state,
        typingUsers: {
          ...state.typingUsers,
          [action.payload.channelId]: action.payload.users
        }
      };
    
    case 'SET_ONLINE_USERS':
      return {
        ...state,
        onlineUsers: action.payload
      };
    
    case 'LOAD_MESSAGES':
      return {
        ...state,
        messages: { ...state.messages, ...action.payload }
      };
    
    case 'MARK_CHANNEL_READ':
      // Mark all messages in channel as read
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload]: state.messages[action.payload]?.map(msg => ({ ...msg, read: true })) || []
        }
      };
    
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    // Load initial messages
    dispatch({ type: 'LOAD_MESSAGES', payload: mockMessages });
  }, []);

  useEffect(() => {
    // Simulate WebSocket connection for real-time updates
    const interval = setInterval(() => {
      // Simulate random online status changes
      const randomUsers = ['1', '2', '3', '4'].filter(() => Math.random() > 0.3);
      dispatch({ type: 'SET_ONLINE_USERS', payload: randomUsers });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = (content, type = 'text', channelId = null) => {
    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        content,
        sender: '1', // Current user ID (would come from auth context)
        type,
        channelId
      }
    });
  };

  const setActiveChannel = (channelId) => {
    dispatch({ type: 'SET_ACTIVE_CHANNEL', payload: channelId });
    dispatch({ type: 'MARK_CHANNEL_READ', payload: channelId });
  };

  const addChannel = (name, type = 'channel', members = []) => {
    dispatch({
      type: 'ADD_CHANNEL',
      payload: { name, type, members }
    });
  };

  const updateTypingUsers = (channelId, users) => {
    dispatch({
      type: 'UPDATE_TYPING_USERS',
      payload: { channelId, users }
    });
  };

  const getUnreadCount = (channelId) => {
    const messages = state.messages[channelId] || [];
    return messages.filter(msg => !msg.read && msg.sender !== '1').length;
  };

  const value = {
    ...state,
    sendMessage,
    setActiveChannel,
    addChannel,
    updateTypingUsers,
    getUnreadCount
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}