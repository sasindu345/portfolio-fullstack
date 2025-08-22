// Contact.js - This defines how contact form submissions are stored
// Every contact will have: name, email, message, status, etc.

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    // Contact person information
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },

    // Contact subject
    subject: {
        type: String,
        trim: true,
        maxlength: [200, 'Subject cannot exceed 200 characters']
    },

    // Message content
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: [2000, 'Message cannot exceed 2000 characters'],
        minlength: [10, 'Message must be at least 10 characters']
    },

    // Contact type/category
    type: {
        type: String,
        enum: ['general', 'project-inquiry', 'job-opportunity', 'collaboration', 'feedback'],
        default: 'general'
    },

    // Contact status
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'archived'],
        default: 'new'
    },

    // Priority level
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },

    // Additional contact information
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                if (!v) return true; // Optional field
                return /^[\+]?[1-9][\d]{0,15}$/.test(v);
            },
            message: 'Please enter a valid phone number'
        }
    },

    company: {
        type: String,
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },

    website: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                if (!v) return true; // Optional field
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Website must be a valid URL'
        }
    },

    // Tracking information
    ipAddress: {
        type: String,
        trim: true
    },

    userAgent: {
        type: String,
        trim: true
    },

    // Admin notes
    adminNotes: {
        type: String,
        maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
    },

    // Response tracking
    respondedAt: {
        type: Date,
        default: null
    },

    respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ type: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ createdAt: -1 });

// Method to mark as read
contactSchema.methods.markAsRead = function () {
    this.status = 'read';
    return this.save();
};

// Method to mark as replied
contactSchema.methods.markAsReplied = function (userId = null) {
    this.status = 'replied';
    this.respondedAt = new Date();
    if (userId) {
        this.respondedBy = userId;
    }
    return this.save();
};

export default mongoose.model('Contact', contactSchema);