import express from 'express';
import { supabase } from '../supabase/client.js';

const router = express.Router();

// Sign-up
router.post('/signup', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name, last_name }
      }
    });
    if (error) throw error;

    // Create profile
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        first_name,
        last_name
      });
    }

    res.json({ user: data.user, session: data.session });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sign-in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    res.json({ user: data.user, session: data.session });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get current user
router.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;