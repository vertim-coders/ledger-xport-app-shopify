export interface EmailConfig {
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