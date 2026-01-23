import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../utils/prisma.js';
import { Role } from '@prisma/client';
const SALT_ROUNDS = 12;
const PASSWORD_RESET_EXPIRY_HOURS = 1;
export class AuthService {
    // User registrieren (mit optionaler Rolle)
    async register(email, password, name, role = 'ADMIN') {
        try {
            console.log('📝 Registrierung startet für:', email, 'mit Rolle:', role);
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            console.log('✅ Passwort gehasht');
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    role,
                },
            });
            console.log('✅ User erstellt:', user.id);
            return { id: user.id, email: user.email, name: user.name, role: user.role };
        }
        catch (error) {
            console.error('❌ Registrierung Fehler:', error);
            throw error;
        }
    }
    // Login
    async login(email, password) {
        try {
            console.log('🔐 Login-Versuch für:', email);
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                console.log('❌ User nicht gefunden');
                throw new Error('Ungültige Anmeldedaten');
            }
            console.log('✅ User gefunden, prüfe Passwort...');
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                console.log('❌ Passwort ungültig');
                throw new Error('Ungültige Anmeldedaten');
            }
            console.log('✅ Passwort korrekt, erstelle Token...');
            const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
            console.log('✅ Token erstellt');
            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            };
        }
        catch (error) {
            console.error('❌ Login Fehler:', error);
            throw error;
        }
    }
    // Token verifizieren
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        catch {
            throw new Error('Ungültiger Token');
        }
    }
    // Passwort-Reset Token erstellen
    async createPasswordResetToken(email) {
        try {
            console.log('🔑 Passwort-Reset angefordert für:', email);
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                console.log('❌ User nicht gefunden');
                // Aus Sicherheitsgründen keine Fehlermeldung, dass User nicht existiert
                return null;
            }
            // Alte Tokens für diesen User löschen
            await prisma.passwordResetToken.deleteMany({
                where: { userId: user.id },
            });
            // Neuen Token generieren
            const token = crypto.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + PASSWORD_RESET_EXPIRY_HOURS * 60 * 60 * 1000);
            await prisma.passwordResetToken.create({
                data: {
                    token,
                    userId: user.id,
                    expiresAt,
                },
            });
            console.log('✅ Reset-Token erstellt, gültig bis:', expiresAt);
            return { token, user: { id: user.id, email: user.email, name: user.name } };
        }
        catch (error) {
            console.error('❌ Passwort-Reset Token Fehler:', error);
            throw error;
        }
    }
    // Passwort mit Token zurücksetzen
    async resetPassword(token, newPassword) {
        try {
            console.log('🔄 Passwort wird zurückgesetzt...');
            const resetToken = await prisma.passwordResetToken.findUnique({
                where: { token },
                include: { user: true },
            });
            if (!resetToken) {
                console.log('❌ Token nicht gefunden');
                throw new Error('Ungültiger oder abgelaufener Token');
            }
            if (resetToken.usedAt) {
                console.log('❌ Token bereits verwendet');
                throw new Error('Token wurde bereits verwendet');
            }
            if (resetToken.expiresAt < new Date()) {
                console.log('❌ Token abgelaufen');
                throw new Error('Token ist abgelaufen');
            }
            // Neues Passwort hashen
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            // Passwort aktualisieren und Token als verwendet markieren
            await prisma.$transaction([
                prisma.user.update({
                    where: { id: resetToken.userId },
                    data: { password: hashedPassword },
                }),
                prisma.passwordResetToken.update({
                    where: { id: resetToken.id },
                    data: { usedAt: new Date() },
                }),
            ]);
            console.log('✅ Passwort erfolgreich zurückgesetzt für:', resetToken.user.email);
            return { success: true };
        }
        catch (error) {
            console.error('❌ Passwort-Reset Fehler:', error);
            throw error;
        }
    }
    // User per Email finden
    async findUserByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, name: true, role: true },
        });
    }
}
export default new AuthService();
//# sourceMappingURL=auth.service.js.map