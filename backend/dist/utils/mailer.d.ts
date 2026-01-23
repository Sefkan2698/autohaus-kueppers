import nodemailer from 'nodemailer';
import 'dotenv/config';
declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo, import("nodemailer/lib/smtp-transport/index.js").Options>;
export declare const sendContactEmail: (data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    subject?: string;
    vehicleId?: string;
}) => Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo>;
export declare const sendPasswordResetEmail: (email: string, name: string, resetUrl: string) => Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo>;
export default transporter;
//# sourceMappingURL=mailer.d.ts.map