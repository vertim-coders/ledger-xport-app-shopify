import type { Prisma as PrismaType } from "@prisma/client";
import pkg from "@prisma/client";
const { ExportFormat } = pkg;
import * as XLSX from "xlsx";
import { prisma } from "../db.server";

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
    customers: {
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

interface CustomerExportParams {
  dateFrom?: string;
  dateTo?: string;
  searchTerm: string;
  columns: string[];
  format: 'CSV' | 'XLSX' | 'JSON';
  columnOrder: string[];
  shopId: string;
}

interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: string;
  totalSpent: number;
  ordersCount: number;
  lastOrder?: string;
  tags: string[];
  defaultAddress?: {
    address1: string;
    city: string;
    province: string;
    country: string;
    zip: string;
  };
  note?: string;
  taxExempt: boolean;
}

export class CustomerService {
  private admin: AdminApiClient;

  constructor(admin: AdminApiClient) {
    this.admin = admin;
  }

  private async fetchCustomers(params: CustomerExportParams): Promise<CustomerData[]> {
    const { dateFrom, dateTo, searchTerm } = params;
    
    // Construction de la requête GraphQL optimisée pour récupérer les clients
    const query = `
      query getCustomers($first: Int!, $after: String, $query: String) {
        customers(first: $first, after: $after, query: $query) {
          edges {
            node {
              id
              firstName
              lastName
              email
              phone
              createdAt
              note
              taxExempt
              tags
              defaultAddress {
                address1
                address2
                city
                province
                country
                zip
              }
              # Récupérer toutes les commandes pour calculer ordersCount et totalSpent
              orders(first: 250, sortKey: CREATED_AT, reverse: true) {
                edges {
                  node {
                    id
                    createdAt
                    totalPriceSet {
                      shopMoney {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    let allCustomers: any[] = [];
    let hasNextPage = true;
    let cursor = null;

    // Construire la requête de filtrage optimisée
    let filterQuery = '';
    const filters: string[] = [];

    // Filtres de date d'inscription
    if (dateFrom && dateTo) {
      filters.push(`created_at:>='${dateFrom}' AND created_at:<='${dateTo}'`);
    } else if (dateFrom) {
      filters.push(`created_at:>='${dateFrom}'`);
    } else if (dateTo) {
      filters.push(`created_at:<='${dateTo}'`);
    }

    // Recherche par nom ou email
    if (searchTerm) {
      filters.push(`(first_name:*${searchTerm}* OR last_name:*${searchTerm}* OR email:*${searchTerm}*)`);
    }

    if (filters.length > 0) {
      filterQuery = filters.join(' AND ');
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
        
        if (data.errors) {
          console.error('GraphQL errors:', data.errors);
          throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
        }
        
        if (!data || !data.data) {
          console.error('Invalid response structure:', data);
          throw new Error('Invalid response from Shopify GraphQL API');
        }
        
        const customers = data.data.customers;
        
        if (!customers) {
          console.error('No customers in response:', data.data);
          throw new Error('No customers data in response');
        }

        allCustomers = allCustomers.concat(customers.edges.map((edge: any) => edge.node));
        hasNextPage = customers.pageInfo.hasNextPage;
        cursor = customers.pageInfo.endCursor;
      } catch (error) {
        console.error('GraphQL query error:', error);
        throw error;
      }
    }

    // Transformer les données en format CustomerData optimisé
    return allCustomers.map(customer => {
      // Calculer ordersCount et totalSpent à partir des commandes
      const orders = customer.orders?.edges || [];
      const ordersCount = orders.length;
      
      // Calculer le total dépensé
      let totalSpent = 0;
      orders.forEach((edge: any) => {
        totalSpent += parseFloat(edge.node.totalPriceSet.shopMoney.amount);
      });
      
      // Récupérer la dernière commande (la plus récente)
      const lastOrder = orders.length > 0 ? orders[0].node.createdAt : null;

      return {
        id: customer.id,
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phone: customer.phone || '',
        createdAt: customer.createdAt,
        totalSpent,
        ordersCount,
        lastOrder,
        tags: customer.tags || [],
        defaultAddress: customer.defaultAddress ? {
          address1: customer.defaultAddress.address1 || '',
          city: customer.defaultAddress.city || '',
          province: customer.defaultAddress.province || '',
          country: customer.defaultAddress.country || '',
          zip: customer.defaultAddress.zip || ''
        } : undefined,
        note: customer.note || '',
        taxExempt: customer.taxExempt || false
      };
    });
  }

  private generateCSV(customers: CustomerData[], columns: string[], columnOrder: string[]): string {
    if (customers.length === 0) return "";
    
    // Utiliser l'ordre des colonnes spécifié
    const orderedColumns = columnOrder.filter(col => columns.includes(col));
    
    const headers = orderedColumns.map(col => {
      const columnMap: { [key: string]: string } = {
        'firstName': 'Prénom',
        'lastName': 'Nom',
        'email': 'Email',
        'phone': 'Téléphone',
        'createdAt': 'Date d\'inscription',
        'totalSpent': 'Total dépensé',
        'ordersCount': 'Nombre de commandes',
        'lastOrder': 'Dernière commande',
        'tags': 'Tags',
        'defaultAddress': 'Adresse',
        'id': 'ID client',
        'note': 'Note',
        'taxExempt': 'Exemption de taxe'
      };
      return columnMap[col] || col;
    });
    
    const rows = customers.map(customer => 
      orderedColumns.map(col => {
        switch (col) {
          case 'firstName':
            return customer.firstName;
          case 'lastName':
            return customer.lastName;
          case 'email':
            return customer.email;
          case 'phone':
            return customer.phone || '';
          case 'createdAt':
            return new Date(customer.createdAt).toLocaleDateString('fr-FR');
          case 'totalSpent':
            return customer.totalSpent.toFixed(2);
          case 'ordersCount':
            return customer.ordersCount.toString();
          case 'lastOrder':
            return customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString('fr-FR') : '';
          case 'tags':
            return customer.tags.join(', ');
          case 'defaultAddress':
            if (customer.defaultAddress) {
              return `${customer.defaultAddress.address1}, ${customer.defaultAddress.city}, ${customer.defaultAddress.province}, ${customer.defaultAddress.country} ${customer.defaultAddress.zip}`;
            }
            return '';
          case 'id':
            return customer.id;
          case 'note':
            return customer.note || '';
          case 'taxExempt':
            return customer.taxExempt ? 'Oui' : 'Non';
          default:
            return '';
        }
      })
    );
    
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }

  private generateXLSX(customers: CustomerData[], columns: string[], columnOrder: string[]): Buffer {
    if (customers.length === 0) return Buffer.from('');
    
    // Utiliser l'ordre des colonnes spécifié
    const orderedColumns = columnOrder.filter(col => columns.includes(col));
    
    const headers = orderedColumns.map(col => {
      const columnMap: { [key: string]: string } = {
        'firstName': 'Prénom',
        'lastName': 'Nom',
        'email': 'Email',
        'phone': 'Téléphone',
        'createdAt': 'Date d\'inscription',
        'totalSpent': 'Total dépensé',
        'ordersCount': 'Nombre de commandes',
        'lastOrder': 'Dernière commande',
        'tags': 'Tags',
        'defaultAddress': 'Adresse',
        'id': 'ID client',
        'note': 'Note',
        'taxExempt': 'Exemption de taxe'
      };
      return columnMap[col] || col;
    });
    
    const rows = customers.map(customer => 
      orderedColumns.map(col => {
        switch (col) {
          case 'firstName':
            return customer.firstName;
          case 'lastName':
            return customer.lastName;
          case 'email':
            return customer.email;
          case 'phone':
            return customer.phone || '';
          case 'createdAt':
            return new Date(customer.createdAt);
          case 'totalSpent':
            return customer.totalSpent;
          case 'ordersCount':
            return customer.ordersCount;
          case 'lastOrder':
            return customer.lastOrder ? new Date(customer.lastOrder) : '';
          case 'tags':
            return customer.tags.join(', ');
          case 'defaultAddress':
            if (customer.defaultAddress) {
              return `${customer.defaultAddress.address1}, ${customer.defaultAddress.city}, ${customer.defaultAddress.province}, ${customer.defaultAddress.country} ${customer.defaultAddress.zip}`;
            }
            return '';
          case 'id':
            return customer.id;
          case 'note':
            return customer.note || '';
          case 'taxExempt':
            return customer.taxExempt ? 'Oui' : 'Non';
          default:
            return '';
        }
      })
    );
    
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');
    
    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }

  private generateJSON(customers: CustomerData[], columns: string[], columnOrder: string[]): string {
    if (customers.length === 0) return "[]";
    
    // Utiliser l'ordre des colonnes spécifié
    const orderedColumns = columnOrder.filter(col => columns.includes(col));
    
    const data = customers.map(customer => {
      const customerData: any = {};
      
      orderedColumns.forEach(col => {
        switch (col) {
          case 'firstName':
            customerData[col] = customer.firstName;
            break;
          case 'lastName':
            customerData[col] = customer.lastName;
            break;
          case 'email':
            customerData[col] = customer.email;
            break;
          case 'phone':
            customerData[col] = customer.phone || '';
            break;
          case 'createdAt':
            customerData[col] = customer.createdAt;
            break;
          case 'totalSpent':
            customerData[col] = customer.totalSpent;
            break;
          case 'ordersCount':
            customerData[col] = customer.ordersCount;
            break;
          case 'lastOrder':
            customerData[col] = customer.lastOrder || '';
            break;
          case 'tags':
            customerData[col] = customer.tags;
            break;
          case 'defaultAddress':
            customerData[col] = customer.defaultAddress || null;
            break;
          case 'id':
            customerData[col] = customer.id;
            break;
          case 'note':
            customerData[col] = customer.note || '';
            break;
          case 'taxExempt':
            customerData[col] = customer.taxExempt;
            break;
        }
      });
      
      return customerData;
    });
    
    return JSON.stringify(data, null, 2);
  }

  async exportCustomers(params: CustomerExportParams): Promise<{ data: string | Buffer; filename: string; contentType: string }> {
    try {
      // Récupérer les clients
      const customers = await this.fetchCustomers(params);
      
      if (customers.length === 0) {
        let errorMessage = 'Aucun client trouvé avec les critères spécifiés';
        
        if (params.searchTerm && params.searchTerm.trim()) {
          errorMessage = `Aucun client trouvé pour la recherche "${params.searchTerm}"`;
        } else if (params.dateFrom || params.dateTo) {
          const dateRange = [];
          if (params.dateFrom) dateRange.push(`à partir du ${new Date(params.dateFrom).toLocaleDateString('fr-FR')}`);
          if (params.dateTo) dateRange.push(`jusqu'au ${new Date(params.dateTo).toLocaleDateString('fr-FR')}`);
          errorMessage = `Aucun client trouvé ${dateRange.join(' et ')}`;
        }
        
        throw new Error(errorMessage);
      }

      let data: string | Buffer;
      let filename: string;
      let contentType: string;

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const baseFilename = `customers-export-${timestamp}`;

      switch (params.format) {
        case 'CSV':
          data = this.generateCSV(customers, params.columns, params.columnOrder);
          filename = `${baseFilename}.csv`;
          contentType = 'text/csv';
          break;

        case 'XLSX':
          data = this.generateXLSX(customers, params.columns, params.columnOrder);
          filename = `${baseFilename}.xlsx`;
          contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;

        case 'JSON':
          data = this.generateJSON(customers, params.columns, params.columnOrder);
          filename = `${baseFilename}.json`;
          contentType = 'application/json';
          break;

        default:
          throw new Error(`Format non supporté: ${params.format}`);
      }

      return { data, filename, contentType };
    } catch (error) {
      console.error('Erreur lors de l\'export des clients:', error);
      throw error;
    }
  }
} 