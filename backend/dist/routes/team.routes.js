import { Router } from 'express';
import teamController from '../controllers/team.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { uploadLimiter } from '../middleware/ratelimit.middleware.js';
const router = Router();
// Öffentliche Routes (ohne Auth)
router.get('/', teamController.getAll.bind(teamController));
router.get('/:id', teamController.getById.bind(teamController));
// Geschützte Routes (nur für Admin)
router.post('/', authMiddleware, uploadLimiter, upload.single('image'), teamController.create.bind(teamController));
router.put('/:id', authMiddleware, teamController.update.bind(teamController));
router.put('/:id/image', authMiddleware, uploadLimiter, upload.single('image'), teamController.updateWithImage.bind(teamController));
router.delete('/:id', authMiddleware, teamController.delete.bind(teamController));
router.patch('/:id/toggle', authMiddleware, teamController.toggleActive.bind(teamController));
router.post('/reorder', authMiddleware, teamController.reorder.bind(teamController));
export default router;
//# sourceMappingURL=team.routes.js.map