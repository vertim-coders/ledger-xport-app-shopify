export interface ShopifyRefund {
  id: string;
  order_id: string;
  order_name: string;
  created_at: string;
  note?: string;
  refund_line_items: Array<{
    id: string;
    quantity: number;
    restock_type: string;
    subtotal: string;
    total_tax: string;
    currency: string;
    line_item: {
      id: string;
      name: string;
      title: string;
      quantity: number;
      sku?: string;
      taxable: boolean;
      tax_lines: Array<{
        rate: number;
        title: string;
      }>;
      variant?: {
        id: string;
        legacy_resource_id: string;
        sku?: string;
        title?: string;
        price?: string;
      };
      product?: {
        id: string;
        legacy_resource_id: string;
        product_type?: string;
      };
    };
  }>;
  transactions: Array<{
    id: string;
    amount: string;
    currency: string;
    kind: string;
    status: string;
    gateway?: string;
    processed_at: string;
  }>;
} 