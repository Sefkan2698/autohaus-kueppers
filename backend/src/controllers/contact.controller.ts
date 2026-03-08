import express from 'express';
import contactService from '../services/contact.service.js';
import { SubmissionStatus } from '@prisma/client';
import { sendContactEmail } from '../utils/mailer.js';

export class ContactController {
  // Kontaktformular absenden (öffentlich)
  async submit(req: express.Request, res: express.Response) {
    console.log('🚀 submit Methode wurde aufgerufen');
    console.log('Request Body:', req.body);
    
    try {
      const { name, email, phone, message, subject, vehicleId } = req.body;

      // Validierung Pflichtfelder
      if (!name || !email || !message) {
        res.status(400).json({ error: 'Name, E-Mail und Nachricht sind Pflichtfelder' });
        return;
      }

      // E-Mail Format validieren
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
        return;
      }

      const submission = await contactService.create({
        name,
        email,
        phone,
        message,
        subject,
        vehicleId,
      });

      res.status(201).json({
        message: 'Kontaktanfrage erfolgreich gesendet',
        id: submission.id
      });

      // E-Mail versenden (nach Response, damit Fehler den Nutzer nicht blockieren)
      console.log('🔄 Starte Mail-Versand...');
      sendContactEmail({ name, email, phone, message, subject, vehicleId })
        .then(() => console.log('✅ Mail wurde erfolgreich versendet'))
        .catch((err) => console.error('❌ Mail-Versand fehlgeschlagen (Anfrage wurde trotzdem gespeichert):', err));
    } catch (error) {
      console.error('❌ Fehler im Controller:', error);
      res.status(500).json({ error: 'Fehler beim Speichern der Kontaktanfrage' });
    }
  }

  // Alle Kontaktanfragen abrufen (Admin)
  async getAll(req: express.Request, res: express.Response) {
    try {
      const { status, vehicleId } = req.query;

      const filters = {
        status: status as SubmissionStatus | undefined,
        vehicleId: vehicleId as string | undefined,
      };

      const submissions = await contactService.getAll(filters);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Kontaktanfragen' });
    }
  }

  // Einzelne Kontaktanfrage abrufen (Admin)
  async getById(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const submission = await contactService.getById(id);

      if (!submission) {
        res.status(404).json({ error: 'Kontaktanfrage nicht gefunden' });
        return;
      }

      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Kontaktanfrage' });
    }
  }

  // Status ändern (Admin)
  async updateStatus(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || !Object.values(SubmissionStatus).includes(status)) {
        res.status(400).json({ error: 'Ungültiger Status' });
        return;
      }

      const submission = await contactService.updateStatus(id, status);
      res.json(submission);
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Aktualisieren des Status' });
    }
  }

  // Kontaktanfrage löschen (Admin)
  async delete(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      await contactService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Fehler beim Löschen der Kontaktanfrage' });
    }
  }
}

export default new ContactController();