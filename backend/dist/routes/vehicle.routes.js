import { Router } from 'express';
import vehicleController from '../controllers/vehicle.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { uploadLimiter } from '../middleware/ratelimit.middleware.js';
const router = Router();
// Öffentliche Routes (ohne Auth)
router.get('/', vehicleController.getAll.bind(vehicleController));
router.get('/:id', vehicleController.getById.bind(vehicleController));
// Geschützte Routes (nur für Admin) - mit Bild-Upload
router.post('/', authMiddleware, uploadLimiter, upload.array('images', 20), vehicleController.create.bind(vehicleController));
router.put('/:id', authMiddleware, uploadLimiter, upload.array('images', 20), vehicleController.update.bind(vehicleController));
router.delete('/:id', authMiddleware, vehicleController.delete.bind(vehicleController));
router.patch('/:id/toggle', authMiddleware, vehicleController.toggleActive.bind(vehicleController));
export default router;
//# sourceMappingURL=vehicle.routes.js.map