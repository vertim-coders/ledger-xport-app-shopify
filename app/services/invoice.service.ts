import type { Prisma as PrismaType } from "@prisma/client";
import pkg from "@prisma/client";
const { ExportFormat } = pkg;
import { XMLBuilder } from "fast-xml-parser";
import * as XLSX from "xlsx";
import { prisma } from "../db.server";
import { join } from "path";
import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Import des templates
import Template1 from '../components/Invoices_Templates/Template1';
import Template2 from '../components/Invoices_Templates/Template2';
import Template3 from '../components/Invoices_Templates/Template3';
import Template4 from '../components/Invoices_Templates/Template4';
import Template5 from '../components/Invoices_Templates/Template5';
import Template6 from '../components/Invoices_Templates/Template6';
import Template7 from '../components/Invoices_Templates/Template7';
import Template8 from '../components/Invoices_Templates/Template8';
import Template9 from '../components/Invoices_Templates/Template9';

type AdminApiClient = {
  graphql: (query: string, options?: { variables: any }) => Promise<Response>;
};

interface GraphQLVariables {
  first: number;
  after: string | null;
  query: string;
}

interface GraphQLResponse {
  data: {
    orders: {
      edges: Array<{
        node: any;
      }>;
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
  errors?: any[];
}

interface InvoiceExportParams {
  dateFrom: string;
  dateTo: string;
  status: string;
  client: string;
  format: 'PDF' | 'XML' | 'CSV';
  template: number;
  shopId: string; // Ajout du shopId pour récupérer les paramètres de personnalisation
}

interface InvoiceData {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: {
      address1: string;
      city: string;
      province: string;
      country: string;
      zip: string;
    };
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  taxAmount: number;
  total: number;
  currency: string;
  status: string;
  paymentStatus: string;
}

export class InvoiceService {
  private admin: AdminApiClient;

  constructor(admin: AdminApiClient) {
    this.admin = admin;
  }

  private async getInvoiceCustomization(shopId: string) {
    const generalSettings = await prisma.generalSettings.findUnique({
      where: { shopId }
    }) as any; // Utiliser any temporairement pour éviter les erreurs de type

    let logoUrl = generalSettings?.invoiceLogoUrl || null;
    
    // Si l'URL du logo est relative (commence par /uploads/), la convertir en base64
    if (logoUrl && logoUrl.startsWith('/uploads/')) {
      try {
        const logoPath = join(process.cwd(), 'public', logoUrl);
        const logoBuffer = await fs.readFile(logoPath);
        const base64Logo = logoBuffer.toString('base64');
        const fileExtension = logoUrl.split('.').pop() || 'png';
        logoUrl = `data:image/${fileExtension};base64,${base64Logo}`;
      } catch (error) {
        console.error('Error converting logo to base64:', error);
        logoUrl = null;
      }
    }

    return {
      logoUrl: logoUrl,
      logoWidth: 150, // Taille prédéfinie
      logoHeight: 100, // Taille prédéfinie
      companyName: generalSettings?.invoiceCompanyName || 'Votre Entreprise',
      address: generalSettings?.invoiceAddress || 'Adresse de votre entreprise',
      phone: generalSettings?.invoicePhone || 'Téléphone de votre entreprise',
      email: generalSettings?.invoiceEmail || 'contact@votreentreprise.com'
    };
  }

  private async fetchInvoices(params: InvoiceExportParams): Promise<InvoiceData[]> {
    const { dateFrom, dateTo, status, client } = params;
    
    // Construction de la requête GraphQL pour récupérer les commandes
    const query = `
      query getOrders($first: Int!, $after: String, $query: String) {
        orders(first: $first, after: $after, query: $query) {
          edges {
            node {
              id
              name
              createdAt
              totalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              subtotalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              totalTaxSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              customer {
                firstName
                lastName
                email
                phone
                defaultAddress {
                  address1
                  city
                  province
                  country
                  zip
                }
              }
              lineItems(first: 250) {
                edges {
                  node {
                    name
                    quantity
                    originalUnitPriceSet {
                      shopMoney {
                        amount
                        currencyCode
                      }
                    }
                    originalTotalSet {
                      shopMoney {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
              displayFinancialStatus
              displayFulfillmentStatus
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    let allOrders: any[] = [];
    let hasNextPage = true;
    let cursor = null;

    // Construire la requête de filtrage
    let filterQuery = '';
    if (dateFrom && dateTo) {
      filterQuery += `created_at:>='${dateFrom}' AND created_at:<='${dateTo}'`;
    }
    if (status && status !== 'All') {
      if (filterQuery) filterQuery += ' AND ';
      filterQuery += `financial_status:${status.toLowerCase()}`;
    }
    if (client) {
      if (filterQuery) filterQuery += ' AND ';
      filterQuery += `customer_name:*${client}*`;
    }

    while (hasNextPage) {
      const variables: GraphQLVariables = {
        first: 250,
        after: cursor,
        query: filterQuery
      };

      try {
        const response = await this.admin.graphql(query, { variables });
        const data: GraphQLResponse = await response.json();
        
        // Debug: Log the response structure
        console.log('GraphQL Response:', JSON.stringify(data, null, 2));
        
        if (data.errors) {
          console.error('GraphQL errors:', data.errors);
          throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
        }
        
        if (!data || !data.data) {
          console.error('Invalid response structure:', data);
          throw new Error('Invalid response from Shopify GraphQL API');
        }
        
        const orders = data.data.orders;
        
        if (!orders) {
          console.error('No orders in response:', data.data);
          throw new Error('No orders data in response');
        }

        allOrders = allOrders.concat(orders.edges.map((edge: any) => edge.node));
        hasNextPage = orders.pageInfo.hasNextPage;
        cursor = orders.pageInfo.endCursor;
      } catch (error) {
        console.error('GraphQL query error:', error);
        throw error;
      }
    }

    // Transformer les données en format InvoiceData
    return allOrders.map(order => ({
      id: order.id,
      orderNumber: order.name,
      createdAt: order.createdAt,
      customer: {
        firstName: order.customer?.firstName || '',
        lastName: order.customer?.lastName || '',
        email: order.customer?.email || '',
        phone: order.customer?.phone || '',
        address: order.customer?.defaultAddress ? {
          address1: order.customer.defaultAddress.address1 || '',
          city: order.customer.defaultAddress.city || '',
          province: order.customer.defaultAddress.province || '',
          country: order.customer.defaultAddress.country || '',
          zip: order.customer.defaultAddress.zip || ''
        } : undefined
      },
      items: order.lineItems.edges.map((edge: any) => ({
        name: edge.node.name,
        quantity: edge.node.quantity,
        price: parseFloat(edge.node.originalUnitPriceSet.shopMoney.amount),
        total: parseFloat(edge.node.originalTotalSet.shopMoney.amount)
      })),
      subtotal: parseFloat(order.subtotalPriceSet.shopMoney.amount),
      taxAmount: parseFloat(order.totalTaxSet.shopMoney.amount),
      total: parseFloat(order.totalPriceSet.shopMoney.amount),
      currency: order.totalPriceSet.shopMoney.currencyCode,
      status: order.displayFulfillmentStatus,
      paymentStatus: order.displayFinancialStatus
    }));
  }

  private generateCSV(invoices: InvoiceData[]): string {
    if (invoices.length === 0) return "";
    
    const headers = [
      'Order ID', 'Order Number', 'Date', 'Customer Name', 'Customer Email',
      'Subtotal', 'Tax', 'Total', 'Currency', 'Status', 'Payment Status'
    ];
    
    const rows = invoices.map(invoice => [
      invoice.id,
      invoice.orderNumber,
      invoice.createdAt,
      `${invoice.customer.firstName} ${invoice.customer.lastName}`,
      invoice.customer.email,
      invoice.subtotal,
      invoice.taxAmount,
      invoice.total,
      invoice.currency,
      invoice.status,
      invoice.paymentStatus
    ]);
    
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }

  private generateXML(invoices: InvoiceData[]): string {
    const builder = new XMLBuilder({
      format: true,
      indentBy: "  ",
      ignoreAttributes: false
    });
    
    const data = {
      invoices: {
        invoice: invoices.map(invoice => ({
          id: invoice.id,
          orderNumber: invoice.orderNumber,
          date: invoice.createdAt,
          customer: {
            name: `${invoice.customer.firstName} ${invoice.customer.lastName}`,
            email: invoice.customer.email,
            phone: invoice.customer.phone
          },
          subtotal: invoice.subtotal,
          tax: invoice.taxAmount,
          total: invoice.total,
          currency: invoice.currency,
          status: invoice.status,
          paymentStatus: invoice.paymentStatus
        }))
      }
    };
    
    return builder.build(data);
  }

  private async generatePDF(invoices: InvoiceData[], templateNumber: number, shopId: string): Promise<Buffer> {
    // Récupérer les paramètres de personnalisation
    const customization = await this.getInvoiceCustomization(shopId);
    
    // Sélectionner le template approprié
    const templates = {
      1: Template1,
      2: Template2,
      3: Template3,
      4: Template4,
      5: Template5,
      6: Template6,
      7: Template7,
      8: Template8,
      9: Template9
    };

    const TemplateComponent = templates[templateNumber as keyof typeof templates];
    if (!TemplateComponent) {
      throw new Error(`Template ${templateNumber} not found`);
    }

    // Générer le HTML pour chaque facture
    const htmlContents = await Promise.all(invoices.map(async (invoice) => {
      const invoiceData = {
        billTo: {
          name: `${invoice.customer.firstName} ${invoice.customer.lastName}`,
          address: invoice.customer.address ? 
            `${invoice.customer.address.address1}, ${invoice.customer.address.city}, ${invoice.customer.address.province}, ${invoice.customer.address.country} ${invoice.customer.address.zip}` : '',
          phone: invoice.customer.phone || ''
        },
        shipTo: {
          name: `${invoice.customer.firstName} ${invoice.customer.lastName}`,
          address: invoice.customer.address ? 
            `${invoice.customer.address.address1}, ${invoice.customer.address.city}, ${invoice.customer.address.province}, ${invoice.customer.address.country} ${invoice.customer.address.zip}` : '',
          phone: invoice.customer.phone || ''
        },
        invoice: {
          number: invoice.orderNumber,
          date: new Date(invoice.createdAt).toLocaleDateString('fr-FR'),
          paymentDate: new Date(invoice.createdAt).toLocaleDateString('fr-FR')
        },
        yourCompany: {
          name: customization.companyName,
          address: customization.address,
          phone: customization.phone,
          email: customization.email,
          logoUrl: customization.logoUrl,
          logoWidth: customization.logoWidth,
          logoHeight: customization.logoHeight
        },
        items: invoice.items.map(item => ({
          name: item.name,
          description: '',
          quantity: item.quantity,
          amount: item.price,
          total: item.total
        })),
        taxPercentage: invoice.taxAmount > 0 ? Math.round((invoice.taxAmount / invoice.subtotal) * 100 * 100) / 100 : 0,
        taxAmount: invoice.taxAmount,
        subTotal: invoice.subtotal,
        grandTotal: invoice.total,
        notes: '',
        selectedCurrency: invoice.currency
      };

      return ReactDOMServer.renderToString(React.createElement(TemplateComponent, { data: invoiceData }));
    }));

    // Combiner tous les HTML en un seul document
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoices Export</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 2px; 
              background-color: #f5f5f5;
            }
                         .invoice-page { 
               margin-bottom: 5px; 
               background-color: white;
               border-radius: 4px;
               box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
               overflow: hidden;
               width: 100%;
               max-width: 100%;
             }
            /* Styles spécifiques pour les templates - ultra-compacts pour PDF */
            .bg-white { background-color: white; }
            .p-8 { padding: 0.5rem; }
            .p-2 { padding: 0.15rem; }
            .max-w-4xl { max-width: 100%; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .items-center { align-items: center; }
            .mb-8 { margin-bottom: 0.5rem; }
            .mb-12 { margin-bottom: 0.75rem; }
            .mt-8 { margin-top: 0.5rem; }
            .text-right { text-align: right; }
            .text-left { text-align: left; }
            .text-center { text-align: center; }
            .text-3xl { font-size: 1rem; line-height: 1.2rem; }
            .text-2xl { font-size: 0.9rem; line-height: 1.1rem; }
            .text-sm { font-size: 0.6rem; line-height: 0.8rem; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: 700; }
            .w-full { width: 100%; }
            .w-1/3 { width: 25%; }
            .border-t { border-top-width: 1px; }
            .border-b { border-bottom-width: 1px; }
            .border-t-2 { border-top-width: 1px; }
            .border-b-2 { border-bottom-width: 1px; }
            .border-gray-100 { border-color: #f3f4f6; }
            .border-gray-800 { border-color: #1f2937; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .text-gray-500 { color: #6b7280; }
            .rounded-lg { border-radius: 0.2rem; }
            .shadow-lg { box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1); }
            
            /* Optimisations ultra-compactes pour PDF */
            table { 
              width: 100%; 
              border-collapse: collapse; 
              font-size: 0.55rem;
              margin-bottom: 0.25rem;
            }
            th, td { 
              padding: 0.1rem; 
              border: 1px solid #e5e7eb;
              vertical-align: top;
            }
            th { 
              background-color: #f9fafb; 
              font-weight: 600;
              font-size: 0.6rem;
            }
            
            /* Espacements ultra-minimaux */
            h1, h2, h3 { margin: 0.1rem 0; }
            p { margin: 0.05rem 0; }
            div { margin: 0; }
            
            /* Réduction des hauteurs de ligne */
            * { line-height: 1.1; }
            
            /* Optimisation des sections */
            .invoice-header { margin-bottom: 0.3rem; }
            .invoice-company { margin-bottom: 0.3rem; }
            .invoice-addresses { margin-bottom: 0.3rem; }
            .invoice-table { margin-bottom: 0.3rem; }
            .invoice-totals { margin-bottom: 0.3rem; }
            .invoice-notes { margin-bottom: 0.2rem; }
          </style>
        </head>
        <body>
          ${htmlContents.map(html => `<div class="invoice-page">${html}</div>`).join('')}
        </body>
      </html>
    `;

    // Générer le PDF avec Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(fullHtml);
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '2px',
        right: '2px',
        bottom: '2px',
        left: '2px'
      },
      preferCSSPageSize: true
    });

