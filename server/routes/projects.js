import express from 'express';
import {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getAdminProjects
} from '../controllers/projectController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// FIXED: Admin routes MUST come BEFORE dynamic routes
router.get('/admin/all', authenticate, requireAdmin, getAdminProjects); // GET /api/projects/admin/all

// Public routes
router.get('/', getAllProjects);           // GET /api/projects
router.get('/:id', getProject);            // GET /api/projects/:id (MUST be after /admin/all)

// Admin routes (protected)
router.post('/', authenticate, requireAdmin, upload.single('image'), createProject);
router.put('/:id', authenticate, requireAdmin, upload.single('image'), updateProject);
router.delete('/:id', authenticate, requireAdmin, deleteProject);    // DELETE /api/projects/:id

export default router;