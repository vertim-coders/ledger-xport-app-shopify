export interface FiscalRegimeData {
  code: string;
  name: string;
  description: string;
  countries: string[];
  currency: string;
  fileFormat: string;
  encoding: string;
  separator: string;
  requiredColumns: string[];
  taxRates: {
    standard?: number;
    reduced?: number;
    superReduced?: number;
    gst?: number;
    pst?: Record<string, number>;
    eLevy?: number;
    varies?: string;
  };
  compatibleSoftware: string[];
  exportFormats: string[];
  notes: string;
} 