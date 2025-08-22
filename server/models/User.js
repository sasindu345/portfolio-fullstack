// User.js - This defines how user data is stored
// Every user will have: username, email, password, role, etc.

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User Schema (data structure)
const userSchema = new mongoose.Schema({
    // Username field
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },

    // Email field
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },

    // Password field
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // This prevents password from being returned in queries by default
    },

    // Role field (admin, user, etc.)
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    // Profile information
    profile: {
        firstName: {
            type: String,
            trim: true,
            maxlength: [50, 'First name cannot exceed 50 characters']
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: [50, 'Last name cannot exceed 50 characters']
        },
        bio: {
            type: String,
            maxlength: [500, 'Bio cannot exceed 500 characters']
        }
    },

    // Account status
    isActive: {
        type: Boolean,
        default: true
    },

    // Timestamps
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    // This adds createdAt and updatedAt fields automatically
    timestamps: true,

    // This removes __v field from responses
    versionKey: false
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
    // Only hash password if it's been modified
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Hash password with salt rounds of 12
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get user without sensitive information
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

// Create indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });

export default mongoose.model('User', userSchema);