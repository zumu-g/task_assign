import React, { createContext, useContext } from 'react';
import { useTask } from './TaskContext';

const InboxContext = createContext();

export function InboxProvider({ children }) {
  const taskContext = useTask();
  
  return (
    <InboxContext.Provider value={taskContext}>
      {children}
    </InboxContext.Provider>
  );
}

export function useInbox() {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error('useInbox must be used within an InboxProvider');
  }
  return context;
}