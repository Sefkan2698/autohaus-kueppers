import express from 'express';
import userService from '../services/user.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export class UserController {
  // Alle Benutzer abrufen
  async getAll(req: AuthRequest, res: express.Response) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ error: 'Fehler beim Abrufen der Benutzer' });
    }
  }

  // Einzelnen Benutzer abrufen
  async getById(req: AuthRequest, res: express.Response) {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);

      if (!user) {
        res.status(404).json({ error: 'Benutzer nicht gefunden' });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Fehler beim Abrufen des Benutzers' });
    }
  }

  // Neuen Benutzer erstellen
  async create(req: AuthRequest, res: express.Response) {
    try {
      const { email, password, name, role } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ error: 'E-Mail, Passwort und Name sind erforderlich' });
        return;
      }

      // Prüfe ob E-Mail bereits existiert
      const emailExists = await userService.emailExists(email);
      if (emailExists) {
        res.status(400).json({ error: 'E-Mail-Adresse wird bereits verwendet' });
        return;
      }

      const user = await userService.create(email, password, name, role || 'ADMIN');
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Fehler beim Erstellen des Benutzers' });
    }
  }

  // Benutzer aktualisieren
  async update(req: AuthRequest, res: express.Response) {
    try {
      const { id } = req.params;
      const { email, name, role, password } = req.body;

      // Prüfe ob Benutzer existiert
      const existingUser = await userService.getById(id);
      if (!existingUser) {
        res.status(404).json({ error: 'Benutzer nicht gefunden' });
        return;
      }

      // Prüfe ob E-Mail bereits von anderem Benutzer verwendet wird
      if (email && email !== existingUser.email) {
        const emailExists = await userService.emailExists(email, id);
        if (emailExists) {
          res.status(400).json({ error: 'E-Mail-Adresse wird bereits verwendet' });
          return;
        }
      }

      const user = await userService.update(id, { email, name, role, password });
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Fehler beim Aktualisieren des Benutzers' });
    }
  }

  // Benutzer löschen
  async delete(req: AuthRequest, res: express.Response) {
    try {
      const { id } = req.params;
      const requestingUserId = req.user!.userId;

      await userService.delete(id, requestingUserId);
      res.json({ message: 'Benutzer erfolgreich gelöscht' });
    } catch (error: any) {
      console.error('Error deleting user:', error);
      res.status(400).json({ error: error.message || 'Fehler beim Löschen des Benutzers' });
    }
  }

  // Aktuellen Benutzer abrufen (für /me Endpunkt)
  async getCurrentUser(req: AuthRequest, res: express.Response) {
    try {
      const userId = req.user!.userId;
      const user = await userService.getById(userId);

      if (!user) {
        res.status(404).json({ error: 'Benutzer nicht gefunden' });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error('Error getting current user:', error);
      res.status(500).json({ error: 'Fehler beim Abrufen des Benutzers' });
    }
  }

  // Eigenes Passwort ändern
  async changePassword(req: AuthRequest, res: express.Response) {
    try {
      const userId = req.user!.userId;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        res.status(400).json({ error: 'Aktuelles und neues Passwort sind erforderlich' });
        return;
      }

      if (newPassword.length < 8) {
        res.status(400).json({ error: 'Neues Passwort muss mindestens 8 Zeichen haben' });
        return;
      }

      await userService.changePassword(userId, currentPassword, newPassword);
      res.json({ message: 'Passwort erfolgreich geändert' });
    } catch (error: any) {
      console.error('Error changing password:', error);
      res.status(400).json({ error: error.message || 'Fehler beim Ändern des Passworts' });
    }
  }
}

export default new UserController();
