import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { superAdminMiddleware } from '../middleware/superadmin.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { registerSchema } from '../validators/auth.validator.js';

const router = Router();

// Alle Routen erfordern Authentifizierung
router.use(authMiddleware);

// GET /api/users/me - Aktuellen Benutzer abrufen (alle Admins)
router.get('/me', userController.getCurrentUser.bind(userController));

// Ab hier nur für SUPER_ADMIN
router.use(superAdminMiddleware);

// GET /api/users - Alle Benutzer abrufen
router.get('/', userController.getAll.bind(userController));

// GET /api/users/:id - Einzelnen Benutzer abrufen
router.get('/:id', userController.getById.bind(userController));

// POST /api/users - Neuen Benutzer erstellen
router.post('/', validate(registerSchema), userController.create.bind(userController));

// PUT /api/users/:id - Benutzer aktualisieren
router.put('/:id', userController.update.bind(userController));

// DELETE /api/users/:id - Benutzer löschen
router.delete('/:id', userController.delete.bind(userController));

export default router;
