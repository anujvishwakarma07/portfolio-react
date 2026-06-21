import express from 'express';
import VisitorLog from '../models/VisitorLog.js';
import Message from '../models/Message.js';
import protect from '../middlewares/auth.js';

const router = express.Router();

// @route   POST /api/analytics/track
// @desc    Track a page view event (Public)
router.post('/track', async (req, res) => {
  const {
    sessionId,
    ip,
    userAgent,
    browser,
    os,
    device,
    country,
    city,
    region,
    path,
    referrer
  } = req.body;

  if (!sessionId || !path) {
    return res.status(400).json({ error: 'Missing required tracking fields (sessionId, path).' });
  }

  try {
    const log = await VisitorLog.create({
      sessionId,
      ip: ip || req.headers['x-forwarded-for'] || req.ip || 'Unknown',
      userAgent: userAgent || req.headers['user-agent'] || 'Unknown',
      browser: browser || 'Unknown',
      os: os || 'Unknown',
      device: device || 'Unknown',
      country: country || 'Unknown',
      city: city || 'Unknown',
      region: region || 'Unknown',
      path,
      referrer: referrer || ''
    });

    res.status(201).json({ success: true, logId: log._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/analytics/dashboard
// @desc    Get aggregated analytics statistics (Admin Only)
router.get('/dashboard', protect, async (req, res) => {
  try {
    // 1. Core overall stats
    const totalPageViews = await VisitorLog.countDocuments();
    
    // Count unique sessionIds
    const uniqueSessionRes = await VisitorLog.aggregate([
      { $group: { _id: '$sessionId' } },
      { $count: 'count' }
    ]);
    const uniqueVisitors = uniqueSessionRes.length > 0 ? uniqueSessionRes[0].count : 0;

    // Count unread contact form messages
    const unreadMessages = await Message.countDocuments({ isRead: false });

    // 2. 7-Day Views and Unique Visitors Trend
    const startOfPeriod = new Date();
    startOfPeriod.setDate(startOfPeriod.getDate() - 6); // Include today + last 6 days
    startOfPeriod.setHours(0, 0, 0, 0);

    const trendAgg = await VisitorLog.aggregate([
      {
        $match: {
          timestamp: { $gte: startOfPeriod }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          views: { $sum: 1 },
          sessions: { $addToSet: '$sessionId' }
        }
      },
      {
        $project: {
          date: '$_id',
          views: 1,
          visitors: { $size: '$sessions' },
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    // Ensure all 7 days are represented in the trend (fill zero views if day was empty)
    const trendMap = new Map(trendAgg.map(t => [t.date, t]));
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (trendMap.has(dateStr)) {
        trend.push(trendMap.get(dateStr));
      } else {
        trend.push({ date: dateStr, views: 0, visitors: 0 });
      }
    }

    // 3. Browser Breakdown
    const browserBreakdown = await VisitorLog.aggregate([
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // 4. Device Breakdown
    const deviceBreakdown = await VisitorLog.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 5. Top Visited Pages
    const topPages = await VisitorLog.aggregate([
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 }
    ]);

    // 6. Recent Visitor Logs (last 10 entries)
    const recentLogs = await VisitorLog.find()
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      metrics: {
        totalPageViews,
        uniqueVisitors,
        unreadMessages
      },
      trend,
      browserBreakdown: browserBreakdown.map(b => ({ name: b._id, value: b.count })),
      deviceBreakdown: deviceBreakdown.map(d => ({ name: d._id, value: d.count })),
      topPages: topPages.map(p => ({ path: p._id, count: p.count })),
      recentLogs
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
