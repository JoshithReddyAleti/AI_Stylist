import axios from 'axios';

const API_URL = 'http://localhost:5173/api';

// Weather API key
const WEATHER_API_KEY = '1c170c29a8330f784471f67ecd5ccb73';

// Weather API
export const fetchWeather = async (location) => {
  try {
    // Include the API key as a query parameter
    const response = await axios.get(`${API_URL}/weather/${location}?apikey=${WEATHER_API_KEY}`);
    return response.data;
  } catch (error) {
    // Avoid logging the full error object which may contain non-serializable data
    console.error('Error fetching weather:', error.message);
    throw new Error(error.message || 'Error fetching weather data');
  }
};

// Clothing API
export const fetchAllClothing = async () => {
  try {
    const response = await axios.get(`${API_URL}/clothing`);
    return response.data;
  } catch (error) {
    // Avoid logging the full error object which may contain non-serializable data
    console.error('Error fetching clothing:', error.message);
    throw new Error(error.message || 'Error fetching clothing data');
  }
};

export const fetchClothingByType = async (type) => {
  try {
    const response = await axios.get(`${API_URL}/clothing/type/${type}`);
    return response.data;
  } catch (error) {
    // Avoid logging the full error object which may contain non-serializable data
    console.error(`Error fetching ${type}:`, error.message);
    throw new Error(error.message || `Error fetching ${type} data`);
  }
};

export const addClothing = async (clothingData) => {
  try {
    const response = await axios.post(`${API_URL}/clothing`, clothingData);
    return response.data;
  } catch (error) {
    // Avoid logging the full error object which may contain non-serializable data
    console.error('Error adding clothing:', error.message);
    throw new Error(error.message || 'Error adding clothing item');
  }
};

export const updateClothing = async (id, clothingData) => {
  try {
    const response = await axios.patch(`${API_URL}/clothing/${id}`, clothingData);
    return response.data;
  } catch (error) {
    // Avoid logging the full error object which may contain non-serializable data
    console.error('Error updating clothing:', error.message);
    throw new Error(error.message || 'Error updating clothing item');
  }
};

export const deleteClothing = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/clothing/${id}`);
    return response.data;
  } catch (error) {
    // Avoid logging the full error object which may contain non-serializable data
    console.error('Error deleting clothing:', error.message);
    throw new Error(error.message || 'Error deleting clothing item');
  }
};

// Recommendation API
export const getRecommendation = async (weatherData) => {
  try {
    const response = await axios.post(`${API_URL}/recommendation`, { weatherData });
    return response.data;
  } catch (error) {
    // Avoid logging the full error object which may contain non-serializable data
    console.error('Error getting recommendation:', error.message);
    throw new Error(error.message || 'Error getting outfit recommendations');
  }
};
