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
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token && token !== 'undefined' && token !== 'null') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            window.location.href = '/admin/login'; // Changed from '/login'
        }
        return Promise.reject(error);
    }
);

export default api;