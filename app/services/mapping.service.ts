import { ExportFormat } from "@prisma/client";

interface ShopifyOrder {
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

interface ShopifyCustomer {
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
  currency?: string; // from orders.edges[0].node.totalPriceSet.shopMoney.currencyCode
  metafields: Array<{
    key: string;
    value: string;
    namespace: string;
  }>;
}

interface ShopifyRefund {
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

interface MappedData {
  [key: string]: string | number | null;
}

export class MappingService {
  private static generateEntryNumber(orderId: string, index: number): string {
    return `${orderId}-${index.toString().padStart(3, '0')}`;
  }

  private static calculateDebitCredit(subtotal: string, tax: string): { debit: string; credit: string } {
    const total = parseFloat(subtotal) + parseFloat(tax);
    return {
      debit: total.toFixed(2),
      credit: "0.00"
    };
  }

  static mapToOHADA(order: ShopifyOrder): MappedData[] {
    const entries: MappedData[] = [];
    
    // Main entry
    entries.push({
      Date: order.created_at,
      Libellé: "Vente de marchandises",
      "Compte général": "701", // Default sales account
      "Compte auxiliaire": order.customer?.email || order.customer?.id || "",
      Débit: "0.00",
      Crédit: order.subtotal_price,
      "Référence de pièce": order.name,
      Journal: "VENTES",
      "Numéro d'écriture": this.generateEntryNumber(order.id, 1)
    });

    // Tax entry if applicable
    if (parseFloat(order.total_tax) > 0) {
      entries.push({
        Date: order.created_at,
        Libellé: "TVA collectée",
        "Compte général": "44571", // Default VAT account
        "Compte auxiliaire": order.customer?.email || order.customer?.id || "",
        Débit: "0.00",
        Crédit: order.total_tax,
        "Référence de pièce": order.name,
        Journal: "VENTES",
        "Numéro d'écriture": this.generateEntryNumber(order.id, 2)
      });
    }

    return entries;
  }

  static mapToFEC(order: ShopifyOrder): MappedData[] {
    const entries: MappedData[] = [];
    const { debit, credit } = this.calculateDebitCredit(order.subtotal_price, order.total_tax);

    entries.push({
      JournalCode: "VENTES",
      JournalLib: "Journal des ventes",
      EcritureNum: order.id,
      EcritureDate: order.created_at,
      CompteNum: "701", // Default sales account
      CompteLib: "Ventes de marchandises",
      CompAuxNum: order.customer?.id || "",
      CompAuxLib: `${order.customer?.first_name || ""} ${order.customer?.last_name || ""}`.trim(),
      PieceRef: order.name,
      PieceDate: order.created_at,
      EcritureLib: "Vente de marchandises",
      Debit: debit,
      Credit: credit,
      EcritureLet: "", // Generated automatically
      DateLet: "", // Generated automatically
      ValidDate: order.closed_at || order.created_at,
      Montantdevise: order.total_price,
      Idevise: order.currency
    });

    return entries;
  }

  static mapToCanada(order: ShopifyOrder): MappedData {
    const gst = order.tax_lines.find(tax => tax.title.toLowerCase().includes('gst'))?.price || "0.00";
    const pst = order.tax_lines.find(tax => tax.title.toLowerCase().includes('pst') || tax.title.toLowerCase().includes('qst'))?.price || "0.00";

    return {
      "Numéro de facture": order.name,
      "Date": order.created_at,
      "Nom du client": `${order.customer?.first_name || ""} ${order.customer?.last_name || ""}`.trim(),
      "Province": order.shipping_address?.province_code || "",
      "Sous-total HT": order.subtotal_price,
      "TPS (GST)": gst,
      "TVQ / PST": pst,
      "Total TTC": order.total_price
    };
  }

