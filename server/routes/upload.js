// server/routes/upload.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../middleware/upload.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
    uploadSingleImage,
    uploadMultipleImages,
    deleteUploadedFile
} from '../controllers/uploadController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Upload single image (Admin only)
router.post('/image',
    authenticate,
    requireAdmin,
    upload.single('image'),
    uploadSingleImage
);

// Upload multiple images for gallery (Admin only)
router.post('/gallery',
    authenticate,
    requireAdmin,
    upload.array('images', 5), // Max 5 images
    uploadMultipleImages
);

// Serve uploaded files (Public access)
router.get('/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filepath = path.join(__dirname, '../uploads/projects', filename);

        // Check if file exists and send it
        res.sendFile(filepath, (err) => {
            if (err) {
                console.error('File serve error:', err);
                res.status(404).json({
                    success: false,
                    message: 'File not found'
                });
            }
        });
    } catch (error) {
        console.error('Serve file error:', error);
        res.status(500).json({
            success: false,
            message: 'Error serving file'
        });
    }
});

// Delete uploaded file (Admin only)
router.delete('/:filename',
    authenticate,
    requireAdmin,
    deleteUploadedFile
);

export default router;