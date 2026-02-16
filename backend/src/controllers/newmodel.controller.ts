import express from 'express';
import newModelService from '../services/newmodel.service.js';
import { convertToWebP } from '../utils/image.js';
import path from 'path';

export class NewModelController {
  async getAll(req: express.Request, res: express.Response) {
    try {
      const { isActive } = req.query;
      const active = isActive === 'true' ? true : isActive === 'false' ? false : undefined;

      const models = await newModelService.getAll(active);
      res.json(models);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Modelle' });
    }
  }

  async getById(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const model = await newModelService.getById(id);

      if (!model) {
        res.status(404).json({ error: 'Modell nicht gefunden' });
        return;
      }

      res.json(model);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen des Modells' });
    }
  }

  async create(req: express.Request, res: express.Response) {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'Keine Datei hochgeladen' });
        return;
      }

      const webpPath = await convertToWebP(req.file.path);
      const filename = path.basename(webpPath);
      const imageUrl = `/uploads/${filename}`;

      const { title, description, alt, order, isActive } = req.body;

      if (!title || !description) {
        res.status(400).json({ error: 'Titel und Beschreibung erforderlich' });
        return;
      }

      const model = await newModelService.create({
        title,
        description,
        imageUrl,
        alt: alt || undefined,
        order: order ? parseInt(order) : undefined,
        isActive: isActive === 'true' || isActive === true,
      });

      res.status(201).json(model);
    } catch (error) {
      console.error('Error creating new model:', error);
      res.status(400).json({ error: 'Fehler beim Erstellen des Modells' });
    }
  }

  async update(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const updateData: Record<string, unknown> = {};

      // Neues Bild hochgeladen?
      if (req.file) {
        const webpPath = await convertToWebP(req.file.path);
        const filename = path.basename(webpPath);
        updateData.imageUrl = `/uploads/${filename}`;
      }

      const { title, description, alt, order, isActive } = req.body;

      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (alt !== undefined) updateData.alt = alt;
      if (order !== undefined) updateData.order = parseInt(order);
      if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;

      const model = await newModelService.update(id, updateData);
      res.json(model);
    } catch (error) {
      console.error('Error updating new model:', error);
      res.status(400).json({ error: 'Fehler beim Aktualisieren des Modells' });
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      await newModelService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Löschen des Modells' });
    }
  }

  async toggleActive(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const model = await newModelService.toggleActive(id);
      res.json(model);
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Umschalten des Status' });
    }
  }

  async reorder(req: express.Request, res: express.Response) {
    try {
      const { models } = req.body;
      const updated = await newModelService.reorder(models);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Ändern der Reihenfolge' });
    }
  }
}

export default new NewModelController();