  static mapToUSA(order: ShopifyOrder): MappedData {
    return {
      "Date de vente": order.created_at,
      "N° de commande": order.name,
      "Montant HT": order.subtotal_price,
      "Montant de taxe": order.total_tax,
      "État / Comté": `${order.shipping_address?.province || ""} / ${order.shipping_address?.city || ""}`,
      "Code postal": order.shipping_address?.zip || "",
      "Type de produit": order.line_items[0]?.product_type || "",
      "Exonération fiscale": order.customer?.tax_exempt ? "Oui" : "Non"
    };
  }

  static mapToBELUX(order: ShopifyOrder): MappedData {
    return {
      "N° TVA client": order.customer?.vat_number || "",
      "Pays": order.shipping_address?.country_code || "",
      "Montant HT": order.subtotal_price,
      "TVA facturée": order.total_tax,
      "Type de transaction": "B2C", // Default, can be customized based on tags/metafields
      "Intrastat code": "", // To be defined per product
      "Poids": order.line_items.reduce((sum, item) => sum + (item.grams || 0), 0).toString(),
      "Destination": order.shipping_address?.country || ""
    };
  }

  static mapToGhana(data: ShopifyOrder | ShopifyCustomer | ShopifyRefund, dataType: string): MappedData {
    if (dataType === 'ventes') {
      const order = data as ShopifyOrder;
      const total = parseFloat(order.total_price);
      const eLevy = (total * 0.015).toFixed(2);

      return {
        "Date": order.created_at,
        "Référence": order.name,
        "Description": order.line_items && Array.isArray(order.line_items) ? order.line_items.map(item => item.title).join(", ") : "",
        "Montant HT": order.subtotal_price,
        "E-Levy": eLevy,
        "Total TTC": (total + parseFloat(eLevy)).toFixed(2),
        "Mode de paiement": order.gateway || ""
      };
    } else if (dataType === 'clients') {
      const customer = data as ShopifyCustomer;
      return {
        "Date": customer.createdAt,
        "Référence": customer.id,
        "Description": `${customer.firstName || ''} ${customer.lastName || ''}`.trim(),
        "Montant HT": "0.00", // Clients don't have a direct HT amount in this context
        "E-Levy": "0.00",
        "Total TTC": "0.00",
        "Mode de paiement": "N/A"
      };
    } else if (dataType === 'remboursements') {
      const refund = data as ShopifyRefund;
      const totalRefundAmount = refund.transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
      const eLevyOnRefund = (totalRefundAmount * 0.015).toFixed(2); // Assuming E-Levy applies to refunds as well

      return {
        "Date": refund.created_at,
        "Référence": refund.order_name,
        "Description": refund.refund_line_items && Array.isArray(refund.refund_line_items) ? refund.refund_line_items.map(item => item.line_item.title).join(", ") : refund.note || "",
        "Montant HT": totalRefundAmount.toFixed(2),
        "E-Levy": eLevyOnRefund,
        "Total TTC": (totalRefundAmount + parseFloat(eLevyOnRefund)).toFixed(2),
        "Mode de paiement": refund.transactions[0]?.gateway || ""
      };
    }
    return {}; // Should not reach here
  }

