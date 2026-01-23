import bcrypt from 'bcrypt';
import prisma from '../utils/prisma.js';
import { Role } from '@prisma/client';

const SALT_ROUNDS = 12;

export class UserService {
  // Alle Benutzer abrufen
  async getAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Einzelnen Benutzer abrufen
  async getById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Neuen Benutzer erstellen (durch Superadmin)
  async create(email: string, password: string, name: string, role: Role = 'ADMIN') {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  // Benutzer aktualisieren
  async update(id: string, data: { email?: string; name?: string; role?: Role; password?: string }) {
    const updateData: any = {};

    if (data.email) updateData.email = data.email;
    if (data.name) updateData.name = data.name;
    if (data.role) updateData.role = data.role;
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Benutzer löschen
  async delete(id: string, requestingUserId: string) {
    // Verhindere, dass sich ein Benutzer selbst löscht
    if (id === requestingUserId) {
      throw new Error('Sie können sich nicht selbst löschen');
    }

    // Prüfe ob der zu löschende User existiert
    const userToDelete = await prisma.user.findUnique({
      where: { id },
    });

    if (!userToDelete) {
      throw new Error('Benutzer nicht gefunden');
    }

    await prisma.user.delete({
      where: { id },
    });

    return { success: true };
  }

  // Prüfen ob E-Mail bereits existiert
  async emailExists(email: string, excludeId?: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return false;
    if (excludeId && user.id === excludeId) return false;
    return true;
  }

  // Eigenes Passwort ändern (mit Verifizierung des aktuellen Passworts)
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    // Hole den Benutzer mit Passwort
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }

    // Prüfe aktuelles Passwort
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Aktuelles Passwort ist falsch');
    }

    // Hash neues Passwort und speichern
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true };
  }
}

export default new UserService();
