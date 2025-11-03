import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Check if user is logged in (has valid token)
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const token = authHeader.split(' ')[1]; // Correct: extracts token after "Bearer "

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

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
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Token is not valid' });
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