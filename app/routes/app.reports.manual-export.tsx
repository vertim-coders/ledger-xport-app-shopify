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
import { FiscalRegime as FiscalRegimePrisma, ReportStatus, ExportFormat } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

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

  let reportContent = "";

  // TODO: Implement data transformation and formatting based on fiscalRegime and fileFormat
  // - Use fiscalRegime.requiredColumns to determine which data fields to include
  // - Format data according to fileFormat (CSV, JSON, TXT, XML)
  // - Use the specified separator for CSV/TXT
  // - Handle encoding if necessary (though UTF-8 is default)

  switch (fileFormat) {
    case ".csv":
      // Example CSV generation (replace with actual mapping and formatting)
      const csvRows: string[][] = [];
      // Add header row
      csvRows.push(fiscalRegime.requiredColumns);
      // Add data rows (example: from orders)
      if (data.orders) {
        data.orders.forEach((order: { [key: string]: string | number | boolean | null }) => {
          const row: string[] = [];
          // Map order data to requiredColumns
          fiscalRegime.requiredColumns.forEach(col => {
            const value = order[col as keyof typeof order];
            row.push(value != null ? String(value) : '');
          });
          csvRows.push(row);
        });
      }
      // Join rows and columns with separator
      reportContent = csvRows.map(row => row.join(separator)).join('\n');
      break;
    case ".json":
      // Example JSON generation (replace with actual mapping)
      reportContent = JSON.stringify(data, null, 2);
      break;
    case ".txt":
      // Example TXT generation (similar to CSV, but could have different structure)
      const txtRows: string[][] = [];
      // Add header row
      txtRows.push(fiscalRegime.requiredColumns);
      // Add data rows (example: from orders)
      if (data.orders) {
        data.orders.forEach((order: { [key: string]: string | number | boolean | null }) => {
          const row: string[] = [];
          // Map order data to requiredColumns
          fiscalRegime.requiredColumns.forEach(col => {
            const value = order[col as keyof typeof order];
            row.push(value != null ? String(value) : '');
          });
          txtRows.push(row);
        });
      }
      // Join rows and columns with separator
      reportContent = txtRows.map(row => row.join(separator)).join('\n');
      break;
    case ".xml":
      // Example XML generation (requires a dedicated library or manual XML construction)
      reportContent = "<!-- TODO: Implement XML generation -->";
      break;
    default:
      reportContent = "Unsupported file format";
  }

  // For binary formats like PDF, you would generate a Buffer instead of a string
  // if (fileFormat === ".pdf") {
  //   // Use a PDF generation library
  //   // return buffer;
  // }

  return reportContent;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    select: { fiscalRegime: true },
  });

  const today = new Date();
  const initialEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const initialStartDate = new Date(today.getFullYear(), today.getMonth(), 1);

  // Find the full fiscal regime data from the JSON based on the Prisma regime code
  let fiscalRegimeDetails: FiscalRegimeData | undefined;
  const prismaFiscalRegime = shop?.fiscalRegime; // Extract for clearer check
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
    return json({ error: "Invalid fiscal regime selected" }, { status: 400 });
  }

  // Get the shop and fiscal regime from the database
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    include: { fiscalRegime: true }
  });

  if (!shop || !shop.fiscalRegime) {
    return json({ error: "Shop or fiscal regime not found" }, { status: 400 });
  }

  // Create a new report record
  const report = await prisma.report.create({
    data: {
      type: "manual",
      status: ReportStatus.PROCESSING,
      format: fileFormat.replace('.', '').toUpperCase() as ExportFormat,
      startDate,
      endDate,
      shopId: shop.id,
      fiscalRegimeId: shop.fiscalRegime.id,
      fileSize: 0,
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

    // Store the file
    const filePath = join(reportsDir, `${report.id}${fileFormat}`);
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
    }[fileFormat] || "application/octet-stream";
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`);

    // Return the report content as a downloadable file
    return new Response(reportContent, { headers });

  } catch (error) {
    // Update the report record with error status
    await prisma.report.update({
      where: { id: report.id },
      data: {
        status: ReportStatus.ERROR,
        errorMessage: error instanceof Error ? error.message : "Unknown error"
      }
    });

    throw error;
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("startDate", selectedDates.start.toISOString());
    formData.append("endDate", selectedDates.end.toISOString());
    formData.append("selectedTypes", JSON.stringify(dataTypes));
    formData.append("fileFormat", selectedFormat);
    formData.append("software", selectedSoftware);
    formData.append("fileName", fileName);

    // Add active fiscal regime code to formData if available
    if (fiscalRegime) {
      formData.append("fiscalRegimeCode", fiscalRegime.code);
    }

    submit(formData, { method: "post" });
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
      // Set a default file name based on regime and date
      const month = (selectedDates.end.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDates.end.getFullYear();
      setFileName(`ledgerxport-${fiscalRegime.code.toLowerCase()}-${year}-${month}${fiscalRegime.fileFormat || '.csv'}`);
    }
  }, [fiscalRegime, availableFormats, availableSoftware, selectedDates]); // Depend on fiscalRegime, options, and selectedDates

  // Update file name when date range or regime changes using useEffect
  useEffect(() => {
    if (fiscalRegime) {
      const month = (selectedDates.end.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDates.end.getFullYear();
      // Keep existing extension if available, otherwise default to .csv
      const currentExtension = fileName.split('.').pop() || fiscalRegime.fileFormat || 'csv';
      const baseName = `ledgerxport-${fiscalRegime.code.toLowerCase()}-${year}-${month}`;
      setFileName(`${baseName}.${currentExtension}`);
    } else {
      // Update based on date range only if regime is not loaded yet
      const month = (selectedDates.end.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDates.end.getFullYear();
      const baseName = `ledgerxport-${year}-${month}`; // No regime code
      // Default extension to .csv if no regime and no current extension
      const currentExtension = fileName.split('.').pop() || 'csv';
      setFileName(`${baseName}.${currentExtension}`);
    }
  }, [selectedDates, fiscalRegime, fileName]); // Depend on selectedDates, fiscalRegime, and fileName

  return (
    <Page title="Export manuel">
      <Layout>
        <Layout.Section>
          <Card>
            <form onSubmit={handleSubmit}>
              <FormLayout>
                <Text variant="headingMd" as="h2">Période à exporter</Text>
                <div style={{ position: 'relative' }}>
                  {/* Use a button or div to trigger the date picker */}
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
                        // Removed multiSelect and allowRange
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

                <Button submit variant="primary">
                  Générer et télécharger l'export
                </Button>
              </FormLayout>
            </form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}