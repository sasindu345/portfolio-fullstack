import jwt from 'jsonwebtoken';

// Create a token (like giving someone an ID card)
export const generateToken = (userId, role = 'user') => {
    return jwt.sign(
        {
            userId: userId,
            role: role
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Token expires in 7 days
    );
};

// Check if token is valid (like checking an ID card)
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};