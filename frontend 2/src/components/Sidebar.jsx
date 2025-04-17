import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { UserCircleIcon, BellIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

export default function Sidebar() {
  // Use the sidebar context
  const { isOpen, toggleSidebar } = useSidebar();
  
  return (
    <>
      {/* Toggle button - positioned away from content */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
        className="fixed right-0 top-20 z-50 bg-primary-600 text-white p-2 rounded-l-md shadow-md"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? 
          <ChevronRightIcon className="h-5 w-5" /> : 
          <ChevronLeftIcon className="h-5 w-5" />}
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.aside 
            key="sidebar"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block fixed right-0 top-0 pt-16 pb-8 w-60 xl:w-64 h-full bg-gray-50 dark:bg-navy-900 overflow-y-auto z-40 border-l border-gray-200 dark:border-navy-700 shadow-md"
          >
      <div className="px-3">
        {/* User Profile Section - now a link to profile */}
        <Link to="/profile" className="block mb-4 bg-white dark:bg-navy-800 rounded-xl shadow-sm p-3 border border-gray-100 dark:border-navy-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-indigo-600 flex items-center justify-center text-white">
                <UserCircleIcon className="h-8 w-8" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-navy-800"></div>
            </div>
            <div className="overflow-hidden">
              <h3 className="font-medium text-navy-900 dark:text-white truncate">User Name</h3>
              <p className="text-xs text-navy-500 dark:text-navy-400 truncate">Style: Casual Chic</p>
            </div>
          </div>
        </Link>

        

        {/* Style Notifications */}
        <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-3 border border-gray-100 dark:border-navy-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-navy-900 dark:text-white truncate">Style Updates</h3>
            <span className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2">3 New</span>
          </div>
          
          <ul className="space-y-3">
            {[1, 2, 3].map((item) => (
              <li key={item} className="flex items-start p-2 hover:bg-gray-50 dark:hover:bg-navy-700/50 rounded-lg transition-colors">
                <div className="mt-0.5 flex-shrink-0 mr-3">
                  <BellIcon className="h-5 w-5 text-primary-500" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm text-navy-700 dark:text-navy-300 truncate">New trend alert: Oversized blazers are back in style</p>
                  <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">2 hours ago</p>
                </div>
              </li>
            ))}
          </ul>
          
          <button className="w-full mt-3 text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors">
            View all updates
          </button>
        </div>
      </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
