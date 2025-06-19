import type { ExportFormat } from '@prisma/client';

export interface Settings {
  companyName: string;
  country: string;
  currency: string;
  vatRate: number | null;
  defaultFormat: ExportFormat | null;
  timezone: string;
  language: string;
  code: string;
  name: string;
  description: string;
  countries: string[];
  fileFormat: string;
  encoding: string;
  separator: string;
  requiredColumns: string;
  taxRates: string;
  compatibleSoftware: string;
  exportFormats: string;
  notes: string;
  salesAccount?: string;
} 