import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

// Check if user is logged in (has valid token)
export const authenticate = async (req, res, next) => {
    try {
        // Get token from headers
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Access denied. No token provided.'
            });
        }

        // Extract token (remove 'Bearer ' from the start)
        const token = authHeader.substring(7);

        // Verify token
        const decoded = verifyToken(token);

        // Find user in database
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                message: 'Invalid token. User not found.'
            });
        }

        // Add user info to request object
        req.user = user;
        next(); // Continue to the next function
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token.',
            error: error.message
        });
    }
};

// Check if user is admin
export const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, continue
    } else {
        res.status(403).json({
            message: 'Access denied. Admin rights required.'
        });
    }
};