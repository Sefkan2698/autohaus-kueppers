import { z } from 'zod';
export const contactSchema = z.object({
    name: z.string().min(2, 'Name muss mindestens 2 Zeichen haben'),
    email: z.string().email('Ungültige E-Mail-Adresse'),
    phone: z.string().regex(/^[0-9\s\+\-\(\)]+$/, 'Ungültige Telefonnummer').optional(),
    message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen haben'),
    subject: z.string().optional(),
    vehicleId: z.string().uuid().optional(),
});
//# sourceMappingURL=contact.validator.js.map