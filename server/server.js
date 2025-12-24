// server.js - This is your main server file
// Think of this as the "brain" of your backend

// Import the packages we installed (ES6 module syntax)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';                    // NEW LINE ADDED HERE
import { fileURLToPath } from 'url';        // NEW LINE ADDED HERE
import connectDB from './config/database.js';
import testRoutes from './routes/test.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contacts.js';
import uploadRoutes from './routes/upload.js';
import fs from 'fs';
import upload from './middleware/upload.js';
import { uploadSingleImage } from './controllers/uploadController.js';

// NEW LINES ADDED HERE
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create an Express application
// Think of this as creating your web server
const app = express();

connectDB();

// Define the port your server will run on
// Process.env.PORT is for when you deploy, 5000 is for local development
const PORT = process.env.PORT || 5001;

// ===============================
// MIDDLEWARE (These run before your routes)
// ===============================

// CORS: Allows your React app (probably running on port 3000) to talk to this server
app.use(cors({
    origin: [
        'http://localhost:3000',                          // For local development
        'http://192.168.1.103:3000',                      // For network access
        'http://127.0.0.1:3000',                          // Alternative localhost
        'https://portfolio-fullstack-r4mm.vercel.app',    // Vercel frontend
        'https://portfolio-fullstack-7668.onrender.com'   // Render backend (self)
    ],
    credentials: true // If you need to send cookies/auth
}));

// Parse JSON data from requests
// This means when someone sends data to your API, Express can understand it
app.use(express.json());

// Parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images (place after routes to avoid swallowing dynamic endpoints)
// We'll re-mount this after the upload routes are registered below

// ===============================
// BASIC ROUTES (These are your API endpoints)
// ===============================

// (Removed: debug route lister)

// Test route - This proves your server is working
app.get('/', (req, res) => {
    res.json({
        message: 'Portfolio Backend is running!',
        status: 'success',
        timestamp: new Date().toISOString(),
    });
});

// Health check route - Useful for monitoring
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
    });
});

app.get('/debug/uploads', (req, res) => {
    try {
        const uploadsPath = path.join(__dirname, 'uploads');
        console.log('Looking for uploads at:', uploadsPath);

        // Check if uploads folder exists
        if (!fs.existsSync(uploadsPath)) {
            return res.json({
                error: 'Uploads folder does not exist',
                expectedPath: uploadsPath,
                currentDir: __dirname
            });
        }

        // List all files in uploads
        const files = fs.readdirSync(uploadsPath);

        res.json({
            success: true,
            uploadsPath: uploadsPath,
            currentDir: __dirname,
            filesFound: files,
            totalFiles: files.length
        });

    } catch (error) {
        res.json({
            error: error.message,
            uploadsPath: path.join(__dirname, 'uploads'),
            currentDir: __dirname
        });
    }
});
// Add this route to test file serving in server.js
app.get('/test-upload', (req, res) => {
    const uploadsPath = path.join(__dirname, 'uploads');
    const projectsPath = path.join(__dirname, 'uploads', 'projects');

    res.json({
        uploadsExists: fs.existsSync(uploadsPath),
        projectsExists: fs.existsSync(projectsPath),
        uploadsPath,
        projectsPath,
        currentDir: __dirname
    });
});
app.use('/api/test', testRoutes);

// Authentication routes
app.use('/api/auth', authRoutes);

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Add this line with your other routes - FIXED: /api/uploads (plural)
app.use('/api/uploads', uploadRoutes);
// Now serve static files from uploads under the same prefix without shadowing dynamic routes
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// (Removed: temporary unauthenticated upload endpoint)
// Add this BEFORE app.listen() in server.js:
const createUploadDirs = () => {
    const uploadsDir = path.join(__dirname, 'uploads');
    const projectsDir = path.join(__dirname, 'uploads', 'projects');

    try {
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
            console.log('Created uploads directory');
        }

        if (!fs.existsSync(projectsDir)) {
            fs.mkdirSync(projectsDir);
            console.log('Created uploads/projects directory');
        }
    } catch (error) {
        console.error('Error creating upload directories:', error);
    }
};

// Call it before starting server
createUploadDirs();

// ===============================
// START THE SERVER
// ===============================

app.listen(PORT, () => {
    console.log('🚀 Server is running!');
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('💡 Press Ctrl+C to stop the server');
});