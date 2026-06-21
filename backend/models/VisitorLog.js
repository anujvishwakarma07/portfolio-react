import mongoose from 'mongoose';

const visitorLogSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  ip: {
    type: String,
    default: 'Unknown'
  },
  userAgent: {
    type: String,
    default: 'Unknown'
  },
  browser: {
    type: String,
    default: 'Unknown'
  },
  os: {
    type: String,
    default: 'Unknown'
  },
  device: {
    type: String,
    default: 'Unknown'
  },
  country: {
    type: String,
    default: 'Unknown'
  },
  city: {
    type: String,
    default: 'Unknown'
  },
  region: {
    type: String,
    default: 'Unknown'
  },
  path: {
    type: String,
    required: true,
    default: '/'
  },
  referrer: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Compound indexes for rapid analytics lookups
visitorLogSchema.index({ timestamp: -1 });

const VisitorLog = mongoose.model('VisitorLog', visitorLogSchema);
export default VisitorLog;
