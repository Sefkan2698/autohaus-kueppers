import prisma from '../utils/prisma.js';
import { JobType, Prisma } from '@prisma/client';

export class JobService {
  // Alle Jobs abrufen (mit Filter)
  async getAll(filters?: {
    type?: JobType;
    department?: string;
    location?: string;
    isActive?: boolean;
  }) {
    const where: Prisma.JobWhereInput = {};

    if (filters?.type) where.type = filters.type;
    if (filters?.department) where.department = { contains: filters.department, mode: 'insensitive' };
    if (filters?.location) where.location = { contains: filters.location, mode: 'insensitive' };
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;

    return await prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Einzelnen Job abrufen
  async getById(id: string) {
    return await prisma.job.findUnique({
      where: { id },
    });
  }

  // Job erstellen
  async create(data: {
    title: string;
    department?: string;
    location: string;
    type: JobType;
    description: string;
    requirements?: string[];
    benefits?: string[];
    salary?: string;
  }) {
    return await prisma.job.create({
      data,
    });
  }

  // Job aktualisieren
  async update(id: string, data: Partial<typeof data>) {
    return await prisma.job.update({
      where: { id },
      data,
    });
  }

  // Job löschen
  async delete(id: string) {
    return await prisma.job.delete({
      where: { id },
    });
  }

  // Job aktivieren/deaktivieren
  async toggleActive(id: string) {
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) throw new Error('Job nicht gefunden');

    return await prisma.job.update({
      where: { id },
      data: { isActive: !job.isActive },
    });
  }
}

export default new JobService();