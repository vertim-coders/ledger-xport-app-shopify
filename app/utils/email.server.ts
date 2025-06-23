import nodemailer from 'nodemailer';
import type { EmailConfig } from "../types/EmailConfigType";

// Création du transporteur SMTP à partir des variables d'environnement
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(config: EmailConfig) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: config.to.join(', '),
      cc: config.cc?.join(', '),
      bcc: config.bcc?.join(', '),
      replyTo: config.replyTo?.join(', '),
      subject: config.subject,
      text: config.text,
      html: config.html,
      attachments: config.attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé :', info.messageId);
    return info;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw error;
  }
} 