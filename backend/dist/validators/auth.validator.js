import { z } from 'zod';
export const registerSchema = z.object({
    email: z.string().email('Ungültige E-Mail-Adresse'),
    password: z.string()
        .min(8, 'Passwort muss mindestens 8 Zeichen haben')
        .regex(/[A-Z]/, 'Passwort muss mindestens einen Großbuchstaben enthalten')
        .regex(/[a-z]/, 'Passwort muss mindestens einen Kleinbuchstaben enthalten')
        .regex(/[0-9]/, 'Passwort muss mindestens eine Zahl enthalten'),
    name: z.string().min(2, 'Name muss mindestens 2 Zeichen haben'),
    role: z.enum(['ADMIN', 'SUPER_ADMIN']).optional().default('ADMIN'),
});
export const loginSchema = z.object({
    email: z.string().email('Ungültige E-Mail-Adresse'),
    password: z.string().min(1, 'Passwort erforderlich'),
});
export const forgotPasswordSchema = z.object({
    email: z.string().email('Ungültige E-Mail-Adresse'),
});
export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Token erforderlich'),
    password: z.string()
        .min(8, 'Passwort muss mindestens 8 Zeichen haben')
        .regex(/[A-Z]/, 'Passwort muss mindestens einen Großbuchstaben enthalten')
        .regex(/[a-z]/, 'Passwort muss mindestens einen Kleinbuchstaben enthalten')
        .regex(/[0-9]/, 'Passwort muss mindestens eine Zahl enthalten'),
});
//# sourceMappingURL=auth.validator.js.map