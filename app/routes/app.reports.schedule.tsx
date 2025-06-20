import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  DatePicker,
  Text,
  Checkbox,
  LegacyStack,
  Button,
  Tag,
  InlineStack,
  Toast,
  Frame,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { BiSaveBtn } from "../components/Buttons/BiSaveBtn";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import * as XLSX from 'xlsx';
import { ReportStatus, ExportFormat } from "@prisma/client";
import { ShopifyCustomerService } from "../models/ShopifyCustomer.service";
import { ShopifyOrderService } from "../models/ShopifyOrder.service";
import { ShopifyRefundService } from "../models/ShopifyRefund.service";
import { ShopifyTaxService } from "../models/ShopifyTax.service";
import { MappingService } from "../services/mapping.service";
import { ReportService } from "../services/report.service";
import type { ColumnMapping } from "../types/ColumnMappingType";
import type { ReportMapping } from "../types/ReportMappingType";

// Default mappings for different data types
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

// Column descriptions
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

// Function to generate mappings based on fiscal regime
function generateMappings(fiscalRegime: any, dataType: string): ReportMapping {
  const typeMapping = defaultMappings[dataType] || {};
  const columns: ColumnMapping[] = fiscalRegime.requiredColumns.map((column: string) => ({
    requiredColumn: column,
    shopifyField: typeMapping[column] || '',
    description: columnDescriptions[column] || column,
    isRequired: true,
    defaultValue: getDefaultValue(column, dataType, fiscalRegime),
    validation: getValidation(column)
  }));

  return {
    dataType,
    columns,
    journalCode: getJournalCode(dataType),
    defaultAccount: getDefaultAccount(dataType, fiscalRegime)
  };
}

function getDefaultValue(column: string, dataType: string, fiscalRegime: any): string {
  // Add default value logic based on column and data type
  switch (column) {
    case 'Journal':
      return getJournalCode(dataType);
    case 'Compte général':
      return getDefaultAccount(dataType, fiscalRegime);
    case 'Crédit':
      return dataType === 'taxes' ? '0' : '';
    case 'Débit':
      return dataType === 'taxes' ? '0' : '';
    default:
      return '';
  }
}

function getValidation(column: string): ((value: any) => boolean) | undefined {
  // Add validation logic based on column
  switch (column) {
    case 'Date':
      return (value: any) => !isNaN(Date.parse(value));
    case 'Débit':
    case 'Crédit':
      return (value: any) => !isNaN(parseFloat(value));
    default:
      return undefined;
  }
}

function getJournalCode(dataType: string): string {
  switch (dataType) {
    case 'ventes':
      return 'VT';
    case 'clients':
      return 'CL';
    case 'remboursements':
      return 'RB';
    case 'taxes':
      return 'TX';
    default:
      return '';
  }
}

function getDefaultAccount(dataType: string, fiscalRegime: any): string {
  switch (dataType) {
    case 'ventes':
      return fiscalRegime.salesAccount || '70700000';
    case 'clients':
      return fiscalRegime.customerAccount || '41100000';
    case 'remboursements':
      return fiscalRegime.refundAccount || '70800000';
    case 'taxes':
      return fiscalRegime.taxAccount || '44566000';
    default:
      return '';
  }
}

