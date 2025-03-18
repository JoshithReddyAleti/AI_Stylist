import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Navbar({ onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode toggle
  useEffect(() => {
    // Check for user preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-navy-900 dark:text-white font-playfair">
              AI Stylist
            </span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Wardrobe', 'Events', 'Recommendations'].map((item) => (
              <button
                key={item}
                className="text-navy-600 hover:text-navy-900 dark:text-navy-200 dark:hover:text-white font-medium font-montserrat"
              >
                {item}
              </button>
            ))}
          </nav>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-navy-600 hover:bg-navy-100 dark:text-navy-200 dark:hover:bg-navy-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </motion.button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="p-1 rounded-full text-navy-600 hover:bg-navy-100 dark:text-navy-200 dark:hover:bg-navy-700 transition-colors"
                aria-label="User profile"
              >
                <UserCircleIcon className="h-6 w-6" />
              </motion.button>
              
              {/* Dropdown menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-700"
                  >
                    Your Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-700"
                  >
                    Settings
                  </button>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-700"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
