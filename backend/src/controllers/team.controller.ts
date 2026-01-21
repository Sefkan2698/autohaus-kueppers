import express from 'express';
import teamService from '../services/team.service.js';
import { convertToWebP } from '../utils/image.js';
import path from 'path';

export class TeamController {
  // Alle Team-Mitglieder abrufen
  async getAll(req: express.Request, res: express.Response) {
    try {
      const { isActive } = req.query;
      const active = isActive === 'true' ? true : isActive === 'false' ? false : undefined;

      const members = await teamService.getAll(active);
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Mitarbeiter' });
    }
  }

  // Einzelnes Team-Mitglied abrufen
  async getById(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const member = await teamService.getById(id);

      if (!member) {
        res.status(404).json({ error: 'Mitarbeiter nicht gefunden' });
        return;
      }

      res.json(member);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen des Mitarbeiters' });
    }
  }

  // Team-Mitglied erstellen (Admin) - mit Datei-Upload
  async create(req: express.Request, res: express.Response) {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'Keine Datei hochgeladen' });
        return;
      }

      // Bild zu WebP konvertieren
      const webpPath = await convertToWebP(req.file.path);
      const filename = path.basename(webpPath);
      const url = `/uploads/${filename}`;

      // Team-Eintrag erstellen
      const { name, title, alt, order, isActive } = req.body;

      if (!name || !title) {
        res.status(400).json({ error: 'Name und Titel sind erforderlich' });
        return;
      }

      const member = await teamService.create({
        name,
        title,
        url,
        alt,
        order: order ? parseInt(order) : undefined,
        isActive: isActive === 'true' || isActive === true,
      });

      res.status(201).json(member);
    } catch (error) {
      console.error('Error creating team member:', error);
      res.status(400).json({ error: 'Fehler beim Erstellen des Mitarbeiters' });
    }
  }

  // Team-Mitglied aktualisieren (Admin)
  async update(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const member = await teamService.update(id, req.body);
      res.json(member);
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Aktualisieren des Mitarbeiters' });
    }
  }

  // Team-Mitglied mit neuem Bild aktualisieren (Admin)
  async updateWithImage(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const { name, title, alt, order, isActive } = req.body;

      let updateData: Record<string, unknown> = {};

      if (name) updateData.name = name;
      if (title) updateData.title = title;
      if (alt !== undefined) updateData.alt = alt;
      if (order !== undefined) updateData.order = parseInt(order);
      if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;

      // Wenn eine neue Datei hochgeladen wurde
      if (req.file) {
        const webpPath = await convertToWebP(req.file.path);
        const filename = path.basename(webpPath);
        updateData.url = `/uploads/${filename}`;
      }

      const member = await teamService.update(id, updateData);
      res.json(member);
    } catch (error) {
      console.error('Error updating team member:', error);
      res.status(400).json({ error: 'Fehler beim Aktualisieren des Mitarbeiters' });
    }
  }

  // Team-Mitglied löschen (Admin)
  async delete(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      await teamService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Löschen des Mitarbeiters' });
    }
  }

  // Team-Mitglied aktivieren/deaktivieren (Admin)
  async toggleActive(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const member = await teamService.toggleActive(id);
      res.json(member);
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Umschalten des Status' });
    }
  }

  // Reihenfolge ändern (Admin)
  async reorder(req: express.Request, res: express.Response) {
    try {
      const { members } = req.body;
      const updated = await teamService.reorder(members);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Ändern der Reihenfolge' });
    }
  }
}

export default new TeamController();
