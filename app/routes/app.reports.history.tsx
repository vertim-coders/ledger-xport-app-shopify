import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  Select,
  TextField,
  DataTable,
  Button,
  LegacyStack,
  Badge,
  Icon,
  Thumbnail,
  Modal,
  Banner,
  type BadgeProps,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { ReportStatus, ExportFormat, type Report } from "@prisma/client";
import { ArrowDownIcon, RefreshIcon, EmailIcon } from "@shopify/polaris-icons";
import { promises as fs } from "fs";

type LoaderData = {
  reports: Array<Omit<Report, "startDate" | "endDate" | "createdAt" | "updatedAt"> & {
    startDate: string;
    endDate: string;
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
    where.dataType = type;
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

  const reports = await prisma.report.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Serialize dates to strings for JSON
  const serializedReports = reports.map(report => ({
    ...report,
    startDate: report.startDate.toISOString(),
    endDate: report.endDate.toISOString(),
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
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownload = useCallback((reportId: string) => {
    setIsDownloading(true);
    submit(
      { action: "download", reportId },
      { method: "post" }
    );
    setIsDownloading(false);
  }, [submit]);

  const handleRetry = useCallback((reportId: string) => {
    submit(
      { action: "retry", reportId },
      { method: "post" }
    );
  }, [submit]);

  const rows = reports.map((report) => {
    const statusBadge = {
      [ReportStatus.COMPLETED]: { content: "✅ Succès", tone: "success" as const },
      [ReportStatus.PROCESSING]: { content: "⏳ En cours", tone: "warning" as const },
      [ReportStatus.ERROR]: { content: "❌ Échec", tone: "critical" as const },
      [ReportStatus.PENDING]: { content: "⏳ En attente", tone: "warning" as const },
    }[report.status];

    return [
      <div 
        style={{ cursor: 'pointer' }} 
        onClick={() => navigate(`/app/reports/view/${report.id}`)}
      >
        {new Date(report.createdAt).toLocaleDateString("fr-FR")}
      </div>,
      `${new Date(report.startDate).toLocaleDateString("fr-FR")} → ${new Date(report.endDate).toLocaleDateString("fr-FR")}`,
      report.type === "manual" ? "Manuel" : "Auto",
      report.format.toUpperCase(),
      <Badge tone={statusBadge.tone}>{statusBadge.content}</Badge>,
      report.fileName || "—",
      <LegacyStack spacing="tight">
        {report.status === ReportStatus.COMPLETED && (
          <Button
            icon={ArrowDownIcon}
            onClick={() => handleDownload(report.id)}
            disabled={isDownloading}
          />
        )}
        {report.status === ReportStatus.PENDING && (
          <>
            <Button icon={ArrowDownIcon} onClick={() => handleDownload(report.id)} />
            <Button icon={EmailIcon} />
          </>
        )}
        {report.status === ReportStatus.ERROR && (
          <Button
            icon={RefreshIcon}
            onClick={() => handleRetry(report.id)}
          />
        )}
      </LegacyStack>,
    ];
  });

  return (
    <Page
      title="Historique des exports"
      subtitle="Consultez l'historique de tous vos exports"
    >
      <Layout>
        <Layout.Section>
          <Card>
            <LegacyStack distribution="equalSpacing" alignment="center">
              <LegacyStack spacing="loose">
                <Select
                  label="Période"
                  options={[
                    { label: "Toutes les dates", value: "all" },
                    { label: "Aujourd'hui", value: "today" },
                    { label: "7 derniers jours", value: "week" },
                    { label: "30 derniers jours", value: "month" },
                  ]}
                  onChange={handlePeriodChange}
                  value={selectedPeriod}
                />
                <Select
                  label="Type de rapport"
                  options={[
                    { label: "Tous", value: "all" },
                    { label: "Commandes", value: "orders" },
                    { label: "Clients", value: "customers" },
                    { label: "Remboursements", value: "refunds" },
                    { label: "Taxes", value: "taxes" },
                  ]}
                  onChange={handleTypeChange}
                  value={selectedType}
                />
                <Select
                  label="Statut"
                  options={[
                    { label: "Tous", value: "all" },
                    { label: "Succès", value: "COMPLETED" },
                    { label: "En cours", value: "PROCESSING" },
                    { label: "Échec", value: "ERROR" },
                    { label: "En attente", value: "PENDING" },
                  ]}
                  onChange={handleStatusChange}
                  value={selectedStatus}
                />
              </LegacyStack>
              <TextField
                label="Rechercher"
                value={searchValue}
                onChange={handleSearchChange}
                autoComplete="off"
                placeholder="Rechercher un export..."
              />
            </LegacyStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
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
                "Date d'export",
                "Période concernée",
                "Type",
                "Format",
                "Statut",
                "Fichier",
                "Actions",
              ]}
              rows={rows}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 