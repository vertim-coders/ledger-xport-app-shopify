import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate, useActionData } from "@remix-run/react";
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
  BlockStack,
  InlineStack,
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
import type { FiscalConfiguration as FiscalRegimePrismaType, ReportStatus as ReportStatusType, ExportFormat as ExportFormatType } from "@prisma/client";

// Import sécurisé de FiscalConfiguration, ReportStatus et ExportFormat
const FiscalRegimePrisma = {};

const ReportStatus = {
  PENDING: "PENDING" as const,
  PROCESSING: "PROCESSING" as const,
  COMPLETED: "COMPLETED" as const,
  COMPLETED_WITH_EMPTY_DATA: "COMPLETED_WITH_EMPTY_DATA" as const,
  ERROR: "ERROR" as const
};

const ExportFormat = {
  CSV: "CSV" as const,
  XLSX: "XLSX" as const,
  JSON: "JSON" as const,
  XML: "XML" as const
};
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
import { getMimeType, downloadFilesFromResults, downloadZipFromResults } from "../utils/download";
import React from 'react';
import { BluePolarisCheckbox } from "../components/Buttons/BluePolarisCheckbox";

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

// Composant utilitaire pour l'icône d'aide (version unicode)
const HelpIcon = ({ description }: { description: string }) => {
  const [active, setActive] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        style={{
          marginLeft: 6,
          cursor: 'pointer',
          color: '#0670fa',
          fontWeight: 'bold',
          fontSize: 14,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 16,
          height: 16,
          textAlign: 'center',
          borderRadius: '50%',
          border: '1px solid #0670fa',
          background: '#f4f8ff',
          lineHeight: '16px',
        }}
        onClick={() => setActive((a) => !a)}
        title="Aide"
      >
        ?
      </span>
      {active && (
        <div
          style={{
            position: 'absolute',
            top: 22,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            border: '1px solid #e3e3e3',
            borderRadius: 6,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            padding: 12,
            zIndex: 100,
            minWidth: 180,
            maxWidth: 320,
            fontSize: 13,
          }}
          onClick={e => e.stopPropagation()}
        >
          <span>{description}</span>
          <span
            style={{
              position: 'absolute',
              top: 4,
              right: 8,
              cursor: 'pointer',
              color: '#0670fa',
              fontWeight: 'bold',
              fontSize: 13,
            }}
            onClick={() => setActive(false)}
          >×</span>
        </div>
      )}
    </span>
  );
};

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

  let finalDefaultFormat: ExportFormatType | undefined;
  if (fiscalConfig.defaultFormat) {
    finalDefaultFormat = fiscalConfig.defaultFormat;
  } else if (matchingFiscalRegimeData.fileFormat) {
    finalDefaultFormat = matchingFiscalRegimeData.fileFormat.replace('.', '').toUpperCase() as ExportFormatType;
  }

  let finalExportFormats: ExportFormatType[];
  if (fiscalConfig.exportFormats && fiscalConfig.exportFormats.length > 0) {
    // Map Prisma's string[] to ExportFormat[]
    finalExportFormats = fiscalConfig.exportFormats.map((format: string) => format.toUpperCase() as ExportFormatType);
        } else {
    // Map JSON's string[] to ExportFormat[]
    finalExportFormats = matchingFiscalRegimeData.exportFormats.map(
      (format: string) => format.toUpperCase() as ExportFormatType
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
  try {
    const { admin, session } = await authenticate.admin(request);
    const formData = await request.formData();
    
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const fiscalRegimeId = formData.get("fiscalRegimeId") as string; // Keep for validation if needed, though unused in the new flow
    const dataTypes = JSON.parse(formData.get("dataTypes") as string);
    const format = formData.get("format") as ExportFormatType;
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
        
        // Read the generated file content
        let fileContent: string | Buffer;
        if (report.filePath) {
          fileContent = await fs.readFile(report.filePath);
        } else {
          throw new Error('File was not generated');
        }

        results.push({
          status: 'success',
          dataType,
          reportId: report.id,
          fileName: report.fileName,
          reportStatus: report.status,
          fileContent: fileContent.toString('base64'), // Encode file content as base64
          mimeType: getMimeType(format)
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
  } catch (error: any) {
    console.error('Action error:', error);
    return json({ 
      error: "Internal server error", 
      message: error.message || 'An unknown error occurred',
      results: []
    }, { status: 500 });
  }
};

export default function ManualExportPage() {
  const { fiscalRegime } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

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

  const [selectedFormat, setSelectedFormat] = useState<ExportFormatType>(fiscalRegime?.defaultFormat || ExportFormat.CSV);
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

  const [isGenerating, setIsGenerating] = useState(false);

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

  // Handle action response and trigger downloads
  useEffect(() => {
    if (actionData) {
      setIsGenerating(false);
      console.log("Action data received:", actionData);
      
      // Check if it's an error response
      if ('error' in actionData) {
        setToastMessage(`Erreur: ${actionData.error}`);
        setToastError(true);
        setToastActive(true);
        return;
      }

      // Check if it's a success response with results
      if ('results' in actionData && actionData.results && actionData.results.length > 0) {
        if (actionData.results.length > 1) {
          downloadZipFromResults(actionData.results, "export-rapports.zip");
          setToastMessage(`Rapport(s) généré(s) et téléchargé(s) avec succès (${actionData.results.length} fichiers dans un ZIP)`);
          setToastError(false);
          setToastActive(true);
        } else {
        const downloadedCount = downloadFilesFromResults(actionData.results);
        if (downloadedCount > 0) {
          setToastMessage(`Rapport(s) généré(s) et téléchargé(s) avec succès (${downloadedCount} fichier(s))`);
          setToastError(false);
          setToastActive(true);
        } else {
          setToastMessage("Aucun rapport généré");
          setToastError(true);
          setToastActive(true);
          }
        }
      } else {
        setToastMessage("Aucun rapport généré");
        setToastError(true);
        setToastActive(true);
      }
    }
  }, [actionData]);

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
    setIsGenerating(true);
    // Validate that at least one data type is selected
    if (!Object.values(dataTypes).some(value => value === true)) {
      alert('Please select at least one data type');
      setIsGenerating(false);
      return;
    }

    // Validate filenames
    const selectedTypes = Object.entries(dataTypes)
      .filter(([_, selected]) => selected)
      .map(([type]) => type);

    for (const type of selectedTypes) {
      if (!fileNames[type as keyof typeof fileNames]) {
        alert(`Please wait for the filename to be generated for ${type}`);
        setIsGenerating(false);
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

    console.log("Submitting form data:", {
      startDate: selectedDates.start.toISOString(),
      endDate: selectedDates.end.toISOString(),
      dataTypes,
      format,
      software: selectedSoftware,
      fileNames
    });

    // Use Remix's useSubmit instead of fetch
    submit(formData, { method: "post" });
  };

  // Determine the selected data type for dynamic column display
  const selectedDataTypeForDisplay = Object.entries(dataTypes).find(([, value]) => value === true)?.[0] as keyof typeof dataTypes | undefined;
  const displayedColumns = selectedDataTypeForDisplay 
    ? generateMappingsFrontend(fiscalRegime, selectedDataTypeForDisplay) 
    : [];

  return (
    <>
      <style>{`
        .Polaris-Checkbox__Input:checked + .Polaris-Checkbox__Backdrop .Polaris-Checkbox__Icon {
          color: #0066FF !important;
          fill: #0066FF !important;
        }
      `}</style>
    <Page
      title="Export manuel"
      backAction={{ content: "Retour", url: "/app" }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <BlockStack gap="400">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Text variant="headingMd" as="h1"> Période d'export </Text>
                    <HelpIcon description="Choisissez la période sur laquelle vous souhaitez générer un export. Les dates futures ne sont pas autorisées." />
                  </span>
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
                        disableDatesAfter={new Date()}
                            allowRange
                      />
                </BlockStack>
                </div>

              <div className="p-4">
                <BlockStack gap="400">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: '10px' }}>
                    <Text variant="headingMd" as="h1">Types de données</Text>
                    <HelpIcon description="Sélectionnez les types de données à exporter : ventes, clients, remboursements ou taxes. Vous pouvez en choisir plusieurs." />
                  </span>
                <BlockStack gap="200">
                    {Object.entries(dataTypes).map(([key, value]) => (
                      <InlineStack key={key} gap="200">
                    <BluePolarisCheckbox
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          checked={value}
                          onChange={() => handleDataTypeChange(key as keyof typeof dataTypes)}
                        />
                        {value && (
                          <div style={{ marginLeft: 32, minWidth: 320 }}>
                          <TextField
                              label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>Nom du fichier<HelpIcon description="Nom du fichier généré pour ce type de données. Vous pouvez le personnaliser." /></span>}
                            value={fileNames[key as keyof typeof fileNames]}
                            onChange={(value) => setFileNames(prev => ({ ...prev, [key]: value }))}
                            autoComplete="off"
                          />
                          </div>
                        )}
                </InlineStack>
                    ))}
                  </BlockStack>
                </BlockStack>
              </div>

              {fiscalRegime && (
                <div className="p-4">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: '10px', marginBottom: '8px' }}>
                    <Text variant="headingMd" as="h1">Configuration fiscale</Text>
                  </span>
                  <BlockStack gap="200">
                <Select
                      label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><b>Format d'export</b><HelpIcon description="Choisissez le format de fichier pour l'exportation : CSV, Excel, JSON ou XML." /></span>}
                      options={fiscalRegime.exportFormats.map(format => ({
                        label: format.toUpperCase(),
                        value: format,
                      }))}
                      onChange={(value) => setSelectedFormat(value as ExportFormatType)}
                  value={selectedFormat}
                />
                <Select
                      label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: '8px' }}><b>Logiciel compatible</b><HelpIcon description="Sélectionnez le logiciel cible pour lequel l'export sera compatible (ex : Sage, Odoo, QuickBooks, etc.)." /></span>}
                      options={fiscalRegime.compatibleSoftware.map(software => ({
                        label: software,
                        value: software,
                      }))}
                  onChange={setSelectedSoftware}
                  value={selectedSoftware}
                    />
                  </BlockStack>
                </div>
              )}

                <div className="p-4" style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
                   <BiSaveBtn title="Générer et télécharger l'export" isLoading={isGenerating} />
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
    </>
  );
}