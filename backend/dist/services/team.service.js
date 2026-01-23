import prisma from '../utils/prisma.js';
export class TeamService {
    // Alle Team-Mitglieder abrufen
    async getAll(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return await prisma.teamMember.findMany({
            where,
            orderBy: { order: 'asc' },
        });
    }
    // Einzelnes Team-Mitglied abrufen
    async getById(id) {
        return await prisma.teamMember.findUnique({
            where: { id },
        });
    }
    // Team-Mitglied erstellen
    async create(data) {
        return await prisma.teamMember.create({
            data,
        });
    }
    // Team-Mitglied aktualisieren
    async update(id, data) {
        return await prisma.teamMember.update({
            where: { id },
            data,
        });
    }
    // Team-Mitglied löschen
    async delete(id) {
        return await prisma.teamMember.delete({
            where: { id },
        });
    }
    // Team-Mitglied aktivieren/deaktivieren
    async toggleActive(id) {
        const member = await prisma.teamMember.findUnique({ where: { id } });
        if (!member)
            throw new Error('Mitarbeiter nicht gefunden');
        return await prisma.teamMember.update({
            where: { id },
            data: { isActive: !member.isActive },
        });
    }
    // Reihenfolge ändern
    async reorder(members) {
        const updates = members.map(({ id, order }) => prisma.teamMember.update({
            where: { id },
            data: { order },
        }));
        return await prisma.$transaction(updates);
    }
}
export default new TeamService();
//# sourceMappingURL=team.service.js.map