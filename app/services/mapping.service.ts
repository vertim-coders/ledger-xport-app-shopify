import type { ShopifyOrder } from "../types/ShopifyOrderType";
import type { ShopifyCustomer } from "../types/ShopifyCustomerType";
import type { ShopifyRefund } from "../types/ShopifyRefundType";
import type { ShopifyTax } from "../types/ShopifyTaxType";
import type { MappedData } from "../types/MappedDataType";
import { ExportFormat } from "@prisma/client";

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

  static mapToGhana(data: ShopifyOrder | ShopifyCustomer | ShopifyRefund | ShopifyTax, dataType: string): MappedData {
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
    } else if (dataType === 'taxes') {
      const tax = data as ShopifyTax;
      const totalTax = parseFloat(tax.total_tax);
      const eLevy = (totalTax * 0.015).toFixed(2);

      return {
        "Date": tax.created_at,
        "Référence": tax.order_name,
        "Description": tax.tax_lines.map(t => t.title).join(", "),
        "Montant HT": "0.00", // Tax amount is already included in the total
        "E-Levy": eLevy,
        "Total TTC": (totalTax + parseFloat(eLevy)).toFixed(2),
        "Mode de paiement": "N/A"
      };
    }
    return {};
  }

  static mapToStandard(data: ShopifyOrder | ShopifyCustomer | ShopifyRefund | ShopifyTax, dataType: string): MappedData {
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
    } else if (dataType === 'taxes') {
      const tax = data as ShopifyTax;
      return {
        "Date": tax.created_at,
        "Référence": tax.order_name,
        "Description": tax.tax_lines.map(t => t.title).join(", "),
        "Montant HT": "0.00", // Tax amount is already included in the total
        "Taxe": tax.total_tax,
        "Total TTC": tax.total_tax,
        "Devise": tax.currency,
        "Compte comptable": "44571" // Default tax account
      };
    }
    return {};
  }

  static mapData(item: ShopifyOrder | ShopifyCustomer | ShopifyRefund | ShopifyTax, fiscalRegime: string, dataType: string): MappedData[] {
    console.log("MappingService.mapData - item:", item, "dataType:", dataType, "fiscalRegime:", fiscalRegime);
    console.trace("Call stack for MappingService.mapData:");

    let processedItem: ShopifyOrder | ShopifyCustomer | ShopifyRefund | ShopifyTax;

    if (dataType === 'ventes') {
      processedItem = item as ShopifyOrder;
    } else if (dataType === 'clients') {
      processedItem = item as ShopifyCustomer;
    } else if (dataType === 'remboursements') {
      processedItem = item as ShopifyRefund;
    } else if (dataType === 'taxes') {
      processedItem = item as unknown as ShopifyTax;
    } else {
      return [];
    }

    // Defensive check: If processedItem somehow turns out to be an array, handle it
    if (Array.isArray(processedItem)) {
      if (processedItem.length > 0) {
        processedItem = processedItem[0];
      } else {
        return [];
      }
    }

    let mapped: MappedData | MappedData[] = [];
    switch (fiscalRegime) {
      case "OHADA":
        if (dataType === 'ventes') {
          mapped = this.mapToOHADA(processedItem as ShopifyOrder);
        }
        break;
      case "FRANCE":
        if (dataType === 'ventes') {
          mapped = this.mapToFEC(processedItem as ShopifyOrder);
        }
        break;
      case "CANADA":
        if (dataType === 'ventes') {
          mapped = this.mapToCanada(processedItem as ShopifyOrder);
        }
        break;
      case "USA":
        if (dataType === 'ventes') {
          mapped = this.mapToUSA(processedItem as ShopifyOrder);
        }
        break;
      case "BELUX":
        if (dataType === 'ventes') {
          mapped = this.mapToBELUX(processedItem as ShopifyOrder);
        }
        break;
      case "GHANA":
        if (dataType === 'ventes') {
          mapped = this.mapToGhana(processedItem as ShopifyOrder, dataType);
        } else if (dataType === 'clients') {
          mapped = this.mapToGhana(processedItem as ShopifyCustomer, dataType);
        } else if (dataType === 'remboursements') {
          mapped = this.mapToGhana(processedItem as ShopifyRefund, dataType);
        } else if (dataType === 'taxes') {
          mapped = this.mapToGhana(processedItem as unknown as ShopifyTax, dataType);
        }
        break;
      default:
        // No-op, will fallback below
        break;
    }
    if (!mapped || (Array.isArray(mapped) && mapped.length === 0)) {
      mapped = this.mapToStandard(processedItem, dataType);
    }
    // Always return an array
    return Array.isArray(mapped) ? mapped : [mapped];
  }
} 