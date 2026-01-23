import express from 'express';
import userService from '../services/user.service.js';
export class UserController {
    // Alle Benutzer abrufen
    async getAll(req, res) {
        try {
            const users = await userService.getAll();
            res.json(users);
        }
        catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ error: 'Fehler beim Abrufen der Benutzer' });
        }
    }
    // Einzelnen Benutzer abrufen
    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getById(id);
            if (!user) {
                res.status(404).json({ error: 'Benutzer nicht gefunden' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({ error: 'Fehler beim Abrufen des Benutzers' });
        }
    }
    // Neuen Benutzer erstellen
    async create(req, res) {
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
        }
        catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Fehler beim Erstellen des Benutzers' });
        }
    }
    // Benutzer aktualisieren
    async update(req, res) {
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
        }
        catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Fehler beim Aktualisieren des Benutzers' });
        }
    }
    // Benutzer löschen
    async delete(req, res) {
        try {
            const { id } = req.params;
            const requestingUserId = req.user.userId;
            await userService.delete(id, requestingUserId);
            res.json({ message: 'Benutzer erfolgreich gelöscht' });
        }
        catch (error) {
            console.error('Error deleting user:', error);
            res.status(400).json({ error: error.message || 'Fehler beim Löschen des Benutzers' });
        }
    }
    // Aktuellen Benutzer abrufen (für /me Endpunkt)
    async getCurrentUser(req, res) {
        try {
            const userId = req.user.userId;
            const user = await userService.getById(userId);
            if (!user) {
                res.status(404).json({ error: 'Benutzer nicht gefunden' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            console.error('Error getting current user:', error);
            res.status(500).json({ error: 'Fehler beim Abrufen des Benutzers' });
        }
    }
}
export default new UserController();
//# sourceMappingURL=user.controller.js.map