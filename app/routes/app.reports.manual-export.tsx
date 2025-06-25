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
  Toast,
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
  
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const fiscalRegimeId = formData.get("fiscalRegimeId") as string; // Keep for validation if needed, though unused in the new flow
  const dataTypes = JSON.parse(formData.get("dataTypes") as string);
  const format = formData.get("format") as ExportFormat;
  const fileNames = JSON.parse(formData.get("fileNames") as string);

  if (!startDate || !endDate || !fiscalRegimeId || !format) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    include: { fiscalConfig: true }
  });

  if (!shop || !shop.fiscalConfig) {
    return json({ error: "Shop or fiscal configuration not found" }, { status: 404 });
  }

  const reportService = new ReportService(admin);

  const results = [];
  const selectedDataTypes = Object.entries(dataTypes)
        .filter(([_, selected]) => selected)
    .map(([type]) => type);

  for (const dataType of selectedDataTypes) {
    try {
      const report = await reportService.generateAndSaveReport({
        shop,
        dataType,
        format,
        startDate,
        endDate,
        fileName: fileNames[dataType],
        type: 'manual'
      });
      results.push({
        status: 'success',
        dataType,
        reportId: report.id,
        fileName: report.fileName,
        reportStatus: report.status,
      });
    } catch (error: any) {
      console.error(`Failed to generate report for ${dataType}:`, error);
      results.push({
        status: 'error',
        dataType,
        message: error.message || 'An unknown error occurred'
      });
    }
  }

  return json({ results });
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

  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);

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

      // if (!response.ok) {
      //   setToastMessage("Erreur lors de la génération du rapport");
      //   setToastError(true);
      //   setToastActive(true);
      //   return;
      // }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const successResult = data.results.find((r: any) => r.status === 'success');
        if (successResult && successResult.reportId && successResult.fileName) {
          setToastMessage("Rapport généré avec succès");
          setToastError(false);
          setToastActive(true);
          return;
        }
      }
      setToastMessage("Aucun rapport généré");
      setToastError(true);
      setToastActive(true);
    } catch (error) {
      setToastMessage("Erreur lors de la génération du rapport");
      setToastError(true);
      setToastActive(true);
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
      {toastActive && (
        <Toast
          content={toastMessage}
          onDismiss={() => setToastActive(false)}
          error={toastError}
        />
      )}
    </Page>
  );
}