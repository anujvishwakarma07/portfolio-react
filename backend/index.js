import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import contentRoutes from './routes/content.js';
import analyticsRoutes from './routes/analytics.js';
import messageRoutes from './routes/messages.js';
import feedbackRoutes from './routes/feedback.js';

dotenv.config();
connectDB();
const app = express();
const server = createServer(app);

// PERFORMANCE: Enable gzip compression for all JSON payload responses.
app.use(compression());

// SECURITY: Configure CORS to only trust specific origins (your React frontend)
const allowedOrigins = [
    'http://localhost:5173',
    'https://anujvishwakarma.me'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl/Postman during development)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Blocked by cors policy"));
        }
    },
    credentials: true
}));

// Body Parsers (limits payloads to 1MB to prevent large malicious upload attacks)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// SECURITY: Configure Global API Rate Limiting to prevent brute-force attacks and bot flooding
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 1000, // Increased limit to 1000 for development tracking requests
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
    standardHeaders: true, 
    legacyHeaders: false, 
});

app.use('/api', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status : 'helthy',
        message : 'Portfolio Backend API is running smoothly',
        timestamp : new Date()
    });
});

app.use((err, req, res, next) => {
    console.error(`Error : ${err.message}`);
    res.status(err.status || 500).json({
        error : err.message || 'Internal Server Error'
    });
});

// WebSocket Live Analytics Setup
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

app.set('socketio', io);

const activeUsers = new Map();

io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Register user session
    socket.on('user-register', (userData) => {
        activeUsers.set(socket.id, {
            id: socket.id,
            sessionId: userData.sessionId,
            path: userData.path || '/',
            location: userData.location || 'Unknown',
            device: userData.device || 'Desktop',
            browser: userData.browser || 'Unknown',
            ip: userData.ip || socket.handshake.address || 'Unknown',
            timestamp: Date.now()
        });
        
        broadcastActiveUsers();
    });

    // Track active page navigation
    socket.on('user-navigate', (navigationData) => {
        const user = activeUsers.get(socket.id);
        if (user) {
            user.path = navigationData.path;
            activeUsers.set(socket.id, user);
            broadcastActiveUsers();
        }
    });

    // Admin connection registration
    socket.on('admin-join', () => {
        socket.join('admin-room');
        // Immediately send active users upon joining
        socket.emit('active-users-update', Array.from(activeUsers.values()));
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        if (activeUsers.has(socket.id)) {
            activeUsers.delete(socket.id);
            broadcastActiveUsers();
        }
        console.log(`🔌 Client disconnected: ${socket.id}`);
    });
});

function broadcastActiveUsers() {
    io.to('admin-room').emit('active-users-update', Array.from(activeUsers.values()));
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});