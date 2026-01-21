import prisma from '../utils/prisma.js';

export class TeamService {
  // Alle Team-Mitglieder abrufen
  async getAll(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};

    return await prisma.teamMember.findMany({
      where,
      orderBy: { order: 'asc' },
    });
  }

  // Einzelnes Team-Mitglied abrufen
  async getById(id: string) {
    return await prisma.teamMember.findUnique({
      where: { id },
    });
  }

  // Team-Mitglied erstellen
  async create(data: {
    name: string;
    title: string;
    url: string;
    alt?: string;
    order?: number;
    isActive?: boolean;
  }) {
    return await prisma.teamMember.create({
      data,
    });
  }

  // Team-Mitglied aktualisieren
  async update(id: string, data: {
    name?: string;
    title?: string;
    url?: string;
    alt?: string;
    order?: number;
    isActive?: boolean;
  }) {
    return await prisma.teamMember.update({
      where: { id },
      data,
    });
  }

  // Team-Mitglied löschen
  async delete(id: string) {
    return await prisma.teamMember.delete({
      where: { id },
    });
  }

  // Team-Mitglied aktivieren/deaktivieren
  async toggleActive(id: string) {
    const member = await prisma.teamMember.findUnique({ where: { id } });
    if (!member) throw new Error('Mitarbeiter nicht gefunden');

    return await prisma.teamMember.update({
      where: { id },
      data: { isActive: !member.isActive },
    });
  }

  // Reihenfolge ändern
  async reorder(members: { id: string; order: number }[]) {
    const updates = members.map(({ id, order }) =>
      prisma.teamMember.update({
        where: { id },
        data: { order },
      })
    );

    return await prisma.$transaction(updates);
  }
}

export default new TeamService();
