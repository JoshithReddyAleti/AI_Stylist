import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Wardrobe from './components/Wardrobe';
import Events from './components/Events';
import OutfitRecommendation from './components/OutfitRecommendation';
import WeatherWidget from './components/WeatherWidget';
import TrendingStyles from './components/TrendingStyles';
import { AuthPage } from './components/Auth';
import { StyleQuiz } from './components/StyleQuiz';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle authentication
  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    console.log('User logged out');
    setIsAuthenticated(false);
    setActiveTab('home');
  };

  // If not authenticated, show the auth page
  if (!isAuthenticated) {
    return <AuthPage onSignIn={handleLogin} onSignUp={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-navy-900 transition-colors duration-300">
        <Navbar onLogout={handleLogout} />
        <WeatherWidget />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Tab Navigation */}
                <div className="mb-8 border-b border-navy-200 dark:border-navy-700">
                  <nav className="-mb-px flex space-x-8">
                    {['home', 'wardrobe', 'events', 'recommendations'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm font-montserrat ${
                          activeTab === tab
                            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                            : 'border-transparent text-navy-500 hover:text-navy-700 hover:border-navy-300 dark:text-navy-300 dark:hover:text-white dark:hover:border-navy-500'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                    <Link 
                      to="/style-quiz"
                      className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm font-montserrat border-transparent text-navy-500 hover:text-navy-700 hover:border-navy-300 dark:text-navy-300 dark:hover:text-white dark:hover:border-navy-500"
                    >
                      Style Quiz
                    </Link>
                  </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'home' && (
                  <section>
                    <TrendingStyles />
                  </section>
                )}
                
                {activeTab === 'wardrobe' && (
                  <section>
                    <Wardrobe />
                  </section>
                )}
                
                {activeTab === 'events' && (
                  <section>
                    <Events />
                  </section>
                )}
                
                {activeTab === 'recommendations' && (
                  <section>
                    <OutfitRecommendation />
                  </section>
                )}
              </main>
            </>
          } />
          
          <Route path="/style-quiz" element={<StyleQuiz />} />
          <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
        </Routes>

        <footer className="bg-white dark:bg-navy-800 mt-24">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-navy-500 dark:text-navy-200 font-inter">
              2025 AI Stylist. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
