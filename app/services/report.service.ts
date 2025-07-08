import type { ExportFormat as ExportFormatType, Prisma as PrismaType } from "@prisma/client";
import pkg from "@prisma/client";
const { ExportFormat, Prisma, ReportStatus } = pkg;
import { MappingService } from "./mapping.service";
import { XMLBuilder } from "fast-xml-parser";
import * as XLSX from "xlsx";
import { ShopifyCustomerService } from "../models/ShopifyCustomer.service";
import { ShopifyOrderService } from "../models/ShopifyOrder.service";
import { ShopifyRefundService } from "../models/ShopifyRefund.service";
import { ShopifyTaxService } from "../models/ShopifyTax.service";
import { prisma } from "../db.server";
import { join } from "path";
import { promises as fs } from 'fs';

type AdminApiClient = {
  graphql: (query: string, options?: { variables: any }) => Promise<any>;
} | {
  request: (query: string, options?: { variables: any }) => Promise<any>;
};

export class ReportService {
  private admin: AdminApiClient;

  constructor(admin: AdminApiClient) {
    this.admin = admin;
  }

  private static formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  private static generateCSV(data: any[], separator: string = ","): string {
    if (data.length === 0) return "";
    
    const headers = Object.keys(data[0]);
    const rows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains separator or quotes
        if (value === null || value === undefined) return "";
        const stringValue = String(value);
        if (stringValue.includes(separator) || stringValue.includes('"')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(separator)
    );
    
    return [headers.join(separator), ...rows].join("\n");
  }

  private static generateXML(data: any[]): string {
    const builder = new XMLBuilder({
      format: true,
      indentBy: "  ",
      ignoreAttributes: false
    });
    return builder.build({ Report: { entries: data } });
  }

  private static generateXLSX(data: any[]): Buffer {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  }

  private static generateTXT(data: any[], separator: string = "\t"): string {
    if (data.length === 0) return "";
    
    const headers = Object.keys(data[0]);
    const rows = data.map(row => 
      headers.map(header => row[header] || "").join(separator)
    );
    
    return [headers.join(separator), ...rows].join("\n");
  }

  static generateReport(
    dataArray: any[],
    fiscalRegime: string,
    format: ExportFormatType,
    dataType: string,
    separator: string = ","
  ): string | Buffer {
    // Map data to the required format
    const mappedData = dataArray.flatMap(item => {
      console.log(`Processing item for ${dataType} report:`, item);
      const mapped = MappingService.mapData(item, fiscalRegime, dataType);
      return Array.isArray(mapped) ? mapped : [mapped];
    });

    // Format dates in the mapped data
    const formattedData = mappedData.map(entry => {
      const formatted: any = {};
      for (const [key, value] of Object.entries(entry)) {
        if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}/)) {
          formatted[key] = this.formatDate(value);
        } else {
          formatted[key] = value;
        }
      }
      return formatted;
    });

    // Generate report in the requested format
    switch (format) {
      case ExportFormat.CSV:
        return this.generateCSV(formattedData, separator);
      case ExportFormat.XML:
        return this.generateXML(formattedData);
      case ExportFormat.XLSX:
        return this.generateXLSX(formattedData);
      case ExportFormat.TXT:
        return this.generateTXT(formattedData, separator);
      case ExportFormat.JSON:
        return JSON.stringify(formattedData, null, 2);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  async generateAndSaveReport(options: {
    shop: PrismaType.ShopGetPayload<{ include: { fiscalConfig: true } }>,
    dataType: string,
    format: ExportFormatType,
    startDate: string,
    endDate: string,
    fileName: string,
    type: 'manual' | 'scheduled'
  }) {
    const { shop, dataType, format, startDate, endDate, fileName, type } = options;
    const { fiscalConfig } = shop;

    if (!fiscalConfig) {
      throw new Error("Fiscal configuration is missing for this shop.");
    }

    const report = await prisma.report.create({
      data: {
        type: type,
        dataType: dataType,
        status: ReportStatus.PROCESSING,
        format: format,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        shopId: shop.id,
        fileName: fileName,
        fileSize: 0,
      },
    });

    let data: any[] | null = null;
    try {
      switch (dataType) {
        case "ventes":
          data = await ShopifyOrderService.getOrders(this.admin, startDate, endDate);
          break;
        case "clients":
          data = await ShopifyCustomerService.getCustomers(this.admin, startDate, endDate);
          break;
        case "remboursements":
          data = await ShopifyRefundService.getRefunds(this.admin, startDate, endDate);
          break;
        case "taxes":
          data = await ShopifyTaxService.getTaxes(this.admin, startDate, endDate);
          break;
      }

      if (!data || data.length === 0) {
        return await prisma.report.update({
          where: { id: report.id },
          data: { status: ReportStatus.COMPLETED_WITH_EMPTY_DATA },
        });
      }

      const reportContent = ReportService.generateReport(
        data,
        fiscalConfig.code,
        format,
        dataType,
        fiscalConfig.separator,
      );
      
      const exportDir = join(process.cwd(), "reports");
      await fs.mkdir(exportDir, { recursive: true });
      const filePath = join(exportDir, report.fileName);
      await fs.writeFile(filePath, reportContent);

      return await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.COMPLETED,
          filePath: filePath,
          fileSize: Buffer.byteLength(reportContent),
        },
      });

    } catch (error: any) {
      console.error(`Error processing report ID ${report.id} for ${dataType}:`, error);
      return await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.ERROR,
          errorMessage: error.message || String(error),
        },
      });
    }
  }
} 