import { z } from 'zod';
import { VehicleType } from '@prisma/client';

export const createVehicleSchema = z.object({
  title: z.string().min(3, 'Titel muss mindestens 3 Zeichen haben').max(200),
  type: z.enum([VehicleType.DEMO_CAR, VehicleType.USED_CAR, VehicleType.YEAR_CAR]),
  brand: z.string().min(2, 'Marke erforderlich'),
  model: z.string().min(1, 'Modell erforderlich'),
  price: z.number().positive('Preis muss positiv sein'),
  mileage: z.number().min(0, 'Kilometerstand muss positiv sein'),
  yearBuilt: z.number()
    .min(1900, 'Baujahr ungültig')
    .max(new Date().getFullYear() + 1, 'Baujahr kann nicht in der Zukunft liegen'),
  firstRegistration: z.string().datetime().optional(),
  fuelType: z.string().min(2, 'Kraftstoffart erforderlich'),
  transmission: z.string().min(2, 'Getriebeart erforderlich'),
  power: z.number().positive().optional(),
  color: z.string().optional(),
  doors: z.number().min(2).max(6).optional(),
  seats: z.number().min(1).max(9).optional(),
  features: z.array(z.string()).optional(),
  description: z.string().min(10, 'Beschreibung muss mindestens 10 Zeichen haben'),
  condition: z.string().optional(),
  images: z.array(z.object({
    url: z.string().url('Ungültige Bild-URL'),
    alt: z.string().optional(),
    order: z.number().min(0),
  })).optional(),
});

export const updateVehicleSchema = createVehicleSchema.partial();