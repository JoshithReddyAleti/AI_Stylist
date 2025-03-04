import express from 'express';
import Clothing from '../models/Clothing.js';

const router = express.Router();

// Get all clothing items
router.get('/', async (req, res) => {
  try {
    const clothing = await Clothing.find();
    res.json(clothing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get clothing by type
router.get('/type/:type', async (req, res) => {
  try {
    const clothing = await Clothing.find({ type: req.params.type });
    res.json(clothing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new clothing item
router.post('/', async (req, res) => {
  const clothing = new Clothing(req.body);
  
  try {
    const newClothing = await clothing.save();
    res.status(201).json(newClothing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update clothing item
router.patch('/:id', async (req, res) => {
  try {
    const updatedClothing = await Clothing.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );
    res.json(updatedClothing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete clothing item
router.delete('/:id', async (req, res) => {
  try {
    await Clothing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Clothing deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const clothingRoutes = router;