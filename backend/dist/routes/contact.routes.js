import { Router } from 'express';
import contactController from '../controllers/contact.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { contactLimiter } from '../middleware/ratelimit.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { contactSchema } from '../validators/contact.validator.js';
const router = Router();
// Öffentliche Route - mit Validierung
router.post('/submit', contactLimiter, validate(contactSchema), contactController.submit.bind(contactController));
// Geschützte Routes (nur für Admin)
router.get('/', authMiddleware, contactController.getAll.bind(contactController));
router.get('/:id', authMiddleware, contactController.getById.bind(contactController));
router.patch('/:id/status', authMiddleware, contactController.updateStatus.bind(contactController));
router.delete('/:id', authMiddleware, contactController.delete.bind(contactController));
export default router;
//# sourceMappingURL=contact.routes.js.map