import React, { createContext, useContext, useState } from 'react';

const ViewContext = createContext();

export function ViewProvider({ children }) {
  const [currentView, setCurrentView] = useState('inbox');
  const [isLoading, setIsLoading] = useState(false);
  
  const value = {
    currentView,
    setCurrentView,
    isLoading,
    setIsLoading
  };
  
  return (
    <ViewContext.Provider value={value}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}