import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import outfitRoutes from './routes/outfits.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust for your frontend URL
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/outfits', outfitRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});