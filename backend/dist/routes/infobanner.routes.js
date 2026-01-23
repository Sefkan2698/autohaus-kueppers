import { Router } from 'express';
import infoBannerController from '../controllers/infobanner.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = Router();
// Öffentliche Routes (ohne Auth)
router.get('/', infoBannerController.getAll.bind(infoBannerController));
router.get('/:id', infoBannerController.getById.bind(infoBannerController));
// Geschützte Routes (nur für Admin)
router.post('/', authMiddleware, infoBannerController.create.bind(infoBannerController));
router.put('/:id', authMiddleware, infoBannerController.update.bind(infoBannerController));
router.delete('/:id', authMiddleware, infoBannerController.delete.bind(infoBannerController)); // ← Semikolon hinzugefügt
router.patch('/:id/toggle', authMiddleware, infoBannerController.toggleActive.bind(infoBannerController));
export default router;
//# sourceMappingURL=infobanner.routes.js.map