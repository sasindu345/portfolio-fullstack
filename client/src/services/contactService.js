import api from './api';

export const contactService = {
    // Submit contact form to backend
    submitContact: async (formData) => {
        try {
            const response = await api.post('/contact', {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            });
            return response.data;
        } catch (error) {
            console.error('Contact submission failed:', error);
            throw new Error(error.response?.data?.message || 'Failed to send message');
        }
    }
};