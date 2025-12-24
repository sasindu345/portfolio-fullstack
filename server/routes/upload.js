// routes/upload.js - SIMPLE VERSION
import express from 'express';
import upload from '../middleware/upload.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { uploadSingleImage, deleteUploadedFile } from '../controllers/uploadController.js';

const router = express.Router();
console.log('[routes/upload] Router initialized');

// Upload single image - MATCHES frontend call
router.post('/single', authenticate, requireAdmin, upload.single('image'), uploadSingleImage);

// Test-only: Unauthenticated single image upload to verify Cloudinary
// Enable temporarily when DB/auth blocks testing. Do not use in production.
// (No unauthenticated test routes in production)

// Delete file
router.delete('/:filename', authenticate, requireAdmin, deleteUploadedFile);

export default router;