function validateAndMapData(data: any[], mapping: ReportMapping): any[] {
  return data.map(item => {
    const mappedRow: any = {};
    mapping.columns.forEach(column => {
      let value = '';
      
      // Get the value from the Shopify field
      if (column.shopifyField) {
        const fields = column.shopifyField.split('.');
        value = fields.reduce((obj: any, field: string) => {
          if (field.includes('[]')) {
            const arrayField = field.replace('[]', '');
            return obj[arrayField]?.[0] || '';
          }
          return obj[field] || '';
        }, item);
      }

      // Apply validation if exists
      if (column.validation && !column.validation(value)) {
        value = column.defaultValue || '';
      }

      // If no value and default exists, use default
      if (!value && column.defaultValue) {
        value = column.defaultValue;
      }

      mappedRow[column.requiredColumn] = value;
    });

    return mappedRow;
  });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    include: { fiscalConfig: true },
  });

  // Get current date and date 30 days ago for the date range
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  // Fetch data from all services
  const customers = await ShopifyCustomerService.getCustomers(admin, startDate.toISOString(), endDate.toISOString());
  const orders = await ShopifyOrderService.getOrders(admin, startDate.toISOString(), endDate.toISOString());
  const refunds = await ShopifyRefundService.getRefunds(admin, startDate.toISOString(), endDate.toISOString());
  const taxes = await ShopifyTaxService.getTaxes(admin, startDate.toISOString(), endDate.toISOString());

  // Log the data to console
  console.log("Customers data:", customers);
  console.log("Orders data:", orders);
  console.log("Refunds data:", refunds);
  console.log("Taxes data:", taxes);

  return json({
    shop,
    data: {
      customers,
      orders,
      refunds,
      taxes
    }
  });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    const formData = await request.formData();
    
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);
    const dataTypes = JSON.parse(formData.get("dataTypes") as string);
    const fileFormat = formData.get("fileFormat") as string;
    const reportName = formData.get("reportName") as string;
    const actionType = formData.get("actionType") as string;

    // Get the shop and fiscal regime from the database
    const shop = await prisma.shop.findUnique({
      where: { shopifyDomain: session.shop },
      include: { fiscalConfig: true }
    });

    if (!shop || !shop.fiscalConfig) {
      return json({ error: "Shop or fiscal regime not found" }, { status: 400 });
    }

    // Create a new report record
    const report = await prisma.report.create({
      data: {
        type: "scheduled",
        dataType: Object.entries(dataTypes)
          .filter(([_, value]) => value === true)
          .map(([key]) => key)
          .join(','),
        status: ReportStatus.PROCESSING,
        format: fileFormat as ExportFormat,
        startDate,
        endDate,
        shopId: shop.id,
        fileSize: 0,
        fileName: reportName || `${Object.entries(dataTypes)
          .filter(([_, value]) => value === true)
          .map(([key]) => key)
          .join('_')}_${startDate.toISOString()}_${endDate.toISOString()}.${fileFormat.toLowerCase()}`,
      }
    });

    try {
      // Create export directory if it doesn't exist
      const exportDir = join(process.cwd(), 'exports', shop.id);
      await mkdir(exportDir, { recursive: true });

      // Fetch data based on selected types
      let fetchedData: any = {};
      if (dataTypes.ventes) {
        fetchedData.orders = await ShopifyOrderService.getOrders(admin, startDate.toISOString(), endDate.toISOString());
      }
      if (dataTypes.clients) {
        fetchedData.customers = await ShopifyCustomerService.getCustomers(admin, startDate.toISOString(), endDate.toISOString());
      }
      if (dataTypes.remboursements) {
        fetchedData.refunds = await ShopifyRefundService.getRefunds(admin, startDate.toISOString(), endDate.toISOString());
      }
      if (dataTypes.taxes) {
        fetchedData.taxes = await ShopifyTaxService.getTaxes(admin, startDate.toISOString(), endDate.toISOString());
      }

      // Generate report content
      const reportContent = await generateReport(fetchedData, shop.fiscalConfig, fileFormat, shop.fiscalConfig.separator || ',');

      if (!reportContent) {
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
      const filePath = join(exportDir, `${report.fileName}`);
      await writeFile(filePath, reportContent);

      // Update report status to COMPLETED if everything went well
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.COMPLETED,
          fileSize: Buffer.byteLength(reportContent),
          filePath: filePath
        }
      });

      // If this is a generate and download action, return the file
      if (actionType === "generate") {
        // Set appropriate headers for file download
        const headers = new Headers();
        const contentType = {
          "CSV": "text/csv",
          "JSON": "application/json",
          "TXT": "text/plain",
          "XML": "application/xml",
          "XLSX": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }[fileFormat.toUpperCase()] || "application/octet-stream";
        
        headers.set("Content-Type", contentType);
        headers.set("Content-Disposition", `attachment; filename="${report.fileName}"`);
        headers.set("Content-Length", Buffer.byteLength(reportContent).toString());
        headers.set("Cache-Control", "no-cache");
        headers.set("Pragma", "no-cache");

        return new Response(reportContent, { 
          headers,
          status: 200
        });
      }

      // If this is a schedule action, create a scheduled task
      if (actionType === "schedule") {
        const emailConfig = JSON.parse(formData.get("emailConfig") as string);
        const frequency = formData.get("frequency") as string;
        const executionDay = parseInt(formData.get("executionDay") as string);
        const executionTime = formData.get("executionTime") as string;

        // Create a scheduled task record
        const scheduledTask = await prisma.scheduledTask.create({
          data: {
            reportId: report.id,
            shopId: shop.id,
            frequency,
            executionDay,
            executionTime,
            emailConfig: JSON.stringify(emailConfig),
            lastRun: null,
            nextRun: calculateNextRun(frequency, executionDay, executionTime),
            status: "ACTIVE"
          }
        });

        // If it's a daily task and it should run today, schedule it immediately
        if (frequency === "daily" && shouldRunToday(executionTime)) {
          await scheduleImmediateTask(scheduledTask.id, shop.id, report.id, emailConfig);
        }
      }

      // For schedule action, just return success
      return json({ success: true });

    } catch (error) {
      // Update the report record with failed status and error message
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.ERROR,
          errorMessage: error instanceof Error ? error.message : String(error)
        }
      });

      throw error;
    }

  } catch (error) {
    console.error('Error in schedule report action:', error);
    return json({ 
      error: "An error occurred while processing your request",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
};

// Function to generate report content
function generateReport(data: any, fiscalRegime: any, fileFormat: string, separator: string): string | Buffer {
  const requiredColumns = fiscalRegime.requiredColumns;
  let allData: any[] = [];

  // Process each data type using MappingService
  if (data.orders) {
    data.orders.forEach((order: any) => {
      const mappedData = MappingService.mapData(order, fiscalRegime.code, 'ventes');
      if (Array.isArray(mappedData)) {
        allData.push(...mappedData);
      } else {
        allData.push(mappedData);
        }
      });
  }

  if (data.customers) {
    data.customers.forEach((customer: any) => {
      const mappedData = MappingService.mapData(customer, fiscalRegime.code, 'clients');
      if (Array.isArray(mappedData)) {
        allData.push(...mappedData);
      } else {
        allData.push(mappedData);
    }
    });
  }

  if (data.refunds) {
    data.refunds.forEach((refund: any) => {
      const mappedData = MappingService.mapData(refund, fiscalRegime.code, 'remboursements');
      if (Array.isArray(mappedData)) {
        allData.push(...mappedData);
      } else {
        allData.push(mappedData);
      }
    });
  }

  if (data.taxes) {
    data.taxes.forEach((tax: any) => {
      const mappedData = MappingService.mapData(tax, fiscalRegime.code, 'taxes');
      if (Array.isArray(mappedData)) {
        allData.push(...mappedData);
      } else {
        allData.push(mappedData);
      }
    });
  }

  // Sort data by date if date column exists
  if (allData.length > 0 && 'Date' in allData[0]) {
    allData.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
  }

  // Generate the report based on file format
  switch (fileFormat.toUpperCase()) {
    case 'CSV':
      const csvRows = [
        requiredColumns.join(separator),
        ...allData.map(row => requiredColumns.map((col: string) => row[col] || '').join(separator))
      ];
      return csvRows.join('\n');

    case 'XLSX':
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(allData);
      XLSX.utils.book_append_sheet(wb, ws, 'Report');
      return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    case 'JSON':
      return JSON.stringify(allData, null, 2);

    default:
      throw new Error(`Unsupported file format: ${fileFormat}`);
  }
}

// Helper function to calculate the next run time
function calculateNextRun(frequency: string, executionDay: number, executionTime: string): Date {
  const now = new Date();
  const [hours, minutes] = executionTime.split(':').map(Number);
  
  let nextRun = new Date(now);
  nextRun.setHours(hours, minutes, 0, 0);

  switch (frequency) {
    case "daily":
      if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
      break;
    case "monthly":
      nextRun.setDate(executionDay);
      if (nextRun <= now) {
        nextRun.setMonth(nextRun.getMonth() + 1);
      }
      break;
    case "yearly":
      nextRun.setDate(executionDay);
      nextRun.setMonth(0); // January
      if (nextRun <= now) {
        nextRun.setFullYear(nextRun.getFullYear() + 1);
      }
      break;
  }

  return nextRun;
}

// Helper function to check if a daily task should run today
function shouldRunToday(executionTime: string): boolean {
  const now = new Date();
  const [hours, minutes] = executionTime.split(':').map(Number);
  const executionDate = new Date(now);
  executionDate.setHours(hours, minutes, 0, 0);
  
  return executionDate > now;
}

// Function to schedule an immediate task
async function scheduleImmediateTask(taskId: string, shopId: string, reportId: string, emailConfig: any) {
  try {
    // Create a task record
    await prisma.task.create({
      data: {
        scheduledTaskId: taskId,
        shopId,
        reportId,
        status: "PENDING",
        scheduledFor: new Date(),
        emailConfig: JSON.stringify(emailConfig)
      }
    });
  } catch (error) {
    console.error('Error scheduling immediate task:', error);
  }
}

export default function ScheduleReport() {
  const { shop, data } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigate = useNavigate();
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    console.log("All data from services:", data);
    console.log("Customers:", data.customers);
    console.log("Orders:", data.orders);
    console.log("Refunds:", data.refunds);
    console.log("Taxes:", data.taxes);
  }, [data]);

  // Report name state
  const [reportName, setReportName] = useState("");
  const [reportNameFormat, setReportNameFormat] = useState("ledgerxport-{type}-{date}.{format}");

  // Date range states
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Data types states
  const [dataTypes, setDataTypes] = useState({
    ventes: false,
    clients: false,
    remboursements: false,
    taxes: false,
  });

  // File format state
  const [fileFormat, setFileFormat] = useState("CSV");

  // Scheduling type state
  const [schedulingType, setSchedulingType] = useState("email");

  // Email configuration states
  const [emailConfig, setEmailConfig] = useState({
    to: [] as string[],
    cc: [] as string[],
    bcc: [] as string[],
    replyTo: [] as string[],
  });

  const [emailInputs, setEmailInputs] = useState({
    to: "",
    cc: "",
    bcc: "",
    replyTo: "",
  });

  // Frequency states
  const [frequency, setFrequency] = useState("daily");
  const [executionDay, setExecutionDay] = useState("1");
  const [executionTime, setExecutionTime] = useState("09:00");

  // Helper function to format date as YYYYMMDD
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}${month}${day}`;
  };

  // Update report name when format or dates change
  useEffect(() => {
    if (reportNameFormat) {
      const startDateStr = formatDate(selectedDates.start);
      const endDateStr = formatDate(selectedDates.end);
      const selectedTypes = Object.entries(dataTypes)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join('-');

      let name = reportNameFormat
        .replace('{type}', selectedTypes || 'all')
        .replace('{date}', `${startDateStr}-${endDateStr}`)
        .replace('{format}', fileFormat.toLowerCase());

      setReportName(name);
    }
  }, [reportNameFormat, selectedDates, dataTypes, fileFormat]);

  const handleDateSelection = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setSelectedDates({ start, end });
      setShowDatePicker(false);
    },
    []
  );

  const handleDataTypeChange = useCallback((type: string, checked: boolean) => {
    setDataTypes((prev) => ({ ...prev, [type]: checked }));
  }, []);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleEmailInputChange = useCallback((field: string, value: string) => {
    setEmailInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleEmailKeyDown = useCallback((field: string, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const email = emailInputs[field as keyof typeof emailInputs].trim();
      
      if (email && isValidEmail(email)) {
        setEmailConfig(prev => ({
          ...prev,
          [field]: [...prev[field as keyof typeof prev], email]
        }));
        setEmailInputs(prev => ({ ...prev, [field]: "" }));
      }
    }
  }, [emailInputs]);

  const removeEmail = useCallback((field: string, emailToRemove: string) => {
    setEmailConfig(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter(email => email !== emailToRemove)
    }));
  }, []);

  const handleGenerateAndDownload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("reportName", reportName);
    formData.append("startDate", selectedDates.start.toISOString());
    formData.append("endDate", selectedDates.end.toISOString());
    formData.append("dataTypes", JSON.stringify(dataTypes));
    formData.append("fileFormat", fileFormat);
    formData.append("actionType", "generate");

    try {
      setToastMessage("Génération du rapport en cours...");
      setToastActive(true);

      const response = await fetch('/app/reports/schedule', {
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
      link.download = reportName;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);

      setToastMessage("Rapport généré et téléchargé avec succès");
      setToastActive(true);
    } catch (error) {
      console.error('Error downloading report:', error);
      setToastMessage("Erreur lors de la génération du rapport");
      setToastActive(true);
    }
  };

  const handleSchedule = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Validate required To recipients
    if (emailConfig.to.length === 0) {
      setToastMessage("Au moins un destinataire (To) est requis");
      setToastActive(true);
      return;
    }

    const formData = new FormData();
    formData.append("reportName", reportName);
    formData.append("startDate", selectedDates.start.toISOString());
    formData.append("endDate", selectedDates.end.toISOString());
    formData.append("dataTypes", JSON.stringify(dataTypes));
    formData.append("fileFormat", fileFormat);
    formData.append("actionType", "schedule");
    if (schedulingType === "email") {
      formData.append("emailConfig", JSON.stringify(emailConfig));
    }
    formData.append("frequency", frequency);
    formData.append("executionDay", executionDay);
    formData.append("executionTime", executionTime);

    try {
      setToastMessage("Planification du rapport en cours...");
      setToastActive(true);

      const response = await fetch('/app/reports/schedule', {
        method: 'POST',
        body: formData,
        credentials: 'include' // This ensures cookies are sent with the request
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to schedule report');
      }

      setToastMessage("Rapport planifié avec succès");
      setToastActive(true);
      navigate("/app/dashboard");
    } catch (error) {
      console.error('Error scheduling report:', error);
      setToastMessage("Erreur lors de la planification du rapport");
      setToastActive(true);
    }
  };

  const toastMarkup = toastActive ? (
    <Toast
      content={toastMessage}
      onDismiss={() => setToastActive(false)}
    />
  ) : null;

  // Replace TimePicker with a Select for time
  const timeOptions = Array.from({ length: 24 }, (_, hour) => {
    const formattedHour = hour.toString().padStart(2, '0');
    return [
      { label: `${formattedHour}:00`, value: `${formattedHour}:00` },
      { label: `${formattedHour}:30`, value: `${formattedHour}:30` },
    ];
  }).flat();

  return (
    <Frame>
      <Page title="Planifier un rapport">
        <Layout>
          <Layout.Section>
            <Card>
              <form onSubmit={handleGenerateAndDownload}>
                <FormLayout>
                  {/* Report Name */}
                  <TextField
                    label="Nom du rapport"
                    value={reportName}
                    onChange={setReportName}
                    autoComplete="off"
                  />

                  {/* Report Name Format */}
                  <div>
                    <Text variant="headingMd" as="h2">Format du nom du rapport</Text>
                    <LegacyStack vertical spacing="tight">
                      <TextField
                        label="Format"
                        value={reportNameFormat}
                        onChange={setReportNameFormat}
                        helpText="Utilisez {type} pour les types de données, {date} pour la période, et {format} pour le format du fichier"
                        autoComplete="off"
                      />
                      <Text variant="bodyMd" as="p">
                        Nom généré: <strong>{reportName}</strong>
                      </Text>
                    </LegacyStack>
                  </div>

                  {/* Date Range */}
                  <div>
                    <Text variant="headingMd" as="h2">Période du rapport</Text>
                    <div style={{ position: 'relative' }}>
                      <Button
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        fullWidth
                      >
                        {`Du ${selectedDates.start.toLocaleDateString()} au ${selectedDates.end.toLocaleDateString()}`}
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
                            onChange={handleDateSelection}
                            allowRange
                            multiMonth={false}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Data Types */}
                  <div>
                    <Text variant="headingMd" as="h2">Types de données</Text>
                    <LegacyStack vertical spacing="tight">
                      <Checkbox
                        label="Ventes"
                        checked={dataTypes.ventes}
                        onChange={(checked) => handleDataTypeChange('ventes', checked)}
                      />
                      <Checkbox
                        label="Clients"
                        checked={dataTypes.clients}
                        onChange={(checked) => handleDataTypeChange('clients', checked)}
                      />
                      <Checkbox
                        label="Remboursements"
                        checked={dataTypes.remboursements}
                        onChange={(checked) => handleDataTypeChange('remboursements', checked)}
                      />
                      <Checkbox
                        label="Taxes"
                        checked={dataTypes.taxes}
                        onChange={(checked) => handleDataTypeChange('taxes', checked)}
                      />
                    </LegacyStack>
                  </div>

                  {/* File Format */}
                  <Select
                    label="Format du fichier"
                    options={[
                      { label: 'CSV', value: 'CSV' },
                      { label: 'Excel (XLSX)', value: 'XLSX' },
                      { label: 'JSON', value: 'JSON' },
                      { label: 'XML', value: 'XML' },
                    ]}
                    value={fileFormat}
                    onChange={setFileFormat}
                  />

                  {/* Scheduling Type */}
                  <Select
                    label="Type de réception"
                    options={[
                      { label: 'Email', value: 'email' },
                      { label: 'FTP', value: 'ftp' },
                      { label: 'Drive', value: 'drive' },
                      { label: 'Sheet', value: 'sheet' },
                    ]}
                    value={schedulingType}
                    onChange={setSchedulingType}
                  />

                  {/* Email Configuration */}
                  {schedulingType === "email" && (
                    <div>
                      <Text variant="headingMd" as="h2">Configuration Email</Text>
                      <LegacyStack vertical spacing="loose">
                        <div>
                          <Text variant="bodyMd" as="p" fontWeight="bold">
                            Destinataires (To) <span style={{ color: 'red' }}>*</span>
                          </Text>
                          <div style={{ marginBottom: '8px' }}>
                            {emailConfig.to.map((email, index) => (
                              <Tag key={index} onRemove={() => removeEmail('to', email)}>
                                {email}
                              </Tag>
                            ))}
                          </div>
                          <input
                            type="email"
                            value={emailInputs.to}
                            onChange={(e) => handleEmailInputChange('to', e.target.value)}
                            onKeyDown={(e) => handleEmailKeyDown('to', e)}
                            placeholder="Entrez une adresse email et appuyez sur Entrée"
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        <div>
                          <Text variant="bodyMd" as="p" fontWeight="bold">Copie (CC) - Optionnel</Text>
                          <div style={{ marginBottom: '8px' }}>
                            {emailConfig.cc.map((email, index) => (
                              <Tag key={index} onRemove={() => removeEmail('cc', email)}>
                                {email}
                              </Tag>
                            ))}
                          </div>
                          <input
                            type="email"
                            value={emailInputs.cc}
                            onChange={(e) => handleEmailInputChange('cc', e.target.value)}
                            onKeyDown={(e) => handleEmailKeyDown('cc', e)}
                            placeholder="Entrez une adresse email et appuyez sur Entrée (optionnel)"
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        <div>
                          <Text variant="bodyMd" as="p" fontWeight="bold">Copie cachée (BCC) - Optionnel</Text>
                          <div style={{ marginBottom: '8px' }}>
                            {emailConfig.bcc.map((email, index) => (
                              <Tag key={index} onRemove={() => removeEmail('bcc', email)}>
                                {email}
                              </Tag>
                            ))}
                          </div>
                          <input
                            type="email"
                            value={emailInputs.bcc}
                            onChange={(e) => handleEmailInputChange('bcc', e.target.value)}
                            onKeyDown={(e) => handleEmailKeyDown('bcc', e)}
                            placeholder="Entrez une adresse email et appuyez sur Entrée (optionnel)"
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}
                          />
                        </div>

                        <div>
                          <Text variant="bodyMd" as="p" fontWeight="bold">Répondre à (Reply To) - Optionnel</Text>
                          <div style={{ marginBottom: '8px' }}>
                            {emailConfig.replyTo.map((email, index) => (
                              <Tag key={index} onRemove={() => removeEmail('replyTo', email)}>
                                {email}
                              </Tag>
                            ))}
                          </div>
                          <input
                            type="email"
                            value={emailInputs.replyTo}
                            onChange={(e) => handleEmailInputChange('replyTo', e.target.value)}
                            onKeyDown={(e) => handleEmailKeyDown('replyTo', e)}
                            placeholder="Entrez une adresse email et appuyez sur Entrée (optionnel)"
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                      </LegacyStack>
                    </div>
                  )}

                  {/* Right Column - Frequency Settings */}
                  <div>
                    <Text variant="headingMd" as="h2">Fréquence</Text>
                    <LegacyStack vertical spacing="loose">
                      <Select
                        label="Fréquence"
                        options={[
                          { label: 'Quotidien', value: 'daily' },
                          { label: 'Mensuel', value: 'monthly' },
                          { label: 'Annuel', value: 'yearly' },
                        ]}
                        value={frequency}
                        onChange={setFrequency}
                      />

                      <Select
                        label="Jour d'exécution"
                        options={Array.from({ length: 31 }, (_, i) => ({
                          label: `${i + 1}`,
                          value: `${i + 1}`,
                        }))}
                        value={executionDay}
                        onChange={setExecutionDay}
                        disabled={frequency === 'daily'}
                      />

                      <Select
                        label="Heure d'exécution"
                        options={timeOptions}
                        value={executionTime}
                        onChange={setExecutionTime}
                      />
                    </LegacyStack>
                  </div>

                  {/* Bottom Buttons */}
                  <div style={{ marginTop: '32px' }}>
                    <LegacyStack distribution="equalSpacing">
                      <Button
                        onClick={() => window.history.back()}
                        variant="plain"
                        tone="critical"
                      >
                        Annuler
                      </Button>
                      <LegacyStack spacing="tight">
                        <Button
                          onClick={() => handleGenerateAndDownload(new Event('submit') as any)}
                          variant="primary"
                        >
                          Générer et télécharger
                        </Button>
                        <Button
                          onClick={() => handleSchedule(new Event('submit') as any)}
                          variant="primary"
                        >
                          Planifier automatiquement
                        </Button>
                      </LegacyStack>
                    </LegacyStack>
                  </div>
                </FormLayout>
              </form>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
      {toastMarkup}
    </Frame>
  );
} 