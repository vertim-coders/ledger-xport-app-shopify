import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate } from "@remix-run/react";
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
  Badge,
  Icon,
  Thumbnail,
  Modal,
  Banner,
  type BadgeProps,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import fiscalRegimesData from "../data/fiscal-regimes.json";
import { FiscalConfiguration as FiscalRegimePrisma, ReportStatus, ExportFormat } from "@prisma/client";
import { promises as fs } from "fs";
import { join } from "path";
import * as XLSX from 'xlsx';
import { BiSaveBtn } from "../components/Buttons/BiSaveBtn";
import { ShopifyCustomerService } from "../models/ShopifyCustomer.service";
import { ShopifyOrderService } from "../models/ShopifyOrder.service";
import { ShopifyRefundService } from "../models/ShopifyRefund.service";
import { ShopifyTaxService } from "../models/ShopifyTax.service";
import { MappingService } from "../services/mapping.service";
import { ReportService } from "../services/report.service";
import JSZip from "jszip";
import { ArrowDownIcon, RefreshIcon, EmailIcon } from "@shopify/polaris-icons";
import type { DateRange } from "../types/DateRangeType";
import type { FiscalRegimeData } from "../types/FiscalRegimeDataType";
import type { FiscalRegimesData } from "../types/FiscalRegimesDataType";
import type { CombinedFiscalRegime } from "../types/CombinedFiscalRegimeType";
import type { ColumnMapping } from "../types/ColumnMappingType";
import type { ReportMapping } from "../types/ReportMappingType";

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const formData = await request.formData();
  
  console.log("Server received formData:", Object.fromEntries(formData.entries()));

  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const fiscalRegimeId = formData.get("fiscalRegimeId") as string;
  const dataTypes = JSON.parse(formData.get("dataTypes") as string);
  const format = formData.get("format") as ExportFormat;
  const software = formData.get("software") as string;
  const fileNames = JSON.parse(formData.get("fileNames") as string);

  console.log("Parsed dataTypes:", Object.entries(dataTypes)
    .filter(([_, selected]) => selected)
    .map(([type]) => type));

  // Validation
  if (!startDate || !endDate || !fiscalRegimeId || !format) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  console.log("Validation check:", {
          startDate,
          endDate,
    fiscalRegimeId,
    format,
    dataTypesLength: Object.values(dataTypes).filter(Boolean).length
  });

  // Get fiscal regime
  const fiscalRegime = await prisma.fiscalConfiguration.findUnique({
    where: { id: fiscalRegimeId },
  });

  if (!fiscalRegime) {
    return json({ error: "Fiscal regime not found" }, { status: 404 });
  }

  console.log("Found fiscal regime:", fiscalRegime.code);

  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
  });

  if (!shop) {
    return json({ error: "Shop not found" }, { status: 404 });
  }

  // Create export directory if it doesn't exist
  const exportDir = join(process.cwd(), "reports");
  await fs.mkdir(exportDir, { recursive: true });

  // Save reports to files
  const savedFilePaths: string[] = [];
  let hasEmptyData = false;

  // Process each selected data type
  const createdReports = [];
  for (const [dataType, isSelected] of Object.entries(dataTypes)) {
    if (!isSelected) continue;

    console.log(`Fetching data for type: ${dataType} from ${startDate} to ${endDate}`);

    const report = await prisma.report.create({
      data: {
        type: "manual",
        dataType: dataType,
        status: ReportStatus.PROCESSING,
        format: format,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        shopId: shop.id,
        fileName: fileNames[dataType] || `${dataType}-report`,
        fileSize: 0,
      },
    });

    let reportContent: string | Buffer | null = null;
    let data: any[] | null = null;

    try {
      switch (dataType) {
        case "ventes":
          data = await ShopifyOrderService.getOrders(admin, startDate, endDate);
          break;

        case "clients":
          data = await ShopifyCustomerService.getCustomers(admin, startDate, endDate);
          break;

        case "remboursements":
          data = await ShopifyRefundService.getRefunds(admin, startDate, endDate);
          break;

        case "taxes":
          data = await ShopifyTaxService.getTaxes(admin, startDate, endDate);
          break;
      }

      if (!data || data.length === 0) {
        hasEmptyData = true;
        await prisma.report.update({
          where: { id: report.id },
          data: { status: ReportStatus.COMPLETED_WITH_EMPTY_DATA },
        });
        console.log(`No data for ${dataType}, marking as COMPLETED_WITH_EMPTY_DATA.`);
        continue;
      }

      reportContent = ReportService.generateReport(
        data,
        fiscalRegime.code,
        format,
        dataType,
        fiscalRegime.separator,
      );

      if (!reportContent) {
        await prisma.report.update({
          where: { id: report.id },
          data: { status: ReportStatus.COMPLETED_WITH_EMPTY_DATA },
        });
        console.log(`Empty report content for ${dataType}, marking as COMPLETED_WITH_EMPTY_DATA.`);
        continue;
      }

      const filePath = join(exportDir, report.fileName);
      await fs.writeFile(filePath, reportContent);

      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.COMPLETED,
          filePath: filePath,
          fileSize: Buffer.byteLength(reportContent),
        },
      });

      savedFilePaths.push(filePath);
      createdReports.push(report);
      console.log(`Successfully generated report for ${dataType}: ${report.fileName}`);

    } catch (error) {
      console.error(`Error processing data type ${dataType}:`, error);
      hasEmptyData = true; // Consider it as an empty/failed case for UI feedback
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.ERROR,
          errorMessage: error instanceof Error ? error.message : String(error),
        },
      });
    }
  }

  // Create report record in database
  const report = await prisma.report.create({
    data: {
      type: "manual",
      dataType: Object.entries(dataTypes)
        .filter(([_, selected]) => selected)
        .map(([type]) => type)
        .join(","),
      shopId: session.shop,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      format: format,
      status: hasEmptyData ? ReportStatus.COMPLETED_WITH_EMPTY_DATA : ReportStatus.COMPLETED,
      fileSize: 0,
      fileName: Object.entries(dataTypes)
        .filter(([_, selected]) => selected)
        .map(([type]) => fileNames[type])
        .join(","),
      filePath: savedFilePaths.join(","),
      errorMessage: hasEmptyData ? "Some selected data types had no data in the selected date range" : null
    },
  });

  try {
    // If we have no saved files but have empty data, return a message
    if (savedFilePaths.length === 0 && hasEmptyData) {
      return json({
        message: "No data found for the selected date range",
        status: "EMPTY_DATA"
      }, { status: 200 });
    }

    // If we have no saved files and no empty data flag, something went wrong
    if (savedFilePaths.length === 0) {
      throw new Error('No reports were generated successfully');
    }

    // If only one file, return the file name for download
    if (savedFilePaths.length === 1) {
      const filePath = savedFilePaths[0];
      const fileName = Object.values(fileNames).find(name => !!name) || "export";
      // File is already saved, just return the file name for frontend to trigger download
      return json({ fileName });
    }

    // Otherwise, zip as before
    const zipFileName = `ledgerxport-${fiscalRegime.code}-${new Date().toISOString().replace(/[:.]/g, "-")}.zip`;
    const zipFilePath = join(exportDir, zipFileName);

    const zip = new JSZip();
    for (let i = 0; i < savedFilePaths.length; i++) {
      const filePath = savedFilePaths[i];
      const fileName = fileNames[Object.keys(dataTypes)[i]];
      const content = await fs.readFile(filePath);
      zip.file(fileName, content);
    }
    const zipContent = await zip.generateAsync({ type: "nodebuffer" });
    await fs.writeFile(zipFilePath, zipContent);

    const totalFileSize = await Promise.all(savedFilePaths.map(async (filePath) => {
      try {
        const stats = await fs.stat(filePath);
        return stats.size;
      } catch (error) {
        console.error(`Error getting file size for ${filePath}:`, error);
        return 0;
      }
    })).then(sizes => sizes.reduce((total, size) => total + size, 0));

    await prisma.report.update({
      where: { id: report.id },
      data: {
        status: hasEmptyData ? ReportStatus.COMPLETED_WITH_EMPTY_DATA : ReportStatus.COMPLETED,
        fileSize: totalFileSize
      }
    });

    return new Response(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${zipFileName}"`,
      },
    });
  } catch (error) {
    console.error('Error creating zip file:', error);
    await prisma.report.update({
      where: { id: report.id },
      data: {
        status: ReportStatus.ERROR,
        errorMessage: error instanceof Error ? error.message : "Unknown error occurred"
      }
    });
    return json({ error: "Failed to generate reports" }, { status: 500 });
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

  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>(fiscalRegime?.defaultFormat || ExportFormat.CSV);
  const [selectedSoftware, setSelectedSoftware] = useState(fiscalRegime?.compatibleSoftware?.[0] || "");

  const [fileNames, setFileNames] = useState({
    ventes: "",
    clients: "",
    remboursements: "",
    taxes: "",
  });

  // Update filename when data type is selected/deselected
  const handleDataTypeChange = useCallback((key: keyof typeof dataTypes) => {
    setDataTypes(prev => {
      const newDataTypes = { ...prev, [key]: !prev[key] };
      
      // Update filenames based on selection
      setFileNames(prev => {
        const newFileNames = { ...prev };
        if (newDataTypes[key]) {
          // Generate filename for newly selected type
          const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
          const format = selectedFormat.toLowerCase().replace(/^\./, '');
          newFileNames[key] = `ledgerxport-${fiscalRegime?.code || 'EXPORT'}-${key}-${selectedDates.start.toISOString().split('T')[0]}-${selectedDates.end.toISOString().split('T')[0]}-${timestamp}.${format}`;
        } else {
          // Clear filename for deselected type
          newFileNames[key] = "";
        }
        return newFileNames;
      });

      return newDataTypes;
    });
  }, [selectedDates, selectedFormat, fiscalRegime]);

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
    // For each selected data type, generate a filename with the current format
    setFileNames(prev => {
      const newFileNames = { ...prev };
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const cleanFormat = selectedFormat.startsWith('.') ? selectedFormat.substring(1) : selectedFormat;
      Object.entries(dataTypes).forEach(([key, isSelected]) => {
        if (isSelected) {
          newFileNames[key as keyof typeof newFileNames] =
            `ledgerxport-${fiscalRegime?.code || 'EXPORT'}-${key}-${formatDate(selectedDates.start)}-${formatDate(selectedDates.end)}-${timestamp}.${cleanFormat.toLowerCase()}`;
        } else {
          newFileNames[key as keyof typeof newFileNames] = "";
        }
      });
      return newFileNames;
    });
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

    // Validate filenames
    const selectedTypes = Object.entries(dataTypes)
      .filter(([_, selected]) => selected)
      .map(([type]) => type);

    for (const type of selectedTypes) {
      if (!fileNames[type as keyof typeof fileNames]) {
        alert(`Please wait for the filename to be generated for ${type}`);
        return;
      }
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
    formData.append("fileNames", JSON.stringify(fileNames));

    try {
      console.log("Submitting form data:", {
        startDate: selectedDates.start.toISOString(),
        endDate: selectedDates.end.toISOString(),
        dataTypes,
        format,
        software: selectedSoftware,
        fileNames
      });

      const response = await fetch('/app/reports/manual-export', {
        method: 'POST',
        body: formData
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      // Check if the response is JSON (error or empty data message)
      const contentType = response.headers.get('content-type');
      console.log("Response content type:", contentType);

      // Add check for HTML error responses
      if (contentType && (contentType.includes('application/json') || contentType.includes('text/html'))) {
        const data = await response.text();
        alert("Error: " + data);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      // Get the blob from the response
      const data = await response.json();
      if (data.fileName) {
        // Use a dynamic <a> to trigger the download natively
        const downloadUrl = `/api/reports/${encodeURIComponent(data.fileName)}/download`;
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.setAttribute('download', data.fileName); // optional, helps with some browsers
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
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
    <Page
      title="Export manuel"
      backAction={{ content: "Retour", url: "/app" }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <LegacyStack vertical spacing="loose">
                  <Text variant="headingMd" as="h2">
                    Période d'export
                  </Text>
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
                </LegacyStack>
                </div>

              <div className="p-4">
                <LegacyStack vertical spacing="loose">
                  <Text variant="headingMd" as="h2">
                    Types de données
                  </Text>
                <LegacyStack vertical spacing="tight">
                    {Object.entries(dataTypes).map(([key, value]) => (
                      <LegacyStack key={key} spacing="tight">
                  <Checkbox
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          checked={value}
                          onChange={() => handleDataTypeChange(key as keyof typeof dataTypes)}
                        />
                        {value && (
                          <TextField
                            label="Nom du fichier"
                            value={fileNames[key as keyof typeof fileNames]}
                            onChange={(value) => setFileNames(prev => ({ ...prev, [key]: value }))}
                            autoComplete="off"
                          />
                        )}
                </LegacyStack>
                    ))}
                  </LegacyStack>
                </LegacyStack>
              </div>

              {fiscalRegime && (
                <div className="p-4">
                  <Text as="h3" variant="headingMd">
                    Configuration fiscale
                  </Text>
                  <LegacyStack vertical spacing="tight">
                <Select
                      label="Format d'export"
                      options={fiscalRegime.exportFormats.map(format => ({
                        label: format.toUpperCase(),
                        value: format,
                      }))}
                      onChange={(value) => setSelectedFormat(value as ExportFormat)}
                  value={selectedFormat}
                />
                <Select
                      label="Logiciel compatible"
                      options={fiscalRegime.compatibleSoftware.map(software => ({
                        label: software,
                        value: software,
                      }))}
                  onChange={setSelectedSoftware}
                  value={selectedSoftware}
                    />
                  </LegacyStack>
                </div>
              )}

              <div className="p-4">
                  <BiSaveBtn title="Générer et télécharger l'export" />
                </div>
            </form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}