import express from 'express';
import Message from '../models/Message.js';
import protect from '../middlewares/auth.js';

const router = express.Router();

// @route   POST /api/messages
// @desc    Submit a new contact form message (Public)
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please provide all fields: name, email, subject, message' });
  }

  try {
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    // Broadcast new message to admin clients via WebSockets
    const io = req.app.get('socketio');
    if (io) {
      io.to('admin-room').emit('new-message', newMessage);
      console.log(`✉️ Real-time broadcast: New message from ${name} sent to admin-room.`);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully!',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/messages
// @desc    Get all messages (Admin Only)
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/messages/:id/read
// @desc    Toggle or set read status of a message (Admin Only)
router.put('/:id/read', protect, async (req, res) => {
  const { isRead } = req.body;
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: isRead !== undefined ? isRead : true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete a message (Admin Only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
