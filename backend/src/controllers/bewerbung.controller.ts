import express from 'express';
import { sendApplicationEmail } from '../utils/mailer.js';

export class BewerbungController {
  async submit(req: express.Request, res: express.Response) {
    console.log('🚀 Bewerbung eingegangen');
    try {
      const {
        anrede, vorname, nachname, wohnort, telefon, email,
        geburtsdatum, stelle, berufserfahrung, sprachkenntnisse,
        fuehrerschein, inAnstellung, eintrittsdatum, motivation,
      } = req.body;

      if (!vorname || !nachname || !email || !telefon || !wohnort || !stelle) {
        res.status(400).json({ error: 'Pflichtfelder fehlen.' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
        return;
      }

      const files = req.files as Express.Multer.File[];
      const attachments = (files || []).map((f) => ({
        filename: f.originalname,
        content: f.buffer,
      }));

      res.status(201).json({ message: 'Bewerbung erfolgreich eingegangen.' });

      sendApplicationEmail(
        {
          anrede, vorname, nachname, wohnort, telefon, email,
          geburtsdatum, stelle, berufserfahrung, sprachkenntnisse,
          fuehrerschein, inAnstellung, eintrittsdatum, motivation,
        },
        attachments
      )
        .then(() => console.log('✅ Bewerbungs-Mail versendet'))
        .catch((err) => console.error('❌ Bewerbungs-Mail Fehler:', err));
    } catch (error) {
      console.error('❌ Fehler im Bewerbungs-Controller:', error);
      res.status(500).json({ error: 'Fehler beim Verarbeiten der Bewerbung.' });
    }
  }
}

export default new BewerbungController();