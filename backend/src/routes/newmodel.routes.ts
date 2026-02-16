import { Router } from 'express';
import newModelController from '../controllers/newmodel.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { uploadLimiter } from '../middleware/ratelimit.middleware.js';

const router = Router();

// Öffentliche Routes
router.get('/', newModelController.getAll.bind(newModelController));
router.get('/:id', newModelController.getById.bind(newModelController));

// Geschützte Routes (nur für Admin)
router.post('/', authMiddleware, uploadLimiter, upload.single('image'), newModelController.create.bind(newModelController));
router.put('/:id', authMiddleware, uploadLimiter, upload.single('image'), newModelController.update.bind(newModelController));
router.delete('/:id', authMiddleware, newModelController.delete.bind(newModelController));
router.patch('/:id/toggle', authMiddleware, newModelController.toggleActive.bind(newModelController));
router.post('/reorder', authMiddleware, newModelController.reorder.bind(newModelController));

export default router;
