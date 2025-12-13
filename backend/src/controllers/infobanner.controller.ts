import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';

export class InfoBannerController {
  // GET /api/infobanner - Alle Banner holen
  async getAll(req: Request, res: Response) {
    try {
      // Im Admin: alle Banner, auf Homepage: nur aktive
      const showAll = req.query.admin === 'true';
      
      const banners = await prisma.infoBanner.findMany({
        where: showAll ? {} : { isActive: true },
        orderBy: [{ createdAt: 'desc' }],
      });
      res.json(banners);
    } catch (error) {
      console.error('Error fetching banners:', error);
      res.status(500).json({ error: 'Fehler beim Laden der Banner' });
    }
  }

  // GET /api/infobanner/:id - Einzelnen Banner holen
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'ID erforderlich' });
        return;
      }

      const banner = await prisma.infoBanner.findUnique({
        where: { id },
      });

      if (!banner) {
        res.status(404).json({ error: 'Banner nicht gefunden' });
        return;
      }

      res.json(banner);
    } catch (error) {
      console.error('Error fetching banner:', error);
      res.status(500).json({ error: 'Fehler beim Laden des Banners' });
    }
  }

  // POST /api/infobanner - Neuen Banner erstellen
  async create(req: Request, res: Response) {
    try {
      const { title, message, link, linkText, isActive } = req.body;

      // Wenn dieser Banner aktiv sein soll, alle anderen deaktivieren
      if (isActive !== false) {
        await prisma.infoBanner.updateMany({
          where: { isActive: true },
          data: { isActive: false },
        });
      }

      const banner = await prisma.infoBanner.create({
        data: {
          title,
          message,
          type: 'INFO',
          link,
          linkText,
          isActive: isActive ?? true,
          priority: 1,
        },
      });

      res.status(201).json(banner);
    } catch (error) {
      console.error('Error creating banner:', error);
      res.status(500).json({ error: 'Fehler beim Erstellen des Banners' });
    }
  }

  // PUT /api/infobanner/:id - Banner aktualisieren
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'ID erforderlich' });
        return;
      }

      const { title, message, link, linkText, isActive } = req.body;

      // Wenn dieser Banner aktiv gesetzt wird, alle anderen deaktivieren
      if (isActive) {
        await prisma.infoBanner.updateMany({
          where: { 
            isActive: true,
            NOT: { id }
          },
          data: { isActive: false },
        });
      }

      const banner = await prisma.infoBanner.update({
        where: { id },
        data: {
          title,
          message,
          link,
          linkText,
          isActive,
        },
      });

      res.json(banner);
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ error: 'Fehler beim Aktualisieren des Banners' });
    }
  }

  // DELETE /api/infobanner/:id - Banner löschen
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'ID erforderlich' });
        return;
      }

      await prisma.infoBanner.delete({
        where: { id },
      });

      res.json({ message: 'Banner erfolgreich gelöscht' });
    } catch (error) {
      console.error('Error deleting banner:', error);
      res.status(500).json({ error: 'Fehler beim Löschen des Banners' });
    }
  }

  // PATCH /api/infobanner/:id/toggle - Banner aktivieren/deaktivieren
  async toggleActive(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'ID erforderlich' });
        return;
      }

      const banner = await prisma.infoBanner.findUnique({
        where: { id },
      });

      if (!banner) {
        res.status(404).json({ error: 'Banner nicht gefunden' });
        return;
      }

      const newActiveState = !banner.isActive;

      // Wenn Banner aktiviert wird, alle anderen deaktivieren
      if (newActiveState) {
        await prisma.infoBanner.updateMany({
          where: { 
            isActive: true,
            NOT: { id }
          },
          data: { isActive: false },
        });
      }

      const updatedBanner = await prisma.infoBanner.update({
        where: { id },
        data: { isActive: newActiveState },
      });

      res.json(updatedBanner);
    } catch (error) {
      console.error('Error toggling banner:', error);
      res.status(500).json({ error: 'Fehler beim Umschalten des Banners' });
    }
  }
}

export default new InfoBannerController();