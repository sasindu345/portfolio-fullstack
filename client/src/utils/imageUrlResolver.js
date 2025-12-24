/**
 * Centralized Image URL Resolver
 * 
 * Safely resolves image URLs from multiple sources:
 * - Cloudinary absolute URLs (https://res.cloudinary.com/...)
 * - Backend relative paths (/api/uploads/...)
 * - Public static assets (/Images/...)
 * - Local file paths and filenames
 * 
 * Rules:
 * 1. If path starts with 'http', return as-is (Cloudinary URLs)
 * 2. If path starts with '/Images/' or '/images/', return as-is (public static assets)
 * 3. If path starts with '/api/uploads/', prefix with API_BASE_URL
 * 4. Otherwise, assume it's a backend path and prefix with API_BASE_URL
 */

import API_BASE_URL from '../config/apiConfig';

/**
 * Resolve an image URL based on its source
 * @param {string} imagePath - The image path or URL
 * @param {string} fallback - Fallback image if path is empty (default: placeholder)
 * @returns {string} - The resolved image URL
 */
export const resolveImageUrl = (imagePath, fallback = '/Images/home/myimg.jpeg') => {
    // Return fallback for empty paths
    if (!imagePath) return fallback;

    // Return absolute URLs as-is (Cloudinary, external URLs)
    if (imagePath.startsWith('http')) {
        return imagePath;
    }

    // Return public static assets as-is (served from /public folder)
    if (imagePath.startsWith('/Images/') || imagePath.startsWith('/images/')) {
        return imagePath;
    }

    // Prefix backend paths with API_BASE_URL
    return `${API_BASE_URL}${imagePath}`;
};

/**
 * Resolve multiple image URLs (for galleries/carousels)
 * @param {string[]} imagePaths - Array of image paths
 * @param {string} fallback - Fallback image
 * @returns {string[]} - Array of resolved URLs
 */
export const resolveImageUrls = (imagePaths, fallback = '/Images/home/myimg.jpeg') => {
    if (!Array.isArray(imagePaths)) return [fallback];
    return imagePaths.map(path => resolveImageUrl(path, fallback));
};
