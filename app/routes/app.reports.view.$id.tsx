import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  DataTable,
  Text,
  BlockStack,
  InlineStack,
  Toast,
  Icon,
} from "@shopify/polaris";
import { ArrowDownIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { formatDate } from "../utils/date";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { XMLParser } from "fast-xml-parser";
import * as XLSX from "xlsx";
import Footer from '../components/Footer';

// Import sécurisé de ReportStatus
const ReportStatus = {
  PENDING: "PENDING" as const,
  PROCESSING: "PROCESSING" as const,
  COMPLETED: "COMPLETED" as const,
  COMPLETED_WITH_EMPTY_DATA: "COMPLETED_WITH_EMPTY_DATA" as const,
  ERROR: "ERROR" as const
};
import { useState } from "react";
import { downloadFileFromUrl } from "../utils/download";
import { ReportService } from "../services/report.service";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const reportId = params.id;

  if (!reportId) {
    throw new Response("Report ID is required", { status: 400 });
  }

  const report = await prisma.report.findUnique({
    where: { id: reportId },
    include: {
      shop: {
        include: {
          fiscalConfig: true
        }
      }
    },
  });

  if (!report) {
    throw new Response("Report not found", { status: 404 });
  }

  try {
    let reportData: Record<string, any>[] = [];
    let headings: string[] = [];

    // Si le rapport a un filePath, lire depuis le disque
    if (report.filePath) {
      console.log('Reading report from file:', report.filePath, 'format:', report.format);
      let fileContent: string | Buffer;
      if (report.format.toLowerCase() === 'xlsx') {
        fileContent = await fs.readFile(report.filePath); // Buffer pour XLSX
      } else {
        fileContent = await fs.readFile(report.filePath, 'utf-8'); // string pour texte
      }
      
      // Parse based on file format
      switch (report.format.toLowerCase()) {
        case 'txt': {
          const text = fileContent as string;
          const lines = text.split('\n');
          headings = lines[0].split('\t');
          reportData = lines.slice(1).map(line => {
            const values = line.split('\t');
            return headings.reduce((obj: Record<string, any>, heading, index) => {
              obj[heading] = values[index] || '';
              return obj;
            }, {});
          });
          break;
        }
        case 'csv': {
          const text = fileContent as string;
          reportData = parse(text, {
            columns: true,
            skip_empty_lines: true,
            delimiter: report.shop.fiscalConfig?.separator || ','
          });
          if (reportData.length > 0) {
            headings = Object.keys(reportData[0]);
          }
          break;
        }
        case 'json': {
          const text = fileContent as string;
          const jsonData = JSON.parse(text);
          // Handle different JSON structures
          if (Array.isArray(jsonData)) {
            reportData = jsonData;
          } else if (typeof jsonData === 'object') {
            // If it's a single object with nested arrays (like orders, customers, etc.)
            if (jsonData.orders || jsonData.customers || jsonData.refunds || jsonData.taxes) {
              const allData = [
                ...(jsonData.orders || []),
                ...(jsonData.customers || []),
                ...(jsonData.refunds || []),
                ...(jsonData.taxes || [])
              ];
              reportData = allData;
            } else {
              // If it's a single object without nested arrays, wrap it in an array
              reportData = [jsonData];
            }
          }
          
          // Ensure all data is flattened and contains only simple values
          reportData = reportData.map(item => {
            const flattened: Record<string, any> = {};
            Object.entries(item).forEach(([key, value]) => {
              if (value === null || value === undefined) {
                flattened[key] = '';
              } else if (typeof value === 'object') {
                // Convert objects to strings
                flattened[key] = JSON.stringify(value);
              } else {
                flattened[key] = value;
              }
            });
            return flattened;
          });

          if (reportData.length > 0) {
            headings = Object.keys(reportData[0]);
          }
          break;
        }
        case 'xml': {
          const text = fileContent as string;
          const parser = new XMLParser();
          const xmlData = parser.parse(text);
          // Extract data from XML structure
          if (xmlData.report && xmlData.report.data) {
            const data = xmlData.report.data;
            // Combine all data arrays
            const allData = [
              ...(data.orders || []),
              ...(data.customers || []),
              ...(data.refunds || []),
              ...(data.taxes || [])
            ];
            if (allData.length > 0) {
              headings = Object.keys(allData[0] as object);
              reportData = allData as Record<string, any>[];
            }
          }
          break;
        }
        case 'xlsx': {
          const buffer = fileContent as Buffer;
          const workbook = XLSX.read(buffer, { type: 'buffer' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const xlsxData = XLSX.utils.sheet_to_json(firstSheet);
          if (xlsxData.length > 0) {
            headings = Object.keys(xlsxData[0] as object);
            reportData = xlsxData as Record<string, any>[];
          }
          break;
        }
        default:
          throw new Response("Unsupported format", { status: 400 });
      }
    } else {
      // Si pas de filePath, générer le contenu à la volée
      console.log('Generating report content on-the-fly for report:', report.id);
      
      if (!report.startDate || !report.endDate) {
        throw new Response("Report dates are missing", { status: 400 });
      }

      const reportService = new ReportService(admin);
      const generated = await reportService.generateReportContent({
        shop: report.shop,
        dataType: report.dataType,
        format: report.format,
        startDate: report.startDate.toISOString(),
        endDate: report.endDate.toISOString(),
      });

      if (!generated.content) {
        throw new Response("No data available for this report", { status: 404 });
      }

      // Parse the generated content
      const content = generated.content;
      
      switch (report.format.toLowerCase()) {
        case 'txt': {
          const text = content as string;
          const lines = text.split('\n');
          headings = lines[0].split('\t');
          reportData = lines.slice(1).map(line => {
            const values = line.split('\t');
            return headings.reduce((obj: Record<string, any>, heading, index) => {
              obj[heading] = values[index] || '';
              return obj;
            }, {});
          });
          break;
        }
        case 'csv': {
          const text = content as string;
          reportData = parse(text, {
            columns: true,
            skip_empty_lines: true,
            delimiter: report.shop.fiscalConfig?.separator || ','
          });
          if (reportData.length > 0) {
            headings = Object.keys(reportData[0]);
          }
          break;
        }
        case 'json': {
          const text = content as string;
          const jsonData = JSON.parse(text);
          if (Array.isArray(jsonData)) {
            reportData = jsonData;
          } else if (typeof jsonData === 'object') {
            if (jsonData.orders || jsonData.customers || jsonData.refunds || jsonData.taxes) {
              const allData = [
                ...(jsonData.orders || []),
                ...(jsonData.customers || []),
                ...(jsonData.refunds || []),
                ...(jsonData.taxes || [])
              ];
              reportData = allData;
            } else {
              reportData = [jsonData];
            }
          }
          
          reportData = reportData.map(item => {
            const flattened: Record<string, any> = {};
            Object.entries(item).forEach(([key, value]) => {
              if (value === null || value === undefined) {
                flattened[key] = '';
              } else if (typeof value === 'object') {
                flattened[key] = JSON.stringify(value);
              } else {
                flattened[key] = value;
              }
            });
            return flattened;
          });

          if (reportData.length > 0) {
            headings = Object.keys(reportData[0]);
          }
          break;
        }
        case 'xml': {
          const text = content as string;
          const parser = new XMLParser();
          const xmlData = parser.parse(text);
          if (xmlData.report && xmlData.report.data) {
            const data = xmlData.report.data;
            const allData = [
              ...(data.orders || []),
              ...(data.customers || []),
              ...(data.refunds || []),
              ...(data.taxes || [])
            ];
            if (allData.length > 0) {
              headings = Object.keys(allData[0] as object);
              reportData = allData as Record<string, any>[];
            }
          }
          break;
        }
        case 'xlsx': {
          const buffer = content as Buffer;
          const workbook = XLSX.read(buffer, { type: 'buffer' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const xlsxData = XLSX.utils.sheet_to_json(firstSheet);
          if (xlsxData.length > 0) {
            headings = Object.keys(xlsxData[0] as object);
            reportData = xlsxData as Record<string, any>[];
          }
          break;
        }
        default:
          throw new Response("Unsupported format", { status: 400 });
      }
    }

    return json({
      report,
      reportData,
      headings
    });
  } catch (error) {
    console.error('Error reading report file:', {
      error: error instanceof Error ? error.stack : error,
      filePath: report?.filePath,
      format: report?.format,
      reportId: report?.id,
    });
    // Update report status to ERROR if file reading fails
    await prisma.report.update({
      where: { id: report.id },
      data: {
        status: ReportStatus.ERROR,
        errorMessage: error instanceof Error ? error.message : 'Failed to read report file'
      }
    });
    throw new Response("Failed to read report file", { status: 500 });
  }
};

export default function ReportView() {
  const { report, reportData, headings } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return; // Prevent multiple clicks
    
    setIsDownloading(true);
    try {
      const downloadUrl = `/api/reports/${report.id}`;
      await downloadFileFromUrl(downloadUrl, report.fileName);
      setToastMessage("Fichier téléchargé avec succès");
      setToastError(false);
      setToastActive(true);
    } catch (error) {
      console.error('Download error:', error);
      setToastMessage("Erreur lors du téléchargement");
      setToastError(true);
      setToastActive(true);
    } finally {
      setIsDownloading(false);
    }
  };



  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        await fetch(`/api/reports/${report.id}`, {
          method: "DELETE",
        });
        setToastMessage("Rapport supprimé avec succès");
        setToastError(false);
        setToastActive(true);
        navigate("/app/reports/history");
      } catch (error) {
        setToastMessage("Erreur lors de la suppression du rapport");
        setToastError(true);
        setToastActive(true);
      }
    }
  };

  // Prepare table data
  const rows = reportData.map((item: any) => {
    return headings.map(key => {
      const value = item[key];
      // Format currency values
      if (key.toLowerCase().includes('montant') || key.toLowerCase().includes('prix') || 
          key.toLowerCase().includes('debit') || key.toLowerCase().includes('credit')) {
        return `${value} ${report.shop.fiscalConfig?.currency || 'EUR'}`;
      }
      // Format percentage values
      if (key.toLowerCase().includes('tva')) {
        return `${value}%`;
      }
      // Format dates
      if (key.toLowerCase().includes('date')) {
        return formatDate(value);
      }
      return value || "-";
    });
  });

  return (
    <Page
      title={report.fileName}
      backAction={{ content: "Reports", url: "/app/reports/history" }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Détails du rapport
              </Text>
              <InlineStack gap="400">
                <Text as="p" variant="bodyMd">
                  Période: {report.startDate && report.endDate 
                    ? `${formatDate(report.startDate)} au ${formatDate(report.endDate)}`
                    : "Calculé automatiquement selon la fréquence"
                  }
                </Text>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text as="h2" variant="headingMd">
                  Rapport de données
                </Text>
                <InlineStack gap="200">
                  <Button 
                    onClick={handleDownload}
                    disabled={report.status !== ReportStatus.COMPLETED || isDownloading}
                    loading={isDownloading}
                    icon={<Icon source={ArrowDownIcon} />}
                  >
                    Télécharger
                  </Button>
                  <Button tone="critical" onClick={handleDelete}>
                    Supprimer
                  </Button>
                </InlineStack>
              </InlineStack>

              {reportData.length > 0 ? (
                <DataTable
                  columnContentTypes={headings.map(() => "text")}
                  headings={headings}
                  rows={rows}
                />
              ) : (
                <Text as="p" variant="bodyMd">
                  Aucune donnée disponible dans ce rapport.
                </Text>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Footer />
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

export function ErrorBoundary({ error }: { error: any }) {
  // Remix fournit error.status si c'est une Response
  const navigate = useNavigate();
  const status = error?.status || (error instanceof Response ? error.status : undefined);
  const message =
    status === 404
      ? "Ce rapport n’existe pas ou le fichier est introuvable."
      : "Une erreur est survenue lors de l’affichage du rapport.";
  return (
    <Page title="Rapport introuvable">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd" tone="critical">
                {message}
              </Text>
              <Button onClick={() => navigate("/app/reports/history")}>Retour à l’historique</Button>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 