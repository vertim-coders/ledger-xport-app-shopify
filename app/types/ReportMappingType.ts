import type { ColumnMapping } from './ColumnMappingType';

export interface ReportMapping {
  dataType: string;
  columns: ColumnMapping[];
  journalCode: string;
  defaultAccount: string;
} 