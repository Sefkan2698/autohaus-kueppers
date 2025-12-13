import { Router } from 'express';
import carouselController from '../controllers/carousel.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { uploadLimiter } from '../middleware/ratelimit.middleware.js';

const router = Router();

// Öffentliche Routes (ohne Auth)
router.get('/', carouselController.getAll.bind(carouselController));
router.get('/:id', carouselController.getById.bind(carouselController));

// Geschützte Routes (nur für Admin)
router.post('/', authMiddleware, uploadLimiter, upload.single('image'), carouselController.create.bind(carouselController));
router.put('/:id', authMiddleware, carouselController.update.bind(carouselController));
router.delete('/:id', authMiddleware, carouselController.delete.bind(carouselController));
router.patch('/:id/toggle', authMiddleware, carouselController.toggleActive.bind(carouselController));
router.post('/reorder', authMiddleware, carouselController.reorder.bind(carouselController));

export default router;