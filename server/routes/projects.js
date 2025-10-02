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

const router = express.Router();

// FIXED: Admin routes MUST come BEFORE dynamic routes
router.get('/admin/all', authenticate, requireAdmin, getAdminProjects); // GET /api/projects/admin/all

// Public routes
router.get('/', getAllProjects);           // GET /api/projects
router.get('/:id', getProject);            // GET /api/projects/:id (MUST be after /admin/all)

// Admin routes (protected)
router.post('/', authenticate, requireAdmin, createProject);           // POST /api/projects
router.put('/:id', authenticate, requireAdmin, updateProject);         // PUT /api/projects/:id
router.delete('/:id', authenticate, requireAdmin, deleteProject);      // DELETE /api/projects/:id

export default router;