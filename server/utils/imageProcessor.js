// server/utils/imageProcessor.js
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Process and optimize uploaded image
export const processImage = async (inputPath, outputFileName, options = {}) => {
    try {
        const outputDir = path.join(__dirname, '../uploads/projects');
        const outputPath = path.join(outputDir, outputFileName);

        // Default processing options
        const defaultOptions = {
            width: 800,     // Max width
            height: 600,    // Max height
            quality: 80,    // JPEG quality
            fit: 'inside'   // Maintain aspect ratio
        };

        const processOptions = { ...defaultOptions, ...options };

        // Process the image
        await sharp(inputPath)
            .resize(processOptions.width, processOptions.height, {
                fit: processOptions.fit,
                withoutEnlargement: true
            })
            .jpeg({ quality: processOptions.quality })
            .toFile(outputPath);

        return {
            success: true,
            filename: outputFileName,
            path: outputPath
        };
    } catch (error) {
        console.error('Image processing error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Create thumbnail version of image
export const createThumbnail = async (inputPath, outputFileName) => {
    try {
        const thumbnailName = `thumb_${outputFileName}`;
        const outputDir = path.join(__dirname, '../uploads/projects');
        const outputPath = path.join(outputDir, thumbnailName);

        await sharp(inputPath)
            .resize(300, 200, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: 70 })
            .toFile(outputPath);

        return {
            success: true,
            filename: thumbnailName,
            path: outputPath
        };
    } catch (error) {
        console.error('Thumbnail creation error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Delete uploaded file
export const deleteImage = async (filename) => {
    try {
        const filePath = path.join(__dirname, '../uploads/projects', filename);
        await fs.unlink(filePath);
        return { success: true };
    } catch (error) {
        console.error('File deletion error:', error);
        return { success: false, error: error.message };
    }
};