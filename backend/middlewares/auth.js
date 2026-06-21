import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const protect = async (req , res , next) => {
    let token;

    // Check if token exists in Authorization header (format: Bearer <token>)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];

            // Verify token signatures using the secret key in our env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the admin user from DB (excluding password hash) and attach to the request object
            req.admin = await Admin.findById(decoded.id).select('-passwordHash');
            next();


        } catch (error) {
            return res.status(401).json({error : 'Not authorized, token failed'});
        }
    }

    if(!token) {
        res.status(401).json({
            error : "Not authorized, no token provided"
        });
    }
};

export default protect;