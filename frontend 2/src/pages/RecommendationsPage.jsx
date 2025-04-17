import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import OutfitRecommendation from '../components/OutfitRecommendation';
import WeatherWidget from '../components/WeatherWidget';
import WeatherWidgetToggle from '../components/WeatherWidgetToggle';
import { AdjustmentsHorizontalIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function RecommendationsPage() {
  const [showWeatherWidget, setShowWeatherWidget] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    occasion: 'All',
    weather: 'All',
    style: 'All'
  });
  
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
  
  // Filter options
  const filterOptions = {
    occasion: ['All', 'Business', 'Casual', 'Evening', 'Formal'],
    weather: ['All', 'Hot', 'Mild', 'Cold', 'Rainy'],
    style: ['All', 'Professional', 'Casual', 'Formal', 'Resort']
  };
  
  const updateFilter = (category, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: value
    }));
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-navy-900 dark:text-white font-playfair inline-block relative">
                AI Outfit Recommendations
                <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary-500 rounded-full"></div>
              </h1>
              <p className="text-navy-600 dark:text-navy-300 mt-2">Discover personalized outfits curated just for you</p>
            </div>
            
            {/* Filter Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-navy-800 rounded-lg shadow-md border border-gray-200 dark:border-navy-700"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-navy-600 dark:text-navy-300" />
              <span className="text-navy-700 dark:text-navy-300 font-medium">Filters</span>
            </motion.button>
          </div>
          
          {/* Filters Panel */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showFilters ? 'auto' : 0,
              opacity: showFilters ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="bg-white dark:bg-navy-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-navy-700">
              <div className="flex flex-wrap gap-6">
                {/* Occasion Filter */}
                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Occasion</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.occasion.map(option => (
                      <button
                        key={option}
                        onClick={() => updateFilter('occasion', option)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${activeFilters.occasion === option ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-navy-700 text-navy-700 dark:text-navy-300'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Weather Filter */}
                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Weather</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.weather.map(option => (
                      <button
                        key={option}
                        onClick={() => updateFilter('weather', option)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${activeFilters.weather === option ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-navy-700 text-navy-700 dark:text-navy-300'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Style Filter */}
                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Style</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.style.map(option => (
                      <button
                        key={option}
                        onClick={() => updateFilter('style', option)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${activeFilters.style === option ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-navy-700 text-navy-700 dark:text-navy-300'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Active Filters Summary */}
              {(activeFilters.occasion !== 'All' || activeFilters.weather !== 'All' || activeFilters.style !== 'All') && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-navy-700 flex justify-between items-center">
                  <div className="flex items-center">
                    <FunnelIcon className="h-4 w-4 text-primary-500 mr-2" />
                    <span className="text-sm text-navy-700 dark:text-navy-300">
                      Active filters: 
                      {activeFilters.occasion !== 'All' && <span className="ml-1 font-medium">{activeFilters.occasion}</span>}
                      {activeFilters.weather !== 'All' && <span className="ml-1 font-medium">{activeFilters.weather}</span>}
                      {activeFilters.style !== 'All' && <span className="ml-1 font-medium">{activeFilters.style}</span>}
                    </span>
                  </div>
                  <button 
                    onClick={() => setActiveFilters({ occasion: 'All', weather: 'All', style: 'All' })}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Outfit Recommendations */}
        <motion.div
          ref={contentRef}
          className="w-full"
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <OutfitRecommendation />
          
          {/* Pagination Controls */}
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-medium">1</button>
              <button className="w-10 h-10 rounded-full bg-white dark:bg-navy-800 text-navy-700 dark:text-navy-300 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-navy-700">2</button>
              <button className="w-10 h-10 rounded-full bg-white dark:bg-navy-800 text-navy-700 dark:text-navy-300 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-navy-700">3</button>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
