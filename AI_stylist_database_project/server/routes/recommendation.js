import express from 'express';
import Clothing from '../models/Clothing.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Get clothing recommendations based on weather
router.post('/', async (req, res) => {
  try {
    const { weatherData } = req.body;
    
    if (!weatherData) {
      return res.status(400).json({ message: 'Weather data is required' });
    }
    
    // Get suitable clothing from database
    const weatherCondition = weatherData.weatherCondition;
    const isRaining = weatherData.isRaining;
    
    // Find suitable shirts
    const shirts = await Clothing.find({ 
      type: 'shirt',
      [`weatherSuitability.${weatherCondition}`]: true
    });
    
    // Find suitable pants
    const pants = await Clothing.find({ 
      type: 'pants',
      [`weatherSuitability.${weatherCondition}`]: true
    });
    
    // Find suitable outerwear, considering rain if applicable
    const outerwearQuery = { 
      type: 'outerwear',
      [`weatherSuitability.${weatherCondition}`]: true
    };
    
    if (isRaining) {
      outerwearQuery.rainSuitable = true;
    }
    
    const outerwear = await Clothing.find(outerwearQuery);
    
    // If we have enough clothing options, use AI to create a personalized recommendation
    if (shirts.length > 0 && pants.length > 0) {
      const clothingData = {
        shirts,
        pants,
        outerwear: outerwear.length > 0 ? outerwear : []
      };
      
      const aiRecommendation = await getAIRecommendation(weatherData, clothingData);
      
      return res.json({
        recommendation: aiRecommendation,
        availableClothing: clothingData
      });
    } else {
      // Not enough clothing options
      return res.json({
        recommendation: {
          message: "You don't have enough suitable clothing items for this weather. Consider adding more to your wardrobe."
        },
        availableClothing: {
          shirts,
          pants,
          outerwear
        }
      });
    }
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ message: 'Error generating recommendations' });
  }
});

// Function to get AI-generated recommendation
async function getAIRecommendation(weatherData, clothingData) {
  try {
    // Format clothing data for the AI
    const formatClothing = (items) => {
      return items.map(item => `${item.name} (${item.color}, ${item.material})`).join(', ');
    };
    
    const prompt = `
      As an AI fashion stylist, recommend an outfit based on the following:
      
      Weather: ${weatherData.temperature}°C, ${weatherData.description}
      Weather condition: ${weatherData.weatherCondition}
      Is it raining: ${weatherData.isRaining ? 'Yes' : 'No'}
      
      Available shirts: ${formatClothing(clothingData.shirts)}
      Available pants: ${formatClothing(clothingData.pants)}
      ${clothingData.outerwear.length > 0 ? `Available outerwear: ${formatClothing(clothingData.outerwear)}` : 'No outerwear available'}
      
      Please recommend a specific outfit (shirt, pants, and outerwear if needed) that would be comfortable and appropriate for this weather. Explain why this combination works well for the current conditions.
    `;
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI fashion stylist that gives practical clothing recommendations based on weather conditions." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500
    });
    
    return {
      outfit: response.choices[0].message.content,
      temperature: weatherData.temperature,
      description: weatherData.description,
      weatherCondition: weatherData.weatherCondition
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      outfit: "I couldn't generate a personalized recommendation at this time. Please try again later.",
      temperature: weatherData.temperature,
      description: weatherData.description,
      weatherCondition: weatherData.weatherCondition
    };
  }
}

export const recommendationRoutes = router;