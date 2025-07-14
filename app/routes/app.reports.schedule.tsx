import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate, useActionData } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Text,
  LegacyStack,
  Tag,
  Toast,
  Frame,
  Popover,
  Icon,
  Text as PolarisText,
  Banner,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { BiSimpleBtn } from "../components/Buttons/BiSimpleBtn";
import { OrderIcon, CalendarIcon } from "@shopify/polaris-icons";
import type { ReportStatus as ReportStatusType, ExportFormat as ExportFormatType } from "@prisma/client";
import { useTranslation } from 'react-i18next';

// Import sécurisé d'ReportStatus et ExportFormat
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
import { ShopifyCustomerService } from "../models/ShopifyCustomer.service";
import { ShopifyOrderService } from "../models/ShopifyOrder.service";
import { ShopifyRefundService } from "../models/ShopifyRefund.service";
import { ShopifyTaxService } from "../models/ShopifyTax.service";
import { ReportService } from "../services/report.service";
import { getMimeType, downloadFilesFromResults, downloadZipFromResults } from "../utils/download";
import { BluePolarisCheckbox } from "../components/Buttons/BluePolarisCheckbox";
import { BiBtn } from "../components/Buttons/BiBtn";
import Footer from "../components/Footer";

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

// Helper function to format date as YYYYMMDD
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}

