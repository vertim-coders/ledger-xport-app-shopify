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

interface DateRange {
  start: Date;
  end: Date;
}

// Define a type for the fiscal regime data from the JSON file
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
  taxRates: any; // Use a more specific type if possible
  compatibleSoftware: string[];
  exportFormats: string[];
  notes: string;
  salesAccount?: string; // Add sales account field
}

// Define a type for the fiscal regime data combined from Prisma and JSON
type CombinedFiscalRegime = FiscalRegimePrisma & FiscalRegimeData;

// Placeholder functions for fetching data from Shopify API
async function fetchOrders(session: any, startDate: string, endDate: string): Promise<any[]> {
  console.log(`Fetching orders from ${startDate} to ${endDate}...`);
  // TODO: Implement actual Shopify Admin API call to fetch orders
  // Example using @shopify/admin-api-client (install it first)
  /*
  const client = new AdminAPIClient({
    session: session,
    apiVersion: "2024-04", // Use the appropriate API version
  });
  const response = await client.query(`...\`); // Your GraphQL query here
  return response.data.orders.edges.map(edge => edge.node);
  */
  return [];
}

async function fetchCustomers(session: any, startDate: string, endDate: string): Promise<any[]> {
  console.log(`Fetching customers from ${startDate} to ${endDate}...`);
  // TODO: Implement actual Shopify Admin API call to fetch customers
  return [];
}

async function fetchRefunds(session: any, startDate: string, endDate: string): Promise<any[]> {
  console.log(`Fetching refunds from ${startDate} to ${endDate}...`);
  // TODO: Implement actual Shopify Admin API call to fetch refunds (usually linked to orders)
  return [];
}

async function fetchTaxes(session: any, startDate: string, endDate: string): Promise<any[]> {
  console.log(`Fetching tax data from ${startDate} to ${endDate}...`);
  // TODO: Implement actual Shopify Admin API call or logic to calculate taxes from orders
  return [];
}

