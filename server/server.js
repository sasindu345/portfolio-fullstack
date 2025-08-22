// server.js - This is your main server file
// Think of this as the "brain" of your backend

// Import the packages we installed (ES6 module syntax)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import testRoutes from './routes/test.js';

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
    origin: 'http://localhost:3000', // Your React app's address
    credentials: true // Allows cookies/auth headers
}));

// Parse JSON data from requests
// This means when someone sends data to your API, Express can understand it
app.use(express.json());

// Parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true }));

// ===============================
// BASIC ROUTES (These are your API endpoints)
// ===============================


// Test route - This proves your server is working
app.get('/', (req, res) => {
    res.json({
        message: 'Portfolio Backend is running!',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// Health check route - Useful for monitoring
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});
app.use('/api/test', testRoutes);

// ===============================
// START THE SERVER
// ===============================

app.listen(PORT, () => {
    console.log('🚀 Server is running!');
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('💡 Press Ctrl+C to stop the server');
});