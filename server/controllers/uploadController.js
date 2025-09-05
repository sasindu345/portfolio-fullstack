// server/controllers/uploadController.js
import { processImage, createThumbnail, deleteImage } from '../utils/imageProcessor.js';
import fs from 'fs/promises';

// Upload single image
export const uploadSingleImage = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const originalFile = req.file;
        console.log('File uploaded:', originalFile.filename);

        // Process the main image
        const processedImage = await processImage(
            originalFile.path,
            `processed_${originalFile.filename}`
        );

        if (!processedImage.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to process image',
                error: processedImage.error
            });
        }

        // Create thumbnail
        const thumbnail = await createThumbnail(
            originalFile.path,
            `processed_${originalFile.filename}`
        );

        // Delete original uploaded file (we keep the processed version)
        try {
            await fs.unlink(originalFile.path);
        } catch (error) {
            console.log('Could not delete original file:', error);
        }

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                filename: processedImage.filename,
                thumbnail: thumbnail.success ? thumbnail.filename : null,
                url: `/api/uploads/${processedImage.filename}`,
                thumbnailUrl: thumbnail.success ? `/api/uploads/${thumbnail.filename}` : null
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

// Upload multiple images (gallery)
export const uploadMultipleImages = async (req, res) => {
    try {
        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        const uploadedFiles = [];
        const errors = [];

        // Process each uploaded file
        for (const file of req.files) {
            try {
                // Process the image
                const processedImage = await processImage(
                    file.path,
                    `processed_${file.filename}`
                );

                if (processedImage.success) {
                    // Create thumbnail
                    const thumbnail = await createThumbnail(
                        file.path,
                        `processed_${file.filename}`
                    );

                    uploadedFiles.push({
                        filename: processedImage.filename,
                        thumbnail: thumbnail.success ? thumbnail.filename : null,
                        url: `/api/uploads/${processedImage.filename}`,
                        thumbnailUrl: thumbnail.success ? `/api/uploads/${thumbnail.filename}` : null
                    });
                } else {
                    errors.push(`Failed to process ${file.originalname}: ${processedImage.error}`);
                }

                // Delete original file
                try {
                    await fs.unlink(file.path);
                } catch (error) {
                    console.log('Could not delete original file:', error);
                }

            } catch (error) {
                errors.push(`Error processing ${file.originalname}: ${error.message}`);
            }
        }

        // Return response
        res.status(200).json({
            success: uploadedFiles.length > 0,
            message: `${uploadedFiles.length} files uploaded successfully`,
            data: uploadedFiles,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error) {
        console.error('Multiple upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Upload failed',
            error: error.message
        });
    }
};

// Delete uploaded file (Admin only)
export const deleteUploadedFile = async (req, res) => {
    try {
        const { filename } = req.params;

        if (!filename) {
            return res.status(400).json({
                success: false,
                message: 'Filename is required'
            });
        }

        // Delete main image
        const deleteResult = await deleteImage(filename);

        // Try to delete thumbnail too
        if (filename.startsWith('processed_')) {
            const thumbnailName = `thumb_${filename}`;
            await deleteImage(thumbnailName);
        }

        if (deleteResult.success) {
            res.status(200).json({
                success: true,
                message: 'File deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'File not found or could not be deleted'
            });
        }

    } catch (error) {
        console.error('Delete file error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete file',
            error: error.message
        });
    }
};