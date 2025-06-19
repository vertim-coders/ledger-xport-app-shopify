export interface ShopifyTax {
  order_id: string;
  order_name: string;
  created_at: string;
  total_tax: string;
  currency: string;
  tax_lines: Array<{
    id: string;
    title: string;
    rate: number;
    amount: string;
    currency: string;
  }>;
  line_items: Array<{
    id: string;
    name: string;
    title: string;
    quantity: number;
    tax_lines: Array<{
      id: string;
      title: string;
      rate: number;
      amount: string;
      currency: string;
    }>;
  }>;
} 