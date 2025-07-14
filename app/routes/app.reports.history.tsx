import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Select,
  TextField,
  DataTable,
  Button,
  LegacyStack,
  Badge,
  Icon,
  Toast,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import type { ReportStatus as ReportStatusType, ExportFormat as ExportFormatType, Report as ReportType } from "@prisma/client";
import { useTranslation } from 'react-i18next';

// Import sécurisé de ReportStatus et ExportFormat
const ReportStatusEnum = {
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

type Report = ReportType;
import { ArrowDownIcon, RefreshIcon, EmailIcon, SearchIcon } from "@shopify/polaris-icons";
import { promises as fs } from "fs";
import { downloadFileFromUrl } from "../utils/download";
import Footer from "../components/Footer";

type LoaderData = {
  reports: Array<Omit<Report, "startDate" | "endDate" | "createdAt" | "updatedAt"> & {
    startDate: string | null;
    endDate: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
  });

  if (!shop) {
    return json<LoaderData>({ reports: [] });
  }

  // Get URL parameters for filtering
  const url = new URL(request.url);
  const period = url.searchParams.get("period") || "all";
  const type = url.searchParams.get("type") || "all";
  const status = url.searchParams.get("status") || "all";
  const search = url.searchParams.get("search") || "";

  // Build the where clause for filtering
  const where: any = { shopId: shop.id };

  if (period !== "all") {
    // Add period filtering logic
    const now = new Date();
    switch (period) {
      case "today":
        where.createdAt = {
          gte: new Date(now.setHours(0, 0, 0, 0)),
        };
        break;
      case "week":
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        where.createdAt = {
          gte: weekAgo,
        };
        break;
      case "month":
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        where.createdAt = {
          gte: monthAgo,
        };
        break;
    }
  }

  if (type !== "all") {
    where.type = type;
  }

  if (status !== "all") {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { fileName: { contains: search, mode: "insensitive" } },
      { type: { contains: search, mode: "insensitive" } },
    ];
  }

  console.log('Fetching reports with where clause:', where);

  const reports = await prisma.report.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  console.log('Found reports:', reports.map(r => ({ id: r.id, status: r.status })));

  // Serialize dates to strings for JSON
  const serializedReports = reports.map(report => ({
    ...report,
    startDate: report.startDate?.toISOString() || null,
    endDate: report.endDate?.toISOString() || null,
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
  }));

  return json<LoaderData>({ reports: serializedReports });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "download") {
    const reportId = formData.get("reportId");
    const report = await prisma.report.findUnique({
      where: { id: reportId as string },
    });

    if (!report || !report.filePath) {
      return json({ error: "Report not found" }, { status: 404 });
    }

    // Read the file and return it
    const fileContent = await fs.readFile(report.filePath);
    return new Response(fileContent, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${report.fileName}"`,
      },
    });
  }

  if (action === "retry") {
    const reportId = formData.get("reportId");
    // Implement retry logic here
    return json({ success: true });
  }

  return json({ error: "Invalid action" }, { status: 400 });
};

