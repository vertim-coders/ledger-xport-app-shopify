import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  DatePicker,
  Select,
  TextField,
  Button,
  Text,
  Checkbox,
  LegacyStack,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import fiscalRegimesData from "../data/fiscal-regimes.json";
import { FiscalConfiguration as FiscalRegimePrisma, ReportStatus, ExportFormat } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import * as XLSX from 'xlsx';
import { BiSaveBtn } from "../components/Buttons/BiSaveBtn";
import { ShopifyCustomerService } from "../models/ShopifyCustomer.service";
import { ShopifyOrderService } from "../models/ShopifyOrder.service";
import { ShopifyRefundService } from "../models/ShopifyRefund.service";
import { ShopifyTaxService } from "../models/ShopifyTax.service";
import { MappingService } from "../services/mapping.service";
import { ReportService } from "../services/report.service";

interface DateRange {
  start: Date;
  end: Date;
}

// Define the fiscal regime data type based on the JSON structure
interface FiscalRegimeData {
  code: string;
  name: string;
  description: string;
  countries: string[];
  currency: string;
  fileFormat: string;
  encoding: string;
  separator: string;
  requiredColumns: string[];
  taxRates: {
    standard?: number;
    reduced?: number;
    superReduced?: number;
    gst?: number;
    pst?: Record<string, number>;
    eLevy?: number;
    varies?: string;
  };
  compatibleSoftware: string[];
  exportFormats: string[];
  notes: string;
}

interface FiscalRegimesData {
  regimes: FiscalRegimeData[];
}

// Define a type for the fiscal regime data combined from Prisma and JSON
type CombinedFiscalRegime = {
  id: string;
  shopId: string;
  code: string;
  name: string;
  description: string;
  countries: string[];
  currency: string;
  fileFormat: string; // The fileFormat (from JSON, e.g., ".csv")
  encoding: string;
  separator: string;
  requiredColumns: string[];
  taxRates: any;
  compatibleSoftware: string[];
  notes: string;
  companyName: string | null;
  country: string | null;
  vatRate: number | null;
  salesAccount: string; // Always from Prisma FiscalConfiguration or default
  createdAt: Date;
  updatedAt: Date;
  
  // Transformed properties
  exportFormats: ExportFormat[];
  defaultFormat?: ExportFormat; // Optional, derived from Prisma or JSON's fileFormat
};

// Update the interfaces
interface ColumnMapping {
  requiredColumn: string;
  shopifyField: string;
  description: string;
  isRequired: boolean;
  defaultValue?: string;
  validation?: (value: any) => boolean;
}

interface ReportMapping {
  dataType: string;
  columns: ColumnMapping[];
  journalCode: string;
  defaultAccount: string;
}

// Frontend helper functions for display purposes (mirroring backend logic)
const defaultMappingsFrontend: Record<string, Record<string, string>> = {
  ventes: {
    'Date': 'created_at',
    'Libellé': 'line_items[].title',
    'Compte général': 'salesAccount',
    'Débit': 'debit',
    'Crédit': 'total_price',
    'Numéro d\'écriture': 'entry_number',
    'Journal': 'journal',
    'Compte auxiliaire': 'customer.id',
    'Référence de pièce': 'name'
  },
  clients: {
    'Date': 'createdAt',
    'Libellé': 'default_address.company',
    'Compte général': 'customerAccount',
    'Compte auxiliaire': 'id',
    'Débit': 'balance',
    'Crédit': '0',
    'Numéro d\'écriture': 'entry_number',
    'Journal': 'journal'
  },
  remboursements: {
    'Date': 'created_at',
    'Libellé': 'note',
    'Compte général': 'refundAccount',
    'Débit': 'total_refunded',
    'Crédit': '0',
    'Numéro d\'écriture': 'entry_number',
    'Journal': 'journal'
  },
  taxes: {
    'Date': 'created_at',
    'Libellé': 'tax_lines[].title',
    'Compte général': 'taxAccount',
    'Débit': '0',
    'Crédit': 'total_tax',
    'Numéro d\'écriture': 'entry_number',
    'Journal': 'journal'
  }
};

