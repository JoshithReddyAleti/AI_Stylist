import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Get current weather by location
router.get('/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${1c170c29a8330f784471f67ecd5ccb73}`
    );
    
    const weatherData = {
      location: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      isRaining: response.data.weather[0].main === 'Rain',
      weatherCondition: getWeatherCondition(response.data.main.temp)
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Helper function to categorize temperature
function getWeatherCondition(temp) {
  if (temp < 5) return 'cold';
  if (temp < 15) return 'cool';
  if (temp < 22) return 'mild';
  if (temp < 28) return 'warm';
  return 'hot';
}

export const weatherRoutes = router;