  static mapToStandard(data: ShopifyOrder | ShopifyCustomer | ShopifyRefund, dataType: string): MappedData {
    if (dataType === 'ventes') {
      const order = data as ShopifyOrder;
      return {
        "Date": order.created_at,
        "Référence": order.name,
        "Description": order.line_items && Array.isArray(order.line_items) ? order.line_items.map(item => item.title).join(", ") : "",
        "Montant HT": order.subtotal_price,
        "Taxe": order.total_tax,
        "Total TTC": order.total_price,
        "Mode de paiement": order.gateway || "",
        "Compte comptable": "701" // Default sales account
      };
    } else if (dataType === 'clients') {
      const customer = data as ShopifyCustomer;
      return {
        "Date": customer.createdAt,
        "Référence": customer.id,
        "Description": `${customer.firstName || ''} ${customer.lastName || ''}`.trim(),
        "Email": customer.email || "",
        "Téléphone": customer.phone || "",
        "Adresse": `${customer.default_address?.address1 || ''}, ${customer.default_address?.city || ''}, ${customer.default_address?.country || ''}`.trim(),
        "Tags": customer.tags && Array.isArray(customer.tags) ? customer.tags.join(", ") : "",
        "Exonéré de taxe": customer.taxExempt ? "Oui" : "Non"
      };
    } else if (dataType === 'remboursements') {
      const refund = data as ShopifyRefund;
      const totalRefundAmount = refund.transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
      return {
        "Date": refund.created_at,
        "Référence": refund.order_name,
        "Description": refund.note || refund.refund_line_items?.map(item => item.line_item.title).join(", ") || "",
        "Montant remboursé": totalRefundAmount.toFixed(2),
        "Devise": refund.transactions[0]?.currency || "",
        "Type de transaction": refund.transactions[0]?.kind || "",
        "Passerelle de paiement": refund.transactions[0]?.gateway || ""
      };
    }
    return {};
  }

  static mapData(item: ShopifyOrder | ShopifyCustomer | ShopifyRefund, fiscalRegime: string, dataType: string): MappedData | MappedData[] {
    console.log("MappingService.mapData - item:", item, "dataType:", dataType, "fiscalRegime:", fiscalRegime);
    console.trace("Call stack for MappingService.mapData:");

    let processedItem: ShopifyOrder | ShopifyCustomer | ShopifyRefund;

    if (dataType === 'ventes') {
      processedItem = item as ShopifyOrder;
    } else if (dataType === 'clients') {
      processedItem = item as ShopifyCustomer;
    } else if (dataType === 'remboursements') {
      processedItem = item as ShopifyRefund;
    } else {
      // Fallback if dataType is unexpected, though it should be covered by outer logic
      console.error("MappingService.mapData received an unexpected dataType:", dataType);
      return {};
    }

    console.log("Debug: processedItem after type assertion:", processedItem); // Dummy log to force recompile

    // Defensive check: If processedItem somehow turns out to be an array, handle it
    if (Array.isArray(processedItem)) {
      console.error("MappingService.mapData received an array when a single item was expected. Processing only the first element.", processedItem);
      if (processedItem.length > 0) {
        processedItem = processedItem[0]; // Take the first element if an array is passed
      } else {
        return {}; // Return empty if an empty array is passed
      }
    }

    switch (fiscalRegime) {
      case "OHADA":
        if (dataType === 'ventes') {
          return this.mapToOHADA(processedItem as ShopifyOrder);
        }
        break;
      case "FRANCE":
        if (dataType === 'ventes') {
          return this.mapToFEC(processedItem as ShopifyOrder);
        }
        break;
      case "CANADA":
        if (dataType === 'ventes') {
          return this.mapToCanada(processedItem as ShopifyOrder);
        }
        break;
      case "USA":
        if (dataType === 'ventes') {
          return this.mapToUSA(processedItem as ShopifyOrder);
        }
        break;
      case "BELUX":
        if (dataType === 'ventes') {
          return this.mapToBELUX(processedItem as ShopifyOrder);
        }
        break;
      case "GHANA":
        if (dataType === 'ventes') {
          return this.mapToGhana(processedItem as ShopifyOrder, dataType);
        } else if (dataType === 'clients') {
          return this.mapToGhana(processedItem as ShopifyCustomer, dataType);
        } else if (dataType === 'remboursements') {
          return this.mapToGhana(processedItem as ShopifyRefund, dataType);
        }
        break;
      default:
        if (dataType === 'ventes') {
          return this.mapToStandard(processedItem as ShopifyOrder, dataType);
        } else if (dataType === 'clients') {
          return this.mapToStandard(processedItem as ShopifyCustomer, dataType);
        } else if (dataType === 'remboursements') {
          return this.mapToStandard(processedItem as ShopifyRefund, dataType);
        }
        break;
    }
    return {}; // Return empty for unsupported data types/fiscal regime combinations
  }
} 