import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  LegacyStack,
  Button,
  Badge,
  DataTable,
  Icon,
  Thumbnail,
  EmptyState,
  Toast,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import type { ReportStatus as ReportStatusType } from "@prisma/client";
import { ShopifyCustomerService } from "../models/ShopifyCustomer.service";
import { ShopifyOrderService } from "../models/ShopifyOrder.service";

// Import sécurisé de ReportStatus
const ReportStatus = {
  PENDING: "PENDING" as const,
  PROCESSING: "PROCESSING" as const,
  COMPLETED: "COMPLETED" as const,
  COMPLETED_WITH_EMPTY_DATA: "COMPLETED_WITH_EMPTY_DATA" as const,
  ERROR: "ERROR" as const
};
import { BiSimpleBtn } from "../components/Buttons/BiSimpleBtn";
import { PlusIcon, OrderIcon, CalendarIcon, EditIcon } from "@shopify/polaris-icons";
import { downloadFileFromUrl } from "../utils/download";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from "react";
import { StatCard } from "../components/Navigation/StatCard";
import {
  CheckIcon,
  XCircleIcon,
  ProfileIcon,
  CashDollarIcon,
} from "@shopify/polaris-icons";
import { MonthlyReportsChart } from "../components/Navigation/MonthlyReportsChart";
import { RecentExportsList } from "../components/Navigation/RecentExportsList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const shop = await prisma.shop.findUnique({
    where: { shopifyDomain: session.shop },
    include: {
      reports: {
        orderBy: { createdAt: 'desc' },
        take: 5
      },
      scheduledTasks: {
        where: {
          status: "ACTIVE",
          nextRun: {
            gt: new Date()
          }
        },
        include: {
          report: true
        },
        orderBy: {
          nextRun: 'asc'
        },
        take: 5
      }
    }
  });

  // Get successful and failed exports count
  const successfulExports = await prisma.report.count({
    where: {
      shopId: shop?.id,
      status: ReportStatus.COMPLETED
    }
  });

  const failedExports = await prisma.report.count({
    where: {
      shopId: shop?.id,
      status: ReportStatus.ERROR
    }
  });

  // Get exports statistics for the last 6 months
  const currentDate = new Date();
  const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1); // 6 months ago

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Initialize monthly data array for the last 6 months
  const monthlyData = [];
  
  for (let i = 5; i >= 0; i--) {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const monthEnd = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0); // Last day of the month

    const monthExports = await prisma.report.count({
      where: {
        shopId: shop?.id,
        createdAt: {
          gte: monthStart,
          lte: monthEnd
        }
      }
    });

    monthlyData.push({
      month: monthNames[targetDate.getMonth()],
      exports: Number(monthExports) || 0
    });
  }

  // --- Récupération dynamique Shopify ---
  // Plage : 1er janvier de l’année en cours à aujourd’hui
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const startDate = yearStart.toISOString();
  const endDate = currentDate.toISOString();

  // Nombre de clients
  let customersCount = 0;
  try {
    const customers = await ShopifyCustomerService.getCustomers(admin, startDate, endDate);
    customersCount = Array.isArray(customers) ? customers.length : 0;
  } catch (e) {
    customersCount = 0;
  }

  // Revenu total
  let totalRevenue = 0;
  try {
    const orders = await ShopifyOrderService.getOrders(admin, startDate, endDate);
    if (Array.isArray(orders)) {
      totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.total_price) || 0), 0);
    }
  } catch (e) {
    totalRevenue = 0;
  }

  return json({
    successfulExports,
    failedExports,
    customersCount,
    totalRevenue,
    recentReports: shop?.reports || [],
    upcomingExports: shop?.scheduledTasks || [],
    monthlyData
  });
};

