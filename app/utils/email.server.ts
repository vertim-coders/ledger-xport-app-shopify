import nodemailer from 'nodemailer';

interface EmailConfig {
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string[];
  subject: string;
  text: string;
  html?: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
  }[];
}

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
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
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 