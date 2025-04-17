import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StyleQuiz } from '../components/StyleQuiz';
import { BookmarkIcon } from '@heroicons/react/24/outline';

export default function StyleQuizPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const totalSteps = 5; // Total number of steps in the quiz
  
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
  
  // Mock function to handle step change (would be passed to StyleQuiz component)
  const handleStepChange = (step) => {
    setCurrentStep(step);
  };
  
  return (
    <motion.div 
      className="min-h-screen pb-24 bg-white dark:bg-navy-900"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 pt-16">
        {/* Page Title with Animation */}
        <motion.div
          ref={titleRef}
          className="mb-8"
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white font-playfair inline-block relative">
              Discover Your Style
              <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary-500 rounded-full"></div>
            </h1>
            <p className="text-navy-600 dark:text-navy-300 mt-2 max-w-2xl mx-auto">
              Answer a few questions to help us understand your style preferences and create personalized outfit recommendations.
            </p>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-navy-700 dark:text-navy-300">
                Step {currentStep} of {totalSteps}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSaveModal(true)}
                className="flex items-center space-x-1 text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                <BookmarkIcon className="h-4 w-4" />
                <span>Save & Continue Later</span>
              </motion.button>
            </div>
            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
        
        {/* Quiz Content */}
        <motion.div
          ref={contentRef}
          className="w-full"
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="max-w-3xl mx-auto bg-white dark:bg-navy-800 rounded-2xl shadow-xl border border-gray-200 dark:border-navy-700 overflow-hidden">
            <StyleQuiz onStepChange={handleStepChange} />
          </div>
        </motion.div>
        
        {/* Save & Continue Modal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showSaveModal ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center ${showSaveModal ? '' : 'pointer-events-none'}`}
        >
          {showSaveModal && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-navy-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-navy-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-navy-900 dark:text-white font-playfair">
                  Save Your Progress
                </h2>
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="text-navy-500 hover:text-navy-700 dark:text-navy-400 dark:hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <p className="text-navy-600 dark:text-navy-300 mb-6">
                Your progress will be saved, and you can continue the style quiz later. How would you like to save your progress?
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <input type="radio" id="save-account" name="save-method" className="mt-1" />
                  <label htmlFor="save-account" className="text-navy-700 dark:text-navy-300">
                    <div className="font-medium">Save to my account</div>
                    <div className="text-sm text-navy-500 dark:text-navy-400">Your progress will be saved to your account and available when you log in again.</div>
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input type="radio" id="save-email" name="save-method" className="mt-1" />
                  <label htmlFor="save-email" className="text-navy-700 dark:text-navy-300">
                    <div className="font-medium">Email me a link</div>
                    <div className="text-sm text-navy-500 dark:text-navy-400">We'll send you an email with a link to continue where you left off.</div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-navy-600 text-navy-700 dark:text-navy-300 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-700"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Save Progress
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </motion.div>
  );
}
