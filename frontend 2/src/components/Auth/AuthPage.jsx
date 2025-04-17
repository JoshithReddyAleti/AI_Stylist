import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function AuthPage({ onSignIn, onSignUp }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState(null);

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSignIn = (userData) => {
    console.log('User signed in:', userData);
    setUser(userData);
    // Call the parent callback
    if (onSignIn) {
      onSignIn(userData);
    }
  };

  const handleSignUp = (userData) => {
    console.log('User signed up:', userData);
    setUser(userData);
    // Call the parent callback
    if (onSignUp) {
      onSignUp(userData);
    }
  };

  // If user is authenticated, you could redirect here
  if (user) {
    // For demo purposes, we'll just show a success message
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-50 dark:bg-navy-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-navy-800 p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white font-playfair">
              Welcome, {user.email}!
            </h2>
            <p className="mt-4 text-navy-600 dark:text-navy-300">
              You have successfully authenticated. Enjoy your personalized styling experience!
            </p>
            <button
              onClick={() => setUser(null)}
              className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-navy-50 dark:bg-navy-900">
      {/* Left side - Brand/Promo */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-navy-800 to-navy-900 flex flex-col justify-center items-center p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">AI Stylist</h1>
          <p className="text-xl mb-8 text-navy-100 font-inter">
            Your personal AI-powered fashion assistant. Discover your perfect style with personalized recommendations.
          </p>
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-primary-500 rounded-full p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold">Smart Wardrobe Management</h3>
                <p className="text-navy-200">Organize and optimize your clothing collection</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary-500 rounded-full p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold">Personalized Recommendations</h3>
                <p className="text-navy-200">AI-powered outfit suggestions for any occasion</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary-500 rounded-full p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold">Event-Based Planning</h3>
                <p className="text-navy-200">Plan your outfits ahead for any event</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait">
            {isSignIn ? (
              <SignIn 
                key="signin" 
                onToggleForm={handleToggleForm} 
                onSignIn={handleSignIn} 
              />
            ) : (
              <SignUp 
                key="signup" 
                onToggleForm={handleToggleForm} 
                onSignUp={handleSignUp} 
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
