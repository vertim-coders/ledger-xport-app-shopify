import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  DataTable,
  Text,
  Banner,
  BlockStack,
  InlineStack,
  Box,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { formatDate } from "../utils/date";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { XMLParser } from "fast-xml-parser";
import * as XLSX from "xlsx";
import { ReportStatus } from "@prisma/client";

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

  if (!report || !report.filePath) {
    throw new Response("Report file not found", { status: 404 });
  }

  try {
    // Read the file content
    const fileContent = await fs.readFile(report.filePath, 'utf-8');
    let reportData: Record<string, any>[] = [];
    let headings: string[] = [];

    // Parse based on file format
    switch (report.format.toLowerCase()) {
      case 'txt':
        // Split by tabs and newlines
        const lines = fileContent.split('\n');
        headings = lines[0].split('\t');
        reportData = lines.slice(1).map(line => {
          const values = line.split('\t');
          return headings.reduce((obj: Record<string, any>, heading, index) => {
            obj[heading] = values[index] || '';
            return obj;
          }, {});
        });
        break;

      case 'csv':
        reportData = parse(fileContent, {
          columns: true,
          skip_empty_lines: true,
          delimiter: ','
        });
        if (reportData.length > 0) {
          headings = Object.keys(reportData[0]);
        }
        break;

      case 'json':
        const jsonData = JSON.parse(fileContent);
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

      case 'xml':
        const parser = new XMLParser();
        const xmlData = parser.parse(fileContent);
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

      case 'xlsx':
        const workbook = XLSX.read(fileContent, { type: 'buffer' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const xlsxData = XLSX.utils.sheet_to_json(firstSheet);
        if (xlsxData.length > 0) {
          headings = Object.keys(xlsxData[0] as object);
          reportData = xlsxData as Record<string, any>[];
        }
        break;

      default:
        throw new Response("Unsupported format", { status: 400 });
    }

    return json({
      report,
      reportData,
      headings
    });
  } catch (error) {
    console.error('Error reading report file:', error);
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

  const handleDownload = async () => {
    const response = await fetch(`/api/reports/${report.id}/download`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.fileName}.${report.format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleRegenerate = () => {
    navigate(`/app/reports/manual-export?reportId=${report.id}`);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this report?")) {
      await fetch(`/api/reports/${report.id}`, {
        method: "DELETE",
      });
      navigate("/app/reports/history");
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
                  Période: {formatDate(report.startDate)} au{" "}
                  {formatDate(report.endDate)}
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
                  <Button onClick={handleDownload}>Télécharger</Button>
                  <Button onClick={handleRegenerate}>Re-générer</Button>
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
      </Layout>
    </Page>
  );
} 