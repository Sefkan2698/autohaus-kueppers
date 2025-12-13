import { Router } from 'express';
import jobController from '../controllers/job.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Öffentliche Routes (ohne Auth)
router.get('/', jobController.getAll.bind(jobController));
router.get('/:id', jobController.getById.bind(jobController));

// Geschützte Routes (nur für Admin)
router.post('/', authMiddleware, jobController.create.bind(jobController));
router.put('/:id', authMiddleware, jobController.update.bind(jobController));
router.delete('/:id', authMiddleware, jobController.delete.bind(jobController));
router.patch('/:id/toggle', authMiddleware, jobController.toggleActive.bind(jobController));

export default router;