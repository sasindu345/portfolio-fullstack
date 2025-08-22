// Project.js - This defines how portfolio projects are stored
// Every project will have: title, description, technologies, images, links, etc.

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    // Basic project information
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },

    // Project slug for URL-friendly identifier
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },

    // Short description
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        maxlength: [200, 'Short description cannot exceed 200 characters']
    },

    // Detailed description
    description: {
        type: String,
        required: [true, 'Project description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },

    // Technologies used
    technologies: {
        type: [String],
        required: [true, 'At least one technology must be specified'],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'Technologies array cannot be empty'
        }
    },

    // Project category
    category: {
        type: String,
        required: [true, 'Project category is required'],
        enum: ['web-development', 'mobile-app', 'desktop-app', 'api', 'other'],
        default: 'web-development'
    },

    // Project images
    images: {
        thumbnail: {
            type: String,
            required: [true, 'Thumbnail image is required']
        },
        gallery: {
            type: [String],
            default: []
        }
    },

    // Project links
    links: {
        liveDemo: {
            type: String,
            validate: {
                validator: function (v) {
                    if (!v) return true; // Optional field
                    return /^https?:\/\/.+/.test(v);
                },
                message: 'Live demo must be a valid URL'
            }
        },
        github: {
            type: String,
            validate: {
                validator: function (v) {
                    if (!v) return true; // Optional field
                    return /^https?:\/\/.+/.test(v);
                },
                message: 'GitHub link must be a valid URL'
            }
        },
        documentation: {
            type: String,
            validate: {
                validator: function (v) {
                    if (!v) return true; // Optional field
                    return /^https?:\/\/.+/.test(v);
                },
                message: 'Documentation link must be a valid URL'
            }
        }
    },

    // Project status
    status: {
        type: String,
        enum: ['planning', 'in-progress', 'completed', 'on-hold'],
        default: 'completed'
    },

    // Project priority/order for display
    displayOrder: {
        type: Number,
        default: 0
    },

    // Featured project flag
    isFeatured: {
        type: Boolean,
        default: false
    },

    // Visibility
    isPublished: {
        type: Boolean,
        default: false
    },

    // Project dates
    startDate: {
        type: Date,
        required: [true, 'Project start date is required']
    },

    endDate: {
        type: Date,
        validate: {
            validator: function (v) {
                if (!v) return true; // Optional field
                return v >= this.startDate;
            },
            message: 'End date must be after start date'
        }
    },

    // SEO and metadata
    seo: {
        metaDescription: {
            type: String,
            maxlength: [160, 'Meta description cannot exceed 160 characters']
        },
        keywords: {
            type: [String],
            default: []
        }
    },

    // Analytics
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

// Pre-save middleware to generate slug from title
projectSchema.pre('save', function (next) {
    if (this.isModified('title') || !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .trim();
    }
    next();
});

// Indexes for better query performance
projectSchema.index({ slug: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ isPublished: 1 });
projectSchema.index({ isFeatured: 1 });
projectSchema.index({ displayOrder: 1 });
projectSchema.index({ createdAt: -1 });

export default mongoose.model('Project', projectSchema);