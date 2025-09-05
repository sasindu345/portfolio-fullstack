import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

// Register new user
export const register = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

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
            role: req.body.role || 'user'  // ensures admins can be created
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

        console.log('Login attempt:', { email, password: '***' }); // Debug log

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email); // Debug log
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        console.log('User found:', user.username); // Debug log
        console.log('Password from DB exists:', !!user.password); // Debug log

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        console.log('Password valid:', isPasswordValid); // Debug log

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken(user._id, user.role);

        // Send response
        res.json({
            message: 'Login successful',
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
        console.log('Login error:', error); // Debug log
        res.status(500).json({
            message: 'Login failed',
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