const columnDescriptionsFrontend: Record<string, string> = {
  'Date': 'Date de la transaction',
  'Libellé': 'Description de l\'opération',
  'Compte général': 'Compte comptable principal',
  'Compte auxiliaire': 'Compte client/fournisseur',
  'Débit': 'Montant au débit',
  'Crédit': 'Montant au crédit',
  'Numéro d\'écriture': 'Numéro unique de l\'écriture',
  'Journal': 'Code du journal comptable',
  'Référence de pièce': 'Référence du document'
};

function generateMappingsFrontend(fiscalRegime: any, dataType: string): ColumnMapping[] {
  const typeMapping = defaultMappingsFrontend[dataType] || {};
  const columns: ColumnMapping[] = fiscalRegime.requiredColumns.map((column: string) => {
    const shopifyField = typeMapping[column] || '';
    return {
      requiredColumn: column,
      shopifyField,
      description: columnDescriptionsFrontend[column] || column,
      isRequired: true,
      // defaultValue and validation are not strictly needed for display, but included for completeness
      defaultValue: '',
      validation: undefined
    };
  });
  return columns;
}

// Function to generate mappings based on fiscal regime
function generateMappings(fiscalRegime: any, dataType: string): ReportMapping {
  // Default field mappings for different data types
  const defaultMappings: Record<string, Record<string, string>> = {
    ventes: {
      'Date': 'created_at',
      'Libellé': 'line_items[].title',
      'Compte général': 'salesAccount',
      'Débit': 'debit',
      'Crédit': 'total_price',
      'Numéro d\'écriture': 'entry_number',
      'Journal': 'journal',
      'Compte auxiliaire': 'customer.id',
      'Référence de pièce': 'name'
    },
    clients: {
      'Date': 'createdAt',
      'Libellé': 'default_address.company',
      'Compte général': 'customerAccount',
      'Compte auxiliaire': 'id',
      'Débit': 'balance',
      'Crédit': '0',
      'Numéro d\'écriture': 'entry_number',
      'Journal': 'journal'
    },
    remboursements: {
      'Date': 'created_at',
      'Libellé': 'note',
      'Compte général': 'refundAccount',
      'Débit': 'total_refunded',
      'Crédit': '0',
      'Numéro d\'écriture': 'entry_number',
      'Journal': 'journal'
    },
    taxes: {
      'Date': 'created_at',
      'Libellé': 'tax_lines[].title',
      'Compte général': 'taxAccount',
      'Débit': '0',
      'Crédit': 'total_tax',
      'Numéro d\'écriture': 'entry_number',
      'Journal': 'journal'
    }
  };

  // Default descriptions for columns
  const columnDescriptions: Record<string, string> = {
    'Date': 'Date de la transaction',
    'Libellé': 'Description de l\'opération',
    'Compte général': 'Compte comptable principal',
    'Compte auxiliaire': 'Compte client/fournisseur',
    'Débit': 'Montant au débit',
    'Crédit': 'Montant au crédit',
    'Numéro d\'écriture': 'Numéro unique de l\'écriture',
    'Journal': 'Code du journal comptable',
    'Référence de pièce': 'Référence du document'
  };

  // Get the default mapping for the data type
  const typeMapping = defaultMappings[dataType] || {};

  // Generate column mappings based on required columns
  const columns: ColumnMapping[] = fiscalRegime.requiredColumns.map((column: string) => {
    const shopifyField = typeMapping[column] || '';
    
    return {
      requiredColumn: column,
      shopifyField,
      description: columnDescriptions[column] || column,
      isRequired: true,
      defaultValue: getDefaultValue(column, dataType, fiscalRegime),
      validation: getValidation(column)
    };
  });

  return {
    dataType,
    columns,
    journalCode: getJournalCode(dataType),
    defaultAccount: getDefaultAccount(dataType, fiscalRegime)
  };
}

