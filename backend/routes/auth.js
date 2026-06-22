import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';


const router = express.Router();


// Generating the token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @route   GET /api/auth/status
// @desc    Check if an admin account already exists
router.get('/status', async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        res.json({ hasAdmin: adminCount > 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @route   POST /api/auth/register
// @desc    Register an admin account (Usually run once to initialize)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // SECURITY: Allow registration ONLY if there are no admin accounts in the DB
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            return res.status(403).json({
                error: 'Admin registration is closed. An admin already exists.'
            });
        }

        const adminExist = await Admin.findOne({ username });
        if (adminExist) {
            return res.status(400).json({
                error: 'Admin already exsit'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            username,
            passwordHash,
        });

        res.status(201).json({
            message: 'Admin registered successfully',
            token: generateToken(admin._id),
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
})

// @route   POST /api/auth/login
// @desc    Authenticate admin & return token

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({
                error: 'Invalid username or password'
            });
        }

        const isMatch = await bcrypt.compare(password, admin.passwordHash);
        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid username or password'
            });
        }

        res.json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id),
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;

