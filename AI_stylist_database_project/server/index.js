import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { clothingRoutes } from './routes/clothing.js';
import { weatherRoutes } from './routes/weather.js';
import { recommendationRoutes } from './routes/recommendation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/clothing', clothingRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/recommendation', recommendationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});