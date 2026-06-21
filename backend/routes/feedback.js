import express from 'express';
import Feedback from '../models/Feedback.js';
import protect from '../middlewares/auth.js';

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit new visitor feedback/rating (Public)
router.post('/', async (req, res) => {
  const { name, role, rating, message } = req.body;

  if (!name || !rating || !message) {
    return res.status(400).json({ error: 'Please provide all mandatory fields: name, rating, and feedback comments.' });
  }

  const ratingNum = Number(rating);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ error: 'Rating score must be a number between 1 and 5.' });
  }

  try {
    const newFeedback = await Feedback.create({
      name,
      role: role || 'Visitor',
      rating: ratingNum,
      message
    });

    // Broadcast new feedback message to admin room in real-time
    const io = req.app.get('socketio');
    if (io) {
      io.to('admin-room').emit('new-feedback', newFeedback);
      console.log(`🌟 Real-time broadcast: New Feedback from ${name} sent to admin-room.`);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your valuable feedback!',
      data: newFeedback
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/feedback/approved
// @desc    Get all approved visitor reviews for public testimonials slide (Public)
router.get('/approved', async (req, res) => {
  try {
    const approvedReviews = await Feedback.find({ approved: true }).sort({ createdAt: -1 });
    res.json(approvedReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/feedback
// @desc    Get all reviews (Admin Only)
router.get('/', protect, async (req, res) => {
  try {
    const reviews = await Feedback.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/feedback/:id/approve
// @desc    Toggle or update review approval status (Admin Only)
router.put('/:id/approve', protect, async (req, res) => {
  const { approved } = req.body;
  
  if (approved === undefined) {
    return res.status(400).json({ error: 'Please specify the approval state (approved: true/false).' });
  }

  try {
    const review = await Feedback.findByIdAndUpdate(
      req.params.id,
      { approved: !!approved },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Feedback review not found.' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/feedback/:id
// @desc    Delete a review (Admin Only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Feedback.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Feedback review not found.' });
    }

    res.json({ message: 'Feedback review deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
