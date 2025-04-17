import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon, 
  UserCircleIcon, 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingBagIcon, 
  CalendarIcon, 
  SquaresPlusIcon, 
  HomeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onLogout }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Navigation items with icons
  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon className="h-5 w-5" /> },
    { name: 'Wardrobe', path: '/wardrobe', icon: <SquaresPlusIcon className="h-5 w-5" /> },
    { name: 'Events', path: '/events', icon: <CalendarIcon className="h-5 w-5" /> },
    { name: 'Recommendations', path: '/recommendations', icon: <SparklesIcon className="h-5 w-5" /> },
    { name: 'Style Quiz', path: '/style-quiz', icon: <ShoppingBagIcon className="h-5 w-5" /> }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if a nav item is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    if (path.includes('#')) {
      return location.hash === path.split('#')[1];
    }
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-navy-900/95 backdrop-blur-md shadow-md' 
          : 'bg-white/70 dark:bg-navy-900/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 5 }}
              className="mr-2 text-primary-500 dark:text-primary-400"
            >
              <SparklesIcon className="h-6 w-6" />
            </motion.div>
            <motion.span 
              className="text-2xl font-bold text-navy-900 dark:text-white font-playfair tracking-tight"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              AI Stylist
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-300 dark:hover:text-white dark:hover:bg-navy-800/70'
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: darkMode ? -15 : 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-navy-600 hover:bg-navy-100 dark:text-navy-200 dark:hover:bg-navy-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-amber-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-indigo-600" />
              )}
            </motion.button>
            
            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <Link to="/profile">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-4 p-2 rounded-full bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 shadow-sm text-navy-700 dark:text-navy-200 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
                  aria-label="Go to profile"
                >
                  <UserCircleIcon className="h-6 w-6" />
                </motion.button>
              </Link>
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-lg shadow-lg border border-gray-200 dark:border-navy-700 z-50"
                  >
                    <div className="py-2">
                      <Link to="/profile" className="w-full flex items-center px-4 py-2 text-sm text-navy-700 dark:text-navy-200 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                        <UserCircleIcon className="h-5 w-5 mr-2" />
                        Profile
                      </Link>
                      <button
                        className="w-full flex items-center px-4 py-2 text-sm text-navy-700 dark:text-navy-200 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                      >
                        <SparklesIcon className="h-4 w-4 mr-2 text-navy-500 dark:text-navy-400" />
                        Style Preferences
                      </button>
                    </div>
                    <div className="py-1 border-t border-gray-100 dark:border-navy-700">
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-navy-600 hover:bg-navy-100 dark:text-navy-200 dark:hover:bg-navy-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-navy-800 shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'text-navy-600 hover:bg-navy-100 dark:text-navy-300 dark:hover:bg-navy-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
