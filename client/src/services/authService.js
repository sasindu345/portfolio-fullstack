import api from './api';

export const authService = {
    // Login function
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.success) {
                // Save token to browser storage
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    // Logout function
    logout: () => {
        localStorage.removeItem('token');
    },

    // Check if user is logged in
    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    },

    // Get user profile
    getProfile: async () => {
        try {
            const response = await api.get('/auth/profile');
            return response.data;
        } catch (error) {
            throw new Error('Failed to get profile');
        }
    }
};