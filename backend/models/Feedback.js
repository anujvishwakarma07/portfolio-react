import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    trim: true
  },
  role: {
    type: String,
    trim: true,
    default: 'Visitor'
  },
  rating: {
    type: Number,
    required: [true, 'Please select a rating.'],
    min: [1, 'Rating must be at least 1 star.'],
    max: [5, 'Rating cannot exceed 5 stars.']
  },
  message: {
    type: String,
    required: [true, 'Please provide feedback comments.'],
    trim: true
  },
  approved: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

feedbackSchema.index({ createdAt: -1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
