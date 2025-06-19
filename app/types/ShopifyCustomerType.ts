export interface ShopifyCustomer {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  createdAt: string;
  tags: string[];
  taxExempt: boolean;
  taxExemptions: string[];
  default_address?: {
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    zip?: string;
    country?: string;
    countryCodeV2?: string;
  };
  currency?: string;
  metafields: Array<{
    key: string;
    value: string;
    namespace: string;
  }>;
} 