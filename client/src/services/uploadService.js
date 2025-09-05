import api from './api';

export const uploadService = {
    // Upload single image
    uploadImage: async (imageFile, onProgress) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await api.post('/uploads/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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

    // Get full image URL
    getImageUrl: (imagePath) => {
        if (!imagePath) return null;
        return `http://localhost:5001${imagePath}`;
    }
};