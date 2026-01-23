import prisma from '../utils/prisma.js';
import { SubmissionStatus, Prisma } from '@prisma/client';
export class ContactService {
    // Kontaktanfrage erstellen
    async create(data) {
        return await prisma.contactSubmission.create({
            data,
        });
    }
    // Alle Kontaktanfragen abrufen (Admin)
    async getAll(filters) {
        const where = {};
        if (filters?.status)
            where.status = filters.status;
        if (filters?.vehicleId)
            where.vehicleId = filters.vehicleId;
        return await prisma.contactSubmission.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    // Einzelne Kontaktanfrage abrufen (Admin)
    async getById(id) {
        return await prisma.contactSubmission.findUnique({
            where: { id },
        });
    }
    // Status ändern (Admin)
    async updateStatus(id, status) {
        return await prisma.contactSubmission.update({
            where: { id },
            data: { status },
        });
    }
    // Kontaktanfrage löschen (Admin)
    async delete(id) {
        return await prisma.contactSubmission.delete({
            where: { id },
        });
    }
}
export default new ContactService();
//# sourceMappingURL=contact.service.js.map