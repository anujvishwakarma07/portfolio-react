import express from 'express';
import Content from '../models/Content.js';
import protect from '../middlewares/auth.js';
import { cacheMiddleware, clearCache } from '../middlewares/cache.js';

const router = express.Router();

// @route   GET /api/content
// @desc    Get all dynamic portfolio copy text (Public)
router.get('/', cacheMiddleware('content_list', 600), async (req, res) => {
  try {
    const content = await Content.find({});
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/content
// @desc    Update or Insert (Upsert) dynamic copy text (Admin Only)
router.post('/', protect, async (req, res) => {
  const { section, key, value } = req.body;

  try {
    // High-performance single database call to Upsert content
    const content = await Content.findOneAndUpdate(
      { section, key }, // Query criteria
      { value },        // Update fields
      { 
        new: true,      // Return the updated document instead of the old one
        upsert: true,   // Insert if it does not exist
        runValidators: true // Enforce schema rules
      }
    );
    clearCache('content_list');
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
