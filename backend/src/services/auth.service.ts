import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

const SALT_ROUNDS = 12;

export class AuthService {
  // User registrieren (nur für initiales Setup)
  async register(email: string, password: string, name: string) {
    try {
      console.log('📝 Registrierung startet für:', email);
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      console.log('✅ Passwort gehasht');
      
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
      console.log('✅ User erstellt:', user.id);

      return { id: user.id, email: user.email, name: user.name };
    } catch (error) {
      console.error('❌ Registrierung Fehler:', error);
      throw error;
    }
  }

  // Login
  async login(email: string, password: string) {
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
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn:  '7d' }
      );

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
    } catch (error) {
      console.error('❌ Login Fehler:', error);
      throw error;
    }
  }

  // Token verifizieren
  verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        email: string;
        role: string;
      };
    } catch {
      throw new Error('Ungültiger Token');
    }
  }
}

export default new AuthService();