export default function Dashboard() {
  const { successfulExports, failedExports, customersCount, totalRevenue, recentReports, upcomingExports, monthlyData } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);

  const handleNewReport = () => {
    navigate("/app/reports/manual-export");
  };

  const handleDownload = async (reportId: string, fileName: string) => {
    if (isDownloading === reportId) return; // Prevent multiple clicks
    
    setIsDownloading(reportId);
    try {
      const downloadUrl = `/api/reports/${reportId}`;
      await downloadFileFromUrl(downloadUrl, fileName);
      setToastMessage("Fichier téléchargé avec succès");
      setToastError(false);
      setToastActive(true);
    } catch (error) {
      console.error('Download error:', error);
      setToastMessage("Erreur lors du téléchargement");
      setToastError(true);
      setToastActive(true);
    } finally {
      setIsDownloading(null);
    }
  };

  const handleRetry = async (reportId: string) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "action=retry",
      });

      if (response.ok) {
        setToastMessage("Rapport en cours de régénération");
        setToastError(false);
        setToastActive(true);
        // Refresh the page to show updated status
        window.location.reload();
      } else {
        throw new Error("Failed to retry report");
      }
    } catch (error) {
      console.error('Retry error:', error);
      setToastMessage("Erreur lors de la régénération");
      setToastError(true);
      setToastActive(true);
    }
  };

  const rows = recentReports.map(report => [
    <div 
      style={{ cursor: 'pointer' }} 
      onClick={() => navigate(`/app/reports/view/${report.id}`)}
    >
      {report.fileName}
    </div>,
    report.type,
    new Date(report.createdAt).toLocaleDateString(),
    new Date(report.updatedAt).toLocaleDateString(),
    report.status === ReportStatus.ERROR ? 'Échec' : 'Manuel',
    <Button
      onClick={() => handleDownload(report.id, report.fileName)}
      disabled={report.status !== ReportStatus.COMPLETED || isDownloading === report.id}
      icon="download"
      loading={isDownloading === report.id}
    >
      Télécharger
    </Button>
  ]);

  // Format date and time for display
  const formatDateTime = (date: string | Date) => {
    const d = new Date(date);
    return {
      date: d.toLocaleDateString('fr-FR'),
      time: d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  // Get frequency label in French
  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'hourly': return 'Toutes les heures';
      case 'daily': return 'Quotidien';
      case 'monthly': return 'Mensuel';
      case 'yearly': return 'Annuel';
      default: return frequency;
    }
  };

  return (
    <Page title="Tableau de bord">
      <Layout>
        {/* Export Statistics */}
        <Layout.Section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 32 }}>
            <StatCard
              title="Exports réussis"
              value={successfulExports}
              variation="+6.5% cette semaine"
              icon={CheckIcon}
              iconBg="#E6F7F1"
              color="#009A6B"
            />
            <StatCard
              title="Exports échoués"
              value={failedExports}
              variation="-2.1% cette semaine"
              icon={XCircleIcon}
              iconBg="#FFF4E6"
              color="#FF8A65"
            />
            <StatCard
              title="Customers"
              value={customersCount}
              variation="+3.2% cette semaine"
              icon={ProfileIcon}
              iconBg="#E6F0FF"
              color="#0066FF"
            />
            <StatCard
              title="Revenue"
              value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              variation="+8.4% cette semaine"
              icon={CashDollarIcon}
              iconBg="#E6F0FF"
              color="#0066FF"
            />
          </div>
        </Layout.Section>

        {/* New Report Button */}
        <Layout.Section>
          <div style={{ marginBottom: '0px', display: 'flex', gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>
            <BiSimpleBtn 
              title="Générer un rapport" 
              icon={<Icon source={OrderIcon} tone="inherit" />} 
              onClick={handleNewReport} 
              style={{ minWidth: 200, maxWidth: 220 }}
            />
            <BiSimpleBtn
              title="Planifier un rapport" 
              icon={<Icon source={CalendarIcon} tone="inherit" />} 
              onClick={() => navigate("/app/reports/schedule")}
              style={{ minWidth: 200, maxWidth: 220 }}
            />
            <BiSimpleBtn 
              title="Rapport personnalisé" 
              icon={<Icon source={EditIcon} tone="inherit" />} 
              onClick={() => navigate("/app/reports/custom")} 
              style={{ minWidth: 200, maxWidth: 220 }}
            />
          </div>
        </Layout.Section>

        {/* Export Statistics Chart */}
        <Layout.Section>
          <div style={{ marginBottom: 16 }}>
            <Text variant="headingMd" as="h1">Statistiques des exports</Text>
          </div>
          <MonthlyReportsChart data={monthlyData.map(item => ({ month: item.month, reports: item.exports }))} />
        </Layout.Section>

        {/* Recent Exports */}
        <Layout.Section>
          <RecentExportsList
            exports={recentReports.slice(0, 5).map(r => ({
              id: r.id,
              filename: r.fileName || r.type || "Export",
              createdAt: r.createdAt,
              downloadUrl: `/api/reports/${r.id}`,
              type: r.type,
              status: r.status,
              typeLabel: r.type === "scheduled" ? "Planifié" : "Généré",
              downloadDisabled: r.type === "scheduled" && r.status !== "COMPLETED"
            }))}
            onDownload={(id, url) => window.open(url, '_blank')}
            onSeeAll={() => window.location.assign("/app/reports/history")}
            onView={id => navigate(`/app/reports/view/${id}`)}
          />
        </Layout.Section>

        {/* Bottom Section - Recent Failures and Upcoming Exports side by side */}
        <Layout.Section>
          <div style={{ display: 'flex', gap: '16px' }}>
            {/* Recent Failures */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Card>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <Text variant="headingMd" as="h1">Échecs récents</Text>
                  </div>
                  {recentReports && recentReports.filter(report => report.status === ReportStatus.ERROR).length > 0 ? (
                    <div style={{ 
                      height: '300px',
                      overflowY: 'auto',
                      overflowX: 'auto'
                    }}>
                      <div style={{ minWidth: '600px' }}>
                        <DataTable
                          columnContentTypes={[
                            'text',
                            'text',
                            'text',
                            'text',
                          ]}
                          headings={[
                            'Nom du rapport',
                            'Type de rapport',
                            'Date d\'échec',
                            'Actions',
                          ]}
                          rows={recentReports
                            .filter(report => report.status === ReportStatus.ERROR)
                            .map(report => [
                              report.fileName,
                              report.type,
                              new Date(report.updatedAt).toLocaleDateString(),
                              <Button onClick={() => handleRetry(report.id)}>
                                Corriger
                              </Button>
                            ])}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '300px'
                    }}>
                      <EmptyState
                        heading="Aucun échec récent"
                        image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjRjU1NTU1Ii8+Cjwvc3ZnPgo="
                      >
                        <p>Tous vos exports ont réussi.</p>
                      </EmptyState>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Upcoming Exports */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Card>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <Text variant="headingMd" as="h1">Les prochains exports</Text>
                  </div>
                  {upcomingExports && upcomingExports.length > 0 ? (
                    <div style={{ 
                      height: '300px',
                      overflowY: 'auto',
                      overflowX: 'auto'
                    }}>
                      <div style={{ minWidth: '600px' }}>
                        <DataTable
                          columnContentTypes={[
                            'text',
                            'text',
                            'text',
                            'text',
                            'text',
                          ]}
                          headings={[
                            'Nom du rapport',
                            'Date',
                            'Heure',
                            'Fréquence',
                            'Actions',
                          ]}
                          rows={upcomingExports.map(task => {
                            const { date, time } = formatDateTime(task.nextRun);
                            return [
                              task.report.fileName,
                              date,
                              time,
                              getFrequencyLabel(task.frequency),
                              <Button onClick={() => navigate(`/app/reports/schedule?id=${task.id}`)}>
                                Modifier
                              </Button>
                            ];
                          })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '300px'
                    }}>
                      <EmptyState
                        heading="Aucun export planifié"
                        image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjMDA3YWNlIi8+Cjwvc3ZnPgo="
                      >
                        <p>Les exports planifiés apparaîtront ici.</p>
                        <Button onClick={() => navigate("/app/reports/schedule")}>
                          Planifier un export
                        </Button>
                      </EmptyState>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Layout.Section>

        {/* Popular Reports */}
        <Layout.Section>
          <Card>
            <div style={{ padding: '20px' }}>
              <Text variant="headingMd" as="h1">Rapports populaires</Text>
              <LegacyStack distribution="fill">
                <Card>
                  <div style={{ padding: '16px' }}>
                    <LegacyStack alignment="center">
                      <Thumbnail source="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDVIMzBWMzVIMFY1Wk0xMiA3VjMzSDI4VjdIMTJaIiBmaWxsPSIjMDA3YWNlIi8+CjxwYXRoIGQ9Ik0xNSAxMEgyNVYxMkgxNVYxMFpNMTUgMTVIMjVWMTdIMTVWMTVaTTE1IDIwSDI1VjIySDE1VjIwWk0xNSAyNUgyNVYyN0gxNVYyNVoiIGZpbGw9IiMwMDdhY2UiLz4KPC9zdmc+Cg==" alt="Ventes" />
                      <div>
                        <Text variant="headingMd" as="h3">Ventes</Text>
                        <Text variant="bodyMd" as="p">Exports des transactions</Text>
                      </div>
                    </LegacyStack>
                  </div>
                </Card>
                <Card>
                  <div style={{ padding: '16px' }}>
                    <LegacyStack alignment="center">
                      <Thumbnail source="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjRjU1NTU1Ii8+Cjwvc3ZnPgo=" alt="Taxes" />
                      <div>
                        <Text variant="headingMd" as="h3">Taxes</Text>
                        <Text variant="bodyMd" as="p">Déclarations fiscales</Text>
                      </div>
                    </LegacyStack>
                  </div>
                </Card>
                <Card>
                  <div style={{ padding: '16px' }}>
                    <LegacyStack alignment="center">
                      <Thumbnail source="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDNDMTEuNzE2IDMgNSA5LjcxNiA1IDE4QzUgMjYuMjg0IDExLjcxNiAzMyAyMCAzM0MyOC4yODQgMzMgMzUgMjYuMjg0IDM1IDE4QzM1IDkuNzE2IDI4LjI4NCAzIDIwIDNaTTIyIDI1SDJWMjNIMjJWMjVaTTIyIDIxSDJWMThIMjJWMjFaIiBmaWxsPSIjMDA3YWNlIi8+Cjwvc3ZnPgo=" alt="Clients" />
                      <div>
                        <Text variant="headingMd" as="h3">Clients</Text>
                        <Text variant="bodyMd" as="p">Base clients</Text>
                      </div>
                    </LegacyStack>
                  </div>
                </Card>
              </LegacyStack>
            </div>
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