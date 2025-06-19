import type { ExportFormat } from '@prisma/client';

export type CombinedFiscalRegime = {
  id: string;
  shopId: string;
  code: string;
  name: string;
  description: string;
  countries: string[];
  currency: string;
  fileFormat: string;
  encoding: string;
  separator: string;
  requiredColumns: string[];
  taxRates: any;
  compatibleSoftware: string[];
  notes: string;
  companyName: string | null;
  country: string | null;
  vatRate: number | null;
  salesAccount: string;
  createdAt: Date;
  updatedAt: Date;
  exportFormats: ExportFormat[];
  defaultFormat?: ExportFormat;
}; 