export default function ExportHistory() {
  const { reports } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);
  const { t } = useTranslation();

  const handlePeriodChange = useCallback((value: string) => {
    setSelectedPeriod(value);
    submit(
      { period: value, type: selectedType, status: selectedStatus, search: searchValue },
      { method: "get" }
    );
  }, [selectedType, selectedStatus, searchValue, submit]);

  const handleTypeChange = useCallback((value: string) => {
    setSelectedType(value);
    submit(
      { period: selectedPeriod, type: value, status: selectedStatus, search: searchValue },
      { method: "get" }
    );
  }, [selectedPeriod, selectedStatus, searchValue, submit]);

  const handleStatusChange = useCallback((value: string) => {
    setSelectedStatus(value);
    submit(
      { period: selectedPeriod, type: selectedType, status: value, search: searchValue },
      { method: "get" }
    );
  }, [selectedPeriod, selectedType, searchValue, submit]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    submit(
      { period: selectedPeriod, type: selectedType, status: selectedStatus, search: value },
      { method: "get" }
    );
  }, [selectedPeriod, selectedType, selectedStatus, submit]);

  const handleDownload = useCallback(async (reportId: string, fileName: string) => {
    if (isDownloading === reportId) return; // Prevent multiple clicks
    
    setIsDownloading(reportId);
    try {
      const downloadUrl = `/api/reports/${reportId}`;
      await downloadFileFromUrl(downloadUrl, fileName);
      setToastMessage(t('toast.downloadSuccess', 'Fichier téléchargé avec succès'));
      setToastError(false);
      setToastActive(true);
    } catch (error) {
      console.error('Download error:', error);
      setToastMessage(t('toast.downloadError', 'Erreur lors du téléchargement'));
      setToastError(true);
      setToastActive(true);
    } finally {
      setIsDownloading(null);
    }
  }, [isDownloading, t]);

  const handleRetry = useCallback(async (reportId: string) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "action=retry",
      });

      if (response.ok) {
        setToastMessage(t('toast.retrying', 'Rapport en cours de régénération'));
        setToastError(false);
        setToastActive(true);
        // Refresh the page to show updated status
        window.location.reload();
      } else {
        throw new Error("Failed to retry report");
      }
    } catch (error) {
      console.error('Retry error:', error);
      setToastMessage(t('toast.retryError', 'Erreur lors de la régénération'));
      setToastError(true);
      setToastActive(true);
    }
  }, [t]);

  // Truncate file name if too long
  const getTruncatedFileName = (fileName: string) => {
    if (!fileName) return "—";
    if (fileName.length <= 37) return fileName;
    // Try to preserve the extension
    const extMatch = fileName.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0] : '';
    return fileName.slice(0, 37) + '...'+ (ext ? ext : '');
  };

  const rows = reports.map((report) => {
    console.log('Processing report:', { id: report.id, status: report.status });
    
    const statusBadge: { content: string; tone: "success" | "info" | "warning" | "critical" } = {
      "COMPLETED": { content: "✅ Succès", tone: "success" as const },
      "COMPLETED_WITH_EMPTY_DATA": { content: "ℹ️ Données vides", tone: "info" as const },
      "PROCESSING": { content: "⏳ En cours", tone: "warning" as const },
      "ERROR": { content: "❌ Échec", tone: "critical" as const },
      "PENDING": { content: "⏳ En attente", tone: "warning" as const },
    }[report.status] || { content: "❓ Inconnu", tone: "warning" as const };

    console.log('Status badge:', statusBadge);

    // Helper to make a cell clickable, with error handling for certain statuses
    const clickableCell = (content: React.ReactNode, report: any) => (
      <div 
        style={{ cursor: 'pointer', width: '100%', height: '100%' }}
        onClick={() => {
          if (report.status === ReportStatusEnum.PENDING) {
            setToastMessage(t('toast.pending', 'Ce rapport est encore en attente de génération.'));
            setToastError(true);
            setToastActive(true);
          } else if (report.status === ReportStatusEnum.COMPLETED_WITH_EMPTY_DATA) {
            setToastMessage(t('toast.empty', 'Ce rapport a été généré sans données. Il n\'y a rien à afficher.'));
            setToastError(true);
            setToastActive(true);
          } else if (report.status === ReportStatusEnum.ERROR) {
            setToastMessage(t('toast.failed', 'Ce rapport a échoué. Impossible d\'afficher la vue.'));
            setToastError(true);
            setToastActive(true);
          } else {
            navigate(`/app/reports/view/${report.id}`);
          }
        }}
      >
        {content}
      </div>
    );

    return [
      clickableCell(new Date(report.createdAt).toLocaleDateString(), report),
      clickableCell(report.startDate && report.endDate 
        ? `${new Date(report.startDate).toLocaleDateString()} → ${new Date(report.endDate).toLocaleDateString()}`
        : t('history.period.auto', 'Calculé automatiquement'), report),
      clickableCell(report.type === "manual" ? t('history.type.manual', 'Manuel') : t('history.type.scheduled', 'Automatique'), report),
      clickableCell(t(`history.format.${report.format.toLowerCase()}`, report.format.toUpperCase()), report),
      clickableCell(
        <Badge tone={statusBadge.tone}>
          {(() => {
            switch (report.status) {
              case 'COMPLETED': return t('history.status.success', 'Succès');
              case 'COMPLETED_WITH_EMPTY_DATA': return t('history.status.empty', 'Données vides');
              case 'PROCESSING': return t('history.status.processing', 'En cours');
              case 'ERROR': return t('history.status.error', 'Erreur');
              case 'PENDING': return t('history.status.pending', 'En attente');
              default: return t('history.status.unknown', 'Inconnu');
            }
          })()}
        </Badge>, report),
      clickableCell(getTruncatedFileName(report.fileName), report),
      <LegacyStack spacing="tight">
        {report.status === ReportStatusEnum.COMPLETED && (
          <Button
            icon={ArrowDownIcon}
            onClick={() => handleDownload(report.id, report.fileName)}
            disabled={isDownloading === report.id}
            loading={isDownloading === report.id}
          />
        )}
        {report.status === ReportStatusEnum.PENDING && (
          <Button icon={EmailIcon} />
        )}
        {report.status === ReportStatusEnum.ERROR && (
          <Button
            icon={RefreshIcon}
            onClick={() => handleRetry(report.id)}
          />
        )}
      </LegacyStack>,
    ];
  });

  const typeOptions = [
    { label: t('history.type.all', 'Tous'), value: 'all' },
    { label: t('history.type.manual', 'Manuel'), value: 'manual' },
    { label: t('history.type.scheduled', 'Auto'), value: 'scheduled' },
  ];

  return (
    <Page
      title={t('history.title', 'Historique des exports')}
      subtitle={t('history.subtitle', "Consultez l'historique de tous vos exports")}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <LegacyStack distribution="equalSpacing" alignment="center">
              <LegacyStack spacing="tight">
                <Select
                  label={t('history.period', 'Période')}
                  options={[
                    { label: t('history.period.all', 'Toutes'), value: "all" },
                    { label: t('history.period.today', "Aujourd'hui"), value: "today" },
                    { label: t('history.period.week', "Cette semaine"), value: "week" },
                    { label: t('history.period.month', "Ce mois-ci"), value: "month" },
                  ]}
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                />
                <Select
                  label={t('history.type', 'Type de rapport')}
                  options={typeOptions}
                  value={selectedType}
                  onChange={handleTypeChange}
                />
                <Select
                  label={t('history.status', 'Statut')}
                  options={[
                    { label: t('history.status.all', 'Tous'), value: "all" },
                    { label: t('history.status.success', 'Succès'), value: ReportStatusEnum.COMPLETED },
                    { label: t('history.status.empty', 'Données vides'), value: ReportStatusEnum.COMPLETED_WITH_EMPTY_DATA },
                    { label: t('history.status.processing', 'En cours'), value: ReportStatusEnum.PROCESSING },
                    { label: t('history.status.error', 'Erreur'), value: ReportStatusEnum.ERROR },
                    { label: t('history.status.pending', 'En attente'), value: ReportStatusEnum.PENDING },
                  ]}
                  value={selectedStatus}
                  onChange={handleStatusChange}
                />
              </LegacyStack>
              <TextField
                label={t('history.search', 'Recherche')}
                value={searchValue}
                onChange={handleSearchChange}
                autoComplete="off"
                prefix={<Icon source={SearchIcon} />}
              />
            </LegacyStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
              <DataTable
                columnContentTypes={[
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                ]}
                headings={[
                  t('history.table.exportDate', "Date d'export"),
                  t('history.table.period', "Période concernée"),
                  t('history.table.type', 'Type'),
                  t('history.table.format', 'Format'),
                  t('history.table.status', 'Statut'),
                  t('history.table.file', 'Fichier'),
                  t('history.table.actions', 'Actions'),
                ]}
                rows={rows}
              />
            </div>
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