import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the sidebar context
export const SidebarContext = createContext();

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);

// Sidebar provider component
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Check if sidebar state is stored in localStorage
  useEffect(() => {
    const storedSidebarState = localStorage.getItem('sidebarOpen');
    if (storedSidebarState !== null) {
      setIsOpen(storedSidebarState === 'true');
    }
  }, []);
  
  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', isOpen.toString());
  }, [isOpen]);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
