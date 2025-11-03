import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import User from '../models/User.js';

// Register new user
export const register = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, role, adminSecret } = req.body;

        // If trying to register as admin, require the static secret password
        if (role === 'admin') {
            if (!adminSecret || adminSecret !== process.env.ADMIN_REGISTRATION_SECRET) {
                return res.status(403).json({
                    message: 'Invalid admin registration secret. Access denied.'
                });
            }
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email or username already exists'
            });
        }

        // Create new user (password will be hashed automatically by User model)
        const user = new User({
            username,
            email,
            password,
            profile: { firstName, lastName },
            role: role || 'user'
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id, user.role);

        // Send response (without password)
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profile: user.profile
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token using the utility function
        const token = generateToken(user._id, user.role);

        // Return token and user (without password)
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Get current user profile
export const getProfile = async (req, res) => {
    try {
        // req.user is set by authenticateUser middleware
        res.json({
            message: 'Profile retrieved successfully',
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get profile',
            error: error.message
        });
    }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, bio } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                'profile.firstName': firstName,
                'profile.lastName': lastName,
                'profile.bio': bio
            },
            { new: true, select: '-password' }
        );

        res.json({
            message: 'Profile updated successfully',
            user
        });

    } catch (error) {
        res.status(500).json({
            message: 'Profile update failed',
            error: error.message
        });
    }
};

