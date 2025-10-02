// src/services/api.js
import axios from 'axios';

// Dynamic API URL based on current host
const getApiBaseUrl = () => {
    // Use the same host as the frontend but port 5001
    const host = window.location.hostname;
    return `http://${host}:5001/api`;
};

// Create axios instance with dynamic backend URL
const api = axios.create({
    baseURL: getApiBaseUrl(), // Dynamic URL that works with both localhost and IP
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage if it exists
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Unauthorized - remove token and redirect to login
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }

        // Log error for debugging
        console.error('API Error:', error.response?.data || error.message);

        return Promise.reject(error);
    }
);

export default api;