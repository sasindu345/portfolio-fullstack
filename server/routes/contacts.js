import express from 'express';
import {
    submitContact,
    getAllContacts,
    getContact,
    toggleContactRead,
    deleteContact,
    getContactStats
} from '../controllers/contactController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', submitContact);           // POST /api/contact

// Admin routes (all protected)
router.use(authenticate);      // All routes below need authentication
router.use(requireAdmin);      // All routes below need admin role

router.get('/', getAllContacts);                    // GET /api/contact
router.get('/stats', getContactStats);              // GET /api/contact/stats
router.get('/:id', getContact);                     // GET /api/contact/:id
router.put('/:id/read', toggleContactRead);         // PUT /api/contact/:id/read
router.delete('/:id', deleteContact);               // DELETE /api/contact/:id

export default router;