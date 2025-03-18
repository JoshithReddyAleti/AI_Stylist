import { useState } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, CloudIcon, MoonIcon, MapPinIcon } from '@heroicons/react/24/solid';

// Sample weather data (in a real app, this would come from a weather API)
const weatherData = {
  location: 'New York, NY',
  temperature: 72,
  condition: 'Sunny',
  high: 78,
  low: 65,
  humidity: 45,
  wind: 8,
  recommendations: [
    'Light fabrics are recommended for today\'s weather',
    'Consider bringing a light jacket for the evening',
    'UV index is high - don\'t forget sunglasses'
  ]
};

export default function WeatherWidget() {
  const [weather] = useState(weatherData);
  const [expanded, setExpanded] = useState(false);
  
  // Get weather icon based on condition
  const getWeatherIcon = () => {
    switch(weather.condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <SunIcon className="h-10 w-10 text-yellow-500" />;
      case 'cloudy':
      case 'partly cloudy':
        return <CloudIcon className="h-10 w-10 text-gray-400" />;
      case 'night':
        return <MoonIcon className="h-10 w-10 text-navy-300" />;
      default:
        return <SunIcon className="h-10 w-10 text-yellow-500" />;
    }
  };

  return (
    <motion.div 
      className="bg-white dark:bg-navy-800 rounded-lg shadow-md overflow-hidden"
      animate={{ height: expanded ? 'auto' : '140px' }}
      transition={{ duration: 0.3 }}
    >
      {/* Weather Summary */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 text-navy-500 dark:text-navy-300 mr-1" />
            <h3 className="text-sm font-medium text-navy-600 dark:text-navy-300 font-montserrat">
              {weather.location}
            </h3>
          </div>
          <span className="text-xs text-navy-500 dark:text-navy-400">
            Today
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            {getWeatherIcon()}
            <div className="ml-3">
              <div className="text-3xl font-bold text-navy-900 dark:text-white font-montserrat">
                {weather.temperature}°F
              </div>
              <div className="text-navy-600 dark:text-navy-300">
                {weather.condition}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-navy-800 dark:text-navy-200 font-medium">
              H: {weather.high}° L: {weather.low}°
            </div>
            <div className="text-sm text-navy-600 dark:text-navy-400">
              Humidity: {weather.humidity}%
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Weather Details */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 pb-4 border-t border-navy-100 dark:border-navy-700"
        >
          <h4 className="text-sm font-medium text-navy-700 dark:text-navy-200 mt-3 mb-2 font-montserrat">
            Outfit Recommendations
          </h4>
          <ul className="space-y-2">
            {weather.recommendations.map((recommendation, index) => (
              <li 
                key={index}
                className="text-sm text-navy-600 dark:text-navy-300 flex items-start"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                {recommendation}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
