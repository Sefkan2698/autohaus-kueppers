import express from 'express';
import authService from '../services/auth.service.js';
import { sendPasswordResetEmail } from '../utils/mailer.js';

export class AuthController {
  // Login
  async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email und Passwort erforderlich' });
        return;
      }

      const result = await authService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: 'Anmeldung fehlgeschlagen' });
    }
  }

  // Register (mit Master Key für initiales Setup oder Superadmin-Erstellung)
  async register(req: express.Request, res: express.Response) {
    try {
      const { email, password, name, role } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ error: 'Alle Felder erforderlich' });
        return;
      }

      const user = await authService.register(email, password, name, role || 'ADMIN');
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Registrierung fehlgeschlagen' });
    }
  }

  // Passwort vergessen - Token anfordern
  async forgotPassword(req: express.Request, res: express.Response) {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: 'E-Mail-Adresse erforderlich' });
        return;
      }

      const result = await authService.createPasswordResetToken(email);

      // Aus Sicherheitsgründen immer Erfolg melden (auch wenn User nicht existiert)
      if (result) {
        // E-Mail mit Reset-Link senden
        const resetUrl = `${process.env.API_URL}/reset-password?token=${result.token}`;
        await sendPasswordResetEmail(result.user.email, result.user.name, resetUrl);
      }

      res.json({ message: 'Falls ein Account mit dieser E-Mail existiert, wurde ein Link zum Zurücksetzen gesendet.' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: 'Fehler beim Senden der E-Mail' });
    }
  }

  // Passwort zurücksetzen
  async resetPassword(req: express.Request, res: express.Response) {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        res.status(400).json({ error: 'Token und neues Passwort erforderlich' });
        return;
      }

      await authService.resetPassword(token, password);
      res.json({ message: 'Passwort erfolgreich zurückgesetzt' });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Passwort konnte nicht zurückgesetzt werden' });
    }
  }
}

export default new AuthController();