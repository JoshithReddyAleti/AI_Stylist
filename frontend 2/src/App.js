import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import { AuthPage } from './components/Auth';
import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider, useSidebar } from './context/SidebarContext';

// Import page components
import HomePage from './pages/HomePage';
import WardrobePage from './pages/WardrobePage';
import EventsPage from './pages/EventsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import StyleQuizPage from './pages/StyleQuizPage';
import ProfilePage from './pages/ProfilePage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Scroll to the element with the id matching the hash
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);
  
  return null;
}

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

// Separate component to access the sidebar context
function AppContent({ handleLogout, handleLogin, isLoading }) {
  const { isOpen } = useSidebar();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 transition-colors duration-300">
      <Navbar onLogout={handleLogout} />
      
      
      
      {/* Main container with sidebar and content */}
      <div className="flex relative">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        {/* Main content area with proper padding when sidebar is open */}
        <main className={`w-full transition-all duration-300 ${isOpen ? 'lg:pr-60 xl:pr-64' : 'pr-0'} mx-auto`}>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Home Page */}
              <Route path="/" element={
                <motion.div
                  key="home"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <HomePage />
                </motion.div>
              } />
              
              {/* Wardrobe Page */}
              <Route path="/wardrobe" element={
                <motion.div
                  key="wardrobe"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <WardrobePage />
                </motion.div>
              } />
              
              {/* Events Page */}
              <Route path="/events" element={
                <motion.div
                  key="events"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <EventsPage />
                </motion.div>
              } />
              
              {/* Recommendations Page */}
              <Route path="/recommendations" element={
                <motion.div
                  key="recommendations"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <RecommendationsPage />
                </motion.div>
              } />
              
              {/* Style Quiz Page */}
              <Route path="/style-quiz" element={
                <motion.div
                  key="style-quiz"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <StyleQuizPage />
                </motion.div>
              } />
              
              {/* Profile Page */}
              <Route path="/profile" element={
                <motion.div
                  key="profile"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProfilePage />
                </motion.div>
              } />
              
              {/* Auth Page */}
              <Route path="/auth" element={
                <motion.div
                  key="auth"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <AuthPage onLogin={handleLogin} isLoading={isLoading} />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
          
          <footer className="bg-white dark:bg-navy-800 mt-12">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center">
                  <span className="text-lg font-bold text-navy-900 dark:text-white font-playfair mr-2">AI Stylist</span>
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200 rounded-full">2025</span>
                </div>
                <p className="text-sm text-navy-500 dark:text-navy-300 font-inter">
                  Designed with ❤️ for fashion enthusiasts
                </p>
                <div className="flex space-x-4">
                  <button className="text-navy-500 hover:text-navy-700 dark:text-navy-300 dark:hover:text-white transition-colors">
                    Privacy
                  </button>
                  <button className="text-navy-500 hover:text-navy-700 dark:text-navy-300 dark:hover:text-white transition-colors">
                    Terms
                  </button>
                  <button className="text-navy-500 hover:text-navy-700 dark:text-navy-300 dark:hover:text-white transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle authentication
  const handleLogin = (userData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('User logged in:', userData);
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 800);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('User logged out');
      setIsAuthenticated(false);
      setIsLoading(false);
    }, 500);
  };

  // If not authenticated, show the auth page
  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key="auth"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AuthPage onSignIn={handleLogin} onSignUp={handleLogin} isLoading={isLoading} />
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SidebarProvider>
        <Router>
          <ScrollToTop />
          <AppContent 
            handleLogout={handleLogout} 
            handleLogin={handleLogin} 
            isLoading={isLoading} 
          />
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
