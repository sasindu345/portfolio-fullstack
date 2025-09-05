import api from './api';

export const testBackendConnection = async () => {
    try {
        const response = await api.get('/test/connection');
        console.log('✅ Backend connection successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Backend connection failed:', error.message);
        if (error.response) {
            console.error('Error details:', error.response.data);
        }
        throw error;
    }
};