// Helper function to get default values
function getDefaultValue(column: string, dataType: string, fiscalRegime: any): string {
  switch (column) {
    case 'Compte général':
      return fiscalRegime.salesAccount || '701000';
    case 'Débit':
      return dataType === 'ventes' ? '0' : '';
    case 'Crédit':
      return dataType === 'ventes' ? '' : '0';
    case 'Journal':
      return getJournalCode(dataType);
    default:
      return '';
  }
}

// Helper function to get validation rules
function getValidation(column: string): ((value: any) => boolean) | undefined {
  switch (column) {
    case 'Date':
      return (value) => !isNaN(Date.parse(value));
    case 'Débit':
    case 'Crédit':
      return (value) => !isNaN(parseFloat(value));
    default:
      return undefined;
  }
}

// Helper function to get journal code
function getJournalCode(dataType: string): string {
  switch (dataType) {
    case 'ventes':
      return 'Ventes';
    case 'clients':
      return 'Clients';
    case 'remboursements':
      return 'Remboursements';
    case 'taxes':
      return 'Taxes';
    default:
      return 'Divers';
  }
}

// Helper function to get default account
function getDefaultAccount(dataType: string, fiscalRegime: any): string {
  switch (dataType) {
    case 'ventes':
      return fiscalRegime.salesAccount || '701000';
    case 'clients':
      return fiscalRegime.customerAccount || '411000';
    case 'remboursements':
      return fiscalRegime.refundAccount || '708000';
    case 'taxes':
      return fiscalRegime.taxAccount || '445000';
    default:
      return '';
  }
}

