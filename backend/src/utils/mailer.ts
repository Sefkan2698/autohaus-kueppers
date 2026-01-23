import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // true für Port 465, false für andere Ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendContactEmail = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
  vehicleId?: string;
}) => {
  console.log('📧 Versuche E-Mail zu senden...');
  console.log('MAIL_HOST:', process.env.MAIL_HOST);
  console.log('MAIL_FROM:', process.env.MAIL_FROM);
  console.log('MAIL_TO:', process.env.MAIL_TO);

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: data.subject || 'Neue Kontaktanfrage',
    html: `
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>E-Mail:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ''}
      ${data.vehicleId ? `<p><strong>Fahrzeug-ID:</strong> ${data.vehicleId}</p>` : ''}
      <p><strong>Nachricht:</strong></p>
      <p>${data.message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ E-Mail erfolgreich gesendet:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ E-Mail Fehler:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string, name: string, resetUrl: string) => {
  console.log('📧 Sende Passwort-Reset E-Mail an:', email);

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'Passwort zurücksetzen - Autohaus Küppers',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Passwort zurücksetzen</h2>
        <p>Hallo ${name},</p>
        <p>Sie haben angefordert, Ihr Passwort zurückzusetzen. Klicken Sie auf den folgenden Button, um ein neues Passwort zu erstellen:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Passwort zurücksetzen
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">Dieser Link ist 1 Stunde gültig.</p>
        <p style="color: #666; font-size: 14px;">Falls Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail einfach.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 12px;">Autohaus Küppers</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Passwort-Reset E-Mail gesendet:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Passwort-Reset E-Mail Fehler:', error);
    throw error;
  }
};

export default transporter;