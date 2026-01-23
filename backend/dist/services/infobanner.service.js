import prisma from '../utils/prisma.js';
import { BannerType, Prisma } from '@prisma/client';
export class InfoBannerService {
    // Alle Banner abrufen (mit Filter)
    async getAll(filters) {
        const where = {};
        if (filters?.type)
            where.type = filters.type;
        if (filters?.isActive !== undefined)
            where.isActive = filters.isActive;
        // Zusätzlich nach Datum filtern (Banner die aktuell gültig sind)
        const now = new Date();
        where.OR = [
            { startDate: null, endDate: null },
            { startDate: { lte: now }, endDate: null },
            { startDate: null, endDate: { gte: now } },
            { startDate: { lte: now }, endDate: { gte: now } },
        ];
        return await prisma.infoBanner.findMany({
            where,
            orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        });
    }
    // Einzelnes Banner abrufen
    async getById(id) {
        return await prisma.infoBanner.findUnique({
            where: { id },
        });
    }
    // Banner erstellen
    async create(data) {
        return await prisma.infoBanner.create({
            data,
        });
    }
    // Banner aktualisieren
    async update(id, data) {
        return await prisma.infoBanner.update({
            where: { id },
            data,
        });
    }
    // Banner löschen
    async delete(id) {
        return await prisma.infoBanner.delete({
            where: { id },
        });
    }
    // Banner aktivieren/deaktivieren
    async toggleActive(id) {
        const banner = await prisma.infoBanner.findUnique({ where: { id } });
        if (!banner)
            throw new Error('Banner nicht gefunden');
        return await prisma.infoBanner.update({
            where: { id },
            data: { isActive: !banner.isActive },
        });
    }
}
export default new InfoBannerService();
//# sourceMappingURL=infobanner.service.js.map