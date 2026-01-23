import express from 'express';
import vehicleService from '../services/vehicle.service.js';
import { VehicleType } from '@prisma/client';
import { convertToWebP } from '../utils/image.js';
import path from 'path';
export class VehicleController {
    // Alle Fahrzeuge abrufen (mit optionalen Filtern)
    async getAll(req, res) {
        try {
            const { type, minPrice, maxPrice, brand, fuelType, transmission, isActive } = req.query;
            const filters = {
                type: type,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                brand: brand,
                fuelType: fuelType,
                transmission: transmission,
                isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
            };
            const vehicles = await vehicleService.getAll(filters);
            res.json(vehicles);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen der Fahrzeuge' });
        }
    }
    // Einzelnes Fahrzeug abrufen
    async getById(req, res) {
        try {
            const { id } = req.params;
            const vehicle = await vehicleService.getById(id);
            if (!vehicle) {
                res.status(404).json({ error: 'Fahrzeug nicht gefunden' });
                return;
            }
            res.json(vehicle);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen des Fahrzeugs' });
        }
    }
    // Fahrzeug erstellen (Admin) - mit Bild-Upload
    async create(req, res) {
        try {
            // Handle image uploads if present
            const images = [];
            if (req.files && Array.isArray(req.files)) {
                for (let i = 0; i < req.files.length; i++) {
                    const file = req.files[i];
                    const webpPath = await convertToWebP(file.path);
                    const filename = path.basename(webpPath);
                    const url = `/uploads/${filename}`;
                    images.push({
                        url,
                        alt: req.body.title || 'Fahrzeugbild',
                        order: i,
                    });
                }
            }
            // Parse arrays from FormData
            const features = req.body.features ? JSON.parse(req.body.features) : [];
            const vehicleData = {
                title: req.body.title,
                type: req.body.type,
                brand: req.body.brand,
                model: req.body.model,
                price: parseFloat(req.body.price),
                mileage: parseInt(req.body.mileage),
                yearBuilt: parseInt(req.body.yearBuilt),
                firstRegistration: req.body.firstRegistration ? new Date(req.body.firstRegistration) : undefined,
                fuelType: req.body.fuelType,
                transmission: req.body.transmission,
                power: req.body.power ? parseInt(req.body.power) : undefined,
                color: req.body.color || undefined,
                doors: req.body.doors ? parseInt(req.body.doors) : undefined,
                seats: req.body.seats ? parseInt(req.body.seats) : undefined,
                features,
                description: req.body.description,
                condition: req.body.condition || undefined,
                images: images.length > 0 ? images : undefined,
            };
            const vehicle = await vehicleService.create(vehicleData);
            res.status(201).json(vehicle);
        }
        catch (error) {
            console.error('Error creating vehicle:', error);
            res.status(400).json({ error: 'Fehler beim Erstellen des Fahrzeugs' });
        }
    }
    // Fahrzeug aktualisieren (Admin) - mit Bild-Upload
    async update(req, res) {
        try {
            const { id } = req.params;
            // Handle new image uploads if present
            const newImages = [];
            if (req.files && Array.isArray(req.files)) {
                for (let i = 0; i < req.files.length; i++) {
                    const file = req.files[i];
                    const webpPath = await convertToWebP(file.path);
                    const filename = path.basename(webpPath);
                    const url = `/uploads/${filename}`;
                    newImages.push({
                        url,
                        alt: req.body.title || 'Fahrzeugbild',
                        order: i,
                    });
                }
            }
            // Parse arrays from FormData if they're strings
            const features = typeof req.body.features === 'string'
                ? JSON.parse(req.body.features)
                : req.body.features || [];
            const updateData = {
                title: req.body.title,
                type: req.body.type,
                brand: req.body.brand,
                model: req.body.model,
                price: parseFloat(req.body.price),
                mileage: parseInt(req.body.mileage),
                yearBuilt: parseInt(req.body.yearBuilt),
                firstRegistration: req.body.firstRegistration ? new Date(req.body.firstRegistration) : undefined,
                fuelType: req.body.fuelType,
                transmission: req.body.transmission,
                power: req.body.power ? parseInt(req.body.power) : undefined,
                color: req.body.color || undefined,
                doors: req.body.doors ? parseInt(req.body.doors) : undefined,
                seats: req.body.seats ? parseInt(req.body.seats) : undefined,
                features,
                description: req.body.description,
                condition: req.body.condition || undefined,
            };
            // Add new images if any were uploaded
            if (newImages.length > 0) {
                updateData.images = newImages;
            }
            const vehicle = await vehicleService.update(id, updateData);
            res.json(vehicle);
        }
        catch (error) {
            console.error('Error updating vehicle:', error);
            res.status(400).json({ error: 'Fehler beim Aktualisieren des Fahrzeugs' });
        }
    }
    // Fahrzeug löschen (Admin)
    async delete(req, res) {
        try {
            const { id } = req.params;
            await vehicleService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: 'Fehler beim Löschen des Fahrzeugs' });
        }
    }
    // Fahrzeug aktivieren/deaktivieren (Admin)
    async toggleActive(req, res) {
        try {
            const { id } = req.params;
            const vehicle = await vehicleService.toggleActive(id);
            res.json(vehicle);
        }
        catch (error) {
            res.status(400).json({ error: 'Fehler beim Umschalten des Status' });
        }
    }
}
export default new VehicleController();
//# sourceMappingURL=vehicle.controller.js.map