// Composant utilitaire pour l'icône d'aide
import React from 'react';
const HelpIcon = ({ description }: { description: string }) => {
  const [active, setActive] = React.useState(false);
  return (
    <Popover
      active={active}
      activator={
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
      }
      onClose={() => setActive(false)}
      preferredAlignment="left"
    >
      <div style={{ maxWidth: 320, padding: 12 }}>
        <PolarisText as="span" variant="bodyMd">{description}</PolarisText>
      </div>
    </Popover>
  );
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    include: { fiscalConfig: true },
  });

  const ftpConfig = await prisma.ftpConfig.findUnique({
    where: { shopId: session.shop }
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
    ftpConfig,
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
    
    // Log all form fields for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`Form field: ${key} = ${value}`);
    }

    const dataTypes = JSON.parse(formData.get("dataTypes") as string);
    const fileFormat = formData.get("fileFormat") as string;
    const actionType = formData.get("actionType") as string;
    const schedulingType = formData.get("schedulingType") as string;
    const reportNames = JSON.parse(formData.get("reportNames") as string);

    // DEBUG: Log the received dataTypes and reportNames
    console.log('dataTypes:', dataTypes);
    console.log('reportNames:', reportNames);

    // For generate action, we need start/end dates
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    
    if (actionType === "generate") {
      startDate = new Date(formData.get("startDate") as string);
      endDate = new Date(formData.get("endDate") as string);
    }

    // Validate required scheduling fields if scheduling
    if (actionType === "schedule") {
      if (!schedulingType) {
        return json({ error: "Missing schedulingType" }, { status: 400 });
      }
      if (schedulingType === "email") {
        const emailConfig = formData.get("emailConfig");
        const frequency = formData.get("frequency");
        const executionDay = formData.get("executionDay");
        const executionTime = formData.get("executionTime");
        if (!emailConfig || !frequency || !executionDay || !executionTime) {
          return json({ error: "Missing one or more required scheduling fields (emailConfig, frequency, executionDay, executionTime)" }, { status: 400 });
        }
      }
    }

    // Get the shop and fiscal regime from the database
    const shop = await prisma.shop.findUnique({
      where: { shopifyDomain: session.shop },
      include: { fiscalConfig: true }
    });

    if (!shop || !shop.fiscalConfig) {
      return json({ error: "Shop or fiscal regime not found" }, { status: 400 });
    }

    if (actionType === "schedule") {
      // Vérifier qu'un seul type de données est sélectionné
      const selectedTypes = Object.entries(dataTypes).filter(([_, isSelected]) => isSelected);
      if (selectedTypes.length !== 1) {
        return json({ error: "Vous ne pouvez planifier qu'un seul type de données à la fois. Veuillez en sélectionner un seul." }, { status: 400 });
      }

      // Create a report record with status PENDING (no file yet)
      // For scheduled reports, we don't save startDate/endDate as they'll be calculated dynamically
      const report = await prisma.report.create({
        data: {
          type: "scheduled",
          dataType: Object.entries(dataTypes)
            .filter(([_, value]) => value === true)
            .map(([key]) => key)
            .join(','),
          status: ReportStatus.PENDING,
          format: fileFormat as ExportFormatType,
          startDate: null, // Will be calculated dynamically by worker
          endDate: null,   // Will be calculated dynamically by worker
          shopId: shop.id,
          fileSize: 0,
          fileName: (Object.values(reportNames).find(name => !!name) as string) || "export",
          deliveryMethod: formData.get("schedulingType") as string, // Sauvegarde de la méthode de livraison
        }
      });

      // Create the scheduled task for both email and ftp
      if (schedulingType === "email" || schedulingType === "ftp") {
        // For FTP, we need to ensure the config exists
        if (schedulingType === "ftp") {
          const ftpConfig = await prisma.ftpConfig.findUnique({ where: { shopId: shop.id } });
          if (!ftpConfig) {
            // Remove the report if scheduling fails
            await prisma.report.delete({ where: { id: report.id } });
            return json({ error: "Configuration FTP manquante. Veuillez configurer le FTP dans les paramètres." }, { status: 400 });
          }
        }
        const frequency = formData.get("frequency") as string;
        const executionDay = parseInt(formData.get("executionDay") as string);
        const executionTime = formData.get("executionTime") as string;
        await prisma.scheduledTask.create({
          data: {
            reportId: report.id,
            shopId: shop.id,
            frequency,
            executionDay,
            executionTime,
            emailConfig: schedulingType === "email" ? (formData.get("emailConfig") as string) : "",
            lastRun: null,
            nextRun: calculateNextRun(frequency, executionDay, executionTime),
            status: "ACTIVE"
          }
        });
      }
      return json({ success: true });
    }

    // For generate action, we need start/end dates
    if (!startDate || !endDate) {
      return json({ error: "Start date and end date are required for immediate generation" }, { status: 400 });
    }

    // Helper to fetch data with compatibility for both admin clients
    async function fetchShopifyData(serviceFn: any, ...args: any[]) {
      return await serviceFn(admin, ...args);
    }

    // Correction : Générer un fichier pour CHAQUE type sélectionné
    const savedFiles: { fileName: string; content: Buffer | string }[] = [];
    let hasEmptyData = false;

    for (const [dataType, isSelected] of Object.entries(dataTypes)) {
      if (!isSelected) continue;

      let data: any[] | null = null;
      switch (dataType) {
        case "ventes":
          data = await fetchShopifyData(ShopifyOrderService.getOrders, startDate.toISOString(), endDate.toISOString());
          break;
        case "clients":
          data = await fetchShopifyData(ShopifyCustomerService.getCustomers, startDate.toISOString(), endDate.toISOString());
          break;
        case "remboursements":
          data = await fetchShopifyData(ShopifyRefundService.getRefunds, startDate.toISOString(), endDate.toISOString());
          break;
        case "taxes":
          data = await fetchShopifyData(ShopifyTaxService.getTaxes, startDate.toISOString(), endDate.toISOString());
          break;
      }

      if (!data || data.length === 0) {
        hasEmptyData = true;
        continue;
      }

      const reportContent = ReportService.generateReport(
        data,
        shop.fiscalConfig.code,
        fileFormat as ExportFormatType,
        dataType,
        shop.fiscalConfig.separator
      );

      if (!reportContent) {
        hasEmptyData = true;
        continue;
      }

      // Correction : Utiliser le bon nom pour chaque type
      const fileName = reportNames[dataType] || `${dataType}_${startDate.toISOString()}_${endDate.toISOString()}.${fileFormat.toLowerCase()}`;
      // Save to 'reports-schedule' directory
      // const exportDir = join(process.cwd(), 'reports-schedule');
      // await mkdir(exportDir, { recursive: true });
      // const filePath = join(exportDir, fileName);
      // await writeFile(filePath, reportContent);
      // savedFiles.push({ filePath, fileName, content: reportContent });
      savedFiles.push({ fileName, content: reportContent });
    }

    // Si aucun fichier généré
    if (savedFiles.length === 0) {
      return json({ error: "No data found for the selected types" }, { status: 400 });
    }

    // Correction : Retourner TOUS les fichiers générés dans results
    if (actionType === "generate") {
      const results = [];
      for (const savedFile of savedFiles) {
        const { fileName, content } = savedFile;
        const mimeType = getMimeType(fileFormat as ExportFormatType);
        let base64Content: string;
        try {
          if (Buffer.isBuffer(content)) {
            base64Content = content.toString('base64');
          } else if (typeof content === 'string') {
            base64Content = Buffer.from(content, 'utf8').toString('base64');
          } else {
            base64Content = Buffer.from(String(content), 'utf8').toString('base64');
          }
        } catch (error) {
          base64Content = '';
        }
        results.push({
          status: 'success',
          dataType: 'generated',
          fileName: fileName,
          fileContent: base64Content,
          mimeType: mimeType
        });
      }
      return json({ results });
    }

    // Create report record in database
    const report = await prisma.report.create({
      data: {
        type: "scheduled",
        dataType: Object.entries(dataTypes)
          .filter(([_, value]) => value === true)
          .map(([key]) => key)
          .join(','),
        status: ReportStatus.PROCESSING,
        format: fileFormat as ExportFormatType,
        startDate, // Save the actual dates for immediate generation
        endDate,   // Save the actual dates for immediate generation
        shopId: shop.id,
        fileSize: 0,
        fileName: savedFiles[0].fileName, // Use the actual generated file name
      }
    });

    try {
      // Update report status to COMPLETED if everything went well
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: ReportStatus.COMPLETED,
          fileSize: savedFiles.reduce((total, { content }) => total + Buffer.byteLength(content), 0),
          filePath: savedFiles.map(({ fileName }) => fileName).join(',')
        }
      });

      // If this is a generate and download action, return JSON with file content
      if (actionType === "generate") {
        const results = [];
        
        for (const savedFile of savedFiles) {
          const { fileName, content } = savedFile;
          const mimeType = getMimeType(fileFormat as ExportFormatType);
          
          console.log(`Processing file: ${fileName}`);
          console.log(`Content type: ${typeof content}`);
          console.log(`Content length: ${content.length || 'N/A'}`);
          console.log(`Is Buffer: ${Buffer.isBuffer(content)}`);
          
          // Ensure content is properly converted to base64
          let base64Content: string;
          try {
            if (Buffer.isBuffer(content)) {
              base64Content = content.toString('base64');
            } else if (typeof content === 'string') {
              base64Content = Buffer.from(content, 'utf8').toString('base64');
            } else {
              base64Content = Buffer.from(String(content), 'utf8').toString('base64');
            }
          } catch (error) {
            // Plus de fallback disque : on laisse base64Content vide
            base64Content = '';
          }
          
          console.log(`Base64 content length: ${base64Content.length}`);
          console.log(`Base64 content preview: ${base64Content.substring(0, 50)}...`);
          
          results.push({
            status: 'success',
            dataType: 'generated',
            reportId: report.id,
            fileName: fileName,
            reportStatus: ReportStatus.COMPLETED,
            fileContent: base64Content,
            mimeType: mimeType
          });
        }
        
        return json({ results });
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

// Helper function to calculate the next run time
function calculateNextRun(frequency: string, executionDay: number, executionTime: string): Date {
  const now = new Date();
  const [hours, minutes] = executionTime.split(':').map(Number);
  let nextRun = new Date(now);
  nextRun.setSeconds(0, 0);
  switch (frequency) {
    case "hourly":
      nextRun.setHours(now.getHours(), minutes, 0, 0);
      if (nextRun <= now) {
        nextRun.setHours(nextRun.getHours() + 1);
      }
      break;
    case "daily":
      nextRun.setHours(hours, minutes, 0, 0);
      if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
      break;
    case "monthly":
      nextRun.setDate(executionDay);
      nextRun.setHours(hours, minutes, 0, 0);
      if (nextRun <= now) {
        nextRun.setMonth(nextRun.getMonth() + 1);
      }
      break;
    case "yearly":
      nextRun.setDate(executionDay);
      nextRun.setMonth(0); // January
      nextRun.setHours(hours, minutes, 0, 0);
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
  const { shop, data, ftpConfig } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const navigate = useNavigate();
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("EMAIL");

  // Action type state to track whether user is generating or scheduling
  const [actionType, setActionType] = useState<'generate' | 'schedule'>('generate');

  const { t } = useTranslation();

  useEffect(() => {
    console.log("All data from services:", data);
    console.log("Customers:", data.customers);
    console.log("Orders:", data.orders);
    console.log("Refunds:", data.refunds);
    console.log("Taxes:", data.taxes);
  }, [data]);

  // Handle action response and trigger downloads
  useEffect(() => {
    if (!actionData) return;
      setIsGenerating(false);
      console.log("Action data received:", actionData);
      
    // Erreur générique
    if ('error' in actionData && actionData.error) {
        setToastMessage(t('toast.error', 'Erreur: {error}', { error: actionData.error }));
        setToastError(true);
        setToastActive(true);
        return;
      }

    // Génération immédiate : gestion des résultats
    if (actionType === 'generate' && 'results' in actionData) {
      const results = (actionData as any).results;
      if (Array.isArray(results) && results.length > 0) {
        if (results.length > 1) {
          downloadZipFromResults(results, "export-rapports.zip");
          setToastMessage(t('toast.success', 'Rapport(s) généré(s) et téléchargé(s) avec succès ({count} fichiers dans un ZIP)', { count: results.length }));
          setToastError(false);
          setToastActive(true);
        } else {
          const downloadedCount = downloadFilesFromResults(results);
        if (downloadedCount > 0) {
          setToastMessage(t('toast.success', 'Rapport(s) généré(s) et téléchargé(s) avec succès ({count} fichier(s))', { count: downloadedCount }));
          setToastError(false);
          setToastActive(true);
        } else {
          setToastMessage(t('toast.noReport', 'Aucun rapport généré'));
          setToastError(true);
          setToastActive(true);
        }
        }
      } else {
        setToastMessage(t('toast.noReport', 'Aucun rapport généré'));
        setToastError(true);
        setToastActive(true);
      }
    }
    // Planification : toast succès uniquement si success === true
    if (actionType === 'schedule' && 'success' in actionData && actionData.success === true) {
      setToastMessage(t('toast.success', 'Planification enregistrée avec succès'));
      setToastError(false);
      setToastActive(true);
      setTimeout(() => {
        navigate('/app/dashboard');
      }, 1000);
    }
  }, [actionData, actionType, navigate, t]);

  // Report name state
  const [reportNames, setReportNames] = useState<{ [key: string]: string }>({
    ventes: "",
    clients: "",
    remboursements: "",
    taxes: "",
  });
  // Report name state for schedule
  const [reportNamesSchedule, setReportNamesSchedule] = useState<{ [key: string]: string }>({
    ventes: "",
    clients: "",
    remboursements: "",
    taxes: "",
  });
  // Touched state for schedule names
  const [reportNamesScheduleTouched, setReportNamesScheduleTouched] = useState<{ [key: string]: boolean }>({
    ventes: false,
    clients: false,
    remboursements: false,
    taxes: false,
  });

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

  // States for month/year of the date picker
  const [datePickerMonth, setDatePickerMonth] = useState(new Date().getMonth());
  const [datePickerYear, setDatePickerYear] = useState(new Date().getFullYear());

  // Frequency states
  const [frequency, setFrequency] = useState("daily");
  const [executionDay, setExecutionDay] = useState("1");
  const [executionTime, setExecutionTime] = useState("09:00");

  // Update report names when file format changes
  useEffect(() => {
    setReportNames(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (updated[key]) {
          // Replace the extension with the new file format
          updated[key] = updated[key].replace(/\.[a-zA-Z0-9]+$/, '') + '.' + fileFormat.toLowerCase();
        }
      });
      return updated;
    });
  }, [fileFormat]);

  // Update report names when dates or file format changes
  useEffect(() => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const formattedStartDate = formatDate(selectedDates.start);
    const formattedEndDate = formatDate(selectedDates.end);
    const fiscalCode = shop?.fiscalConfig?.code || 'EXPORT';

    setReportNames(prev => {
      const newReportNames = { ...prev };
      Object.entries(dataTypes).forEach(([key, isSelected]) => {
        if (isSelected) {
          // For now, we'll use the generate format as default
          // The actual format will be determined when the user clicks Generate or Schedule
          newReportNames[key] = `ledgerxport-${fiscalCode}-${DATA_TYPE_LABELS[key as keyof typeof DATA_TYPE_LABELS]}-${formattedStartDate}-${formattedEndDate}-${timestamp}.${fileFormat.toLowerCase()}`;
        }
      });
      return newReportNames;
    });
  }, [selectedDates, dataTypes, shop?.fiscalConfig?.code, fileFormat]);

  // Mettre à jour le nom de planification si format, fréquence ou régime change et que le champ n'a pas été touché
  useEffect(() => {
    Object.entries(dataTypes).forEach(([key, isSelected]) => {
      if (isSelected && !reportNamesScheduleTouched[key]) {
        const fiscalCode = shop?.fiscalConfig?.code || 'EXPORT';
        setReportNamesSchedule(prev => ({
          ...prev,
          [key]: `ledgerxport-${fiscalCode}-${DATA_TYPE_LABELS[key as keyof typeof DATA_TYPE_LABELS]}-${frequency}.${fileFormat.toLowerCase()}`
        }));
      }
    });
    // eslint-disable-next-line
  }, [fileFormat, frequency, shop?.fiscalConfig?.code]);

  // Function to generate report name based on action type
  const generateReportName = (dataType: string, actionType: 'generate' | 'schedule'): string => {
    const fiscalCode = shop?.fiscalConfig?.code || 'EXPORT';
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const dataTypeLabel = DATA_TYPE_LABELS[dataType as keyof typeof DATA_TYPE_LABELS] || dataType;
    
    if (actionType === 'generate') {
      // For Generate: include period dates
      const formattedStartDate = formatDate(selectedDates.start);
      const formattedEndDate = formatDate(selectedDates.end);
      return `ledgerxport-${fiscalCode}-${dataTypeLabel}-${formattedStartDate}-${formattedEndDate}-${timestamp}.${fileFormat.toLowerCase()}`;
    } else {
      // For Schedule: include frequency instead of dates
      return `ledgerxport-${fiscalCode}-${dataTypeLabel}-${frequency}.${fileFormat.toLowerCase()}`;
    }
  };

  const handleDataTypeChange = (key: string, checked: boolean) => {
    setDataTypes(prev => ({ ...prev, [key]: checked }));
    
    // Update report names when data type changes
    if (checked) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const formattedStartDate = formatDate(selectedDates.start);
      const formattedEndDate = formatDate(selectedDates.end);
      const fiscalCode = shop?.fiscalConfig?.code || 'EXPORT';
      setReportNames(prev => ({
        ...prev,
        [key]: `ledgerxport-${fiscalCode}-${DATA_TYPE_LABELS[key as keyof typeof DATA_TYPE_LABELS]}-${formattedStartDate}-${formattedEndDate}-${timestamp}.${fileFormat.toLowerCase()}`
      }));
      setReportNamesSchedule(prev => {
        if (!reportNamesScheduleTouched[key] && !prev[key]) {
          return {
            ...prev,
            [key]: `ledgerxport-${fiscalCode}-${DATA_TYPE_LABELS[key as keyof typeof DATA_TYPE_LABELS]}-${frequency}.${fileFormat.toLowerCase()}`
          };
        }
        return prev;
      });
    } else {
      setReportNames(prev => ({ ...prev, [key]: "" }));
      setReportNamesSchedule(prev => ({ ...prev, [key]: "" }));
      setReportNamesScheduleTouched(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleMonthChange = useCallback(
    (month: number, year: number) => {
      setDatePickerMonth(month);
      setDatePickerYear(year);
    },
    [],
  );

  const handleDateSelection = ({start, end}: {start: Date, end: Date}) => {
    setSelectedDates({start, end});
    setShowDatePicker(false);
  };

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
    setIsGenerating(true);
    
    // Generate report names with the correct format for immediate generation
    const generateReportNames: { [key: string]: string } = {};
    Object.entries(dataTypes).forEach(([key, isSelected]) => {
      if (isSelected) {
        generateReportNames[key] = reportNames[key] || generateReportName(key, 'generate');
      }
    });
    
    const formData = new FormData();
    formData.append("startDate", selectedDates.start.toISOString());
    formData.append("endDate", selectedDates.end.toISOString());
    formData.append("dataTypes", JSON.stringify(dataTypes));
    formData.append("fileFormat", fileFormat);
    formData.append("actionType", "generate");
    formData.append("reportNames", JSON.stringify(generateReportNames));

    console.log("Submitting form data for generation:", {
      startDate: selectedDates.start.toISOString(),
      endDate: selectedDates.end.toISOString(),
      dataTypes,
      fileFormat,
      actionType: "generate",
      reportNames: generateReportNames
    });

    // Use Remix's useSubmit instead of fetch
    submit(formData, { method: "post" });
  };

  const handleSchedule = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Vérifier qu'un seul type de données est sélectionné
    const selectedTypes = Object.entries(dataTypes).filter(([_, isSelected]) => isSelected);
    if (selectedTypes.length !== 1) {
      setToastMessage(t('toast.error', 'Vous ne pouvez planifier qu\'un seul type de données à la fois. Veuillez en sélectionner un seul.'));
      setToastError(true);
      setToastActive(true);
      setActionType('generate'); // S'assurer que le mode repasse en génération immédiate
      return;
    }

    // Validate required To recipients
    if (schedulingType === 'email' && emailConfig.to.length === 0) {
      setToastMessage(t('toast.error', 'Au moins un destinataire (To) est requis'));
      setToastActive(true);
      return;
    }

    // Generate report names with the correct format for scheduling
    const scheduleReportNames: { [key: string]: string } = {};
    Object.entries(dataTypes).forEach(([key, isSelected]) => {
      if (isSelected) {
        scheduleReportNames[key] = reportNamesSchedule[key] || generateReportName(key, 'schedule');
      }
    });

    const formData = new FormData();
    formData.append("reportNames", JSON.stringify(scheduleReportNames));
    // For scheduled reports, we don't send start/end dates as they will be calculated dynamically
    formData.append("dataTypes", JSON.stringify(dataTypes));
    formData.append("fileFormat", fileFormat);
    formData.append("actionType", "schedule");
    formData.append("schedulingType", schedulingType);
    // Always send frequency, executionDay, executionTime for both email and ftp
      formData.append("frequency", frequency);
      formData.append("executionDay", executionDay);
    let actualExecutionTime = executionTime;
    if (frequency === 'hourly') {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      actualExecutionTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    }
    formData.append("executionTime", actualExecutionTime);
    if (schedulingType === "email") {
      formData.append("emailConfig", JSON.stringify(emailConfig));
    }

    console.log("Submitting form data for scheduling:", {
      dataTypes,
      fileFormat,
      actionType: "schedule",
      schedulingType,
      reportNames: scheduleReportNames
    });

    // Use Remix's useSubmit instead of fetch
    submit(formData, { method: "post" });
  };

  const toastMarkup = toastActive ? (
    <Toast
      content={toastMessage}
      onDismiss={() => setToastActive(false)}
      error={toastError}
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

  const Separator = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0' }}>
      <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#c9ccce' }} />
      <span style={{ padding: '0 16px', color: '#007ace', fontWeight: 'bold', textTransform: 'uppercase' }}>
        {title}
      </span>
      <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#c9ccce' }} />
    </div>
  );

  const handleSchedulingTypeChange = useCallback((value: string) => {
    setSchedulingType(value);
    if (value === "ftp" && !ftpConfig) {
      setError(
        t('toast.error', 'La configuration FTP est requise. Veuillez la configurer dans les paramètres avant de planifier.', { error: t('toast.ftpConfigRequired', 'La configuration FTP est requise. Veuillez la configurer dans les paramètres avant de planifier.') }),
      );
    } else {
      setError("");
    }
  }, [ftpConfig, t]);

  // Ajout des clés de traduction pour les types de données
  const DATA_TYPE_LABELS = {
    ventes: t('dataType.ventes', 'Ventes'),
    clients: t('dataType.clients', 'Clients'),
    remboursements: t('dataType.remboursements', 'Remboursements'),
    taxes: t('dataType.taxes', 'Taxes'),
  };

  // Ajout des labels de fréquence traduits
  const FREQUENCY_OPTIONS = [
    { label: t('schedule.frequency.daily', 'Quotidien'), value: 'daily' },
    { label: t('schedule.frequency.weekly', 'Hebdomadaire'), value: 'weekly' },
    { label: t('schedule.frequency.monthly', 'Mensuel'), value: 'monthly' },
    { label: t('schedule.frequency.yearly', 'Annuel'), value: 'yearly' },
  ];

  return (
    <>
      <style>{`
        .Polaris-Checkbox__Input:checked + .Polaris-Checkbox__Backdrop .Polaris-Checkbox__Icon {
          color: #0066FF !important;
          fill: #0066FF !important;
        }
      `}</style>
    <Frame>
      <Page title={t('schedule.title', 'Planifier un rapport')}>
        <Layout>
          <Layout.Section>
            <Card>
              <form>
                <FormLayout>
                  {/* On retire la période du rapport */}

                  <Separator title={t('schedule.reportContent', 'Contenu du rapport')} />

                  {/* Data Types */}
                  <div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: '8px' }}>
                      <Text variant="headingMd" as="h1">{t('schedule.dataTypes', 'Types de données')}</Text>
                      <HelpIcon description={t('schedule.dataTypesHelp', 'Sélectionnez les types de données à exporter : ventes, clients, remboursements ou taxes. Vous pouvez en choisir plusieurs.')} />
                    </span>
                    <LegacyStack vertical spacing="tight">
                      {Object.entries(dataTypes).map(([key, value]) => (
                        <LegacyStack key={key} spacing="tight">
                            <BluePolarisCheckbox
                            label={DATA_TYPE_LABELS[key as keyof typeof DATA_TYPE_LABELS]}
                            checked={value}
                            onChange={(checked) => handleDataTypeChange(key, checked)}
                          />
                          {/* On retire le champ Nom du rapport (génération) */}
                          {value && (
                            <div style={{ display: 'flex', gap: 16, marginLeft: 32, alignItems: 'center' }}>
                              <div style={{ minWidth: 320 }}>
                                <TextField
                                  label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{t('schedule.reportName', 'Nom du rapport (planification)')}<HelpIcon description={t('schedule.help.reportName', "Nom du fichier généré lors d'une exportation planifiée. Vous pouvez le personnaliser.")} /></span>}
                                  value={reportNamesSchedule[key as keyof typeof reportNamesSchedule]}
                                  onChange={(val) => {
                                    setReportNamesSchedule(prev => ({ ...prev, [key]: val }));
                                    setReportNamesScheduleTouched(prev => ({ ...prev, [key]: true }));
                                  }}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          )}
                        </LegacyStack>
                      ))}
                    </LegacyStack>
                  </div>

                  {/* File Format */}
                  <Select
                    label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Text variant="headingMd" as="h1">{t('schedule.fileFormat', 'Format du fichier')}</Text><HelpIcon description={t('schedule.help.fileFormat', "Choisissez le format de fichier pour l'exportation : CSV, Excel, JSON ou XML.")} /></span>}
                    options={[
                      { label: 'CSV', value: 'CSV' },
                      { label: 'Excel (XLSX)', value: 'XLSX' },
                      { label: 'JSON', value: 'JSON' },
                      { label: 'XML', value: 'XML' },
                    ]}
                    value={fileFormat}
                    onChange={setFileFormat}
                  />

                  <Separator title={t('schedule.scheduling', 'Planification')} />

                  {/* Scheduling Type */}
                  <Select
                    label={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Text variant="headingMd" as="h1">{t('schedule.deliveryType', 'Type de réception')}</Text><HelpIcon description={t('schedule.help.deliveryType', "Choisissez comment vous souhaitez recevoir le rapport planifié : par email, FTP, Google Drive ou Google Sheet.")} /></span>}
                    options={[
                      { label: t('schedule.deliveryType.email', 'Email'), value: 'email' },
                      { label: t('schedule.deliveryType.ftp', 'FTP'), value: 'ftp' },
                      { label: t('schedule.deliveryType.drive', 'Drive'), value: 'drive' },
                      { label: t('schedule.deliveryType.sheet', 'Sheet'), value: 'sheet' },
                    ]}
                    value={schedulingType}
                    onChange={handleSchedulingTypeChange}
                  />

                  {/* Affiche une bannière d'erreur si FTP n'est pas configuré */}
                  {error && (
                    <div style={{ marginTop: '16px' }}>
                      <Banner
                        title={t('toast.ftpConfigRequired', 'Configuration FTP requise')}
                        tone="critical"
                        action={{ content: t('action.goToSettings', 'Aller aux paramètres'), url: '/app/settings/general' }}
                        onDismiss={() => setError('')}
                      >
                        <p>
                          {t('toast.ftpConfigExplanation', 'Vous devez configurer vos paramètres FTP avant de pouvoir')}
                          {t('toast.ftpConfigExplanation2', 'planifier un export par ce biais.')}
                        </p>
                      </Banner>
                    </div>
                  )}

                  {/* Affiche une bannière de succès si FTP est configuré */}
                  {schedulingType === "ftp" && ftpConfig && !error && (
                    <div style={{ marginTop: '16px' }}>
                      <Banner
                        title={t('toast.ftpConfigured', 'FTP configuré')}
                        tone="success"
                      >
                        <p>
                          {t('toast.ftpConfiguredExplanation', 'La configuration FTP est prête. Vous pouvez lancer la planification d\'un export par FTP.')}
                        </p>
                      </Banner>
                    </div>
                  )}

                  {/* Email Configuration */}
                  {schedulingType === "email" && (
                    <div>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: '8px' }}>
                        <Text variant="headingMd" as="h1">{t('schedule.emailConfig', 'Configuration Email')}</Text>
                        <HelpIcon description={t('schedule.help.emailConfig', "Configurez les destinataires et options d'envoi pour recevoir automatiquement les rapports par email.")} />
                      </span>
                      <LegacyStack vertical spacing="loose">
                        <div>
                          <Text variant="bodyMd" as="p" fontWeight="bold">
                            {t('schedule.recipients.to', 'Destinataires (To)')} <span style={{ color: 'red' }}>*</span>
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
                            placeholder={t('schedule.recipients.toPlaceholder', 'Entrez une adresse email et appuyez sur Entrée')}
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
                          <Text variant="bodyMd" as="p" fontWeight="bold">{t('schedule.recipients.cc', 'Copie (CC) - Optionnel')}</Text>
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
                            placeholder={t('schedule.recipients.ccPlaceholder', 'Entrez une adresse email et appuyez sur Entrée (optionnel)')}
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
                          <Text variant="bodyMd" as="p" fontWeight="bold">{t('schedule.recipients.bcc', 'Copie cachée (BCC) - Optionnel')}</Text>
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
                            placeholder={t('schedule.recipients.bccPlaceholder', 'Entrez une adresse email et appuyez sur Entrée (optionnel)')}
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
                          <Text variant="bodyMd" as="p" fontWeight="bold">{t('schedule.recipients.replyTo', 'Répondre à (Reply To) - Optionnel')}</Text>
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
                            placeholder={t('schedule.recipients.replyToPlaceholder', 'Entrez une adresse email et appuyez sur Entrée (optionnel)')}
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

                  {schedulingType === 'email' && <Separator title={t('schedule.frequency', 'Fréquence')} />}

                  {/* Right Column - Frequency Settings */}
                  <div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Text variant="headingMd" as="h2">{t('schedule.frequency', 'Fréquence')}</Text>
                      <HelpIcon description={t('schedule.help.frequency', 'Choisissez la fréquence d\'exécution du rapport.')} />
                    </span>
                    <LegacyStack vertical spacing="loose">
                      <Select
                        label={t('schedule.frequency', 'Fréquence')}
                        options={FREQUENCY_OPTIONS}
                        value={frequency}
                        onChange={setFrequency}
                      />

                        {frequency !== 'hourly' && (
                      <Select
                        label={t('schedule.executionDay', "Jour d'exécution")}
                        options={Array.from({ length: 31 }, (_, i) => ({
                          label: `${i + 1}`,
                          value: `${i + 1}`,
                        }))}
                        value={executionDay}
                        onChange={setExecutionDay}
                        disabled={frequency === 'daily'}
                      />
                        )}

                        {/* Heure d'exécution */}
                        {frequency !== 'hourly' && (
                      <Select
                        label={t('schedule.executionTime', "Heure d'exécution")}
                        options={timeOptions}
                        value={executionTime}
                        onChange={setExecutionTime}
                      />
                        )}
                    </LegacyStack>
                  </div>

                    {frequency === 'hourly' && (
                      <Banner tone="info" title={t('schedule.banner.hourly', 'Planification toutes les heures')}>
                        <p>
                          {t('schedule.banner.hourlyExplanation', 'L\'envoi du rapport sera effectué chaque heure, à la même minute que la planification initiale.')}
                          <br />
                          {t('schedule.banner.hourlyExample', 'Exemple : si vous planifiez à 14:23, l\'envoi se fera chaque heure à xx:23.')}
                        </p>
                      </Banner>
                    )}

                  {/* Bottom Buttons */}
                  <div style={{ marginTop: '32px' }}>
                    <LegacyStack distribution="equalSpacing">
                        <BiBtn
                          title={t('action.cancel', 'Annuler')}
                          onClick={() => navigate('/app/dashboard')}
                        />
                      <LegacyStack spacing="tight">
                        <div style={{ minWidth: 160 }}>
                          {/* Le bouton de génération redirige vers la page de génération */}
                          <BiSimpleBtn
                            title={t('action.generateReport', 'Générer un rapport')}
                            icon={<Icon source={OrderIcon} tone="inherit" />}
                            onClick={() => navigate('/app/reports/manual-export')}
                          />
                        </div>
                        <div style={{ minWidth: 160 }}>
                          <BiSimpleBtn
                            title={t('action.scheduleAutomatically', 'Planifier automatiquement')}
                            icon={<Icon source={CalendarIcon} tone="inherit" />}
                            onClick={() => {
                              setActionType('schedule');
                              handleSchedule(new Event('submit') as any);
                            }}
                          />
                        </div>
                      </LegacyStack>
                    </LegacyStack>
                  </div>
                </FormLayout>
              </form>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Footer />
          </Layout.Section>
        </Layout>
      </Page>
      {toastMarkup}
    </Frame>
    </>
  );
} 