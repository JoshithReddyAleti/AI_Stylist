import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';
import ClothingForm from './components/ClothingForm';
import ClothingList from './components/ClothingList';
import Recommendation from './components/Recommendation';
import { fetchWeather, getRecommendation } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [weatherData, setWeatherData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clothingUpdated, setClothingUpdated] = useState(false);

  // Get recommendation when weather data changes or clothing is updated
  useEffect(() => {
    if (weatherData && (clothingUpdated || !recommendation)) {
      getOutfitRecommendation();
      setClothingUpdated(false);
    }
  }, [weatherData, clothingUpdated]);

  const handleWeatherSearch = async (location) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchWeather(location);
      setWeatherData(data);
      setActiveTab('recommendation');
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
      console.error('Weather search error:', err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const getOutfitRecommendation = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await getRecommendation(weatherData);
      setRecommendation(data);
    } catch (err) {
      setError('Error getting outfit recommendations. Please try again.');
      console.error('Recommendation error:', err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleClothingUpdated = () => {
    setClothingUpdated(true);
  };

  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {error && <div className="error-message">{error}</div>}
        
        {activeTab === 'home' && (
          <div className="home-container">
            <h1>AI Stylist</h1>
            <p>Get personalized outfit recommendations based on the weather</p>
            <WeatherSearch onSearch={handleWeatherSearch} loading={loading} />
          </div>
        )}
        
        {activeTab === 'wardrobe' && (
          <div className="wardrobe-container">
            <h2>My Wardrobe</h2>
            <ClothingForm onClothingAdded={handleClothingUpdated} />
            <ClothingList onClothingUpdated={handleClothingUpdated} />
          </div>
        )}
        
        {activeTab === 'recommendation' && (
          <div className="recommendation-container">
            {weatherData && <WeatherDisplay weatherData={weatherData} />}
            {recommendation && <Recommendation recommendation={recommendation} />}
            {loading && <div className="loading">Loading...</div>}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;