// Placeholder function for generating the report content
function generateReport(data: any, fiscalRegime: CombinedFiscalRegime, fileFormat: string, separator: string): string | Buffer {
  console.log("Generating report...");
  console.log("Data:", data);
  console.log("Fiscal Regime:", fiscalRegime);
  console.log("File Format:", fileFormat);
  console.log("Separator:", separator);

  let reportContent: string | Buffer = "";

  // Helper function to format a row of data
  const formatRow = (row: string[]) => row.join(separator);

  // Helper function to get data rows with sales account
  const getDataRows = (data: any[], columns: string[]) => {
    return data.map(item => {
      const row: string[] = [];
      columns.forEach(col => {
        if (col === 'salesAccount') {
          row.push(fiscalRegime.salesAccount || '701');
        } else {
          const value = item[col as keyof typeof item];
          row.push(value != null ? String(value) : '');
        }
      });
      return row;
    });
  };

  // Get the format without the dot
  const format = fileFormat.replace('.', '').toUpperCase();

  switch (format) {
    case "CSV":
    case "TXT":
      // For both CSV and TXT, we use the same format but with different separators
      const rows: string[][] = [];
      // Add header row
      rows.push(fiscalRegime.requiredColumns);
      
      // Add data rows from orders
      if (data.orders) {
        rows.push(...getDataRows(data.orders, fiscalRegime.requiredColumns));
      }
      // Add data rows from customers
      if (data.customers) {
        rows.push(...getDataRows(data.customers, fiscalRegime.requiredColumns));
      }
      // Add data rows from refunds
      if (data.refunds) {
        rows.push(...getDataRows(data.refunds, fiscalRegime.requiredColumns));
      }
      // Add data rows from taxes
      if (data.taxes) {
        rows.push(...getDataRows(data.taxes, fiscalRegime.requiredColumns));
      }

      // Join all rows with newlines
      reportContent = rows.map(formatRow).join('\n');
      break;

    case "XLSX":
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      
      // Create worksheets for each data type
      if (data.orders) {
        const ordersData = [fiscalRegime.requiredColumns, ...getDataRows(data.orders, fiscalRegime.requiredColumns)];
        const ordersSheet = XLSX.utils.aoa_to_sheet(ordersData);
        XLSX.utils.book_append_sheet(workbook, ordersSheet, "Orders");
      }
      
      if (data.customers) {
        const customersData = [fiscalRegime.requiredColumns, ...getDataRows(data.customers, fiscalRegime.requiredColumns)];
        const customersSheet = XLSX.utils.aoa_to_sheet(customersData);
        XLSX.utils.book_append_sheet(workbook, customersSheet, "Customers");
      }
      
      if (data.refunds) {
        const refundsData = [fiscalRegime.requiredColumns, ...getDataRows(data.refunds, fiscalRegime.requiredColumns)];
        const refundsSheet = XLSX.utils.aoa_to_sheet(refundsData);
        XLSX.utils.book_append_sheet(workbook, refundsSheet, "Refunds");
      }
      
      if (data.taxes) {
        const taxesData = [fiscalRegime.requiredColumns, ...getDataRows(data.taxes, fiscalRegime.requiredColumns)];
        const taxesSheet = XLSX.utils.aoa_to_sheet(taxesData);
        XLSX.utils.book_append_sheet(workbook, taxesSheet, "Taxes");
      }

      // Generate the Excel file as a buffer
      reportContent = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
      break;

    case "JSON":
      // Create a structured JSON object
      const jsonData = {
        fiscalRegime: fiscalRegime.code,
        period: {
          start: data.startDate,
          end: data.endDate
        },
        data: {
          orders: data.orders || [],
          customers: data.customers || [],
          refunds: data.refunds || [],
          taxes: data.taxes || []
        }
      };
      reportContent = JSON.stringify(jsonData, null, 2);
      break;

    case "XML":
      // Create XML structure
      const xmlData = {
        fiscalRegime: fiscalRegime.code,
        period: {
          start: data.startDate,
          end: data.endDate
        },
        data: {
          orders: data.orders || [],
          customers: data.customers || [],
          refunds: data.refunds || [],
          taxes: data.taxes || []
        }
      };

      // Convert to XML (you might want to use a proper XML library in production)
      reportContent = `<?xml version="1.0" encoding="${fiscalRegime.encoding}"?>
<report>
  <fiscalRegime>${xmlData.fiscalRegime}</fiscalRegime>
  <period>
    <start>${xmlData.period.start}</start>
    <end>${xmlData.period.end}</end>
  </period>
  <data>
    <orders>${JSON.stringify(xmlData.data.orders)}</orders>
    <customers>${JSON.stringify(xmlData.data.customers)}</customers>
    <refunds>${JSON.stringify(xmlData.data.refunds)}</refunds>
    <taxes>${JSON.stringify(xmlData.data.taxes)}</taxes>
  </data>
</report>`;
      break;

    default:
      throw new Error(`Unsupported file format: ${format}`);
  }

  return reportContent;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    select: { fiscalConfig: true },
  });

  const today = new Date();
  const initialEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const initialStartDate = new Date(today.getFullYear(), today.getMonth(), 1);

  // Find the full fiscal regime data from the JSON based on the Prisma regime code
  let fiscalRegimeDetails: FiscalRegimeData | undefined;
  const prismaFiscalRegime = shop?.fiscalConfig; // Extract for clearer check
  if (prismaFiscalRegime?.code) { // Check if prismaFiscalRegime exists and has a code
    fiscalRegimeDetails = fiscalRegimesData.regimes.find(r => r.code === prismaFiscalRegime.code);
  }

  // Combine Prisma data with JSON data
  const combinedFiscalRegime: CombinedFiscalRegime | null = (prismaFiscalRegime && fiscalRegimeDetails)
    ? { ...prismaFiscalRegime, ...fiscalRegimeDetails }
    : null;

  return json({
    fiscalRegime: combinedFiscalRegime,
    regimes: fiscalRegimesData.regimes,
    initialDateRange: {
      start: initialStartDate.toISOString(), // Send as ISO string
      end: initialEndDate.toISOString(),     // Send as ISO string
    }
  });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);
    const selectedTypes = JSON.parse(formData.get("selectedTypes") as string);
    const fileFormat = formData.get("fileFormat") as string;
    const software = formData.get("software") as string;
    const fileName = formData.get("fileName") as string;
    const fiscalRegimeCode = formData.get("fiscalRegimeCode") as string;

    // Find the fiscal regime details from the JSON data
    const fiscalRegimeDetails = fiscalRegimesData.regimes.find(r => r.code === fiscalRegimeCode);
    
    if (!fiscalRegimeDetails) {
      // Create a failed report record
      const report = await prisma.report.create({
        data: {
          type: "manual",
          status: ReportStatus.ERROR,
          format: fileFormat as ExportFormat,
          startDate,
          endDate,
          shopId: (await prisma.shop.findUnique({ where: { shopifyDomain: session.shop } }))?.id || '',
          fileSize: 0,
          fileName,
          errorMessage: "Invalid fiscal regime selected"
        }
      });
      return json({ error: "Invalid fiscal regime selected" }, { status: 400 });
    }

    // Get the shop and fiscal regime from the database
    const shop = await prisma.shop.findUnique({
      where: { shopifyDomain: session.shop },
      include: { fiscalConfig: true }
    });

    if (!shop || !shop.fiscalConfig) {
      // Create a failed report record
      const report = await prisma.report.create({
        data: {
          type: "manual",
          status: ReportStatus.ERROR,
          format: fileFormat as ExportFormat,
          startDate,
          endDate,
          shopId: shop?.id || '',
          fileSize: 0,
          fileName,
          errorMessage: "Shop or fiscal regime not found"
        }
      });
      return json({ error: "Shop or fiscal regime not found" }, { status: 400 });
    }

    // Validate the format
    if (!Object.values(ExportFormat).includes(fileFormat as ExportFormat)) {
      // Create a failed report record
      const report = await prisma.report.create({
        data: {
          type: "manual",
          status: ReportStatus.ERROR,
          format: fileFormat as ExportFormat,
          startDate,
          endDate,
          shopId: shop.id,
          fileSize: 0,
          fileName,
          errorMessage: `Invalid export format: ${fileFormat}`
        }
      });
      return json({ 
        error: "Invalid export format", 
        details: {
          received: fileFormat,
          available: Object.values(ExportFormat)
        }
      }, { status: 400 });
    }

    // Create a new report record
    const report = await prisma.report.create({
      data: {
        type: "manual",
        status: ReportStatus.PROCESSING,
        format: fileFormat as ExportFormat,
        startDate,
        endDate,
        shopId: shop.id,
        fileSize: 0,
        fileName,
      }
    });

    try {
      let fetchedData: any = {};

      // Fetch data based on selected types
      if (selectedTypes.ventes) {
        fetchedData.orders = await fetchOrders(session, startDate.toISOString(), endDate.toISOString());
      }
      if (selectedTypes.clients) {
        fetchedData.customers = await fetchCustomers(session, startDate.toISOString(), endDate.toISOString());
      }
      if (selectedTypes.remboursements) {
        fetchedData.refunds = await fetchRefunds(session, startDate.toISOString(), endDate.toISOString());
      }
      if (selectedTypes.taxes) {
        fetchedData.taxes = await fetchTaxes(session, startDate.toISOString(), endDate.toISOString());
      }

      // Generate the report content
      const reportContent = generateReport(
        fetchedData,
        fiscalRegimeDetails as CombinedFiscalRegime,
        fileFormat,
        fiscalRegimeDetails.separator
      );

      // Create reports directory if it doesn't exist
      const reportsDir = join(process.cwd(), "reports");
      await mkdir(reportsDir, { recursive: true });

      // Store the file with the custom filename
      const filePath = join(reportsDir, fileName);
      await writeFile(filePath, reportContent);

      // Update the report record with the file path and completed status
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.COMPLETED,
          filePath,
          fileSize: Buffer.byteLength(reportContent)
        }
      });

      // Set appropriate headers for file download
      const headers = new Headers();
      const contentType = {
        ".csv": "text/csv",
        ".json": "application/json",
        ".txt": "text/plain",
        ".xml": "application/xml",
        ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }[fileFormat] || "application/octet-stream";
      
      headers.set("Content-Type", contentType);
      headers.set("Content-Disposition", `attachment; filename="${fileName}"`);
      headers.set("Content-Length", Buffer.byteLength(reportContent).toString());
      headers.set("Cache-Control", "no-cache");
      headers.set("Pragma", "no-cache");

      // Return the report content as a downloadable file
      return new Response(reportContent, { 
        headers,
        status: 200
      });

    } catch (error) {
      // Update the report record with failed status and error message
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.ERROR,
          errorMessage: error instanceof Error ? error.message : String(error)
        }
      });

      throw error; // Re-throw to be caught by outer try-catch
    }

  } catch (error) {
    console.error('Error in manual export action:', error);
    return json({ 
      error: "An error occurred while processing your request",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
};

export default function ManualExportPage() {
  const { fiscalRegime, regimes, initialDateRange } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  // Parse dates back from ISO strings
  const initialDates: DateRange = {
    start: new Date(initialDateRange.start),
    end: new Date(initialDateRange.end),
  };

  const [selectedDates, setSelectedDates] = useState<DateRange>(initialDates);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleMonthChange = useCallback(
    (month: number, year: number) => {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0);
      setSelectedDates({ start, end });
    },
    [setSelectedDates],
  );

  const handleDateSelection = useCallback(
    ({ end, start }: { start: Date, end: Date }) => {
      setSelectedDates({ start, end });
      setShowDatePicker(false);
    },
    [setSelectedDates, setShowDatePicker],
  );

  const [dataTypes, setDataTypes] = useState({
    ventes: false,
    clients: false,
    remboursements: false,
    taxes: false,
  });

  const handleDataTypeChange = useCallback((type: string, checked: boolean) => {
    setDataTypes(prev => ({ ...prev, [type]: checked }));
  }, []);

  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState("");
  const [fileName, setFileName] = useState("");

  // Access formats and software directly from the combined fiscalRegime object
  const availableFormats = fiscalRegime?.exportFormats || [];
  const availableSoftware = fiscalRegime?.compatibleSoftware || [];

  // Helper function to format date as YYYYMMDD
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}${month}${day}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("startDate", selectedDates.start.toISOString());
    formData.append("endDate", selectedDates.end.toISOString());
    formData.append("selectedTypes", JSON.stringify(dataTypes));
    
    // Ensure the format is properly formatted
    const format = selectedFormat.startsWith('.') ? selectedFormat.substring(1) : selectedFormat;
    console.log('Submitting format:', format); // Debug log
    formData.append("fileFormat", format.toUpperCase()); // Send without the dot

    formData.append("software", selectedSoftware);
    formData.append("fileName", fileName);

    // Add active fiscal regime code to formData if available
    if (fiscalRegime) {
      formData.append("fiscalRegimeCode", fiscalRegime.code);
    }

    try {
      const response = await fetch('/app/reports/manual-export', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate report');
      }

      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      // TODO: Show error message to user
    }
  };

  // Set initial values for dropdowns and file name using useEffect
  useEffect(() => {
    if (fiscalRegime) {
      if (availableFormats.length > 0) {
        setSelectedFormat(availableFormats[0]);
      }
      if (availableSoftware.length > 0) {
        setSelectedSoftware(availableSoftware[0]);
      }
      // Only set initial filename if it's empty
      if (!fileName) {
        const startDateStr = formatDate(selectedDates.start);
        const endDateStr = formatDate(selectedDates.end);
        setFileName(`ledgerxport-${fiscalRegime.code.toLowerCase()}-${startDateStr}-${endDateStr}${fiscalRegime.fileFormat || '.csv'}`);
      }
    }
  }, [fiscalRegime, availableFormats, availableSoftware, selectedDates]);

  // Update file extension when format changes
  useEffect(() => {
    if (selectedFormat && fileName) {
      // Get the current filename without extension
      const baseName = fileName.split('.').slice(0, -1).join('.');
      // Update only the extension
      setFileName(`${baseName}${selectedFormat}`);
    }
  }, [selectedFormat]);

  // Update filename when dates change
  useEffect(() => {
    if (fiscalRegime) {
      const startDateStr = formatDate(selectedDates.start);
      const endDateStr = formatDate(selectedDates.end);
      const currentExtension = fileName.split('.').pop() || fiscalRegime.fileFormat || 'csv';
      setFileName(`ledgerxport-${fiscalRegime.code.toLowerCase()}-${startDateStr}-${endDateStr}.${currentExtension}`);
    }
  }, [selectedDates, fiscalRegime]);

  return (
    <Page title="Export manuel">
      <Layout>
        <Layout.Section>
          <Card>
            <form onSubmit={handleSubmit}>
              <FormLayout>
                <Text variant="headingMd" as="h2">Période à exporter</Text>
                <div style={{ position: 'relative' }}>
                  <Button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    fullWidth
                  >
                    {`${selectedDates.start.toLocaleDateString()} – ${selectedDates.end.toLocaleDateString()}`}
                  </Button>

                  {showDatePicker && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      zIndex: 10,
                      backgroundColor: 'white',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      borderRadius: '4px',
                      marginTop: '8px'
                    }}>
                      <DatePicker
                        month={selectedDates.start.getMonth()}
                        year={selectedDates.start.getFullYear()}
                        selected={{ start: selectedDates.start, end: selectedDates.end }}
                        onMonthChange={handleMonthChange}
                        onChange={handleDateSelection}
                        allowRange
                        multiMonth={false}
                        disableDatesAfter={new Date()}
                      />
                    </div>
                  )}
                </div>

                <Text variant="headingMd" as="h2">Types de données</Text>
                <LegacyStack vertical spacing="tight">
                  <Checkbox
                    label="Ventes"
                    checked={dataTypes.ventes}
                    onChange={checked => handleDataTypeChange('ventes', checked)}
                  />
                  <Checkbox
                    label="Clients"
                    checked={dataTypes.clients}
                    onChange={checked => handleDataTypeChange('clients', checked)}
                  />
                  <Checkbox
                    label="Remboursements"
                    checked={dataTypes.remboursements}
                    onChange={checked => handleDataTypeChange('remboursements', checked)}
                  />
                  <Checkbox
                    label="Taxes"
                    checked={dataTypes.taxes}
                    onChange={checked => handleDataTypeChange('taxes', checked)}
                  />
                </LegacyStack>

                {fiscalRegime && ( // Only show if fiscal regime is loaded
                  <Text variant="bodyMd" as="p">Régime fiscal actif: {fiscalRegime.name} – {fiscalRegime.countries.join(', ')}</Text>
                )}

                <Text variant="headingMd" as="h2">Format du fichier</Text>
                <Select
                  label="Select file format"
                  labelHidden
                  options={availableFormats.map(format => ({ label: format.toUpperCase().replace('.', ''), value: format }))}
                  onChange={setSelectedFormat}
                  value={selectedFormat}
                  disabled={availableFormats.length === 0}
                />

                <Text variant="headingMd" as="h2">Logiciel comptable cible</Text>
                <Select
                  label="Select accounting software"
                  labelHidden
                  options={availableSoftware.map(software => ({ label: software, value: software }))}
                  onChange={setSelectedSoftware}
                  value={selectedSoftware}
                  disabled={availableSoftware.length === 0}
                />

                <Text variant="headingMd" as="h2">Nom du fichier exporté</Text>
                <TextField
                  label="Export file name"
                  labelHidden
                  value={fileName}
                  onChange={setFileName}
                  autoComplete="off"
                />

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                  <BiSaveBtn title="Générer et télécharger l'export" />
                </div>
              </FormLayout>
            </form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}