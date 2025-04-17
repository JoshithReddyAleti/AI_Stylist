import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Wardrobe from '../components/Wardrobe';
import WeatherWidget from '../components/WeatherWidget';
import WeatherWidgetToggle from '../components/WeatherWidgetToggle';
import { MagnifyingGlassIcon, PlusIcon, SwatchIcon } from '@heroicons/react/24/outline';

export default function WardrobePage() {
  const [showWeatherWidget, setShowWeatherWidget] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateOutfit, setShowCreateOutfit] = useState(false);
  
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
  
  // Categories for filtering
  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Footwear', 'Accessories'];

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
                My Wardrobe
                <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary-500 rounded-full"></div>
              </h1>
              <p className="text-navy-600 dark:text-navy-300 mt-2">Manage your clothing items and create outfits</p>
            </div>
            
            {/* Create Outfit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateOutfit(true)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="font-medium">Create Outfit</span>
            </motion.button>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="mt-6 bg-white dark:bg-navy-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-navy-700">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-navy-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search items..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-navy-700 rounded-lg bg-gray-50 dark:bg-navy-700 text-navy-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedCategory === category ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-navy-700 text-navy-700 dark:text-navy-300 hover:bg-gray-200 dark:hover:bg-navy-600'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Wardrobe Content */}
        <motion.div
          ref={contentRef}
          className="w-full"
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <Wardrobe />
        </motion.div>
        
        {/* Create Outfit Modal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCreateOutfit ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center ${showCreateOutfit ? '' : 'pointer-events-none'}`}
        >
          {showCreateOutfit && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-navy-800 rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl border border-gray-200 dark:border-navy-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-navy-900 dark:text-white font-playfair flex items-center">
                  <SwatchIcon className="h-6 w-6 text-primary-500 mr-2" />
                  Create New Outfit
                </h2>
                <button 
                  onClick={() => setShowCreateOutfit(false)}
                  className="text-navy-500 hover:text-navy-700 dark:text-navy-400 dark:hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <p className="text-navy-600 dark:text-navy-300 mb-6">Combine items from your wardrobe to create a new outfit.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Select Items</h3>
                  <div className="bg-gray-50 dark:bg-navy-700 rounded-lg p-4 h-64 overflow-y-auto border border-gray-200 dark:border-navy-600">
                    <p className="text-center text-navy-500 dark:text-navy-400 mt-20">Your wardrobe items will appear here</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Outfit Preview</h3>
                  <div className="bg-gray-50 dark:bg-navy-700 rounded-lg p-4 h-64 border border-gray-200 dark:border-navy-600 flex items-center justify-center">
                    <p className="text-center text-navy-500 dark:text-navy-400">Selected items will appear here</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowCreateOutfit(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-navy-600 text-navy-700 dark:text-navy-300 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-700"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Save Outfit
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </motion.div>
  );
}
