import express from 'express';
import authService from '../services/auth.service.js';

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

  // Register (nur für initiales Setup - später deaktivieren!)
  async register(req: express.Request, res: express.Response) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ error: 'Alle Felder erforderlich' });
        return;
      }

      const user = await authService.register(email, password, name);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Registrierung fehlgeschlagen' });
    }
  }
}

export default new AuthController();