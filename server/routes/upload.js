// routes/upload.js - SIMPLE VERSION
import express from 'express';
import upload from '../middleware/upload.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { uploadSingleImage, deleteUploadedFile } from '../controllers/uploadController.js';

const router = express.Router();

// Upload single image - MATCHES frontend call
router.post('/single', authenticate, requireAdmin, upload.single('image'), uploadSingleImage);

// Delete file
router.delete('/:filename', authenticate, requireAdmin, deleteUploadedFile);

export default router;