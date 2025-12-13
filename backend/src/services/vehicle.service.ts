import prisma from '../utils/prisma.js';
import { VehicleType, Prisma } from '@prisma/client';

export class VehicleService {
  // Alle Fahrzeuge abrufen (mit Filter)
  async getAll(filters?: {
    type?: VehicleType;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    fuelType?: string;
    transmission?: string;
    isActive?: boolean;
  }) {
    const where: Prisma.VehicleWhereInput = {};

    if (filters?.type) where.type = filters.type;
    if (filters?.minPrice) where.price = { gte: filters.minPrice };
    if (filters?.maxPrice) where.price = { ...where.price, lte: filters.maxPrice };
    if (filters?.brand) where.brand = { contains: filters.brand, mode: 'insensitive' };
    if (filters?.fuelType) where.fuelType = filters.fuelType;
    if (filters?.transmission) where.transmission = filters.transmission;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;

    return await prisma.vehicle.findMany({
      where,
      include: { images: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Einzelnes Fahrzeug abrufen
  async getById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: { images: { orderBy: { order: 'asc' } } },
    });

    if (vehicle) {
      // View Count erhöhen
      await prisma.vehicle.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
    }

    return vehicle;
  }

  // Fahrzeug erstellen
  async create(data: {
    title: string;
    type: VehicleType;
    brand: string;
    model: string;
    price: number;
    mileage: number;
    yearBuilt: number;
    firstRegistration?: Date;
    fuelType: string;
    transmission: string;
    power?: number;
    color?: string;
    doors?: number;
    seats?: number;
    features?: string[];
    description: string;
    condition?: string;
    images?: { url: string; alt?: string; order: number }[];
  }) {
    return await prisma.vehicle.create({
      data: {
        ...data,
        images: data.images ? { create: data.images } : undefined,
      },
      include: { images: true },
    });
  }

  // Fahrzeug aktualisieren
  async update(id: string, data: Partial<typeof data>) {
    return await prisma.vehicle.update({
      where: { id },
      data,
      include: { images: true },
    });
  }

  // Fahrzeug löschen
  async delete(id: string) {
    return await prisma.vehicle.delete({
      where: { id },
    });
  }

  // Fahrzeug aktivieren/deaktivieren
  async toggleActive(id: string) {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) throw new Error('Fahrzeug nicht gefunden');

    return await prisma.vehicle.update({
      where: { id },
      data: { isActive: !vehicle.isActive },
    });
  }
}

export default new VehicleService();