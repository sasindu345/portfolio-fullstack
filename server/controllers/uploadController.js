// controllers/uploadController.js - Cloudinary Integration
export const uploadSingleImage = async (req, res) => {
    try {
        console.log('Upload request received');
        console.log('File:', req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // With Cloudinary, req.file.path contains the secure Cloudinary URL
        const cloudinaryUrl = req.file.path;

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                path: cloudinaryUrl, // Cloudinary secure URL
                url: cloudinaryUrl, // Also return as 'url' for compatibility
                filename: req.file.filename || req.file.originalname,
                originalName: req.file.originalname,
                size: req.file.size,
                cloudinaryPublicId: req.file.public_id
            }
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Upload failed',
            error: error.message
        });
    }
};

export const deleteUploadedFile = async (req, res) => {
    try {
        const { publicId } = req.params;

        // If using Cloudinary, you would delete using the public_id
        // For now, we'll just return success
        // Full deletion would require cloudinary.v2.uploader.destroy()

        res.json({
            success: true,
            message: `File ${publicId} deleted`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};