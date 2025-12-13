import express from 'express';
import jobService from '../services/job.service.js';
import { JobType } from '@prisma/client';

export class JobController {
  // Alle Jobs abrufen (mit optionalen Filtern)
  async getAll(req: express.Request, res: express.Response) {
    try {
      const { type, department, location, isActive } = req.query;

      const filters = {
        type: type as JobType | undefined,
        department: department as string | undefined,
        location: location as string | undefined,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      };

      const jobs = await jobService.getAll(filters);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Jobs' });
    }
  }

  // Einzelnen Job abrufen
  async getById(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const job = await jobService.getById(id);

      if (!job) {
        res.status(404).json({ error: 'Job nicht gefunden' });
        return;
      }

      res.json(job);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen des Jobs' });
    }
  }

  // Job erstellen (Admin)
  async create(req: express.Request, res: express.Response) {
    try {
      const job = await jobService.create(req.body);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Erstellen des Jobs' });
    }
  }

  // Job aktualisieren (Admin)
  async update(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const job = await jobService.update(id, req.body);
      res.json(job);
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Aktualisieren des Jobs' });
    }
  }

  // Job löschen (Admin)
  async delete(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      await jobService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Löschen des Jobs' });
    }
  }

  // Job aktivieren/deaktivieren (Admin)
  async toggleActive(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const job = await jobService.toggleActive(id);
      res.json(job);
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Umschalten des Status' });
    }
  }
}

export default new JobController();