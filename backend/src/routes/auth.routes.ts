import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { authLimiter } from '../middleware/ratelimit.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from '../validators/auth.validator.js';

const router = Router();

// POST /api/auth/login - mit Validierung
router.post('/login', authLimiter, validate(loginSchema), authController.login.bind(authController));

// POST /api/auth/register - mit Validierung (Master Key erforderlich)
router.post('/register', (req, res, next) => {
  const masterKey = req.headers['x-master-key'];
  if (masterKey !== process.env.MASTER_REGISTRATION_KEY) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
}, validate(registerSchema), authController.register.bind(authController));

// POST /api/auth/forgot-password - Passwort vergessen
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword.bind(authController));

// POST /api/auth/reset-password - Passwort zurücksetzen
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword.bind(authController));

export default router;