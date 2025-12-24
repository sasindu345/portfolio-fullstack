import api from './api';
import API_BASE_URL from '../config/apiConfig';
import { resolveImageUrl } from '../utils/imageUrlResolver';

export const uploadService = {
    // Upload single image
    uploadImage: async (imageFile, onProgress) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await api.post('/uploads/single', formData, {
                timeout: 60000,
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                onUploadProgress: (progressEvent) => {
                    if (onProgress) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        onProgress(percentCompleted);
                    }
                },
            });

            return response.data;
        } catch (error) {
            throw new Error('Failed to upload image');
        }
    },

    // Get full image URL - uses centralized resolver
    getImageUrl: (imagePath) => {
        if (!imagePath) return null;
        return resolveImageUrl(imagePath, null);
    }
};