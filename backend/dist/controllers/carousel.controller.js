import express from 'express';
import carouselService from '../services/carousel.service.js';
import { convertToWebP } from '../utils/image.js';
import path from 'path';
export class CarouselController {
    // Alle Carousel-Bilder abrufen
    async getAll(req, res) {
        try {
            const { isActive } = req.query;
            const active = isActive === 'true' ? true : isActive === 'false' ? false : undefined;
            const images = await carouselService.getAll(active);
            res.json(images);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen der Bilder' });
        }
    }
    // Einzelnes Carousel-Bild abrufen
    async getById(req, res) {
        try {
            const { id } = req.params;
            const image = await carouselService.getById(id);
            if (!image) {
                res.status(404).json({ error: 'Bild nicht gefunden' });
                return;
            }
            res.json(image);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen des Bildes' });
        }
    }
    // Carousel-Bild erstellen (Admin) - mit Datei-Upload
    async create(req, res) {
        try {
            if (!req.file) {
                res.status(400).json({ error: 'Keine Datei hochgeladen' });
                return;
            }
            // Bild zu WebP konvertieren
            const webpPath = await convertToWebP(req.file.path);
            const filename = path.basename(webpPath);
            const url = `/uploads/${filename}`;
            // Carousel-Eintrag erstellen
            const { alt, title, subtitle, textPosition, link, order, isActive } = req.body;
            const image = await carouselService.create({
                url,
                alt,
                title,
                subtitle,
                textPosition: textPosition || 'bottom-left',
                link,
                order: order ? parseInt(order) : undefined,
                isActive: isActive === 'true' || isActive === true,
            });
            res.status(201).json(image);
        }
        catch (error) {
            console.error('Error creating carousel image:', error);
            res.status(400).json({ error: 'Fehler beim Erstellen des Bildes' });
        }
    }
    // Carousel-Bild aktualisieren (Admin)
    async update(req, res) {
        try {
            const { id } = req.params;
            // Extract only allowed fields
            const { url, alt, title, subtitle, textPosition, link, order, isActive } = req.body;
            const updateData = {};
            if (url !== undefined)
                updateData.url = url;
            if (alt !== undefined)
                updateData.alt = alt;
            if (title !== undefined)
                updateData.title = title;
            if (subtitle !== undefined)
                updateData.subtitle = subtitle;
            if (textPosition !== undefined)
                updateData.textPosition = textPosition;
            if (link !== undefined)
                updateData.link = link;
            if (order !== undefined)
                updateData.order = order;
            if (isActive !== undefined)
                updateData.isActive = isActive;
            const image = await carouselService.update(id, updateData);
            res.json(image);
        }
        catch (error) {
            console.error('Error updating carousel:', error);
            res.status(400).json({ error: 'Fehler beim Aktualisieren des Bildes' });
        }
    }
    // Carousel-Bild löschen (Admin)
    async delete(req, res) {
        try {
            const { id } = req.params;
            await carouselService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: 'Fehler beim Löschen des Bildes' });
        }
    }
    // Carousel-Bild aktivieren/deaktivieren (Admin)
    async toggleActive(req, res) {
        try {
            const { id } = req.params;
            const image = await carouselService.toggleActive(id);
            res.json(image);
        }
        catch (error) {
            res.status(400).json({ error: 'Fehler beim Umschalten des Status' });
        }
    }
    // Reihenfolge ändern (Admin)
    async reorder(req, res) {
        try {
            const { images } = req.body;
            const updated = await carouselService.reorder(images);
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({ error: 'Fehler beim Ändern der Reihenfolge' });
        }
    }
}
export default new CarouselController();
//# sourceMappingURL=carousel.controller.js.map