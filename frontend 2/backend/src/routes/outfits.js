import express from 'express';
import sql from '../db.js';
import { supabase } from '../supabase/client.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all outfits
router.get('/', async (req, res) => {
    try {
      const outfits = await sql`SELECT * FROM outfits`;
      res.json(outfits);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Add favorite
router.post('/favorites', authMiddleware, async (req, res) => {
  const { outfit_id } = req.body;
  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: req.user.id, outfit_id })
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove favorite
router.delete('/favorites/:outfit_id', authMiddleware, async (req, res) => {
  const { outfit_id } = req.params;
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', req.user.id)
      .eq('outfit_id', outfit_id);
    if (error) throw error;
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user favorites
router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('outfit_id')
      .eq('user_id', req.user.id);
    if (error) throw error;
    res.json(data.map((fav) => fav.outfit_id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add saved outfit
router.post('/saved', authMiddleware, async (req, res) => {
  const { outfit_id } = req.body;
  try {
    const { data, error } = await supabase
      .from('saved_outfits')
      .insert({ user_id: req.user.id, outfit_id })
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove saved outfit
router.delete('/saved/:outfit_id', authMiddleware, async (req, res) => {
  const { outfit_id } = req.params;
  try {
    const { error } = await supabase
      .from('saved_outfits')
      .delete()
      .eq('user_id', req.user.id)
      .eq('outfit_id', outfit_id);
    if (error) throw error;
    res.json({ message: 'Saved outfit removed' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user saved outfits
router.get('/saved', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('saved_outfits')
      .select('outfit_id')
      .eq('user_id', req.user.id);
    if (error) throw error;
    res.json(data.map((saved) => saved.outfit_id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add or update rating
router.post('/ratings', authMiddleware, async (req, res) => {
  const { outfit_id, rating } = req.body;
  try {
    const { data: existing, error: fetchError } = await supabase
      .from('ratings')
      .select('id')
      .eq('user_id', req.user.id)
      .eq('outfit_id', outfit_id)
      .single();
    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    if (existing) {
      const { data, error } = await supabase
        .from('ratings')
        .update({ rating })
        .eq('id', existing.id)
        .select();
      if (error) throw error;
      res.json(data[0]);
    } else {
      const { data, error } = await supabase
        .from('ratings')
        .insert({ user_id: req.user.id, outfit_id, rating })
        .select();
      if (error) throw error;
      res.json(data[0]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user ratings
router.get('/ratings', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ratings')
      .select('outfit_id, rating')
      .eq('user_id', req.user.id);
    if (error) throw error;
    res.json(Object.fromEntries(data.map((r) => [r.outfit_id, r.rating])));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;