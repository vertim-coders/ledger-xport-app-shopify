import { ExportFormat } from "@prisma/client";
import { MappingService } from "./mapping.service";
import { XMLBuilder } from "fast-xml-parser";
import * as XLSX from "xlsx";

export class ReportService {
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
    format: ExportFormat,
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
} 