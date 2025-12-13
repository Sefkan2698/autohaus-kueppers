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

export default transporter;