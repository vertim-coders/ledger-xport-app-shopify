export interface ColumnMapping {
  requiredColumn: string;
  shopifyField: string;
  description: string;
  isRequired: boolean;
  defaultValue?: string;
  validation?: (value: any) => boolean;
} 