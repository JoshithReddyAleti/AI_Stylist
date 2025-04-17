import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Events from '../components/Events';
import WeatherWidget from '../components/WeatherWidget';
import WeatherWidgetToggle from '../components/WeatherWidgetToggle';
import { CalendarDaysIcon, ListBulletIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function EventsPage() {
  const [showWeatherWidget, setShowWeatherWidget] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };
  
  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      className="min-h-screen pb-24 bg-white dark:bg-navy-900"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Weather Widget Toggle */}
      <div className="relative z-50">
        {showWeatherWidget ? (
          <WeatherWidget visible={showWeatherWidget} onClose={() => setShowWeatherWidget(false)} />
        ) : (
          <WeatherWidgetToggle onClick={() => setShowWeatherWidget(true)} />
        )}
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 pt-16">
        {/* Page Title with Animation */}
        <motion.div
          ref={titleRef}
          className="mb-8"
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-navy-900 dark:text-white font-playfair inline-block relative">
                Style Events
                <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary-500 rounded-full"></div>
              </h1>
              <p className="text-navy-600 dark:text-navy-300 mt-2">Plan your outfits for upcoming events</p>
            </div>
            
            {/* Add Event Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="font-medium">Add Event</span>
            </motion.button>
          </div>
          
          {/* View Toggle */}
          <div className="mt-6 flex justify-between items-center">
            <div className="inline-flex rounded-lg shadow-sm bg-white dark:bg-navy-800 p-1 border border-gray-200 dark:border-navy-700">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-navy-700 dark:text-navy-300 hover:bg-gray-100 dark:hover:bg-navy-700'}`}
              >
                <ListBulletIcon className="h-4 w-4" />
                <span>List View</span>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-primary-500 text-white' : 'text-navy-700 dark:text-navy-300 hover:bg-gray-100 dark:hover:bg-navy-700'}`}
              >
                <CalendarDaysIcon className="h-4 w-4" />
                <span>Calendar</span>
              </button>
            </div>
            
            {/* Filter by Category */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-navy-600 dark:text-navy-400">Category:</span>
              <select className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 text-navy-700 dark:text-navy-300 rounded-lg px-3 py-1.5 text-sm focus:ring-primary-500 focus:border-primary-500">
                <option value="all">All Events</option>
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
                <option value="business">Business</option>
                <option value="special">Special Occasion</option>
              </select>
            </div>
          </div>
        </motion.div>
        
        {/* Events Content */}
        <motion.div
          ref={contentRef}
          className="w-full"
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          {/* Enhanced Events Component with View Mode */}
          <Events viewMode={viewMode} />
          
          {/* Event Card Template with Recommended Outfit Button */}
          <div className="hidden">
            <div className="bg-white dark:bg-navy-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-navy-700 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white">Event Title</h3>
                  <p className="text-navy-600 dark:text-navy-300 text-sm">Event description goes here</p>
                </div>
                <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs font-medium px-2.5 py-1 rounded-full">
                  Category
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-navy-500 dark:text-navy-400 space-x-4">
                <div className="flex items-center">
                  <CalendarDaysIcon className="h-4 w-4 mr-1" />
                  <span>Date</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Time</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Location</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-navy-700 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span>Get Outfit Recommendation</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
