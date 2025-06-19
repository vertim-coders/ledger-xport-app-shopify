export interface ShopifyOrder {
  id: string;
  name: string;
  created_at: string;
  closed_at?: string;
  subtotal_price: string;
  total_price: string;
  total_tax: string;
  currency: string;
  customer?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    tax_exempt?: boolean;
    vat_number?: string;
  };
  line_items: Array<{
    id: string;
    title: string;
    product_type?: string;
    grams?: number;
  }>;
  shipping_address?: {
    country?: string;
    country_code?: string;
    province?: string;
    province_code?: string;
    city?: string;
    zip?: string;
  };
  tax_lines: Array<{
    title: string;
    rate: number;
    price: string;
  }>;
  gateway?: string;
} 