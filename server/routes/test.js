// test.js - Routes to test your database connection and models
// These are temporary routes for testing - you'll replace them with real API routes later

import express from 'express';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Contact from '../models/Contact.js';

const router = express.Router();

// Test database connection
router.get('/connection', async (req, res) => {
    try {
        // Simple database query to test connection
        const stats = await Promise.all([
            User.countDocuments(),
            Project.countDocuments(),
            Contact.countDocuments()
        ]);

        res.json({
            message: '✅ Database connection successful!',
            collections: {
                users: stats[0],
                projects: stats[1],
                contacts: stats[2]
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            message: '❌ Database connection failed',
            error: error.message
        });
    }
});

// Test User model
router.post('/user', async (req, res) => {
    try {
        const testUser = new User({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword123',
            profile: {
                firstName: 'Test',
                lastName: 'User',
                bio: 'This is a test user created to verify the User model works correctly.'
            }
        });

        const savedUser = await testUser.save();

        res.status(201).json({
            message: '✅ User model test successful!',
            user: savedUser
        });
    } catch (error) {
        res.status(400).json({
            message: '❌ User model test failed',
            error: error.message
        });
    }
});

// Test Project model
router.post('/project', async (req, res) => {
    try {
        const testProject = new Project({
            title: 'Test Portfolio Project',
            shortDescription: 'A test project to verify the Project model works correctly.',
            description: 'This is a detailed description of the test project. It demonstrates how projects are stored in the database with all required fields and validation.',
            technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
            category: 'web-development',
            images: {
                thumbnail: 'https://example.com/thumbnail.jpg'
            },
            links: {
                liveDemo: 'https://example.com/demo',
                github: 'https://github.com/user/test-project'
            },
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-02-01'),
            isPublished: true
        });

        const savedProject = await testProject.save();

        res.status(201).json({
            message: '✅ Project model test successful!',
            project: savedProject
        });
    } catch (error) {
        res.status(400).json({
            message: '❌ Project model test failed',
            error: error.message
        });
    }
});

// Test Contact model
router.post('/contact', async (req, res) => {
    try {
        const testContact = new Contact({
            name: 'John Doe',
            email: 'john.doe@example.com',
            subject: 'Test Contact Form',
            message: 'This is a test message to verify the Contact model works correctly.',
            type: 'general',
            company: 'Test Company'
        });

        const savedContact = await testContact.save();

        res.status(201).json({
            message: '✅ Contact model test successful!',
            contact: savedContact
        });
    } catch (error) {
        res.status(400).json({
            message: '❌ Contact model test failed',
            error: error.message
        });
    }
});

// Clean up test data
router.delete('/cleanup', async (req, res) => {
    try {
        const results = await Promise.all([
            User.deleteMany({ username: 'testuser' }),
            Project.deleteMany({ title: 'Test Portfolio Project' }),
            Contact.deleteMany({ name: 'John Doe' })
        ]);

        res.json({
            message: '🧹 Test data cleaned up successfully!',
            deleted: {
                users: results[0].deletedCount,
                projects: results[1].deletedCount,
                contacts: results[2].deletedCount
            }
        });
    } catch (error) {
        res.status(500).json({
            message: '❌ Cleanup failed',
            error: error.message
        });
    }
});

export default router;