// Add this function to validate and map the data
function validateAndMapData(data: any[], mapping: ReportMapping): any[] {
  const mappedData: any[] = [];
  let entryNumber = 1;

  if (Array.isArray(data)) {
    data.forEach(item => {
      const mappedRow: Record<string, string> = {};
      
      mapping.columns.forEach(column => {
        let value: string;

        // Handle special cases
        if (column.shopifyField === 'entry_number') {
          value = `ENT-${entryNumber.toString().padStart(6, '0')}`;
          entryNumber++;
        } else if (column.shopifyField === 'journal') {
          value = mapping.journalCode;
        } else if (column.shopifyField === 'salesAccount') {
          value = column.defaultValue || '';
        } else if (column.shopifyField === 'debit') {
          value = '0';
        } else if (column.shopifyField === 'total_price') {
          // Calculate price without tax
          const totalPrice = parseFloat(item.total_price || '0');
          const totalTax = parseFloat(item.total_tax || '0');
          value = (totalPrice - totalTax).toFixed(2);
        } else {
          // Handle nested fields (e.g., line_items[].title)
          const fieldParts = column.shopifyField.split('.');
          value = fieldParts.reduce((obj: any, part: string) => {
            if (part.includes('[]')) {
              const arrayField = part.replace('[]', '');
              return obj[arrayField]?.[0] || obj[arrayField] || '';
            }
            return obj[part] || '';
          }, item);
        }

        // Apply validation if exists
        if (column.validation && !column.validation(value)) {
          throw new Error(`Invalid value for ${column.requiredColumn}: ${value}`);
        }

        mappedRow[column.requiredColumn] = value || column.defaultValue || '';
      });

      mappedData.push(mappedRow);
    });
  }

  return mappedData;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    include: { fiscalConfig: true }
  });

  if (!shop || !shop.fiscalConfig) {
    throw new Error("Shop or fiscal configuration not found");
  }

  const fiscalConfig = shop.fiscalConfig;

  const matchingFiscalRegimeData = fiscalRegimesData.regimes.find(
    (fr: FiscalRegimeData) => fr.code === fiscalConfig.code
  );

  if (!matchingFiscalRegimeData) {
    throw new Error("Fiscal regime data not found in JSON for the shop's fiscal code.");
  }

  let finalDefaultFormat: ExportFormat | undefined;
  if (fiscalConfig.defaultFormat) {
    finalDefaultFormat = fiscalConfig.defaultFormat;
  } else if (matchingFiscalRegimeData.fileFormat) {
    finalDefaultFormat = matchingFiscalRegimeData.fileFormat.replace('.', '').toUpperCase() as ExportFormat;
  }

  let finalExportFormats: ExportFormat[];
  if (fiscalConfig.exportFormats && fiscalConfig.exportFormats.length > 0) {
    // Map Prisma's string[] to ExportFormat[]
    finalExportFormats = fiscalConfig.exportFormats.map((format: string) => format.toUpperCase() as ExportFormat);
  } else {
    // Map JSON's string[] to ExportFormat[]
    finalExportFormats = matchingFiscalRegimeData.exportFormats.map(
      (format: string) => format.toUpperCase() as ExportFormat
    );
  }

  // Construct combinedFiscalRegime explicitly, assigning each property
  const combinedFiscalRegime: CombinedFiscalRegime = {
    id: fiscalConfig.id,
    shopId: fiscalConfig.shopId,
    code: matchingFiscalRegimeData.code,
    name: matchingFiscalRegimeData.name,
    description: matchingFiscalRegimeData.description,
    countries: matchingFiscalRegimeData.countries,
    currency: matchingFiscalRegimeData.currency,
    fileFormat: matchingFiscalRegimeData.fileFormat,
    encoding: matchingFiscalRegimeData.encoding,
    separator: matchingFiscalRegimeData.separator,
    requiredColumns: matchingFiscalRegimeData.requiredColumns,
    taxRates: matchingFiscalRegimeData.taxRates,
    compatibleSoftware: matchingFiscalRegimeData.compatibleSoftware,
    notes: matchingFiscalRegimeData.notes,
    companyName: fiscalConfig.companyName,
    country: fiscalConfig.country,
    vatRate: fiscalConfig.vatRate,
    salesAccount: fiscalConfig.salesAccount,
    createdAt: fiscalConfig.createdAt,
    updatedAt: fiscalConfig.updatedAt,
    exportFormats: finalExportFormats,
    defaultFormat: finalDefaultFormat,
  };

  return json({ fiscalRegime: combinedFiscalRegime });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
    const formData = await request.formData();
    
  console.log("Server received formData:", Object.fromEntries(formData.entries()));

  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const fiscalRegimeId = formData.get("fiscalRegimeId") as string; // Corrected field name
  const format = formData.get("format") as ExportFormat;
  const dataTypesRaw = formData.get("dataTypes") as string;

  let dataTypes: string[] = [];
  try {
    const parsedDataTypes = JSON.parse(dataTypesRaw);
    dataTypes = Object.keys(parsedDataTypes).filter(key => parsedDataTypes[key] === true);
    console.log("Parsed dataTypes:", dataTypes);
  } catch (e) {
    console.error("Error parsing dataTypes:", e);
    return json({ error: "Invalid dataTypes format" }, { status: 400 });
  }

  console.log("Validation check: startDate=", startDate, "endDate=", endDate, "fiscalRegimeId=", fiscalRegimeId, "format=", format, "dataTypes.length=", dataTypes.length);

  if (!startDate || !endDate || !fiscalRegimeId || !format || dataTypes.length === 0) {
    console.error("Missing required fields:", { startDate, endDate, fiscalRegimeId, format, dataTypesLength: dataTypes.length });
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Get fiscal regime configuration
    console.log("Fetching fiscal regime with ID:", fiscalRegimeId);
    const fiscalRegime = await prisma.fiscalConfiguration.findUnique({
      where: { id: fiscalRegimeId },
    });

    if (!fiscalRegime) {
      console.error("Fiscal regime not found for ID:", fiscalRegimeId);
      return json({ error: "Fiscal regime not found" }, { status: 404 });
    }

    console.log("Found fiscal regime:", fiscalRegime.code);

    // Get fiscal regime data from JSON
    const fiscalRegimeData = (fiscalRegimesData as FiscalRegimesData).regimes.find(
      (regime) => regime.code === fiscalRegime.code
    );

    if (!fiscalRegimeData) {
      console.error("Fiscal regime data not found in JSON for code:", fiscalRegime.code);
      return json({ error: "Fiscal regime data not found" }, { status: 404 });
    }

    // Combine fiscal regime data
    const combinedFiscalRegime: CombinedFiscalRegime = {
      ...fiscalRegime,
      ...fiscalRegimeData,
      exportFormats: fiscalRegime.exportFormats as ExportFormat[],
      defaultFormat: fiscalRegime.defaultFormat || undefined,
    };

    console.log("Combined fiscal regime data:", combinedFiscalRegime);

    // Fetch data based on selected data types
    const data: Record<string, any[]> = {};

    for (const dataType of dataTypes) {
      console.log(`Fetching data for type: ${dataType} from ${startDate} to ${endDate}`);
      switch (dataType) {
        case "ventes":
          data[dataType] = await ShopifyOrderService.getOrders(admin, startDate, endDate) || [];
          break;
        case "clients":
          data[dataType] = await ShopifyCustomerService.getCustomers(admin, startDate, endDate) || [];
          break;
        case "remboursements":
          data[dataType] = await ShopifyRefundService.getRefunds(admin, startDate, endDate) || [];
          break;
        case "taxes":
          data[dataType] = await ShopifyTaxService.getTaxes(admin, startDate, endDate) || [];
          break;
      }
    }

    // Generate reports for each data type
    const reports: Record<string, string | Buffer> = {};
    const fileNames: Record<string, string> = {};
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    for (const dataType of dataTypes) {
      const reportContent = ReportService.generateReport(
        data[dataType],
        fiscalRegime.code,
        format,
        dataType,
        fiscalRegime.separator
      );

      reports[dataType] = reportContent;
      fileNames[dataType] = `${dataType}_${timestamp}.${format.toLowerCase()}`;
    }

    // Create export directory if it doesn't exist
    const exportDir = join(process.cwd(), "reports"); // Changed to 'reports' directory
    await mkdir(exportDir, { recursive: true });

    // Save reports to files
    for (const [dataType, reportContent] of Object.entries(reports)) {
      const filePath = join(exportDir, fileNames[dataType]);
      await writeFile(filePath, reportContent);
    }

    // Create report record in database
    const report = await prisma.report.create({
      data: {
        type: "manual",
        dataType: dataTypes.join(","),
        shopId: session.shop,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        format: format,
        status: ReportStatus.PROCESSING, // Start with PROCESSING status
        fileSize: 0,
        fileName: Object.values(fileNames).join(","),
        filePath: join(exportDir, `${Object.values(fileNames).join(",")}.${format.toLowerCase()}`), // Store complete file path
      },
    });

    try {
      // Determine which report to return for download (e.g., the first one)
      const firstDataType = dataTypes[0];
      const reportContentToDownload = reports[firstDataType];
      const fileNameToDownload = formData.get("fileName") as string;

      if (!reportContentToDownload) {
        // Update report status to ERROR if no content was generated
        await prisma.report.update({
          where: { id: report.id },
          data: {
            status: ReportStatus.ERROR,
            errorMessage: "Failed to generate report content"
          }
        });
        throw new Error("Failed to generate report content");
      }

      // Write the report content to file
      if (!report.filePath) {
        throw new Error("Report file path is not set");
      }
      await writeFile(report.filePath, reportContentToDownload);

      // Update report status to COMPLETED if everything went well
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.COMPLETED,
          fileSize: Buffer.byteLength(reportContentToDownload)
        }
      });

      const contentTypeMap: Record<ExportFormat, string> = {
        CSV: "text/csv",
        XML: "application/xml",
        XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        TXT: "text/plain",
        JSON: "application/json",
        PDF: "application/pdf",
      };

      const contentType = contentTypeMap[format];

      return new Response(reportContentToDownload, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${fileNameToDownload}"`, // Use the filename provided by the client
        },
      });
    } catch (error) {
      console.error('Error downloading report:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while generating the report');
      return json({ error: "Failed to generate report" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error generating report:", error);
    return json({ error: "Failed to generate report" }, { status: 500 });
  }
};

export default function ManualExportPage() {
  const { fiscalRegime } = useLoaderData<typeof loader>();

  const [selectedDates, setSelectedDates] = useState<DateRange>(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { start: startOfMonth, end: endOfMonth };
  });
  // Add state for current month and year displayed in DatePicker
  const [currentMonth, setCurrentMonth] = useState(selectedDates.start.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDates.start.getFullYear());

  const [dataTypes, setDataTypes] = useState({
    ventes: false,
    clients: false,
    remboursements: false,
    taxes: false,
  });
  // Initialize selectedFormat with a default from enum if fiscalRegime.defaultFormat is undefined
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>(fiscalRegime?.defaultFormat || ExportFormat.CSV); 
  const [selectedSoftware, setSelectedSoftware] = useState(fiscalRegime?.compatibleSoftware?.[0] || "");
  const [fileName, setFileName] = useState("");

  const submit = useSubmit();

  const handleMonthChange = useCallback(
    (month: number, year: number) => {
      setCurrentMonth(month);
      setCurrentYear(year);
    },
    [],
  );

  // New useEffect to synchronize currentMonth and currentYear with selectedDates.start
  useEffect(() => {
    setCurrentMonth(selectedDates.start.getMonth());
    setCurrentYear(selectedDates.start.getFullYear());
  }, [selectedDates.start]); // Only re-run when selectedDates.start changes

  useEffect(() => {
    // This useEffect is now solely for filename and dropdown initializations.
    const start = selectedDates.start;
    const end = selectedDates.end;
    const selectedTypeKeys = Object.entries(dataTypes)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);

    let generatedFileName = `ledgerxport-${fiscalRegime?.code || ""}`;
    if (selectedTypeKeys.length > 0) {
      generatedFileName += `-${selectedTypeKeys.join("_")}`;
    }
    // Remove leading dot from selectedFormat if it exists for filename generation
    const cleanFormat = selectedFormat.startsWith('.') ? selectedFormat.substring(1) : selectedFormat;
    generatedFileName += `-${formatDate(start)}-${formatDate(end)}.${cleanFormat.toLowerCase()}`;
    setFileName(generatedFileName);

    if (fiscalRegime?.compatibleSoftware && fiscalRegime.compatibleSoftware.length > 0) {
      setSelectedSoftware(fiscalRegime.compatibleSoftware[0]);
    }
  }, [selectedDates, dataTypes, selectedFormat, fiscalRegime]);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate that at least one data type is selected
    if (!Object.values(dataTypes).some(value => value === true)) {
      alert('Please select at least one data type');
      return;
    }

    const formData = new FormData();
    formData.append("startDate", selectedDates.start.toISOString());
    formData.append("endDate", selectedDates.end.toISOString());
    formData.append("fiscalRegimeId", fiscalRegime?.id || "");
    formData.append("dataTypes", JSON.stringify(dataTypes));
    
    // Format handling
    const format = selectedFormat.replace('.', '').toUpperCase();
    formData.append("format", format);

    formData.append("software", selectedSoftware);
    formData.append("fileName", fileName);

    try {
      console.log("Submitting form data:", {
        startDate: selectedDates.start.toISOString(),
        endDate: selectedDates.end.toISOString(),
        dataTypes,
        format,
        software: selectedSoftware,
        fileName
      });

      const response = await fetch('/app/reports/manual-export', {
        method: 'POST',
        body: formData
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      // Check if the response is JSON (error) or a file (success)
      const contentType = response.headers.get('content-type');
      console.log("Response content type:", contentType);

      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.error || errorData.details || 'Failed to generate report');
      }

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      // Get the blob from the response
      const blob = await response.blob();
      console.log("Received blob:", blob.size, "bytes");
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || `export-${formatDate(selectedDates.start)}-${formatDate(selectedDates.end)}.${format.toLowerCase()}`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while generating the report');
    }
  };

  // Determine the selected data type for dynamic column display
  const selectedDataTypeForDisplay = Object.entries(dataTypes).find(([, value]) => value === true)?.[0] as keyof typeof dataTypes | undefined;
  const displayedColumns = selectedDataTypeForDisplay 
    ? generateMappingsFrontend(fiscalRegime, selectedDataTypeForDisplay) 
    : [];

  return (
    <Page>
      <ui-title-bar title="Export manuel" />
      <Layout>
        <Layout.Section>
          <Card>
            <form onSubmit={handleSubmit}>
              <FormLayout>
                      <DatePicker
                  month={currentMonth}
                  year={currentYear}
                  onChange={newRange => {
                    if (newRange.start && newRange.end) {
                      setSelectedDates({ start: newRange.start, end: newRange.end });
                    }
                  }}
                  onMonthChange={handleMonthChange}
                        selected={{ start: selectedDates.start, end: selectedDates.end }}
                  disableDatesBefore={new Date(2023, 0, 1)}
                        allowRange
                />
                <Text as="h3" variant="headingMd">
                  Types de données
                </Text>
                <LegacyStack vertical spacing="extraTight">
                  <Checkbox
                    label="Ventes"
                    checked={dataTypes.ventes}
                    onChange={(checked) => setDataTypes({ ...dataTypes, ventes: checked })}
                  />
                  <Checkbox
                    label="Clients"
                    checked={dataTypes.clients}
                    onChange={(checked) => setDataTypes({ ...dataTypes, clients: checked })}
                  />
                  <Checkbox
                    label="Remboursements"
                    checked={dataTypes.remboursements}
                    onChange={(checked) => setDataTypes({ ...dataTypes, remboursements: checked })}
                  />
                  <Checkbox
                    label="Taxes"
                    checked={dataTypes.taxes}
                    onChange={(checked) => setDataTypes({ ...dataTypes, taxes: checked })}
                  />
                </LegacyStack>
                {fiscalRegime && (
                  <Text as="h3" variant="headingMd">
                    Régime fiscal actif: {fiscalRegime.name} - {fiscalRegime.countries.join(", ")}
                  </Text>
                )}

                {selectedDataTypeForDisplay && displayedColumns.length > 0 && (
                  <Card>
                    <Text as="h2" variant="headingMd">
                      Colonnes attendues pour le rapport
                    </Text>
                    <FormLayout>
                      {displayedColumns.map((col, index) => (
                        <div key={index}>
                          <Text as="p" variant="bodyMd">
                            <strong>{col.requiredColumn}:</strong> {col.description}
                          </Text>
                        </div>
                      ))}
                    </FormLayout>
                  </Card>
                )}

                <Select
                  label="Format du fichier"
                  options={fiscalRegime?.exportFormats?.map((format: ExportFormat) => ({
                    label: format,
                    value: format
                  })) || []}
                  onChange={(value) => setSelectedFormat(value as ExportFormat)}
                  value={selectedFormat}
                />
                <Select
                  label="Logiciel comptable cible"
                  options={fiscalRegime?.compatibleSoftware?.map((software: string) => ({ label: software, value: software })) || []}
                  onChange={(value) => setSelectedSoftware(value)}
                  value={selectedSoftware}
                />
                <TextField
                  label="Nom du fichier exporté"
                  value={fileName}
                  onChange={(value) => setFileName(value)}
                  autoComplete="off"
                />
                  <BiSaveBtn title="Générer et télécharger l'export" />
              </FormLayout>
            </form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}