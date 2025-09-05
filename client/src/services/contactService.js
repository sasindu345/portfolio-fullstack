import api from './api';

export const contactService = {
    // Test connection
    testConnection: async () => {
        try {
            const response = await api.get('/test/connection');
            console.log('Connection successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('Connection failed:', error);
            throw error;
        }
    }
};