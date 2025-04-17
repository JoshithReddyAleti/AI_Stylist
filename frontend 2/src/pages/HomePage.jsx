import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/Hero';
import TrendingStyles from '../components/TrendingStyles';
import WeatherWidget from '../components/WeatherWidget';
import WeatherWidgetToggle from '../components/WeatherWidgetToggle';
import OutfitRecommendation from '../components/OutfitRecommendation';

export default function HomePage() {
  const [showWeatherWidget, setShowWeatherWidget] = useState(false);
  const [trendingRef, trendingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [recommendationsRef, recommendationsInView] = useInView({
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
      {/* Hero section with animation */}
      <Hero />
      
      {/* Weather Widget Toggle */}
      <div className="relative z-50">
        {showWeatherWidget ? (
          <WeatherWidget visible={showWeatherWidget} onClose={() => setShowWeatherWidget(false)} />
        ) : (
          <WeatherWidgetToggle onClick={() => setShowWeatherWidget(true)} />
        )}
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Trending Styles Section */}
        <motion.div 
          ref={trendingRef}
          className="w-full mb-16"
          initial="hidden"
          animate={trendingInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <TrendingStyles />
        </motion.div>
        
        {/* Latest Recommendations Preview */}
        <motion.div
          ref={recommendationsRef}
          className="w-full"
          initial="hidden"
          animate={recommendationsInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white font-playfair inline-block relative">
              Latest Outfit Recommendations
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary-500 rounded-full"></div>
            </h2>
            <p className="text-navy-600 dark:text-navy-300 mt-2">Personalized outfits based on your style profile and preferences</p>
          </div>
          <OutfitRecommendation />
        </motion.div>
      </main>
    </motion.div>
  );
}