    await browser.close();
    return Buffer.from(pdfBuffer);
  }

  async exportInvoices(params: InvoiceExportParams): Promise<{ data: string | Buffer; filename: string; contentType: string }> {
    try {
      // Récupérer les factures
      const invoices = await this.fetchInvoices(params);
      
      if (invoices.length === 0) {
        // Message d'erreur plus spécifique selon les paramètres
        let errorMessage = 'Aucune facture trouvée avec les critères spécifiés';
        
        // Priorité : d'abord vérifier si un client spécifique a été recherché
        if (params.client && params.client.trim()) {
          errorMessage = `Aucune facture trouvée pour le client "${params.client}"`;
        } else if (params.dateFrom || params.dateTo) {
          // Si pas de client spécifique, vérifier la période
          const dateRange = [];
          if (params.dateFrom) dateRange.push(`à partir du ${new Date(params.dateFrom).toLocaleDateString('fr-FR')}`);
          if (params.dateTo) dateRange.push(`jusqu'au ${new Date(params.dateTo).toLocaleDateString('fr-FR')}`);
          errorMessage = `Aucune facture trouvée ${dateRange.join(' et ')}`;
        }
        
        throw new Error(errorMessage);
      }

      let data: string | Buffer;
      let filename: string;
      let contentType: string;

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const baseFilename = `invoices-export-${timestamp}`;

      switch (params.format) {
        case 'CSV':
          data = this.generateCSV(invoices);
          filename = `${baseFilename}.csv`;
          contentType = 'text/csv';
          break;

        case 'XML':
          data = this.generateXML(invoices);
          filename = `${baseFilename}.xml`;
          contentType = 'application/xml';
          break;

        case 'PDF':
          data = await this.generatePDF(invoices, params.template, params.shopId);
          filename = `${baseFilename}.pdf`;
          contentType = 'application/pdf';
          break;

        default:
          throw new Error(`Format non supporté: ${params.format}`);
      }

      return { data, filename, contentType };
    } catch (error) {
      console.error('Erreur lors de l\'export des factures:', error);
      throw error;
    }
  }
}