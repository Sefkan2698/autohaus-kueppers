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

// Subjects that go to MAIL_TO (info@); everything else goes to MAIL_TO_2
const MAIL_TO_SUBJECTS = ['Service', 'Sonstiges'];

function resolveContactRecipient(subject?: string): string {
  const s = (subject || '').trim();
  const useMailTo = MAIL_TO_SUBJECTS.some((allowed) =>
    s.toLowerCase().includes(allowed.toLowerCase())
  );
  return useMailTo
    ? (process.env.MAIL_TO as string)
    : (process.env.MAIL_TO_2 as string);
}

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

  const recipient = resolveContactRecipient(data.subject);
  console.log('MAIL_TO (resolved):', recipient);

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: recipient,
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

export const sendApplicationEmail = async (
  data: {
    anrede: string;
    vorname: string;
    nachname: string;
    wohnort: string;
    telefon: string;
    email: string;
    geburtsdatum?: string;
    stelle: string;
    berufserfahrung?: string;
    sprachkenntnisse?: string;
    fuehrerschein?: string;
    inAnstellung?: string;
    eintrittsdatum?: string;
    motivation?: string;
  },
  attachments: { filename: string; content: Buffer }[]
) => {
  console.log('📧 Sende Bewerbung...');

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: `Neue Bewerbung: ${data.stelle} – ${data.vorname} ${data.nachname}`,
    html: `
      <h2>Neue Bewerbung über das Online-Bewerbungsformular</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:6px 12px;font-weight:bold;width:200px">Anrede</td><td style="padding:6px 12px">${data.anrede}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">Vorname</td><td style="padding:6px 12px">${data.vorname}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold">Nachname</td><td style="padding:6px 12px">${data.nachname}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">Wohnort</td><td style="padding:6px 12px">${data.wohnort}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold">Telefon</td><td style="padding:6px 12px">${data.telefon}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">E-Mail</td><td style="padding:6px 12px">${data.email}</td></tr>
        ${data.geburtsdatum ? `<tr><td style="padding:6px 12px;font-weight:bold">Geburtsdatum</td><td style="padding:6px 12px">${data.geburtsdatum}</td></tr>` : ''}
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">Bewerbung für</td><td style="padding:6px 12px"><strong>${data.stelle}</strong></td></tr>
        ${data.berufserfahrung ? `<tr><td style="padding:6px 12px;font-weight:bold">Berufserfahrung</td><td style="padding:6px 12px">${data.berufserfahrung}</td></tr>` : ''}
        ${data.sprachkenntnisse ? `<tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">Sprachkenntnisse</td><td style="padding:6px 12px">${data.sprachkenntnisse}</td></tr>` : ''}
        ${data.fuehrerschein ? `<tr><td style="padding:6px 12px;font-weight:bold">Führerschein Kl. B</td><td style="padding:6px 12px">${data.fuehrerschein}</td></tr>` : ''}
        ${data.inAnstellung ? `<tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">In Anstellung</td><td style="padding:6px 12px">${data.inAnstellung}</td></tr>` : ''}
        ${data.eintrittsdatum ? `<tr><td style="padding:6px 12px;font-weight:bold">Eintrittsdatum</td><td style="padding:6px 12px">${data.eintrittsdatum}</td></tr>` : ''}
      </table>
      ${data.motivation ? `<h3 style="margin-top:24px">Motivationsschreiben</h3><p style="white-space:pre-wrap">${data.motivation}</p>` : ''}
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee">
      <p style="color:#999;font-size:12px">Autohaus Küppers – Online Bewerbungsformular</p>
    `,
    attachments,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Bewerbung erfolgreich gesendet:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Bewerbungs-Mail Fehler:', error);
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